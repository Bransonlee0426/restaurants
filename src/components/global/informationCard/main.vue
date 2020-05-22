<template>
  <b-row no-gutters @click="OnSelect"
         @mouseover="mouseover=true"
         @mouseleave="mouseover = false"
         class="info-card">
    <b-col>
      <b-card class="card" :img-src="getImageSrc" img-top img-height="140">
        <b-card-text class="type">{{itemData.tags[0].text}}</b-card-text>
        <b-card-text class="name">{{itemData.name}}</b-card-text>
        <b-card-text class="price">{{getPrice}}</b-card-text>
        <!-- <b-card-text class="edit-time">{{getEditTime}}</b-card-text> -->
      </b-card>
      <div v-if='showMask' :class="[{'mask': isSelected||mouseover}]"></div>
      <i v-if='isSelectType'
         :class="[isSelected ? 'fas fa-check-circle' : 'far fa-circle' , 'oval']"></i>
      <i v-if='isDelete'
         class="fas fa-times-circle delete" @click="OnDelete"></i>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'informationCard',
  props: {
    itemData: {},
    isSelectType: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelected: false,
      mouseover: false,
    };
  },
  computed: {
    showMask() {
      return this.dark || this.select || this.mouseover;
    },
    getEditTime() {
      const timeMessage = '最後編輯時間:';
      return (
        timeMessage
        + this.$moment(this.itemData.updated_at).format('YYYY/MM/DD hh:mm')
      );
    },
    getPrice(a) {
      if (this.itemData.price !== 0) {
        return `${this.itemData.price}`;
      }
      return '';
    },
    getImageSrc() {
      const randomNum = Math.random();
      let imgUrl = `https://s3-ap-northeast-1.amazonaws.com/dishrank-dish-images/${this.itemData.restaurantId}/`;
      if (this.itemData.id === undefined) {
        if (this.itemData.images !== null) {
          imgUrl += `${this.itemData.dishId}/${this.itemData.images[0]}?${randomNum}`;
        } else {
          imgUrl = 'https://i.ibb.co/j8LNS2j/noImage.jpg';
        }
      } else {
        imgUrl += `${this.itemData.id}/${this.itemData.images[0]}?${randomNum}`;
      }
      return imgUrl;
    },
  },
  methods: {
    OnSelect() {
      if (this.isSelectType) {
        this.isSelected = !this.isSelected;
        if (this.isSelected) {
          this.$emit('isSelected', this.itemData);
        } else {
          this.$emit('unSelected', this.itemData);
        }
      } else {
        this.$emit('detail', this.itemData);
      }
    },
    OnDelete() {
      this.$emit('delete', this.itemData);
    },
  },
};
</script>

<style scoped>
.info-card {
  margin: 8px;
  cursor: pointer;
}

.card {
  width: 240px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 #cdcdcd;
  background-color: #ffffff;
}

.card .card-img-top {
  max-height: 142px;
  max-width: 240px;
}

.card-body {
  padding:10px
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 240px;
  min-height: 240px;
  opacity: 0.9;
  border-radius: 5px;
  background-color: #ffffff;
}

.oval {
  position: absolute;
  color: #005a4a;
  top: 8px;
  right: 8px;
}

.delete {
  position: absolute;
  top: -6px;
  right: -6px;
  color: red;
}

.type {
  font-family: PingFangTC,sans-serif;
  font-size: 12px;
  color: #daa270;
  margin-block-start: 0;
  margin-block-end: 0;
}

.name {
  font-size: 16px;
  font-weight: 500;
  margin-block-start: 0;
  margin-block-end: 0;
}

.price {
  font-size: 12px;
  margin: 0px;
}

.edit-time {
  font-size: 10px;
  color: #9b9b9b;
}
</style>
