<template>
  <b-container fluid class="form">
    <b-row no-gutters>
      <b-col>
        <function-bar @save='OnSave'
                      @cancel='OnCancel'
                      pagename="Edit recommendSet"
                      :edit_time='getEditTime'
                      :btn_list='tool'></function-bar>
        <b-row no-gutters>
          <b-col>
            <editRecommend
              :dishData='dishData'
              :tagCategories="tagCategories"
              @handleStatus="handleStatus"
              @handleImage="handleImage">
            </editRecommend>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <popup :type='popType' @ok='onCreateOk' @cancel='onCreateCancel'></popup>
  </b-container>
</template>

<script>
import tool from '@/toolbox/NewDish';
import editRecommend from '@/components/editrecommend/recommendinfo.vue';

export default {
  components: {
    editRecommend,
  },
  data() {
    return {
      tool,
      dishSetId: JSON.parse(window.localStorage.getItem('dishSetId')),
      dishData: {
        dishSetId: this.dishSetId,
        restaurantId: '',
        tags: [],
        keywords: [],
        images: '',
        mealtime: '',
        price: '',
        comments: '',
        name: '',
      },
      popType: '',
      tagCategories: [],
      restaurantName: '',
      status: 0,
      mealtime: 0, // 空值為undefined
      image: {},
      api_tagCategories: {},
      api_updataStatusFun: {},
    };
  },
  created() {
    const vm = this;
    vm.restaurantName = vm.$route.params.餐廳名稱;
    vm.api_tagCategories = vm.$tagCategories.GetAll(
      (res) => {
        vm.tagCategories = res.data;
      }, (err) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      },
    );
    vm.promiseAll(
      [vm.api_tagCategories],
      () => {
        vm.$dishSetNutritionist.GetOne(
          {
            dishSetId: vm.dishSetId,
          },
          (res) => {
            vm.dishData = res.data;
            vm.dishData.restaurantName = vm.$route.params.餐廳名稱;
          },
          (err) => {
            // eslint-disable-next-line no-console
            console.log('err', err);
          },
        );
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      },
    );
  },
  mounted() {
  },
  computed: {
    getEditTime() {
      const timeMessage = '建立時間:';
      return timeMessage + this.$moment(new Date()).format('YYYY/MM/DD hh:mm');
    },
  },
  methods: {
    onCreateOk() {
      const vm = this;
      vm.$router.push({ name: 'recommendSetList' });
    },
    onCreateCancel() {
      const vm = this;
      vm.$router.push({ name: 'recommendSetList' });
    },
    handleImage(image) {
      const vm = this;
      vm.image = image;
    },
    handleStatus(status) {
      const vm = this;
      vm.status = status;
      vm.dishData.status = status;
    },
    updataStatusFun() {
      const vm = this;
      const formatDishSetId = [
        { id: vm.dishSetId },
      ];
      const updataStatus = {
        active: '',
        dishSetId: JSON.stringify(formatDishSetId),
      };
      if (vm.status === 1) {
        updataStatus.active = 'on';
      } else {
        updataStatus.active = 'off';
      }

      vm.api_updataStatusFun = vm.$dishSetNutritionist.UpdateStatus(
        updataStatus,
        () => {
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log('err', err);
        },
      );
    },
    updataDish() {
      const vm = this;
      const param = new window.FormData();

      param.set('dishSetId', vm.dishData.dishSetId);
      param.set('restaurantId', vm.dishData.restaurantId);
      param.set('tags', JSON.stringify(vm.dishData.tags));
      param.set('mealtime', vm.dishData.mealtime);
      param.set('name', vm.dishData.name);

      // 判斷是否有更新圖片
      if (vm.image.name) {
        // 如果有照片刪除舊照
        if (vm.dishData.images) {
          const deleteImages = [];
          vm.dishData.images.forEach((ele) => {
            deleteImages.push(ele);
          });
          param.set('deleteImages', JSON.stringify(deleteImages));
        }
        param.set('images', vm.image);
      }

      // 檢查空值
      if (vm.isDataEmpty(param)) {
        const msgContent = this.msgContent('inputEmpty');
        // eslint-disable-next-line no-alert
        alert(msgContent);
        return;
      }

      // 選填
      param.set('price', vm.dishData.price);
      param.set('comments', vm.dishData.comments);

      vm.$dishSetNutritionist.Update(
        param,
        () => {
          vm.showPopup('recommendSet-update');
        }, (err) => {
          // eslint-disable-next-line no-console
          console.log('err', err);
        },
      );
    },
    OnSave() {
      const vm = this;
      vm.updataStatusFun();
      vm.promiseAll(
        [vm.api_updataStatusFun],
        () => {
          vm.updataDish();
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log('err', err);
        },
      );
    },
    OnCancel() {
      const vm = this;
      vm.$router.push({ name: 'recommendSetList' });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  background-color: #eaeaea;
  padding: 0;
  color: #4a4a4a;
}
</style>
