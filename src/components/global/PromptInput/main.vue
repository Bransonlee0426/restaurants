<template>
  <b-row no-gutters class="form">
    <b-col>
      <div :class="[isFocus ? 'title-focus' : 'title']">{{title}}</div>
      <b-textarea v-if='isTextarea'
                  :placeholder='placeholder'
                  :value="value"
                  @input="onInput"
                  :rows="rows"
                  @blur='onBlur'
                  @focus="onFocus"
                  class='input'
                  :disabled="textareaDisabled" />
      <b-form-input v-else
                    :placeholder='placeholder'
                    :value="value"
                    @input="onInput"
                    :type='inputType'
                    :state='state'
                    @blur='isValid'
                    @focus="onFocus"
                    class="input"
                    :afterAPImessage="afterAPIMessage"
                    :onkeydown="this.type === 'number' ? 'return event.keyCode !== 69' : ''"
                    />
      <b-btn v-if='isPassword' @click='showPassword' class="button">
      </b-btn>
      <b-form-invalid-feedback class="error-message">{{errormessage}}</b-form-invalid-feedback>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'promptInput',
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: [String, Number],
    textareaDisabled: {
      type: Boolean,
      default: false,
    },
    afterAPIMessage: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      pswVisible: false,
      inputType: this.type,
      isFocus: false,
      state: null,
      errormessage: '',
    };
  },
  computed: {
    isPassword() {
      return this.type === 'password';
    },
    isTextarea() {
      return this.type === 'textarea';
    },
  },
  methods: {
    onFocus() {
      this.isFocus = true;
    },
    onInput(val) {
      this.$emit('input', val);
    },
    onBlur() {
      this.$emit('blur');
      this.isFocus = false;
    },
    isValid() {
      const vm = this;
      vm.isFocus = false;
      if (vm.inputType === 'email') {
        vm.state = this.verifyEmailFormat(vm.value);
        vm.isFocus = false;
        vm.errormessage = vm.msgContent('emailFormat');
        vm.$emit('isAccountValid', vm.state);
      } else if (vm.inputType === 'password') {
        vm.state = this.isInputEmpty(vm.value);
        vm.isFocus = false;
        vm.errormessage = vm.msgContent('passwordEmpty');
        vm.$emit('isPasswordValid', vm.state);
      }
      if (vm.inputType === 'password' && vm.afterAPIMessage === false) {
        vm.state = false;
        vm.isFocus = false;
        vm.errormessage = vm.msgContent('passwordConfirm');
        vm.$emit('isPasswordValid', vm.state);
      }
    },
    isInputEmpty(val) {
      return val !== '';
    },
    showPassword() {
      this.pswVisible = !this.pswVisible;
      if (this.pswVisible) {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    },
  },
  watch: {
    afterAPIMessage: {
      deep: true,
      handler() {
        const vm = this;
        vm.isValid();
      },
    },
  },
};
</script>

<style scoped>
.form {
  text-align: left;
}

.title {
  padding-left: 4px;
  padding-bottom: 4px;
  font-size: 14px;
  font-family: HelveticaNeue,serif;
  color: #4a4a4a;
}

.title-focus {
  padding-left: 4px;
  padding-bottom: 4px;
  font-size: 14px;
  font-family: HelveticaNeue,serif;
  color: #daa270;
}

.input {
  font-size: 14px;
  border: solid 1px #9b9b9b;
  box-shadow: none !important;
  border-radius: 0;
}

.input:focus {
  border: solid 1px #daa270;
}

.form-control::placeholder {
  color: #aaaaaa;
}

.error-message {
  padding-left: 0.2rem;
}

.button,
.button:active,
.button:hover,
.button:focus {
  box-shadow: none !important;
  background: none !important;
  border: none !important;
  color: black !important;
  position: absolute;
  top: 20px;
  right: 0;
}
</style>
