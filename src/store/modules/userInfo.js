const state = {
  isLogin: false,
  account: '',
  ownerId: '',
  date: '',
};

const getters = {};

const mutations = {
  // eslint-disable-next-line no-shadow
  setLoginState(state, loginState) {
    state.isLogin = loginState.state;
  },
  // eslint-disable-next-line no-shadow
  setAccount(state, value) {
    state.account = value.account.account;
    state.ownerId = value.account.ownerId;
    state.date = value.account.date;
  },
};

const actions = {
  login(context, account) {
    context.commit({
      type: 'setLoginState',
      state: true,
    });
    context.commit({
      type: 'setAccount',
      account,
    });
  },
  signOut(context) {
    context.commit({
      type: 'setLoginState',
      state: false,
    });
    context.commit({
      type: 'setAccount',
      account: {
        account: '',
        ownerId: '',
        date: '',
      },
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
