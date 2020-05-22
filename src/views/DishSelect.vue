<template>
  <b-container fluid class="from">
    <b-row no-gutters>
      <b-col>
        <function-bar
          @save='OnSave'
          @cancel="OnCancel"
          pagename="Dish List"
          edit_time='最後編輯時間:'
          :btn_list='tool'></function-bar>
      </b-col>
    </b-row>
    <b-row no-gutters class="ml-5 mr-5 mt-5">
      <b-col>
        <h1 class="title">菜餚清單</h1>
        <b-form-checkbox
          @change="allCheck"
          v-model="allSelected"
          class="mr-4">
          {{allSelected? '取消全選':'全選' }}
        </b-form-checkbox>
        <b-card-group>
          <information-card isSelectType
                     ref='card'
                     v-for='(item,key) in dishItem'
                     :key="key"
                     :itemData='item'
                     @isSelected="isSelected"
                     @unSelected="unSelected">
          </information-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    selectDish: {},
  },
  data() {
    return {
      tool: [
        {
          type: 'cancel',
          event: 'cancel',
        },
        {
          type: 'save',
          event: 'save',
        },
      ],
      dishItem: {},
      allDishItems: {},
      filterDishItem: {},
      selectDishes: this.$route.params.selectDish,
      restaurantId: this.$store.state.productIds.restaurant.id,
      allSelected: false,
      select: [],
    };
  },
  mounted() {
    const vm = this;
    vm.api.getDishList(
      {
        restaurantId: vm.restaurantId,
      },
      (res) => {
        vm.allDishItems = res.data.on;
        vm.allDishItems = vm.allDishItems.concat(res.data.off);
        vm.checkSelectList();
        vm.dishItem = vm.filterDishItem;
      },
    );
  },
  methods: {
    OnSave() {
      this.$router.replace({
        name: 'newset',
        params: {
          dishList: this.select,
        },
      });
    },
    OnCancel() {
      const vm = this;
      vm.$router.go('-1');
    },
    isSelected(val) {
      const vm = this;
      vm.select.push(val);
      vm.select = Array.from(new Set(vm.select));
    },
    unSelected(val) {
      const vm = this;
      vm.select = vm.select.filter(item => item !== val);
    },
    allCheck() {
      const vm = this;
      vm.dishitem.forEach((ele) => {
        if (!vm.allSelected) {
          vm.isSelected(ele);
        } else {
          vm.unSelected(ele);
        }
      });
      this.$refs.card.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.isSelected = !vm.allSelected;
      });
    },
    checkSelectList() {
      const vm = this;
      const allId = [];
      const selectId = [];
      // 過濾已選的菜餚不出現在菜餚清單內
      vm.allDishItems.forEach((dish) => {
        allId.push(dish.dish_id);
      });
      vm.selectDishes.forEach((dish) => {
        selectId.push(dish.dish_id);
      });
      const filter = allId.filter(ele => !selectId.includes(ele));
      vm.filterDishItem = vm.allDishItems.filter(ele => filter.includes(ele.dish_id));
    },
  },
};
</script>

<style scoped>
.from {
  background-color: #eaeaea;
  min-height: 100vh;
  padding: 0;
}

.title {
  width: 88px;
  height: 30px;
  font-family: PingFangTC,serif;
  font-size: 22px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #005a4a;
}
</style>
