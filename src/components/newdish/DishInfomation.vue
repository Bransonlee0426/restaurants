<template>
  <div class="info-from">
    <b-card no-body class="card-body">
      <h1 class="card-title mb-1">Dish Information</h1>
      <div class="line"></div>
      <b-row class='card-content'>
        <b-col>
          <prompt-input  title="Dish Name*"
                         placeholder='請輸入餐點名稱，最多20個字'
                         v-model='infoData.name'
                         class="mb-3"></prompt-input>
          <prompt-input title="Description"
                         type="textarea"
                         placeholder='這邊是菜餚的描述'
                         v-model='infoData.description'
                         :rows="6"
                         class="mb-3"></prompt-input>
          <prompt-input title="Price"
                         placeholder='請輸入金額'
                         v-model='infoData.price'
                         class="mb-3"></prompt-input>
        </b-col>
        <b-col>
          <h3 class="title">Tag*</h3>
          <div class="keywordbox">
            <tags :tagsData="tagCategories" :selectedTag="tagsArray" @selectTag="handleTag"></tags>
          </div>
          <h3 class="title">Cover picture (限制JPG)*</h3>
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
  </div>
</template>

<script>
export default {
  props: {
    infoData: {},
    typeList: {},
    tagCategories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imageData: null,
      tagsArray: [],
    };
  },
  methods: {
    handleTag(tagArray) {
      const vm = this;
      vm.infoData.tags = tagArray;
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
    'infoData.tags': {
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
    'infoData.images': {
      handler(val) {
        const vm = this;
        const randomNum = Math.random();
        if (vm.infoData.dishId && val !== null) {
          vm.imageData = `https://s3-ap-northeast-1.amazonaws.com/dishrank-dish-images/${vm.infoData.restaurantId}/${vm.infoData.dishId}/${val[0]}?${randomNum}`;
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

.info-from {
  padding: 43px 60px 10px;
}

.title {
  padding-left: 4px;
  padding-top: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.card-body {
  padding: 30px;
  box-shadow: 0 2px 5px 0 #cdcdcd;
  background-color: #ffffff;
}

.card-content {
  padding-left: 50px;
  padding-right: 50px;
}

.line {
  height: 1px;
  margin-bottom: 32px;
  border: solid 1px #000000;
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
.keywordbox {
  width: 100%;
  height: 140px;
  border: 1px solid #5b5b5b;
}
</style>
