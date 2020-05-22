/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const state = {
  recommendSetListPerpage: 10,
  recommendSetListCurrentPage: 1,
  recommendSetListSearchText: '',
  restaurantListStatus: 'default',
  dishListStatus: 'default',
};

const getters = {
};
const mutations = {
  recommendSetListPerpage(state, value) {
    state.recommendSetListPerpage = value.data.perPage;
  },
  recommendSetListCurrentPage(state, value) {
    state.recommendSetListCurrentPage = value.data.currentPage;
  },
  recommendSetListSearchText(state, value) {
    state.recommendSetListSearchText = value.data.searchText;
  },
  restaurantListStatus(state, value) {
    state.restaurantListStatus = value.data.restaurantListStatus;
  },
  dishListStatus(state, value) {
    state.dishListStatus = value.data.dishListStatus;
  },
  delete(state, value) {
  },
};
const actions = {
  setRecommendSetListPerpage(context, data) {
    context.commit({
      type: 'recommendSetListPerpage',
      data,
    });
  },
  setRecommendSetListCurrentPage(context, data) {
    context.commit({
      type: 'recommendSetListCurrentPage',
      data,
    });
  },
  setRecommendSetListSearchText(context, data) {
    context.commit({
      type: 'recommendSetListSearchText',
      data,
    });
  },
  setRestaurantListStatus(context, data) {
    context.commit({
      type: 'restaurantListStatus',
      data,
    });
  },
  setDishListStatus(context, data) {
    context.commit({
      type: 'dishListStatus',
      data,
    });
  },
  delSetting(context) {
    context.commit({
      type: 'delete',
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
