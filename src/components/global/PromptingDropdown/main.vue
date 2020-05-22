<template>
  <div>
    <h1 class="dropdown-title" v-show="title !== ''">{{title}}</h1>
    <b-dropdown class="dropdown-content"
                :text="innerPlaceholder"
                :right="right"
                :disabled="disabled"
                :no-caret="nocaret">
      <b-dropdown-item-button
        class="dropdown-item" v-for="item in displayArray"
        :key="item.id" @click="itemClicked(item)">
        {{item.text}}
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'promptDropdown',
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      default: '',
    },
    right: {
      type: Boolean,
      default: false,
    },
    displayKey: {
      type: String,
      default: 'text',
    },
    returnID: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    enableFirst: {
      type: Boolean,
      default: false,
    },
    nocaret: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerPlaceholder: '',
    };
  },
  model: {
    prop: 'selected',
    event: 'change',
  },
  mounted() {
    this.innerPlaceholder = this.placeholder;
  },
  computed: {
    displayArray() {
      return this.items.map((item, index) => {
        const temp = { text: item[this.displayKey].toString() };
        if (this.returnID) {
          if ('id' in item) {
            temp.id = item.id;
          } else {
            temp.id = index.toString();
          }
        }
        return temp;
      });
    },
  },
  methods: {
    itemClicked(item) {
      this.innerPlaceholder = item.text;
      if (this.returnID) {
        this.$emit('change', item.id);
      } else {
        this.$emit('change', item.text);
      }
    },
  },
  watch: {
    selected() {
      this.displayArray.forEach((item) => {
        if (this.returnID) {
          if (this.selected === item.id) {
            this.innerPlaceholder = item.text;
          }
        } else {
          this.innerPlaceholder = this.selected;
        }
      });
    },
    items(newValue) {
      if (newValue.length > 0 && this.enableFirst) {
        const firstItem = this.displayArray[0];
        this.itemClicked(firstItem);
      }
    },
  },
};
</script>

<style scoped>
.dropdown-title {
  padding-left: 4px;
  font-size: 14px;
  font-family: HelveticaNeue;
  color: #4a4a4a;
}

.dropdown-content {
  min-width: 100%;
  border: solid 1px #9b9b9b;
  box-shadow: none;
}

::v-deep .dropdown-toggle {
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: #495057;
  font-size: 14px;
  text-align: left;
}

::v-deep .dropdown-toggle:active {
  color: white;
  background-color: #9b9b9b !important;
  box-shadow: none;
}

::v-deep .dropdown-toggle:focus {
  box-shadow: none !important;
}

::v-deep .btn-secondary.dropdown-toggle {
  color: #9b9b9b;
  background-color: transparent !important;
  box-shadow: none;
  border: none;
}

::v-deep .dropdown-toggle::after {
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 20px;
}

.dropdown-item {
  padding: 0px;
  font-size: 14px;
  width: 100%;
  height: 40px !important;
}

::v-deep .dropdown-item {
  padding: 0px 10px;
  height: 100%;
}

.dropdown-item:hover {
  background-color: #daa270;
}

::v-deep .dropdown-item:hover {
  background-color: #daa270;
  color: white;
}

::v-deep .dropdown-menu {
  width: 100%;
  height: auto;
  max-height: 168px;
  overflow-x: hidden;
  border-radius: unset;
  border: solid 1px #9b9b9b;
}
</style>
