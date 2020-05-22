<template>
  <b-btn :class="[ type==='delete' ? 'delete':'','img-btn' ]" @click="()=>{this.$emit('click')}">
    <i :class="icon"></i>
    <p class="btn-title">{{title}}</p>
  </b-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title: '',
      icon: '',
      typeList: [{
        name: 'add',
        title: '新增',
        icon: 'fas fa-plus',
      },
      {
        name: 'preview',
        title: '預覽',
        icon: 'fas fa-eye',
      },
      {
        name: 'cancel',
        title: '取消',
        icon: 'fas fa-times',
      },
      {
        name: 'save',
        title: '儲存',
        icon: 'fas fa-save',
      },
      {
        name: 'delete',
        title: '刪除',
        icon: 'fas fa-trash-alt',
      },
      {
        name: 'on-store',
        title: '上架',
        icon: 'fas fa-arrow-up',
      },
      {
        name: 'off-store',
        title: '下架',
        icon: 'fas fa-arrow-down',
      },
      {
        name: 'edit',
        title: '編輯',
        icon: 'fas fa-pen',
      }, {
        name: 'sortby',
        title: '排序',
        icon: 'fas fa-sort',
      },
      ],
    };
  },
  created() {
    this.setStyle(this.type);
  },
  methods: {
    setStyle(name) {
      this.typeList.forEach((item) => {
        if (item.name === name) {
          this.title = item.title;
          this.icon = item.icon;
        }
      });
    },
  },
  watch: {
    type() {
      this.setStyle(this.type);
    },
  },
};

</script>

<style lang="scss" scoped>
  .img-btn {
    color: #4a4a4a;
    min-width: 50px;
    min-height: 70px;
    margin-right: 2px;
    margin-left: 2px;
    box-shadow: none !important;
    background: none !important;
    border: none !important;
    font-size: 20px;

    &:hover,
    &:active {
      color: #daa270 !important;
    }
  }

  .btn-title {
    font-size: 14px;
    margin-bottom: 2px;
  }

  .delete {
    &:hover,
    &:active {
      color: #eb6050 !important;
    }
  }

</style>
