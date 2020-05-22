export default [{
  path: '/login',
  component: () => import('@/views/Login.vue'),
  children: [{
    path: '/',
    component: () => import('@/components/login/LoginFrame.vue'),
    children: [{
      path: '',
      name: 'login',
      component: () => import('@/components/login/page/LoginPage.vue'),
    }, {
      path: '/login/signup',
      name: 'signup',
      component: () => import('@/components/login/page/SignUpPage.vue'),
    }],
  }],
}];
