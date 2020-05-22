<template>
  <div class="frame">
    <b-row class="mb-3" no-gutters>
      <b-col>
        <b-button class="label" v-for="(tab,item) in tabs" :key="item" :to='tab.url'>{{tab.title}}
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          title: '登入',
          url: '/login',
          isActive: false,
        },
        // {
        //   title: "Sign up",
        //   url: "/login/signup",
        //   isActive: true
        // }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.frame {
  text-align: center;
  padding: 1rem;
}

.label {
  font-family: PingFangTC;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.5px;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  text-align: center;
  color: #daa270;
}
</style>
