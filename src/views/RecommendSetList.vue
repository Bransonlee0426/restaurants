<template>
  <b-container class="container">
    <b-row>
      <b-col cols="4">
        <b-form-input
          v-model="searchText"
          placeholder="請輸入套餐名稱關鍵字"
          @keyup.enter.native="doFilter">
        </b-form-input>
      </b-col>
    </b-row>
    <b-row class="pl-3 pr-3 pt-3">
      <b-table id="table"
               :fields="fields"
               :items="filterItems"
               :per-page="perPage"
               :current-page="currentPage" striped>
        <template v-slot:cell(功能)="row">
          <b-button size="sm" @click="editPage(row)" class="mr-2" variant="primary">編輯</b-button>
        </template>
      </b-table>
    </b-row>
    <b-row>
      <b-col class="pr-0 pl-3" cols="2">
        <p class="mt-2">共有{{rows}}筆資料</p>
      </b-col>
      <b-col class="pr-3 pl-0" cols="2">
        <b-form-select
          v-model="perPage"
          @change="handlerPerpage"
          :options="options">
        </b-form-select>
      </b-col>
      <b-col cols="auto">
        <b-pagination v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      aria-controls="table"
                      @change="handleCurrentPage"
                      hide-goto-end-buttons></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'recommendSetList',
  data() {
    return {
      perPage: this.$store.state.setting.recommendSetListPerpage,
      currentPage: 1,
      setCurrentPage: this.$store.state.setting.recommendSetListCurrentPage,
      restaurantId: this.$store.state.productIds.restaurant.id,
      restaurantName: this.$store.state.productIds.restaurant.name,
      fields: [
        {
          key: '餐廳名稱',
        },
        {
          key: '推薦套餐名稱',
        },
        {
          key: '最後編輯時間',
        },
        {
          key: '狀態',
        },
        {
          key: '功能',
        },
      ],
      recommendDish: [],
      filterItems: [],
      allDishes: [],
      onStoreArray: [],
      offStoreArray: [],
      options: [{ value: 5, text: '5筆/頁' }, { value: 10, text: '10筆/頁' }],
      searchText: this.$store.state.setting.recommendSetListSearchText,
    };
  },
  created() {
    const vm = this;
    vm.$dishSetNutritionist.GetAll(
      {
        restaurantId: vm.restaurantId,
      },
      (res) => {
        // 分別檢查data內on跟off並push到要用的陣列上
        Object.entries(res.data).forEach((ele) => {
          vm.concatDishes(ele[1]);
        });
      }, (err) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      },
    );
  },
  mounted() {
    const vm = this;
    vm.filterItems = vm.recommendDish;
  },
  computed: {
    rows() {
      const vm = this;
      return vm.filterItems.length;
    },
  },
  methods: {
    handleCurrentPage(currentPage) {
      const vm = this;
      vm.$store.dispatch('setting/setRecommendSetListCurrentPage', {
        currentPage,
      });
    },
    handlerPerpage(perPage) {
      const vm = this;
      vm.$store.dispatch('setting/setRecommendSetListPerpage', {
        perPage,
      });
    },
    concatDishes(dishArray) {
      const vm = this;
      if (dishArray === null) {
        return;
      }
      dishArray.forEach((ele) => {
        const dishData = {
          dishSetId: ele.dishSetId,
          餐廳名稱: vm.restaurantName,
          推薦套餐名稱: ele.name,
          最後編輯時間: '',
          狀態: ele.status === 0 ? '下架' : '上架',
        };
        vm.recommendDish.push(dishData);
      });
      vm.$nextTick(() => {
        vm.currentPage = vm.setCurrentPage;
      });
      vm.doFilter();
    },
    editPage(rowData) {
      const vm = this;
      window.localStorage.setItem('dishSetId', JSON.stringify(rowData.item.dishSetId));
      vm.$router.push({ name: 'newRecommendSet', params: rowData.item });
    },
    doFilter() {
      const vm = this;
      // 搜尋套餐名稱
      if (vm.searchText !== '') {
        vm.filterItems = [];
        vm.recommendDish.forEach((ele) => {
          if (ele.推薦套餐名稱.search(vm.searchText.trim()) !== -1) vm.filterItems.push(ele);
        });
      } else {
        vm.filterItems = vm.recommendDish;
      }
    },
  },
  watch: {
    searchText: {
      handler(searchText) {
        const vm = this;
        vm.$store.dispatch('setting/setRecommendSetListSearchText', {
          searchText,
        });
        vm.doFilter();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  margin:10px 0px 0px 0px;
  ::v-deep .table td{
    vertical-align: middle;
  }
}

</style>
