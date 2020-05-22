<template>
  <b-container class="form" fluid >
    <b-row no-gutters>
      <b-col>
        <function-bar
          pagename="Key Word Management"
          :btn_list="tool"
          @add='onAddClick'
          @sortby='onSortClick'
        ></function-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="search-bar">
        <b-input v-model='search' @input="filtered" placeholder="收尋關鍵字" />
      </b-col>
    </b-row>
    <draggable :list="list" handle=".handle">
      <sortGroup
        :list="keyGroup" :key="item" :isSort="sortBy"
        v-for="(keyGroup,item) in list"
        @Sort="onBtnSortClick(keyGroup)" @Add="onItemAddClick(keyGroup.id)">
        <sortItem
          slot-scope="data"
          :item="data.data"
          :ref="keyGroup.id"/>
      </sortGroup>
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
import sortGroup from '@/components/keywordmanagement/sortgroup.vue';
import sortItem from '@/components/keywordmanagement/sortitem.vue';

export default {
  name: 'KeyWordManagement',
  components: {
    draggable,
    sortGroup,
    sortItem,
  },
  data() {
    return {
      tool: [{
        type: 'sortby',
        event: 'sortby',
      }, {
        type: 'add',
        event: 'add',
      }],
      list: [],
      newTypeName: '',
      newItemName: '',
      nowIdx: 0,
      sortBy: false,
      dragging: false,
      search: '',
    };
  },
  methods: {
    getAllKeyWord() {
      this.$keyCategories.GetAll((res) => {
        this.list = res.data;
      });
    },
    onAddClick() {
      this.$root.$emit('bv::show::modal', 'addType');
    },
    onAddOkClick() {
      this.$keyCategories.Create({
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
      });
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
      this.$keySubItem.Create({
        keywordCategoryId: this.nowIdx,
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
      });
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
        this.$keyCategories.UpdateSort({
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
        this.$keySubItem.UpdateSort({
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
        this.getAllKeyWord();
      }
    },
  },
  mounted() {
    this.getAllKeyWord();
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
