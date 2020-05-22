import Vue from 'vue';
import 'babel-polyfill';
import BootstrapVue from 'bootstrap-vue';
import VueCookie from 'vue-cookie';
import VueTagesInput from '@johmun/vue-tags-input';
import VueLoading from 'vue-loading-overlay';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import api from './api/index';
import './components/index';
import Utilities from './utilities';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.devTools = true;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.use(VueTagesInput);
Vue.use(api);
Vue.use(require('vue-moment'));


Vue.mixin(Utilities);
Vue.use(VueLoading);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
