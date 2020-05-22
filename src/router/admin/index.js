export default [{
  path: '/admin',
  name: 'admin',
}, {
  path: '/admin/labelManagement',
  name: 'labelManagement',
  meta: {
    requireAuth: false,
  },
  component: () => import('@/views/LabelManagement.vue'),
}, {
  path: '/admin/keyWordManagement',
  name: 'keyWordManagement',
  mata: {
    requireAuth: false,
  },
  component: () => import('@/views/KeyWordManagement.vue'),
}];
