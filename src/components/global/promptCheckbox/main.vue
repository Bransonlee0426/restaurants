<template>
  <b-row>
    <b-col class="checkbox-col">
      <label for="checkbox-group-1" class="mr-3">{{label}}</label>
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        name="flavour-1"
        @input="selection(selected)"/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'promptCheckbox',
  props: {
    label: String,
    options: Array,
    offerTime: Array,
  },
  data() {
    return {
      selected: this.offerTime, // Must be an array reference!
    };
  },
  methods: {
    selection(selected) {
      const vm = this;
      vm.$emit('input', selected);
    },
  },
  watch: {
    offerTime: {
      immediate: true,
      handler(newValue) {
        const vm = this;
        vm.selected = newValue;
        vm.$emit('input', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-col {
  display: flex;
}

</style>
