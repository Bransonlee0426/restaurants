<template>
  <div class="info-from">
    <b-card no-body class="card-body">
      <div>Dish Ingredient</div>
      <div class="line"></div>
      <b-row class='card-content'>
        <b-col>
          <prompt-input title="Name" placeholder='請輸入食材名稱' class="mb-3"></prompt-input>
          <prompt-input title="Ingredient Type" placeholder='請輸入食材名稱' class="mb-3"></prompt-input>
        </b-col>
        <b-col>
          <prompt-input title="Quantity" placeholder='請輸入輸量' class="mb-3"></prompt-input>
          <prompt-input title="Measurement" placeholder='請輸入單位' class="mb-3"></prompt-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {

};

</script>

<style scoped>
  .info-from {
    padding: 10px 60px;
  }

  .card-body {
    padding: 30px;
    box-shadow: 0 2px 5px 0 #cdcdcd;
    background-color: #ffffff;
    margin-bottom: 20px;
  }

  .line {
    height: 1px;
    margin-bottom: 32px;
    border: solid 1.5px #000000;
  }

  .card-content {
    padding-left: 50px;
    padding-right: 50px;
  }

</style>
