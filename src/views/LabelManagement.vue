<template>
  <b-container fluid class="form">
    <b-row no-gutters>
      <b-col>
        <function-bar pagename="Label Management" :btn_list='tool' @add='onAddClick'
                      @sortby='onSortClick' ></function-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="search-bar">
        <b-input v-model='search' @input="filtered" placeholder="收尋關鍵字" />
      </b-col>
    </b-row>
    <draggable :list="list" handle=".handle">
      <sortgroup :list="element" v-for="(element,item) in list" :key="item" :isSort="sortBy"
        @Sort="onBtnSortClick(element)" @Add="onItemAddClick(element.id)">
        <sortitem slot-scope="data" :item="data.data" :ref=element.id />
      </sortgroup>
    </draggable>
    <b-modal id="addType" title="請輸入大類名稱" @ok="onAddOkClick">
      <b-input v-model="newTypeName" />
    </b-modal>
    <b-modal id="addItem" title="請輸項目名稱" @ok="onAddItemOkClick">
      <b-input v-model="newItemName" />
    </b-modal>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable';
import sortgroup from '@/components/labelmanagement/sortgroup.vue';
import sortitem from '@/components/labelmanagement/sortitem.vue';

export default {
  components: {
    draggable,
    sortgroup,
    sortitem,
  },
  data() {
    return {
      newTypeName: '',
      newItemName: '',
      nowIdx: 0,
      search: '',
      tool: [{
        type: 'sortby',
        event: 'sortby',
      }, {
        type: 'add',
        event: 'add',
      }],
      sortBy: false,
      list: [],
      dragging: false,
    };
  },
  methods: {
    getTypeData() {
      this.$tagCategories.GetAll((res) => {
        this.list = res.data;
      },
      this.error1);
    },
    onAddClick() {
      this.$root.$emit('bv::show::modal', 'addType');
    },
    onAddOkClick() {
      this.$tagCategories.Create({
        text: this.newTypeName,
        sort: this.list.length + 1,
      }, (res) => {
        if (res.status.indexOf('000000') !== -1) {
          const newdata = {
            id: res.data.id,
            text: res.data.text,
            subitem: [],
            status: 0,
          };
          this.list.push(newdata);
        }
      }, this.error1);
      this.newTypeName = '';
    },
    onItemAddClick(idx) {
      this.nowIdx = idx;
      this.$root.$emit('bv::show::modal', 'addItem');
    },
    onAddItemOkClick() {
      let newSort = 1;
      this.list.forEach((element) => {
        if (element.id === this.nowIdx && element.subitem != null) {
          newSort = element.subitem.length + 1;
        }
      });
      this.$tagSubItem.Create({
        tagCategoryId: this.nowIdx,
        text: this.newItemName,
        sort: newSort,
      }, (res) => {
        const newData = {
          id: res.data.id,
          text: res.data.text,
          status: 0,
        };
        this.list.forEach((tagList) => {
          if (tagList.id === this.nowIdx) {
            if (tagList.subitem === null) {
              // eslint-disable-next-line no-param-reassign
              tagList.subitem = [newData];
            } else {
              tagList.subitem.push(newData);
            }
          }
        });
        this.newItemName = '';
      }, () => {});
    },
    onSortClick() {
      if (this.sortBy === true) {
        const sortList = [];
        let i = 1;
        this.list.forEach((element) => {
          const item = {
            id: element.id,
            sort: i,
          };
          sortList.push(item);
          i += 1;
        });
        this.$tagCategories.UpdateSort({
          sort: JSON.stringify(sortList),
        });
      }
      this.sortBy = !this.sortBy;
    },
    onBtnSortClick(element) {
      this.$refs[element.id].forEach((item) => {
        item.onSortClick();
      });
      if (!this.$refs[element.id][0].isSort) {
        const sortList = [];
        let i = 1;
        element.subitem.forEach((subItem) => {
          const item = {
            id: subItem.id,
            sort: i,
          };
          sortList.push(item);
          i += 1;
        });
        this.$tagSubItem.UpdateSort({
          sort: JSON.stringify(sortList),
        });
      }
    },
    filtered() {
      const this2 = this;
      if (this2.search !== '') {
        this2.list.forEach((tagList) => {
          if (tagList.subitem !== null) {
            // eslint-disable-next-line no-param-reassign
            tagList.subitem = tagList.subitem
              .filter(item => item.text.toLowerCase()
                .indexOf(this2.search.toLowerCase()) !== -1);
          }
        });
      } else {
        this.getTypeData();
      }
    },
  },
  mounted() {
    this.getTypeData();
  },
};

</script>

<style lang="scss">
  .form {
    background-color: #eaeaea;
    min-height: 100vh;
    padding: 0;
  }

  .search-bar {
    padding: 10px 30px;
  }

</style>
