<template>
  <b-container fluid class="pr-0 pl-0">
    <b-row  align-v="center">
      <b-col cols="6">
        <img class="loginImage" :src="imageUrl" >
      </b-col>
      <b-col cols="6">
        <router-view/>
      </b-col>
      <boarding :src='boardingData.imageUrl'
                :title='boardingData.title'
                :innerText='boardingData.innerText' />
    </b-row>
  </b-container>
</template>

<script>
import boarding from '@/components/login/BoardingPopUp.vue';

export default {
  components: {
    boarding,
  },
  data() {
    return {
      mainProps: {
        fluidGrow: true,
      },
      imageUrl:
        'https://s3.ap-northeast-1.amazonaws.com/dishrank-restaurant-manager/H_1A.png',
      boardingData: {
        imageUrl:
          'https://dishrank-restaurant-manager.s3-ap-northeast-1.amazonaws.com/H_Pop.png',
        title: 'Offer Your Dishes For The Healthy Foodies.',
        innerText:
          'Establish your restaurant information and be the best healthy diet choice to the customers !',
      },
    };
  },
  mounted() {
    this.showBoarding();
  },
  methods: {
    showBoarding() {
      this.$root.$emit('bv::show::modal', 'boarding');
    },
  },
};
</script>

<style scoped lang="scss">
.loginImage{
  width: 100%;
  height: 100vh;
}
</style>
