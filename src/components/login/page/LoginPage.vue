<template>
  <b-container>
    <prompt-input  title="帳號"
                   placeholder="請輸入信箱"
                   v-model="account.email"
                   type="email"
                   class="mb-3"
                   @isAccountValid="isAccountValid"
                   :afterAPIMessage="afterAPIMessage"></prompt-input>
    <prompt-input title="密碼"
                   placeholder="請輸入密碼"
                   v-model="account.password"
                   type="password"
                   class="mb-3"
                   @isPasswordValid="isPasswordValid"
                   :afterAPIMessage="afterAPIMessage"></prompt-input>
    <b-row>
      <b-col class="btn-box">
        <b-link class="text-button">忘記密碼?</b-link>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col offset="2" cols="8">
        <div class="errorMsg">{{errorMsg}}</div>
        <b-btn class="btn-primary" @click="login" block>登入</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      account: {
        email: '',
        password: '',
        ownerId: '',
        date: '',
      },
      accountValid: false,
      passwordValid: false,
      afterAPIMessage: true,
      errorMsg: '',
    };
  },
  created() {},
  methods: {
    login() {
      const vm = this;
      const checkAccountValid = vm.checkAccountValid();
      if (checkAccountValid) {
        vm.api.login(
          vm.account,
          (res) => {
            vm.getUserInfo(res);
            vm.$store.dispatch('userInfo/login', {
              account: vm.account.email,
              ownerId: vm.ownerId,
              date: new Date(),
            });
            vm.$router.push('/restaurant');
          },
          () => {
            vm.afterAPIMessage = false;
          },
        );
      } else {
        vm.afterAPIMessage = true;
      }
    },
    getUserInfo(res) {
      const vm = this;
      vm.ownerId = res.data.uuid;
    },
    isAccountValid(state) {
      const vm = this;
      vm.accountValid = state;
    },
    isPasswordValid(state) {
      const vm = this;
      vm.passwordValid = state;
    },
    checkAccountValid() {
      const vm = this;
      const myAccount = vm.accountValid;
      const myPassword = vm.passwordValid;
      return !!(myAccount && myPassword);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.btn-box {
  text-align: right;
}

.text-button {
  font-family: PingFangTC,serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 3.5;
  letter-spacing: 1px;
  text-align: left;
  color: #4a4a4a;
}

.btn-primary {
  border-radius: 20px;
  box-shadow: none !important;
  background-color: #daa270;
  border: none;

  &:hover {
    background-color: #e1b58d;
  }

  &:disabled {
    border: solid 1px #c0c0c0;
    background: none;
    color: #c0c0c0;
  }

  &:active {
    background-color: #ce8d53 !important;
  }
}
.errorMsg{
  font-family: PingFangTC,serif;
  font-size: 20px;
  color: #eb6050;
}
</style>
