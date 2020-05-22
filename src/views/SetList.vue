<template>
  <b-container fluid class="from">
    <b-row no-gutters>
      <b-col>
        <function-bar
          pagename="Set List"
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
      <b-card-group :slot="key" v-for='(group,key) in setItem' :key="key">
        <information-card ref='card'
                   :isSelectType="isSelectType"
                   v-for='(item,index) in group'
                   :key="index" :itemData='item'
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
  name: 'setlist',
  props: {},
  data() {
    return {
      tool: tool.tool,
      state: 'default',
      isSelectType: false,
      setItem: {},
      restaurantId: this.$store.state.productIds.restaurant.id,
      param: {
        active: '',
        dishSetId: '',
      },
      select: [],
      popType: '',
      checkbox: {
        isCheck: false,
      },
    };
  },
  mounted() {
    const vm = this;
    vm.$emit('removeKeep', 'newset');
    vm.$dishSet.GetAll(
      {
        restaurantId: vm.restaurantId,
      },
      (res) => {
        vm.setItem = res.data;
      },
    );
  },
  methods: {
    onAddClick() {
      this.$router.push('newset');
    },
    onOnStoreClick() {
      if (!this.isSelectType) {
        this.switchType('onstore');
      } else if (this.select.length !== 0) {
        this.showPopup('select-on-store-set');
      }
    },
    onOffStoreClick() {
      if (!this.isSelectType) {
        this.switchType('offstore');
      } else if (this.select.length !== 0) {
        this.showPopup('select-off-store-set');
      }
    },
    onDeleteClick() {
      if (!this.isSelectType) {
        this.switchType('delete');
      } else if (this.select.length !== 0) {
        this.showPopup('delete-set');
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
      this.api.updateSetStatus(
        this.param,
        () => {
          switch (this.param.active) {
            case 'on':
              this.showPopup('on-store-set');
              break;
            case 'off':
              this.showPopup('off-store-set');
              break;
            case 'delete':
              this.showPopup('delete-successful-set');
              break;
            default:
              break;
          }
        },
        () => {},
      );
    },
    onStoreOk() {
      switch (this.popType) {
        case 'select-on-store-set':
        case 'select-off-store-set':
        case 'delete-set':
          this.select.forEach((select) => {
            this.param.dishSetId += `${select},`;
          });
          this.param.dishSetId = this.param.dishSetId.substring(
            0,
            this.param.dishSetId.length - 1,
          );
          this.updateStatus();
          break;
        default:
          this.api.getSetList(
            {
              restaurantId: this.restaurantId,
            },
            (res) => {
              this.setItem = res.data;
              this.cleanSelectData();
            },
          );
          break;
      }
    },
    onAllSelected(select) {
      if (this.state === 'onstore' || this.state === 'delete') {
        this.setItem.off.forEach((ele) => {
          this.allSelect(ele, select);
        });
      } else {
        this.setItem.on.forEach((ele) => {
          this.allSelect(ele, select);
        });
      }
    },
    allSelect(val, select) {
      if (!select) {
        this.isSelected(val);
      } else {
        this.unSelected(val);
      }
      this.$refs.card.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.isSelected = !select;
      });
    },
    isSelected(val) {
      this.select.push(val.id);
    },
    unSelected(val) {
      this.select = this.select.filter(item => item !== val.id);
    },
    onDetail(val) {
      this.$router.push({
        name: 'newset',
        params: {
          id: val.id,
        },
      });
    },
    cleanSelectData() {
      const vm = this;
      vm.select = [];
      vm.param.dishSetId = '';
      vm.$refs.card.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.isSelected = false;
      });
      vm.checkbox.isCheck = !vm.checkbox.isCheck;
    },
  },
  watch: {
    state() {
      const vm = this;
      vm.cleanSelectData();
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
</style>
