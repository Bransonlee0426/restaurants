<template>
  <b-row>
    <b-col>
      <div class="tags">
        <ul class="tags-ul">
          <li class="tags-li" v-for="(item,index) in tags" :key="index">
            {{item.text}}
            <i class="far fa-times-circle cancel-icon" @click="cancelTag(item)"></i>
          </li>
          <input
            v-model="inputValue"
            class="input"
            type="text"
            @click="showList()"
            @blur="hideList()"
            placeholder="請新增標籤"
            @input="handleInput"
          />
        </ul>
      </div>
      <div class="tagsList">
        <ul class="cate-ul" :style="cateItemUl">
          <li
            class="cate-li"
            v-for="(item,index) in allTags"
            :key="index"
            @mouseover="mouseover(item.id)"
            @mouseleave="mouseleave()"
          >{{item.text}}</li>
        </ul>
        <ul class="subitem-ul" :style="subItemUl">
          <li
            class="subitem-li"
            v-for="(item,index) in subItems"
            :key="index"
            @click="selectTag(item)"
          >{{item.text}}</li>
        </ul>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'tags',
  props: {
    // 全部的tag
    tagsData: {
      type: Array,
      default() {
        return [];
      },
    },
    // getone過來的tags
    selectedTag: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      inputValue: '',
      subItemUl: {
        display: 'none',
      },
      cateItemUl: {
        display: 'none',
      },
      data: [],
      allTags: [],
      currentCate: '',
      tags: [],
      filterArr: [],
      recordKeyword: '',
    };
  },
  created() {},
  computed: {
    subItems() {
      const vm = this;
      let subitem = [];
      vm.allTags.forEach((item) => {
        if (item.id === vm.currentCate) {
          [subitem] = [item.subitem];
        }
      });
      return subitem;
    },
  },
  methods: {
    showList() {
      const vm = this;
      vm.cateItemUl.display = 'block';
    },
    hideList() {
      const vm = this;
      setTimeout(() => {
        vm.cateItemUl.display = 'none';
        vm.subItemUl.display = 'none';
      }, 100);
    },
    mouseover(id) {
      const vm = this;
      vm.subItemUl.display = 'block';
      vm.currentCate = id;
    },
    mouseleave() {},
    selectTag(tag) {
      // 重複不加入
      const vm = this;
      const duplicate = vm.tags.some(ele => ele.id === tag.id);
      if (!duplicate) {
        vm.tags.push(tag);
      }
      vm.inputValue = '';
      vm.$emit('selectTag', vm.tags);
    },
    cancelTag(item) {
      const vm = this;
      vm.tags.forEach((ele, index) => {
        if (ele.id === item.id) {
          vm.tags.splice(index, 1);
        }
      });
      vm.$emit('selectTag', vm.tags);
    },
    handleInput() {},
  },
  watch: {
    inputValue: {
      immediate: true,
      handler(newValue) {
        const vm = this;
        if (vm.recordKeyword !== '') {
          if (vm.recordKeyword !== newValue) {
            vm.cateItemUl.display = 'none';
            vm.subItemUl.display = 'none';
            vm.filterArr = [];
          }
        }
        if (newValue !== '') {
          vm.data.forEach((ele) => {
            if (ele.subitem !== null && ele.subitem !== undefined) {
              ele.subitem.forEach((elem) => {
                // 比較字
                if (newValue.toLowerCase() === elem.text.toLowerCase()) {
                  // 找到字
                  vm.filterArr.push(ele);
                  vm.recordKeyword = newValue;
                  vm.cateItemUl.display = 'block';
                }
              });
              vm.allTags = vm.filterArr;
            }
          });
        } else if (newValue === '') {
          vm.allTags = [];
          vm.data.forEach((ele) => {
            vm.allTags.push(ele);
          });
        }
      },
    },
    // 全部的tag
    tagsData: {
      handler(newValue) {
        const vm = this;
        vm.data = newValue;
        // 為了避免修改到原始資料
        vm.allTags = Object.assign([], vm.data);
      },
    },
    // getOne來的tags
    selectedTag: {
      handler(newValue) {
        const vm = this;
        if (newValue !== null) {
          if (vm.tags.length === 0) {
            newValue.forEach((ele) => {
              vm.tags.push(ele);
            });
          }
        }
        vm.$emit('selectTag', vm.tags);
      },
    },
  },
};
</script>

<style lang="scss" scoped>

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: auto;
  height: auto;
  position: relative;
  border: 0px solid rgb(167, 167, 162);

  .tags-ul {
    margin-bottom: 0em;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 5px;
    .tags-li {
      border-radius: 999em;
      padding: 0px 10px;
      line-height: 1.5;
      margin: 3px 1px;
      border: 1px solid rgb(189, 188, 188);
      background-color: #5555ff;
      color: white;
      height: 26px;
      .cancel-icon {
        cursor: pointer;
        padding-left: 5px;
      }
    }
    .input {
      border: 1px solid #e0e0e0;
      padding-left: 5px;
      width: 76px;
      height: 32px;
      font-size: 13px;
      border-radius: 999em;
      &:focus {
        outline: 0px;
      }
    }
  }
}
@-moz-document url-prefix() {
    .tags-li {
      padding-top:2px !important;
    }
}
.tagsList {
  display: flex;
  flex-direction: row;
  .cate-ul {
    z-index: 2000;
    width: 50%;
    padding: 0px;
    background-color: white;
    border-radius: 10px;
    height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    border: 1px solid #e0e0e0;
    .cate-li {
      background-color: #d0d0d0;
      margin: 5px;
      padding-left: 10px;
      line-height: 1.5;
      &:hover {
        background-color: #9d9d9d;
      }
    }
  }
  .subitem-ul {
    z-index: 2000;
    padding: 0px;
    width: 50%;
    background-color: white;
    border-radius: 10px;
    height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    border: 1px solid #e0e0e0;
    .subitem-li {
      background-color: #d0d0d0;
      margin: 5px;
      padding-left: 10px;
      padding-top:3px;
      padding-bottom: 3px;
      &:hover {
        background-color: #9d9d9d;
      }
    }
  }
}
</style>
