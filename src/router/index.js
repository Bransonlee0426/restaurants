import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(store);
Vue.use(Router);

let routes = [];
const routerContext = require.context('.', true, /index\.js/);

routerContext.keys().forEach((routeName) => {
  if (routeName.startsWith('./index')) return;
  const routeModule = routerContext(routeName);
  routes = [...routes, ...(routeModule.default || routeModule)];
});

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const localUserInfo = JSON.parse(window.localStorage.getItem('userInfo'));
const localProductIds = JSON.parse(window.localStorage.getItem('productIds'));

function setUserInfo() {
  store.dispatch('userInfo/login', {
    account: localUserInfo.account,
    ownerId: localUserInfo.ownerId,
    date: localUserInfo.date,
  }).then();
}
function setProductId() {
  store.dispatch('productIds/saveRestaurant', localProductIds.restaurant).then();
}

if (localUserInfo) {
  setUserInfo();
}
if (localProductIds) {
  setProductId();
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)
    && !router.app.$store.state.userInfo.isLogin) {
    next({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath,
      },
    });
  } else {
    next();
  }
  if (to.fullPath === '/dishlist') {
    window.localStorage.removeItem('dishId');
  }
  if (to.fullPath === '/login') {
    store.dispatch('userInfo/signOut').then();
  }
});


export default router;
