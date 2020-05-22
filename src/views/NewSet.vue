<template>
  <b-container fluid class="from">
    <b-row no-gutters>
      <b-col>
        <function-bar
          @save='OnSave'
          @preview='OnPreview'
          @cancel='OnCancel'
          pagename="Edit Dish Information"
          :edit_time='getEditTime'
          :btn_list='tool'></function-bar>
        <b-row no-gutters>
          <b-col>
            <info :set="setInfo" :autocompleteItems='tagList'></info>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <dishItem>
              <information-card isDelete
                         v-for='(item,key) in selectDish'
                         :key="key" :itemData='item'
                         @delete="onDelete"></information-card>
            </dishItem>
          </b-col>
        </b-row>
        <b-row no-gutters class="btn-box">
          <b-col>
            <b-btn @click="formList" class="btn">從菜單新增</b-btn>
            <b-btn @click="formNew" class="btn">新增新菜餚</b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <popup :type='popType' @ok='onCreateOk' @cancel='onCreateCancel'></popup>
  </b-container>
</template>

<script>
import info from '@/components/newset/SetInfo.vue';
import dishItem from '@/components/newset/DishItem.vue';
import tool from '@/toolbox/NewDish';

export default {
  name: 'newset',
  components: {
    info,
    dishItem,
  },
  props: {
    dishList: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tool,
      setInfo: {
        image: '',
        restaurantId: this.$store.state.productIds.restaurant.id,
        name: '',
        description: '',
        price: '',
        tags: '',
        dishId: '',
      },
      selectDish: [],
      tagList: [],
      api_getTagList: {},
      popType: '',
      showNotSave: true,
      setInfoCopy: {},
      selectDishCopy: [],
    };
  },
  created() {
    const vm = this;
    vm.api_getTagList = vm.api.getTagList((res) => {
      vm.tagList = res.data;
    });
  },
  mounted() {
    const vm = this;
    vm.$emit('setKeep', 'newset');
    vm.promiseAll(
      [vm.api_getTagList],
      () => {
        if (vm.id !== '') {
          vm.api.getSetDetail(
            {
              dishSetId: vm.id,
            },
            (res) => {
              vm.setInfo = res.data;
              vm.formatToCardInfo(res.data.dishes);
              vm.setInfoCopy = vm.copyData(vm.setInfo);
              vm.selectDishCopy = vm.copyData(vm.selectDish);
            },
          );
        } else {
          vm.setInfoCopy = vm.copyData(vm.setInfo);
          vm.selectDishCopy = vm.copyData(vm.selectDish);
        }
      },
    );
  },
  computed: {
    getEditTime() {
      const timeMessage = '建立時間:';
      return timeMessage + this.$moment(new Date()).format('YYYY/MM/DD hh:mm');
    },
  },
  methods: {
    OnSave() {
      const vm = this;
      vm.setDishId();
      if (vm.setInfo.dishSetId !== undefined) {
        // 編輯
        const param = new window.FormData();
        param.append('dishSetId', vm.setInfo.dishSetId);
        param.append('restaurantId', vm.setInfo.restaurantId);
        param.append('name', vm.setInfo.name);
        param.append('description', vm.setInfo.description);
        param.append('price', vm.setInfo.price);
        param.append('tags', vm.setInfo.tags);
        const isEmpty = vm.isDataEmpty(param);
        if (isEmpty) {
          const msgContent = vm.msgContent('inputEmpty');
          this.alert(msgContent);
          return;
        }
        param.append('image', vm.setInfo.image);
        param.append('dishId', vm.setInfo.dishId);
        vm.api.updateSetDetail(
          param,
          () => {
            vm.showNotSave = false;
            vm.showPopup('set-update');
          },
        );
      } else {
        // 創建
        const param = new window.FormData();
        param.append('restaurantId', vm.setInfo.restaurantId);
        param.append('name', vm.setInfo.name);
        param.append('description', vm.setInfo.description);
        param.append('price', vm.setInfo.price);
        param.append('tags', vm.setInfo.tags);
        param.append('image', vm.setInfo.image);
        const isEmpty = vm.isDataEmpty(param);
        if (isEmpty) {
          const msgContent = vm.msgContent('inputEmpty');
          this.alert(msgContent);
          return;
        }
        param.append('dishId', vm.setInfo.dishId);
        vm.api.creatSet(
          param,
          () => {
            vm.showNotSave = false;
            vm.showPopup('created-set');
          },
        );
      }
    },
    setDishId() {
      this.setInfo.dishId = '';
      this.selectDish.forEach((select) => {
        this.setInfo.dishId += `${select.dish_id},`;
      });
      this.setInfo.dishId = this.setInfo.dishId.substring(
        0,
        this.setInfo.dishId.length - 1,
      );
    },
    onDelete(val) {
      this.selectDish = this.selectDish.filter(item => item !== val);
    },
    formList() {
      const vm = this;
      vm.$router.push({
        name: 'selectdish',
        params: {
          selectDish: this.selectDish,
        },
      });
    },
    formNew() {
      this.$router.push('newdish');
    },
    OnPreview() {
    },
    OnCancel() {
      this.$router.go('-1');
    },
    onCreateOk() {
      const vm = this;
      if (vm.poptype === 'set-update') {
        vm.$router.push('setlist');
      } else {
        vm.$router.go('0');
      }
    },
    onCreateCancel() {
      const vm = this;
      if (vm.poptype === 'created-set') {
        vm.$router.push('setlist');
      } else {
        vm.$router.go('0');
      }
    },
    formatToCardInfo(val) {
      val.forEach((ele) => {
        const cardinfo = {
          name: ele.dish_name,
          price: ele.dish_price,
          restaurant_id: this.setInfo.restaurantId,
          dish_id: ele.dish_id,
          type: ele.dish_type_text,
        };
        this.selectDish.push(cardinfo);
      });
    },
  },
  watch: {
    dishList(val) {
      val.forEach((data) => {
        const index = this.selectDish.findIndex(
          ele => ele.dish_id === data.dish_id,
        );
        if (index === -1) {
          this.selectDish.push(data);
        }
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    if (to.path !== '/selectdish' && to.path !== '/newdish') {
      if (vm.showNotsave) {
        const setData = {
          lastSetData: vm.setInfo,
          dataCopy: vm.setInfoCopy,
        };
        const dishSelect = {
          lastSetData: vm.selectDish,
          dataCopy: vm.selectDishCopy,
        };
        if (!vm.checkUpdata(setData) && !vm.checkUpdata(dishSelect)) {
          next();
        } else {
          vm.$bvModal
            .msgBoxConfirm('資料尚未儲存，確定要離開嗎', {
              modalClass: 'notsave-modal',
              title: ' ',
              okTitle: '確定',
              cancelTitle: '取消',
              hideHeaderClose: false,
              centered: true,
            })
            .then((value) => {
              if (value) {
                next();
              } else {
                next(false);
              }
            });
        }
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
</script>


<style scoped>
.from {
  background-color: #eaeaea;
  padding: 0;
}

.btn-box {
  text-align: center;
  height: 30vh;
}

.btn {
  width: 240px;
  height: 44px;
  border-radius: 22px;
  border: none !important;
  box-shadow: none !important;
  background-color: #daa270;
  margin: 50px;
  font-family: PingFangTC,serif;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
}

.btn:hover {
  background-color: #e1b58d;
}

.btn:active {
  background-color: #ce8d53 !important;
}
</style>
