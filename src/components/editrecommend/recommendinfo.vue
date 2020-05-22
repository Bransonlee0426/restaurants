<template>
  <div>
    <b-card no-body class="m-5 p-5">
      <b-row>
        <b-col>
          <div>餐廳名稱：{{dishData.restaurantName}}</div>
        </b-col>
        <b-col>
          <div>
            <prompt-radio
              :options="radioOptions"
              label="狀態:"
              :status="dishData.status"
              @input="handleStatus">
            </prompt-radio>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>推薦套餐名稱：{{dishData.name}}</div>
        </b-col>
        <b-col>
          <div>
            <prompt-checkbox
              :options="checkboxOptions"
              label="供應時段:"
              :offerTime="dishData.mealtime=== 2 ? [0,1]:[dishData.mealtime]"
              @input="handleSelected">
            </prompt-checkbox>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>套餐類型:</div>
          <div class="keywordbox">
            <tags :tagsData="tagCategories" :selectedTag="tagsArray" @selectTag="handleTag"></tags>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <div>
            <div>營養師評論:</div>
            <prompt-input
              type="textarea"
              :value="dishData.comments"
              :textareaDisabled="true"
              :rows="8"
            ></prompt-input>
          </div>
        </b-col>
        <b-col>
          <div>圖片:</div>
          <div class="image-input" :style="{ 'background-image': `url(${imageData})` }">
            <b-btn @click="chooseImage" class="image-input-btn">
              <i class="fas fa-image"></i>
            </b-btn>
            <input @input="onSelectFile"
                   ref="fileInput"
                   type="file"
                   class="file-input"
                   accept="image/jpeg"/>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>套餐菜餚項⽬:</b-col>
      </b-row>
      <b-row>
        <b-col class="dishlist-col">
          <img-card class="imgCard"
                    :disableBtn="true"
                    v-for="(item,index) in dishData.dishes"
                    :key="index"
                    :item="item">
          </img-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'editRecommend',
  props: {
    dishData: {},
    tagCategories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imageData: '',
      dishSetId: '',
      radioOptions: [
        { text: '上架', value: 1 },
        { text: '下架', value: 0 },
      ],
      checkboxOptions: [
        { text: '午餐', value: 0 },
        { text: '晚餐', value: 1 },
      ],
      offertime: [0, 1],
      foodIngre: 10,
      nutriIngre: 4,
      tagsData: [],
      tagsArray: [],
    };
  },
  methods: {
    handleTag(tagArray) {
      const vm = this;
      vm.dishData.tags = tagArray;
    },
    handleStatus(status) {
      const vm = this;
      vm.$emit('handleStatus', status);
    },
    handleSelected(selected) {
      const vm = this;
      const firstIndex = 0;
      selected.forEach((ele, index) => {
        if (ele === '') {
          selected.splice(index, 1);
        }
      });
      switch (selected.length) {
        case 2:
          vm.dishData.mealtime = 2;
          break;
        case 1:
          vm.dishData.mealtime = selected[firstIndex];
          break;
        default:
          vm.dishData.mealtime = '';
          break;
      }
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
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
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit('handleImage', files[0]);
      }
    },
  },
  watch: {
    'dishData.tags': {
      handler(newValue) {
        const vm = this;
        if (newValue !== null) {
          if (vm.tagsArray.length === 0) {
            newValue.forEach((ele) => {
              vm.tagsArray.push(ele);
            });
          }
        }
      },
    },
    'dishData.images': {
      handler(newValue) {
        const vm = this;
        const randomNum = Math.random();
        // 有可能無圖片
        if (newValue !== null) {
          vm.imageData = `https://dishrank-dietitians-dish-set-images.s3-ap-northeast-1.amazonaws.com/${vm.dishData.restaurantId}/${vm.dishData.dishSetId}/${newValue[0]}?${randomNum}`;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.keywordbox {
  width: 100%;
  height: 120px;
  border: 1px solid #5b5b5b;
}
.dishlist-col {
  display: flex;
  flex-wrap: wrap;
  .imgCard {
    padding: 5px;
  }
}
.image-input {
  display: block;
  height: 183px;
  margin-top: 3px;
  text-align: center;
  cursor: pointer;
  border: solid 1px #9b9b9b;
  background-size: cover;
  background-position: center center;
}

.image-input-btn {
  width: 50px;
  height: 50px;
  margin-top: 64px;
  box-shadow: 0px 1px 3px 0 #cdcdcd;
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
