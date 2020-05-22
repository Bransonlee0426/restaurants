<template>
  <b-container fluid class="form">
    <b-row no-gutters>
      <b-col>
        <function-bar
          pagename="Dish List"
          edit_time='最後編輯時間:'
          :btn_list='tool'
          @add='onAddClick'
          @on-store="onOnStoreClick"
          @off-store="onOffStoreClick"
          @delete="onDeleteClick"
          @cancel="onCancelClick"></function-bar>
      </b-col>
    </b-row>
    <data-list :state='state' @allSelected='onAllSelected' :allSelect="checkbox">
      <b-card-group :slot="key" v-for="(group,key) in dishItem" :key="key">
        <information-card
          ref='card'
          :isSelectType="isSelectType"
          v-for='(item,index) in group'
          :key="index"
          :itemData='item'
          @isSelected="isSelected"
          @unSelected="unSelected"
          @detail='onDetail'></information-card>
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
      tool: tool.tool,
      dishItem: {},
      state: 'default',
      isSelectType: false,
      restaurantId: this.$store.state.productIds.restaurant.id,
      param: {
        active: '',
        dishId: '',
      },
      select: [],
      popType: '',
      checkbox: {
        isCheck: false,
      },
    };
  },
  created() {
    this.$dish.GatAll(
      {
        restaurantId: this.restaurantId,
      },
      (res) => {
        this.dishItem = res.data;
      },
    );
  },
  mounted() {},
  methods: {
    onAddClick() {
      this.$router.push('newdish');
    },
    onOnStoreClick() {
      if (!this.isSelectType) {
        this.switchType('onstore');
      } else if (this.select.length !== 0) {
        this.showPopup('select-on-store-dish');
      }
    },
    onOffStoreClick() {
      if (!this.isSelectType) {
        this.switchType('offstore');
      } else if (this.select.length !== 0) {
        this.showPopup('select-off-store-dish');
      }
    },
    onDeleteClick() {
      if (!this.isSelectType) {
        this.switchType('delete');
      } else if (this.select.length !== 0) {
        this.showPopup('delete-dish');
      }
    },
    onCancelClick() {
      this.switchType();
    },
    switchType(type) {
      this.state = type;
      switch (type) {
        case 'onstore':
          this.tool = tool.onstore;
          this.isSelectType = true;
          this.param.active = 'on';
          break;
        case 'offstore':
          this.tool = tool.offstore;
          this.isSelectType = true;
          this.param.active = 'off';
          break;
        case 'delete':
          this.tool = tool.deleteType;
          this.isSelectType = true;
          this.param.active = 'delete';
          break;
        default:
          this.tool = tool.tool;
          this.isSelectType = false;
          this.state = 'default';
          this.select = [];
          break;
      }
    },
    updateStatus() {
      this.$dish.UpdateStatus(
        this.param,
        () => {
          switch (this.param.active) {
            case 'on':
              this.showPopup('on-store-dish');
              break;
            case 'off':
              this.showPopup('off-store-dish');
              break;
            case 'delete':
              this.showPopup('delete-successful-dish');
              break;
            default:
              break;
          }
        },
      );
    },
    onStoreOk() {
      switch (this.popType) {
        case 'select-on-store-dish':
        case 'select-off-store-dish':
        case 'delete-dish':
          this.param.dishId = JSON.stringify(this.select);
          this.updateStatus();
          break;
        default:
          this.$dish.GatAll(
            {
              restaurantId: this.restaurantId,
            },
            (res) => {
              this.dishItem = res.data;
              this.cleanSelectData();
            },
          );
          break;
      }
    },
    onAllSelected(select) {
      if (!select) {
        this.select = [];
      }
      if (this.state === 'onstore' || this.state === 'delete') {
        if (this.dishItem.off !== null) {
          this.dishItem.off.forEach((ele) => {
            this.allSelect(ele, select);
          });
        }
      } else if (this.dishItem.on !== null) {
        this.dishItem.on.forEach((ele) => {
          this.allSelect(ele, select);
        });
      }
    },
    allSelect(val, select) {
      if (select) {
        this.isSelected(val);
      } else {
        this.select = [];
      }
      this.$refs.card.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.isSelected = select;
      });
    },
    isSelected(val) {
      const vm = this;
      const data = { id: val.dishId };
      const allId = [];
      // 不重複ID
      vm.select.forEach((ele) => {
        allId.push(ele.id);
      });
      if (!allId.includes(val.dishId)) {
        vm.select.push(data);
      }
    },
    unSelected(val) {
      const vm = this;
      vm.select.forEach((ele, index) => {
        if (ele.id === val.dishId) {
          vm.select.splice(index, 1);
        }
      });
    },
    onDetail(val) {
      const vm = this;
      window.localStorage.setItem('dishId', JSON.stringify(val.dishId));
      vm.$router.push({
        name: 'newdish',
        params: {
          dishId: val.dishId,
        },
      });
    },
    cleanSelectData() {
      const vm = this;
      vm.select = [];
      vm.param.dishId = '';
      vm.$refs.card.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.isSelected = false;
      });
      vm.checkbox.isCheck = !vm.checkbox.isCheck;
    },
  },
  watch: {
    state() {
      this.cleanSelectData();
    },
  },
};
</script>
<style scoped>
.form {
  background-color: #eaeaea;
  min-height: 100vh;
  padding: 0;
}
</style>
