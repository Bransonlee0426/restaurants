<template>
  <b-row no-gutters class="ml-5 mr-5">
    <b-col>
      <h1 class="title">菜餚項目</h1>
      <b-card-group>
        <slot></slot>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
};

</script>

<style scoped>
  .title {
    width: 96px;
    height: 33px;
    font-family: PingFangTC,serif;
    font-size: 24px;
    font-weight: 500;
    color: #005a4a;
  }

</style>
