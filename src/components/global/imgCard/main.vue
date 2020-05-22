<template>
  <b-row>
    <b-col>
      <b-card class="card" :img-src="src">
        <b-card-text class="card-text">
          <b-row>
            <b-col>
              {{item.name}}
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'imgCard',
  props: {
    disableBtn: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      ownerId: this.$store.state.userInfo.ownerId,
      src: '',
    };
  },
  created() {
    const vm = this;
    const randomNum = Math.random();
    vm.src = `https://s3-ap-northeast-1.amazonaws.com/dishrank-dish-images/${vm.item.restaurantId}/${vm.item.dishId}/${vm.item.images[0]}?${randomNum}`;
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 240px;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 #cdcdcd;
}

img {
  width: 100%;
  height: 144px;
}
</style>
