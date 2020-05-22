export default [{
  name: 'newdish',
  path: '/newdish',
  props: true,
  component: () => import('@/views/NewDish.vue'),
}, {
  name: 'newrestaurant',
  path: '/newrestaurant',
  props: true,
  component: () => import('@/views/NewRestaurant.vue'),
}, {
  name: 'newset',
  path: '/newset',
  props: true,
  component: () => import('@/views/NewSet.vue'),
}, {
  name: 'selectdish',
  path: '/selectdish',
  component: () => import('@/views/DishSelect.vue'),
}, {
  name: 'newRecommendSet',
  path: '/newRecommendSet',
  component: () => import('@/views/NewRecommendSet.vue'),
}];
