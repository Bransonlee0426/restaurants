import axios from 'axios';
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import router from '../router/index';
import store from '../store';


export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://54.64.77.99:8080',
      timeout: 10000,
      headers: {},
    });
    const loader = Vue.$loading.show();
    // request 攔截器 loading動畫 set token
    instance.interceptors.request.use(
      config => config,
      error => Promise.error(error),
    );
    // response 攔截器 自動轉址 關閉loading動畫 save token
    instance.interceptors.response.use(
      (response) => {
        if (response.headers.authorization !== undefined) {
          VueCookie.set('token', response.headers.authorization);
        }
        loader.hide();
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
        return Promise.reject(response);
      },
      (error) => {
        loader.hide();
        if (error.response.status) {
          if (error.response.status === 401) {
            store.dispatch('userInfo/signOut').then();
            router.replace({
              path: '/login',
            }).then();
          }
        }
        return Promise.reject(error.response);
      },
    );
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
