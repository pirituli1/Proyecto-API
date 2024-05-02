<template>
  <section class="top">
    <h3>PokemonApiTest</h3>
    <img src="/src/assets/pikachuHome.jpg" class="pikachuHome">
    <p>Ejercicio realizado por:</p>
    <v-list class="listDev">
      <span>Desarrolladores: </span>
      <v-list-item><a href="https://github.com/ErandyLuna">>>Erandy Luna de los Santos<<</a></v-list-item>
      <v-list-item><a href="https://github.com/pirituli1">>>Bautista Velasco Carlos<<</a></v-list-item>
    </v-list>
    <v-btn @click="toggleHome">Iniciar</v-btn>
  </section>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    toggleHome() {
      this.$emit('toggle-home');
    },
  },
};
</script>

  <style>
  .top {
    text-align: center;
  }
  
  .pikachuHome{
    width: 40%;
    height: auto;
  }
  .top h3 {
    text-align: center;
      font-size:30px; font-weight:300; color:#222; letter-spacing:1px;
      text-transform: uppercase;
  
      margin-top: 1%;
  
      display: grid;
      grid-template-columns: 1fr max-content 1fr;
      grid-template-rows: 27px 0;
      grid-gap: 20px;
      align-items: center;
  }
  
  .top h3:after,
  .top h3:before {
    content: " ";
      display: block;
      border-bottom: 1px solid #c50000;
      border-top: 1px solid #c50000;
      height: 5px;
    background-color:#f8f8f8;
  }
  
  .top span{
    font-size:medium;
  
  }
  
  .listDev{
    font-style: italic;
    padding-top: 0%;
  }
  
  .listDev a{
    text-decoration:none;
    color:black;
  }
  </style>
