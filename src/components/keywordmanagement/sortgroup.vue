<template>
  <div class="list-group-item">
    <i class="fa fa-align-justify handle" v-if="isSort"></i>
    <i class="fa fa-angle-down" v-if="isShow" @click="onShowItem"></i>
    <i class="fa fa-angle-right" v-else @click="onShowItem"></i>
    <b-input v-if="isEdit" v-model="list.text" @blur="saveElement" @keydown.enter="saveElement">
    </b-input>
    <label class="item-title" @dblclick="onFixContent" v-else>{{list.text}}</label>
    <b-btn class="item-btn" @click="()=>{$emit(`Add`)}">ADD</b-btn>
    <b-btn class="item-btn" @click="()=>{$emit(`Sort`)}">排序</b-btn>
    <b-btn class="item-btn" v-if="list.status === 0" @click="OnDisable">禁用</b-btn>
    <b-btn class="item-btn" v-else @click="OnEnable">啟用</b-btn>
    <b-row>
      <b-col>
        <b-collapse :visible="isShow" id="0">
          <draggable class="data-box" :list="list.subitem" handle=".handle">
            <slot :data="element" v-for="element in list.subitem"></slot>
          </draggable>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  name: 'sort-group',
  data() {
    return {
      newItemName: '',
      isShow: true,
      isEdit: false,
    };
  },
  props: {
    isSort: {
      type: Boolean,
      default: false,
    },
    list: {},
  },
  methods: {
    onShowItem() {
      this.isShow = !this.isShow;
    },
    onFixContent() {
      this.isEdit = true;
    },
    saveElement() {
      this.isEdit = false;
      this.$keyCategories.Update({
        id: this.list.id,
        text: this.list.text,
        status: this.list.status,
      });
    },
    OnDisable() {
      this.$keyCategories.Update({
        id: this.list.id,
        text: this.list.text,
        status: 1,
      }, () => {
        this.list.status = 1;
      });
    },
    OnEnable() {
      this.$keyCategories.Update({
        id: this.list.id,
        text: this.list.text,
        status: 0,
      }, () => {
        this.list.status = 0;
      });
    },
  },
};

</script>

<style lang="scss">
  .list-group-item {
    margin: 4px 10px;
  }

  .fa {
    margin-right: 8px;
  }

  .item-title {
    margin-left: 10px;
    margin-right: 10px;
  }

  .item-btn {
    width: 100px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 20px;
    box-shadow: none !important;
    background-color: #daa270;
    border: none;
  }

  .item-btn:hover {
    background-color: #e1b58d;
  }

  .item-btn:active {
    background-color: #ce8d53;
  }

  .data-box {
    margin: 12px;
  }

</style>
