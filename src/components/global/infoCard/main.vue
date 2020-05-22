<template>
  <div>
    <b-row>
      <b-col>{{title}}</b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="text-center">
          <ul class="card-ul">
            <li class="card-li" v-for="o in data" :key="o">
              {{'列表内容 ' + o }}
            </li>
          </ul>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'infoCard',
  props: {
    title: null,
    data: null,
  },
};
</script>

<style lang="scss" scoped>
.card-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
}
.card-li {
  display: flex;
  line-height: 1.5;
  width: 50%;
  list-style-type: none;
}
</style>
