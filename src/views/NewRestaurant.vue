<template>
  <b-container fluid class="form">
    <b-row no-gutters>
      <b-col>
        <function-bar @save='OnSave'
                      @preview='OnPreview'
                      @cancel='OnCancel'
                      pagename="Add Restaurant Information"
                      :edit_time='getEditTime'
                      :btn_list='tool'></function-bar>
        <b-row no-gutters>
          <b-col>
            <info :restaurant="restaurant"
                  v-model="restaurant.images"
                  :zips="zip"
                  :cities="city"
                  :districts="district"
                  @handleImage="handleImage"
                  ></info>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <popup :type='popType' @ok='onCreateOk' @cancel='onCreateCancel'></popup>
  </b-container>
</template>

<script>
import info from '@/components/newrestaurant/RestaurantInfo.vue';
import tool from '@/toolbox/NewDish';
import zipCodes from '@/assets/zipcodes.json';

export default {
  components: {
    info,
  },
  data() {
    return {
      tool,
      zipCodes,
      restaurantId: this.$store.state.productIds.restaurant.id,
      isCreateRestaurant: JSON.parse(window.localStorage.getItem('isCreateRestaurant')),
      restaurant: {
        ownerId: this.$store.state.userInfo.ownerId,
        restaurantId: '',
        name: '',
        zip: '',
        city: '',
        area: '',
        address: '',
        website: '',
        phone: '',
        longitude: 0,
        latitude: 0,
        star: 0,
        description: '',
        images: '',
      },
      zip: [],
      city: [],
      district: [],
      popType: '',
      showNotSave: true,
      restaurantCopy: {},
      restaurantCopyForArea: {},
      tempArea: '',
      newImage: {},
    };
  },
  computed: {
    getEditTime() {
      const timeMessage = '建立時間:';
      return timeMessage + this.$moment(new Date()).format('YYYY/MM/DD hh:mm');
    },
  },
  created() {
    // 初使化city
    const vm = this;
    const set = new Set();
    vm.city = vm.zipCodes.zipData.filter(
      item => (!set.has(item.city) ? set.add(item.city) : false),
    );
    if (!vm.isCreateRestaurant) {
      vm.$restaurant.GetOne(
        {
          restaurantId: vm.restaurantId,
        },
        (res) => {
          vm.restaurantCopy = vm.copyData(res.data);
          vm.restaurantCopyForArea = vm.copyData(res.data);
          vm.tempArea = res.data.area;
          vm.restaurantCopyForArea.area = '';
          vm.restaurant = vm.restaurantCopyForArea;
          // 顯示Area,City 跟 Area 分開塞入值
          this.$nextTick(() => {
            vm.restaurant.area = vm.tempArea;
          });
        },
      );
    } else {
      vm.restaurantCopy = vm.copyData(vm.restaurant);
    }
  },
  methods: {
    handleImage(image) {
      const vm = this;
      vm.newImage = image;
    },
    OnSave() {
      const param = new window.FormData();
      const vm = this;

      param.set('ownerId', vm.restaurant.ownerId);
      param.set('name', vm.restaurant.name);
      param.set('zip', vm.restaurant.zip);
      param.set('city', vm.restaurant.city);
      param.set('area', vm.restaurant.area);
      param.set('address', vm.restaurant.address);

      if (vm.newImage.name) {
        if (vm.restaurant.images && vm.restaurant.images !== []) {
          // 如果有照片刪除舊照
          const deleteImages = [];
          vm.restaurant.images.forEach((ele) => {
            deleteImages.push(ele);
          });
          param.set('deleteImages', JSON.stringify(deleteImages));
        }
        param.set('images', vm.newImage);
      } else if (!vm.newImage.name && vm.isCreateRestaurant) {
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
      param.set('description', vm.restaurant.description);
      param.set('website', vm.restaurant.website);
      param.set('phone', vm.restaurant.phone);
      param.set('star', vm.restaurant.star);
      if (vm.checkLonLat()) {
        return;
      }
      param.set('longitude', vm.restaurant.longitude);
      param.set('latitude', vm.restaurant.latitude);

      if (vm.isCreateRestaurant) {
        vm.$restaurant.Create(
          param,
          () => {
            vm.showNotSave = false;
            vm.showPopup('created-restaurant');
          },
        );
      } else {
        param.set('restaurantId', vm.restaurant.restaurantId);
        vm.$restaurant.Update(
          param,
          () => {
            vm.showNotSave = false;
            vm.showPopup('restaurant-update');
          },
        );
      }
    },
    checkLonLat() {
      const vm = this;
      let stop = false;
      const lon = vm.restaurant.longitude;
      const lat = vm.restaurant.latitude;
      if (lon || lat) {
        // edit空值會回傳null，把它預設為0
        if (lon === null) {
          vm.restaurant.longitude = 0;
        } else if (lat === null) {
          vm.restaurant.latitude = 0;
        }
        // 經緯度範圍
        if (lon < -180 || lon > 180) {
          stop = true;
          // eslint-disable-next-line no-alert
          alert('請檢查經度範圍為 -180 ~ 180');
        }
        if (lat < -90 || lat > 90) {
          stop = true;
          // eslint-disable-next-line no-alert
          alert('請檢查緯度範圍為 -90 ~ 90');
        }
      }
      return stop;
    },
    OnPreview() {

    },
    OnCancel() {
      const vm = this;
      vm.$router.go('-1');
    },
    onCreateOk() {
      const vm = this;
      if (vm.popType === 'restaurant-update') {
        vm.$router.push('restaurant');
      } else {
        vm.$router.go('0');
      }
    },
    onCreateCancel() {
      this.$router.go('-1');
    },
    selectedCity(myCity) {
      this.district = this.zipCodes.zipData.filter(
        item => myCity === item.city,
      );
    },
    selectedArea(myArea) {
      this.zip = this.zipCodes.zipData.filter(
        item => myArea === item.district && this.restaurant.city === item.city,
      );
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'restaurant.city': function (newValue) {
      this.selectedCity(newValue);
    },
    // eslint-disable-next-line func-names
    'restaurant.area': function (newValue) {
      this.selectedArea(newValue);
    },
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    if (vm.showNotSave) {
      const restaurantData = {
        lastSetData: vm.restaurant,
        dataCopy: vm.restaurantCopy,
      };
      if (vm.checkUpdata(restaurantData)) {
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
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
</script>


<style scoped lang="scss">
.form {
  background-color: #eaeaea;
  padding: 0;
  height: 100vh;
}
</style>
