<template>
  <div class="list-group-item">
    <i class="fa fa-align-justify handle" v-show="isSort"></i>
    <b-input v-if="isEdit" v-model="item.text" @blur="saveElement" @keydown.enter="saveElement" />
    <label class="item-title" v-else @dblclick="onFixContent">{{item.text}}</label>
    <b-btn class="item-btn" v-if="item.status === 0" @click="OnDisable">禁用</b-btn>
    <b-btn class="item-btn" v-else @click="OnEnable">啟用</b-btn>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
  },
  data() {
    return {
      isEdit: false,
      isSort: false,
    };
  },
  methods: {
    onFixContent() {
      this.isEdit = true;
    },
    saveElement() {
      this.isEdit = false;
      this.$tagSubitem.Update({
        id: this.item.id,
        text: this.item.text,
        status: this.item.status,
      });
    },
    onSortClick() {
      this.isSort = !this.isSort;
    },
    OnDisable() {
      this.$tagSubitem.Update({
        id: this.item.id,
        text: this.item.text,
        status: 1,
      }, () => {
        this.item.status = 1;
      });
    },
    OnEnable() {
      this.$tagSubitem.Update({
        id: this.item.id,
        text: this.item.text,
        status: 0,
      }, () => {
        this.item.status = 0;
      });
    },
  },
};

</script>
