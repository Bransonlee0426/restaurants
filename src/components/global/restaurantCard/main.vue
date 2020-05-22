<template>
  <div class="rest-card-wrap">
    <div class="rest-li">
      <div class="rest-card-li-first-row" @click="OnSelect">
        <label v-if="showCheckboxOrEdit === 'Checkbox'">
          <input type="checkbox" :value="itemData" @change="selectEmit" v-model="checked">
          <div class="show-box"></div>
        </label>
      </div>
      <div class="rest-card-li-name-row" @click="OnSelect">
        <span class="rest-id" style="display:none">{{itemData.restaurantId}}</span>
        <span class="rest-name">{{itemData.name}}</span>
      </div>
      <div class="rest-card-li-time-row" @click="OnSelect"></div>
      <fun-btn
        v-if="showCheckboxOrEdit === 'Edit'"
        class="edit-btn"
        type="edit"
        @click="editRestaurant()"/>
    </div>
  </div>
</template>

<script>
import funBtn from '@/components/global/functionBar/functionbtn.vue';

export default {
  name: 'restaurantCard',
  components: {
    funBtn,
  },
  data() {
    return {
      checked: false,
      restaurantId: this.itemData.restaurantId,
    };
  },
  props: {
    itemData: {},
    allChecked: {},
    state: {
      type: String,
      default: '',
    },
    showCheckboxOrEdit: {
      type: String,
      default: 'Edit',
    },
  },
  created() {},
  computed: {
    showMask() {
      return this.dark || this.select || this.mouseover;
    },
  },
  methods: {
    OnSelect() {
      const vm = this;
      if (vm.showCheckboxOrEdit === 'Edit') {
        vm.$router.push({
          name: 'dishlist',
        });
        vm.$store.dispatch('productIds/saveRestaurant',
          {
            id: vm.restaurantId,
            name: vm.itemData.name,
          });
      }
    },
    selectEmit() {
      const vm = this;
      vm.$emit('selection', vm.itemData.restaurantId, vm.checked);
    },
    editRestaurant() {
      const vm = this;
      vm.$emit('detail', vm.itemData);
    },
  },
  watch: {
    allChecked: {
      handler(val) {
        const vm = this;
        vm.checked = val.check;
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">

.rest-card-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.rest-li {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90px;
  border-top: 1px solid #cdcdcd;

  &:hover {
    background-color: #e1b58d;
  }

  .rest-card-li-first-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 0 15px;
    flex-grow: 1;

    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0px;
      position: relative;
      cursor: pointer;

      input {
        margin-bottom: 10px;
        cursor: pointer;
      }

      input:checked + .show-box {
        background: #005a4a;
      }

      .show-box {
        position: absolute;
        top: 0;
        left: 5;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        border: 1px solid #d8d8d8;
        background: white;

        &:before {
          content: "";
          position: absolute;
          top: 2px;
          left: 5px;
          width: 5px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }
    }

    span {
      width: 36px;
      height: 17px;
      font-size: 12px;
      color: #9b9b9b;
    }
  }

  .rest-card-li-name-row {
    font-family: PingFangTC,sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex-grow: 1;
    height: auto;

    .rest-name {
      height: 25px;
      font-size: 18px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
    }
  }

  .rest-card-li-time-row {
    flex-grow: 50;
  }

  .edit-btn {
    margin-right: 40px;
  }
}
</style>
