export default [{
  path: '',
  name: 'home',
  redirect: '/restaurant',
}, {
  path: '/restaurant',
  name: 'restaurant',
  meta: { requireAuth: true },
  component: () => import('@/views/RestaurantList.vue'),
}, {
  path: '/dishlist',
  name: 'dishlist',
  meta: { requireAuth: true },
  component: () => import('@/views/DishList.vue'),
}, {
  path: '/setlist',
  name: 'setlist',
  meta: { requireAuth: true },
  component: () => import('@/views/SetList.vue'),
}, {
  path: '/recommendSetList',
  name: 'recommendSetList',
  meta: { requireAuth: true },
  component: () => import('@/views/RecommendSetList.vue'),
}];
