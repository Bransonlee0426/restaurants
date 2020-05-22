const state = {
  restaurant: {},
};

const getters = {};
const mutations = {
  // eslint-disable-next-line no-shadow
  setRestaurant(state, data) {
    state.restaurant = data.restaurant;
  },
};
const actions = {
  saveRestaurant(context, restaurant) {
    context.commit({
      type: 'setRestaurant',
      restaurant,
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
