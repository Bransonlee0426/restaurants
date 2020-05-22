<template>
  <b-card-body>
    <prompt-intput placeholder="Email Address" class="mb-3" />
    <prompt-intput placeholder="Confirm Email Address" class="mb-3" />
    <prompt-intput placeholder="Password" class="mb-3" />
    <prompt-intput placeholder="Confirm Password" class="mb-3" />
    <b-row class="recaptcha mb-3">
      <b-col>
        <vue-recaptcha :sitekey='sitekey' ref="recaptcha" @verify="onVerify">
        </vue-recaptcha>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset="2" cols="8">
        <b-btn block>SIGN UP</b-btn>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      sitekey: '6LdljaIUAAAAAKKvWwedmuZsxNnBB0svZwbduEBF',
      recaptchaToken: '',
    };
  },
  methods: {
    onVerify(response) {
      this.recaptchaToken = response;
    },
  },

};

</script>

<style scoped>
  .recaptcha {
    padding-left: 6rem;
  }

</style>
