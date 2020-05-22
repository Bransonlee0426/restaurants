<template>
  <b-container fluid class="from">
    <b-row no-gutters>
      <b-col>
        <function-bar
          pagename="Restaurant List"
          edit_time="最後編輯時間:"
          :btn_list="tool"
          @add="onAddClick"
          @on-store="onOnStoreClick"
          @off-store="onOffStoreClick"
          @delete="onDeleteClick"
          @cancel="onCancelClick"></function-bar>
      </b-col>
    </b-row>
    <data-list :state='state' @allSelected="allSelected">
      <b-card-group :slot="key" v-for='(group,key) in restItem' :key="key">
        <restaurant-card v-for="(item,key) in group"
                   :key="key"
                   :itemData="item"
                   v-model="select"
                   :state='state'
                   :showCheckboxOrEdit='showCheckboxOrEdit'
                   @selection="selection"
                   :allChecked="allChecked"
                   @detail='onDetail'>
          </restaurant-card>
        <hr class="hr-bottom">
      </b-card-group>
    </data-list>
    <popup :type='popType' @ok='onStoreOk'></popup>
  </b-container>
</template>
<script>
import tool from '@/toolbox/DishList';

export default {
  data() {
    return {
      newRest: 'newRest',
      tool: tool.tool,
      ownerId: this.$store.state.userInfo.ownerId,
      state: 'default',
      showCheckboxOrEdit: 'Edit',
      param: {
        active: '',
        restaurantId: '',
      },
      select: [], // 要給 api 的 array
      allChecked: {
        count: 0,
        check: false,
      },
      popType: '',
      restItem: {},
    };
  },
  created() {
    const vm = this;
    window.localStorage.setItem('isCreateRestaurant', JSON.stringify(false));
    vm.$restaurant.GetAll(
      {
        ownerId: vm.ownerId,
      },
      (res) => {
        vm.restItem = res.data;
      },
    );
  },
  updated() {
    const vm = this;
    vm.scrollToRestaurant();
  },
  methods: {
    onAddClick() {
      window.localStorage.setItem('isCreateRestaurant', JSON.stringify(true));
      this.$router.push('newRestaurant');
    },
    onOnStoreClick() {
      if (!this.isSelectType) {
        this.switchType('onstore');
      } else if (this.select.length !== 0) {
        this.showPopup('select-on-store-restaurant');
      }
    },
    onOffStoreClick() {
      if (!this.isSelectType) {
        this.switchType('offstore');
      } else if (this.select.length !== 0) {
        this.showPopup('select-off-store-restaurant');
      }
    },
    onDeleteClick() {
      if (!this.isSelectType) {
        this.switchType('delete');
      } else if (this.select.length !== 0) {
        this.showPopup('delete-restaurant');
      }
    },
    onCancelClick() {
      this.switchType();
      this.showCheckboxOrEdit = 'Edit';
    },
    updateStatus() {
      this.$restaurant.UpdateStatus(
        this.param,
        (res) => {
          switch (res.status) {
            case '0027_000000':
              switch (this.param.active) {
                case 'on':
                  this.showPopup('on-store-restaurant');
                  break;
                case 'off':
                  this.showPopup('off-store-restaurant');
                  break;
                case 'delete':
                  this.showPopup('delete-successful-restaurant');
                  break;
                default:
                  break;
              }
              break;
            case '0027_000002':
              this.showPopup('set-still-on');
              break;
            case '0027_000003':
              this.showPopup('nutritionist-set-still-on');
              break;
            case '0027_000004':
              this.showPopup('dish-still-on');
              break;
            default:
              this.showPopup('update-failed');
              break;
          }
        },
      );
    },
    switchType(type) {
      this.state = type;
      switch (type) {
        case 'onstore':
          this.tool = tool.onstore;
          this.isSelectType = true;
          this.param.active = 'on';
          this.showCheckboxOrEdit = 'Checkbox';
          break;
        case 'offstore':
          this.tool = tool.offstore;
          this.isSelectType = true;
          this.param.active = 'off';
          this.showCheckboxOrEdit = 'Checkbox';
          break;
        case 'delete':
          this.tool = tool.deleteType;
          this.isSelectType = true;
          this.param.active = 'delete';
          this.showCheckboxOrEdit = 'Checkbox';
          break;
        default:
          this.tool = tool.tool;
          this.isSelectType = false;
          this.showCheckboxOrEdit = 'Checkbox';
          this.select = [];
          this.allSelected(false, '');
          this.selection('', false);
          break;
      }
    },
    onStoreOk() {
      switch (this.popType) {
        case 'select-on-store-restaurant':
        case 'select-off-store-restaurant':
        case 'delete-restaurant':
          this.param.restaurantId = JSON.stringify(this.select);
          this.updateStatus();
          break;
        default:
          this.$restaurant.GetAll(
            {
              ownerId: this.ownerId,
            },
            (res) => {
              this.restItem = res.data;
              this.select = [];
              this.param.restaurantId = '';
              this.allSelected(false, '');
              this.selection('', false);
            },
          );
          break;
      }
    },
    allSelected(checked, state) {
      // 全選溝通 全選傳上來的 function
      const vm = this;
      vm.allChecked.count += 1; // 數據變動 For watch
      vm.allChecked.check = checked; // 丟到restcard裡的allcheck狀態 for watch
      if (!checked) {
        // 沒打勾狀態
        vm.select = [];
      } else {
        // 打勾狀態
        vm.isOnstore(state);
      }
    },
    isOnstore(state) {
      const vm = this;
      if (state === 'onstore') {
        vm.select = [];
        if (vm.restItem.off !== null) {
          vm.restItem.off.forEach((item) => {
            const data = { id: item.restaurantId };
            vm.select.push(data);
          });
        }
      } else {
        vm.select = [];
        if (vm.restItem.on !== null) {
          vm.restItem.on.forEach((item) => {
            const data = { id: item.restaurantId };
            vm.select.push(data);
          });
        }
      }
    },
    selection(itemData, checked) {
      const vm = this;
      const data = { id: itemData };
      if (checked) {
        vm.select.push(data);
      } else if (!checked) {
        // 刪除沒選取的餐廳
        vm.select.forEach((ele, index) => {
          if (ele.id === data.id) {
            vm.select.splice(index, 1);
          }
        });
      }
    },
    scrollToRestaurant() {
      const vm = this;
      const el = document.querySelectorAll('span.rest-id');
      const topEl = document.querySelector('.rest-li');
      const restaurantID = vm.$store.state.productIds.restaurant.id;
      if (restaurantID !== '') {
        el.forEach((element) => {
          if (element.innerHTML === restaurantID) {
            element.parentNode.parentNode.parentNode.scrollIntoView({
              behavior: 'smooth',
            });
          }
        });
        // clearing productIds data
        vm.$store.dispatch('productIds/saveRestaurant', '');
      } else {
        topEl.scrollIntoView(true);
      }
    },
    onDetail(val) {
      const vm = this;
      vm.$store.dispatch('productIds/saveRestaurant',
        {
          id: val.restaurantId,
          name: val.name,
        });
      vm.$router.push({
        name: 'newrestaurant',
        params: {
          restaurantId: val.restaurantId,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.from {
  background-color: #eaeaea;
  min-height: 100vh;
  padding: 0;
  .hr-bottom {
    border: 0.5px solid #cdcdcd;
    width: 100%;
    margin-bottom: 0px;
    margin-top: 0px;
  }
}
</style>
