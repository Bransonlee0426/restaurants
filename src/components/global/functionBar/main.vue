<template>
  <b-row align-h="between" class="navbar" no-gutters>
    <b-col class="title-box">
      <h1 class="page-name">{{pagename}}</h1>
    </b-col>
    <b-col class="function-box">
      <funBtn
        v-for="(btn,item) in btn_list"
        :key="item"
        :type='btn.type'
        @click="()=>{$emit(btn.event)}"/>
    </b-col>
  </b-row>
</template>

<script>
import funBtn from './functionbtn.vue';

export default {
  name: 'functionBar',
  components: {
    funBtn,
  },
  props: {
    pagename: {
      type: String,
      default: '',
    },
    edit_time: {
      type: String,
      default: '',
    },
    btn_list: Array,
  },
};
</script>
<style scoped>
  .navbar {
    height: 90px;
    background-color: #ffffff;
  }

  .title-box {
    margin-left: 30px;
  }

  .page-name {
    font-size: 18px;
    font-weight: 500;
    line-height: 2;
    color: black;
  }

  .edit-time {
    font-size: 14px;
    color: #9b9b9b;
  }

  .function-box {
    text-align: right;
    margin-right: 30px;
  }

</style>
