<template>
  <b-container fluid class="form">
    <b-row no-gutters>
      <b-col>
        <function-bar
          @save='OnSave'
          @cancel='OnCancel'
          pagename="Add Dish Information"
          :edit_time='getEditTime'
          :btn_list='tool'></function-bar>
        <info :infoData='data'
              :tagCategories="tagCategories"
              v-model="data.images"
              @handleImage="handleImage"/>
      </b-col>
    </b-row>
    <popup :type='popType' @ok='onCreateOk' @cancel='onCreateCancel'></popup>
  </b-container>
</template>

<script>
import info from '@/components/newdish/DishInfomation.vue';
import tool from '@/toolbox/NewDish';

export default {
  name: 'newdish',
  components: {
    info,
  },
  props: {},
  data() {
    return {
      tool,
      dishId: JSON.parse(window.localStorage.getItem('dishId')),
      data: {
        description: '',
        dishId: '',
        images: '',
        keywords: '',
        mealtime: 0,
        name: '',
        price: '',
        restaurantId: this.$store.state.productIds.restaurant.id,
        tags: [],
      },
      keyWordList: [],
      tagCategories: [],
      popType: '',
      api_getTagList: {},
      api_getKeyWordList: {},
      showNotSave: true,
      dataCopy: {},
      newImage: {},
    };
  },
  created() {
    const vm = this;
    vm.api_getTagList = vm.$tagCategories.GetAll((res) => {
      vm.tagCategories = res.data;
    });
    vm.api_getKeyWordList = vm.$keyCategories.GetAll((res) => {
      this.keyWordList = res.data;
    });
    vm.promiseAll(
      [vm.api_getTagList, vm.api_getKeyWordList],
      () => {
        if (vm.dishId) {
          vm.$dish.GetOne(
            {
              dishId: this.dishId,
            },
            (res) => {
              vm.data = res.data;
              vm.dataCopy = vm.copyData(vm.data);
            },
          );
        } else {
          vm.dataCopy = vm.copyData(vm.data);
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
  mounted() {},
  methods: {
    handleImage(image) {
      const vm = this;
      vm.newImage = image;
    },
    OnSave() {
      const param = new window.FormData();
      const vm = this;
      param.set('restaurantId', vm.data.restaurantId);
      param.set('name', vm.data.name);
      param.set('tags', JSON.stringify(vm.data.tags));
      param.set('mealtime', vm.data.mealtime);
      if (vm.newImage.name) {
        if (vm.data.images && vm.data.images !== []) {
          // 如果有照片刪除舊照
          const deleteImages = [];
          vm.data.images.forEach((ele) => {
            deleteImages.push(ele);
          });
          param.set('deleteImages', JSON.stringify(deleteImages));
        }
        param.set('images', vm.newImage);
      } else if (!vm.newImage.name && !vm.dishId) {
        // 新增時沒放圖片不給過
        const msgContent = this.msgContent('inputEmpty');
        // eslint-disable-next-line no-alert
        alert(msgContent);
        return;
      }

      const isEmpty = this.isDataEmpty(param);
      if (isEmpty) {
        const msgContent = this.msgContent('inputEmpty');
        // eslint-disable-next-line no-alert
        alert(msgContent);
        return;
      }
      // 選填
      param.set('description', vm.data.description);
      param.set('price', vm.data.price);
      if (!this.dishId) {
        this.$dish.Create(
          param,
          () => {
            this.showNotSave = false;
            this.showPopup('created-dish');
          },
        );
      } else {
        param.set('dishId', vm.data.dishId);
        this.$dish.Update(
          param,
          () => {
            this.showNotSave = false;
            this.showPopup('dish-update');
          },
        );
      }
    },
    onCreateOk() {
      const vm = this;
      if (vm.popType === 'dish-update') {
        vm.$router.push('dishlist');
      } else {
        vm.$router.go('0');
      }
    },
    onCreateCancel() {
      this.$router.go('-1');
    },
    OnPreview() {
    },
    OnCancel() {
      this.$router.go('-1');
    },
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    if (vm.showNotSave) {
      const dishData = {
        lastSetData: vm.data,
        dataCopy: vm.dataCopy,
      };
      if (vm.checkUpdata(dishData)) {
        this.$bvModal
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
          })
          .catch(() => {
          });
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
.form {
  background-color: #eaeaea;
  height: 100vh;
  padding: 0;
}
</style>
