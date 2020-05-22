<template>
  <b-container fluid class="pr-0 pl-0">
    <b-row no-gutters class="app">
      <b-col cols="2" v-if="isLogin">
        <side-bar class="sidebar"></side-bar>
      </b-col>
      <b-col :cols="isLogin ? '10' : '12'">
        <keep-alive :include="keep">
          <router-view @setKeep="setKeep" @removeKeep="removeKeep" />
        </keep-alive>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      keep: [],
    };
  },
  created() {},
  computed: {
    isLogin() {
      return this.$store.state.userInfo.isLogin;
    },
  },
  methods: {
    setKeep(keepName) {
      const vm = this;
      vm.keep.push(keepName);
    },
    removeKeep(keepName) {
      const vm = this;
      vm.keep = vm.keep.filter(ele => keepName !== ele);
    },
  },
};
</script>

<style lang="scss">
.app {
  font-family: HelveticaNeue;
}
li{
  list-style-type: none;
}
.sidebar {
  min-height: 100%;
  width: 500px;
}
.notsave-modal {
  .modal-content {
    width: 500px;
    height: 260px;
    border-radius: 5px;
    .modal-header {
      border: none;
    }
    .modal-body {
      font-family: PingFangTC;
      font-size: 16px;
      top: 10%;
      font-weight: 500;
      text-align: center;
      color: #4a4a4a;
    }
    .modal-footer {
      justify-content: space-evenly;
      padding-bottom: 28px;
      border: none;
      .btn-secondary,
      .btn-primary {
        width: 180px;
        height: 36px;
        border-radius: 20px;
        box-shadow: none !important;
        background-color: #daa270;
        border: none;
      }
      .btn-secondary:hover,
      .btn-primary:hover {
        background-color: #e1b58d;
      }
      .btn-secondary:active,
      .btn-primary:active {
        background-color: #ce8d53;
      }
    }
  }
}
</style>
