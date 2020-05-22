<template>
  <b-card no-body class="m-5 p-5">
    <h1 class="card-title mb-1">Set Information</h1>
    <hr class="line mb-5" />
    <b-row class='card-content px-5'>
      <b-col>
        <prompt-input
          title="Set Name"
          placeholder='套餐名稱'
          v-model='set.name'
          class="mb-3"></prompt-input>
        <prompt-input
          title="Price"
          placeholder='請輸入金額'
          v-model='set.price'
          class="mb-3"></prompt-input>
        <prompt-input
          title="Description"
          type="textarea"
          placeholder='寫下套餐的介紹'
          v-model='set.description'
          :rows="6"
          class="mb-3"></prompt-input>
      </b-col>
      <b-col>
        <h3 class="form-title">Tag</h3>
        <vue-tags-input
          v-model="tags"
          :autocomplete-items="autocompleteItems"
          :tags="tagArray"
          :add-only-from-autocomplete="true"
          @tags-changed='onTagsChange'
          placeholder="#Tag"
          class="tag mb-3" />
        <h3 class="form-title">Cover picture (限制JPG）</h3>
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
export default {
  props: {
    set: {},
    autocompleteItems: {},
  },
  data() {
    return {
      imageData: null,
      tags: '',
      tagArray: [],
    };
  },
  methods: {
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
        // eslint-disable-next-line prefer-destructuring
        this.set.image = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },
    onTagsChange(newTags) {
      this.tagArray = newTags;
      let item = '';
      newTags.forEach((tag) => {
        item += `${tag.id},`;
      });
      this.set.tags = item.substr(0, item.length - 1);
    },
  },
  watch: {
    'set.tags': {
      handler(val) {
        const tag = val[0];
        const vm = this;
        if (vm.isInt(tag) && Array.isArray(val)) {
          val.forEach((ele) => {
            const aa = vm.autocompleteItems.filter(
              item => item.id === Number(ele),
            );
            vm.tagArray.push(aa[0]);
          });
          vm.onTagsChange(vm.tagArray);
        }
      },
    },
    'set.dishSetId': {
      handler(val) {
        const vm = this;
        const randomNum = Math.random();
        vm.imageData = `https://s3-ap-northeast-1.amazonaws.com/dishrank-dish-images/${vm.set.restaurantId}/${val}.jpg?${randomNum}`;
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
  height: 1px;
  border: solid 2px #000000;
}

.form-title {
  padding-left: 4px;
  font-size: 14px;
  color: #4a4a4a;
}

.image-input {
  display: block;
  height: 120px;
  text-align: center;
  cursor: pointer;
  border: solid 1px #9b9b9b;
  background-size: cover;
  background-position: center center;
}

.image-input-btn {
  width: 50px;
  height: 50px;
  margin-top: 35px;
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

.tag {
  max-width: 100%;
  height: 120px;
  border: solid 1px #9b9b9b;
}

.tag >>> .ti-input {
  border: none;
}
</style>
