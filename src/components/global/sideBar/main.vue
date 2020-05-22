<template>
  <b-container>
        <b-row>
          <b-col class="d-flex flex-column align-items-center">
              <h1 class="welcome">Welcome!</h1>
              <h3 class="account">{{account}}</h3>
              <p class="accountTime">{{accountTime}}</p>
              <b-btn class="logout btn-primary" @click="logout()">登出</b-btn>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="pr-0 pl-0">
            <b-btn-group vertical class="menu">
              <router-link v-for="(menu,item) in menus" :key="item" :to="menu.to"
                active-class='menu-btn-active' class="menu-btn">
                {{menu.title}}
              </router-link>
            </b-btn-group>
          </b-col>
        </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {
      menus: '',
    };
  },
  computed: {
    account() {
      return this.$store.state.userInfo.account;
    },
    accountTime() {
      return this.$moment(this.$store.state.userInfo.date).format(
        'YYYY/MM/DD hh:mm',
      );
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('userInfo/signOut');
      this.$router.push({
        path: '/login',
      });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.name === 'restaurant' || to.name === 'newrestaurant') {
          this.menus = [{
            title: '餐廳列表',
            to: 'restaurant',
          }];
        } else if (to.path.indexOf('admin') !== -1) {
          this.menus = [{
            title: '分類管理',
            to: 'labelManagement',
          }, {
            title: '關鍵字管理',
            to: 'keyWordManagement',
          }];
        } else {
          this.menus = [{
            title: '<-返回餐廳列表',
            to: 'restaurant',
          },
          {
            title: '菜餚',
            to: 'dishlist',
          },
          // {
          //   title: '套餐',
          //   to: 'setlist',
          // },
          {
            title: '推薦套餐',
            to: 'recommendSetList',
          },
          ];
        }
      },
    },
  },
};

</script>

<style scoped lang="scss">
  .container{
    width: 100%;
  }
  .sidebar {
    color: white;
    background-color: #005a4a;
  }
  .welcome {
    width: 145px;
    font-size: 28px;
    font-family: PingFangTC,serif;
    padding-top: 45px;
  }
  .account {
    width: 145px;
    height: 20px;
    font-family: PingFangTC,serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
  }
  .accountTime {
    width: 145px;
    height: 14px;
    font-family: PingFangTC,serif;
    font-size: 14px;
    color: #cdcdcd;
  }

  .menu {
    margin-top: 48px;
    width: 100%;
  }

  .menu-btn {
    text-decoration: none;
    width: 100%;
    height: 60px;
    line-height: 3.3;
    padding-left: 15%;
    font-size: 18px;
    font-weight: 500;
    background: none;
    border: none;
    color: white;
    box-shadow: none !important;
  }

  .menu-btn:hover {
    background-color: #23675b !important;
  }

  .menu-btn-active,
  .menu-btn:focus {
    background-color: #01463a !important;
  }
  .logout {
    width: 70px;
    margin-right: 75px;
    box-shadow: none !important;
    background-color: #daa270;
    &:hover {
        background-color: #e1b58d;
    }
    &:disabled {
        border: solid 1px #c0c0c0;
        background: none;
        color: #c0c0c0;
    }
    &:active {
        background-color: #ce8d53 !important;
    }
  }

</style>
