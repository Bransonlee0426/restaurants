import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './modules/userInfo';
import productIds from './modules/productIds';
import setting from './modules/setting';

Vue.use(Vuex);

function isLogin(mutation, user) {
  if (mutation.type === 'userInfo/setLoginState' || mutation.type === 'userInfo/setAccount') {
    window.localStorage.setItem('userInfo', JSON.stringify(user));
    if (!user.account && mutation.type === 'userInfo/setAccount') {
      window.localStorage.removeItem('userInfo');
      window.localStorage.removeItem('productIds');
    }
  }
}

function saveProductIds(mutation, user) {
  if (mutation.type === 'productIds/setRestaurant') {
    window.localStorage.setItem('productIds', JSON.stringify(user));
  }
}

const localStoragePlugin = (store) => {
  store.subscribe((mutation, user) => {
    isLogin(mutation, user.userInfo);
    saveProductIds(mutation, user.productIds);
  });
};

export default new Vuex.Store({
  modules: {
    userInfo,
    productIds,
    setting,
  },
  plugins: [localStoragePlugin],
});
