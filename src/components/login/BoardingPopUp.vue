<template>
  <b-modal id="boarding" class="boarding-body" centered hide-footer hide-header>
    <b-container fluid class="container-no-padding">
      <b-row>
        <b-col class="col-6">
          <img class="loginImage" :src="src" >
        </b-col>
        <b-col class="col-6">
          <b-row align-h="end" no-gutters>
            <b-btn class="btn-light" @click="$bvModal.hide('boarding')">X</b-btn>
          </b-row>
          <b-row>
            <b-col class="p-5">
              <h2 class="title">{{title}}</h2>
              <h4 class="inertext mb-5">{{innerText}}</h4>
              <b-btn class="col-6 offset-3 btn-primary" @click="$bvModal.hide('boarding')" block>OK
              </b-btn>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    innerText: {
      type: String,
      default: '',
    },
  },
};

</script>

<style scoped>
  .container-no-padding {
    padding: 0;
  }
  .loginImage{
    width: 100%;
    height: 100%;
  }
  ::v-deep .modal-dialog {
    max-width: 55%;
  }

  ::v-deep .modal-body {
    padding: 0;
  }

  .title {
    font-family: HelveticaNeue,sans-serif;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.75;
    letter-spacing: 0.5px;
    color: #daa270;
  }

  .inertext {
    font-family: HelveticaNeue,sans-serif;
    font-size: 22px;
    line-height: 1.64;
    letter-spacing: 0.3px;
    color: #4a4a4a;
  }


  .btn-primary {
    border-radius: 20px;
    box-shadow: none !important;
    background-color: #daa270;
    border: none;
  }

  .btn-primary:hover {
    background-color: #e1b58d;
  }

  .btn-primary:active {
    background-color: #ce8d53 !important;
  }

  .btn-light {
    background: none;
    border: none;
  }

</style>
