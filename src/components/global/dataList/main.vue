<template>
  <b-row class="data-list" no-gutters>
    <b-col>
      <b-row no-gutters class="mb-5">
        <b-col v-if="isSelectType">
          <b-row class="mb-3" no-gutters>
            <b-col class="nowType">{{nowType}}</b-col>
          </b-row>
          <b-form-checkbox @input="allCheck" v-model="allSelected" class="mr-4">{{allSelected?
            '取消全選':'全選' }}</b-form-checkbox>
        </b-col>
        <b-col v-else class="select-type" >
          <b-btn @click='showAll' :class="showAllClass">全部</b-btn> /
          <b-btn @click='showOnStore' :class="showOnStoreClass">已上架</b-btn> /
          <b-btn @click='showOffStore' :class="showOffStoreClass">未上架</b-btn>
        </b-col>
      </b-row>
      <b-row v-if='isShowOnStore' class="mb-5">
        <b-col>
          <h6 v-if="!isSelectType" class="title">已上架</h6>
          <slot name="on"></slot>
        </b-col>
      </b-row>
      <b-row v-if='isShowOffStore'>
        <b-col>
          <h6 v-if="!isSelectType" class="title">未上架</h6>
          <slot name="off"></slot>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'dataList',
  props: {
    state: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      showAllClass: {
        tabBtn: true,
        tabBtnFocus: false,
      },
      showOnStoreClass: {
        tabBtn: true,
        tabBtnFocus: false,
      },
      showOffStoreClass: {
        tabBtn: true,
        tabBtnFocus: false,
      },
      allSelected: false,
      isShowOnStore: true,
      isShowOffStore: true,
      isSelectType: false,
      pagePath: this.$route.path,
      nowType: '未上架',
    };
  },
  methods: {
    showAll() {
      const vm = this;
      // 顯示的列表
      vm.isShowOnStore = true;
      vm.isShowOffStore = true;
      vm.isSelectType = false;
      // 綠字 focus
      vm.showAllClass.tabBtnFocus = true;
      vm.showOnStoreClass.tabBtnFocus = false;
      vm.showOffStoreClass.tabBtnFocus = false;
      vm.setListStatus('default');
    },
    showOnStore() {
      const vm = this;
      // 顯示的列表
      vm.isShowOnStore = true;
      vm.isShowOffStore = false;
      vm.allSelected = false;
      // 綠字 focus
      vm.showAllClass.tabBtnFocus = false;
      vm.showOnStoreClass.tabBtnFocus = true;
      vm.showOffStoreClass.tabBtnFocus = false;
      vm.setListStatus('offstore');
    },
    showOffStore() {
      const vm = this;
      // 顯示的列表
      vm.isShowOnStore = false;
      vm.isShowOffStore = true;
      vm.allSelected = false;
      // 綠字 focus
      vm.showAllClass.tabBtnFocus = false;
      vm.showOnStoreClass.tabBtnFocus = false;
      vm.showOffStoreClass.tabBtnFocus = true;
      vm.setListStatus('onstore');
    },
    setListStatus(state) {
      const vm = this;
      if (vm.state === 'default') {
        switch (vm.pagePath) {
          case '/restaurant':
            vm.$store.dispatch('setting/setRestaurantListStatus', {
              restaurantListStatus: state,
            });
            break;
          case '/dishlist':
            vm.$store.dispatch('setting/setDishListStatus', {
              dishListStatus: state,
            });
            break;
          default:
            break;
        }
      }
    },
    showListStatus(ListStatus) {
      const vm = this;
      switch (ListStatus) {
        case 'onstore':
          vm.showOffStore();
          break;
        case 'offstore':
          vm.showOnStore();
          break;
        case 'delete':
          vm.showOffStore();
          break;
        default:
          vm.showAll();
          break;
      }
    },
    allCheck() {
      const vm = this;
      vm.$emit('allSelected', vm.allSelected, vm.state);
    },
  },
  watch: {
    state: {
      immediate: true,
      handler(val) {
        const vm = this;
        const { restaurantListStatus } = vm.$store.state.setting;
        const { dishListStatus } = vm.$store.state.setting;
        vm.isSelectType = true;
        switch (val) {
          case 'onstore':
            vm.nowType = '未上架';
            vm.showOffStore();
            break;
          case 'offstore':
            vm.nowType = '已上架';
            vm.showOnStore();
            break;
          case 'delete':
            vm.nowType = '未上架';
            vm.showOffStore();
            break;
          default:
            vm.isSelectType = false;
            switch (vm.pagePath) {
              case '/restaurant':
                vm.showListStatus(restaurantListStatus);
                break;
              case '/dishlist':
                vm.showListStatus(dishListStatus);
                break;
              default:
                break;
            }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.tabBtn {
  background: none;
  border: none;
  color: #9b9b9b;
  font-size: 22px;
  font-weight: 500;
  padding: 0;
  vertical-align: text-bottom;
  font-family: PingFangTC,sans-serif !important;
  box-shadow: none !important;
  &:hover{
    color: #005a4a;
    background: none;
    border: none;
  }
  &:focus{
    color: #005a4a;
    background-color: transparent;
  }
}
  .tabBtnFocus{
      color: #005a4a;
      background-color: transparent;
      border: none;
  }

.select-type{
  color: #000000;
  font-size: 26px;
  font-weight: 500;
}

.data-list {
  padding: 60px 60px 10px;
}

.title {
  font-family: PingFangTC,sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 16px;
  color: #000000;
}

.nowType {
  font-family: PingFangTC,sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: #005a4a;
}
</style>
