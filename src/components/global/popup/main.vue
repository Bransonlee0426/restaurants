<template>
  <b-modal :id='id' :ok-title='data.okTitle' :cancel-title='data.cancelTitle' centered
    @ok="()=>{this.$emit('ok')}" @hidden="()=>{this.$emit('cancel')}"
    :ok-only='okOnly'>
    <h6>{{data.message}}</h6>
  </b-modal>
</template>

<script>
import typeList from './typelist';

export default {
  name: 'popup',
  props: {
    type: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: 'popup',
    },
  },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    okOnly() {
      return this.data.cancelTitle === '';
    },
  },
  watch: {
    type() {
      typeList.forEach((item) => {
        if (this.type === item.type) {
          this.data = item;
        }
      });
    },
  },
};

</script>

<style scoped>
  ::v-deep .modal-content {
    width: 500px;
    height: 260px;
    border-radius: 5px;
  }

  ::v-deep .modal-header {
    border: none;
  }

  ::v-deep .modal-body {
    font-family: PingFangTC;
    font-size: 16px;
    font-weight: 500;
    padding-top: 9%;
    text-align: center;
    color: #4a4a4a;
  }

  ::v-deep .modal-footer {
    justify-content: space-evenly;
    padding-bottom: 28px;
    border: none;
  }

  ::v-deep .btn-secondary,
  ::v-deep .btn-primary {
    width: 180px;
    height: 36px;
    border-radius: 20px;
    box-shadow: none !important;
    background-color: #daa270 !important;
    border: none;
  }

  ::v-deep .btn-secondary:hover,
  ::v-deep .btn-primary:hover {
    background-color: #e1b58d !important;
  }

  ::v-deep .btn-secondary:active,
  ::v-deep .btn-primary:active {
    background-color: #ce8d53 !important;
  }

</style>
