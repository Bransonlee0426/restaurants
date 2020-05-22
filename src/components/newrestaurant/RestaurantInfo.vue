<template>
  <b-card no-body class="m-5 p-5">
    <h1 class="card-title mb-1">餐廳基本資料</h1>
    <hr class="line mb-5" />
    <b-row class='card-content px-5'>
      <b-col>
        <prompt-input title="Restaurant Name*"
                       placeholder='餐廳名稱'
                       v-model='restaurant.name'
                       class="mb-3"></prompt-input>
        <h3 class="form-title">Restaurant Address*</h3>
        <b-row class="mb-1">
          <b-col cols="4">
            <prompt-dropdown :items="cities"
                             placeholder="City"
                             v-model="restaurant.city"
                             :returnID="false"
                             displayKey="city">
            </prompt-dropdown>
          </b-col>
          <b-col cols="5">
            <prompt-dropdown :items="districts"
                             placeholder="District"
                             v-model="restaurant.area"
                             :right="true"
                             :returnID="false"
                             displayKey="district"
                             enableFirst>
            </prompt-dropdown>
          </b-col>
          <b-col>
            <prompt-dropdown :items="zips"
                             placeholder="ZIP"
                             v-model="restaurant.zip"
                             :returnID="false"
                             displayKey="zip" disabled enableFirst nocaret>
            </prompt-dropdown>
          </b-col>
        </b-row>
        <prompt-input placeholder='請輸入餐廳地址'
                       v-model='restaurant.address'
                       class="mb-3"></prompt-input>
        <prompt-input title="Restaurant Contact number"
                       placeholder='請輸入電話號碼'
                       v-model='restaurant.phone'
                       class="mb-3"></prompt-input>
        <!-- FIXME: opening time should use time picker, -->
        <prompt-input title="Restaurant Website"
                       placeholder='http://'
                       v-model='restaurant.website'
                       class="mb-3"></prompt-input>
        <h3 class="form-title" style="margin-bottom: 2px">星等</h3>
        <star-rating style="margin-bottom: 14px"
                     v-model="restaurant.star"
                     :star-size="starSize"
                     ></star-rating>
      </b-col>
      <b-col>
        <prompt-input title="Description"
                       type="textarea"
                       placeholder='寫下餐廳的介紹'
                       v-model='restaurant.description'
                       :rows="6"
                       class="mb-2"></prompt-input>
        <b-row>
          <b-col>
            <prompt-input title="Longitude"
                          type="number"
                          placeholder='請輸入經度'
                          v-model='restaurant.longitude'
                          class="mb-3">
            </prompt-input>
          </b-col>
          <b-col>
            <prompt-input title="Latitude"
                          type="number"
                          placeholder='請輸入緯度'
                          v-model='restaurant.latitude'
                          class="mb-3">
            </prompt-input>
          </b-col>
        </b-row>
        <h3 class="form-title">Cover picture (限制JPG)*</h3>
        <div class="image-input" :style="{ 'background-image': `url(${imageData})` }">
          <b-btn @click="chooseImage" class="image-input-btn">
            <i class="fas fa-image"></i>
          </b-btn>
          <input @input="onSelectFile"
                 ref="fileInput"
                 type="file"
                 class="file-input"
                 accept="image/jpeg" />
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating,
  },
  props: {
    zips: {},
    cities: {},
    districts: {},
    restaurant: {},
  },
  data() {
    return {
      imageData: String,
      starSize: 40,
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const vm = this;
      const input = vm.$refs.fileInput;
      const { files } = input;
      const fileSize = files[0].size;
      if (fileSize > 2048000) {
        // 最大size 2M
        this.alert('圖片檔案太大請重新上傳');
        return;
      }
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          vm.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        vm.$emit('handleImage', files[0]);
      }
    },
  },
  watch: {
    'restaurant.images': {
      handler(val) {
        const vm = this;
        const randomNum = Math.random();
        if (val !== null) {
          vm.imageData = `https://s3-ap-northeast-1.amazonaws.com/dishrank-restaurant-images/${vm.restaurant.ownerId}/${vm.restaurant.restaurantId}/${val[0]}?${randomNum}`;
        }
      },
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #000000;
}

.line {
  margin: 0;
  border: solid 1px #000000;
}

.form-title {
  line-height: 1.4;
  font-size: 14px;
  color: #4a4a4a;
}

.image-input {
  display: block;
  height: 250px;
  text-align: center;
  cursor: pointer;
  border: solid 1px #9b9b9b;
  background-size: cover;
  background-position: center center;
}

.image-input-btn {
  width: 50px;
  height: 50px;
  margin-top: 100px;
  box-shadow: 0 1px 3px 0 #cdcdcd;
  border: none;
  color: black;
  font-size: 25px;
  border-radius: 90px;
  background: white;
}

.file-input {
  display: none;
}

</style>
