<template>
  <b-row>
    <b-col class="radio-col">
      <label class="mr-3">{{label}}</label>
      <b-form-radio-group
        id="radio-group-1"
        v-model="myStatus"
        :options="options"
        @input="()=>{this.$emit('input',myStatus)}"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'promptRadio',
  props: {
    options: Array,
    status: Number,
    label: String,
  },
  data() {
    return {
      myStatus: this.status,
    };
  },
  methods: {},
  watch: {
    status: {
      handler(newValue) {
        const vm = this;
        vm.myStatus = newValue;
        vm.$emit('input', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-col {
  display: flex;
}
</style>
