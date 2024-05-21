<template>
  <div class="Header">
    <img src="./assets/pikachuIcon.ico" alt="Pokémon" class="img1" />
    <v-btn @click="navigateToHome">HOME</v-btn>
    <v-btn @click="navigateToCarts">CARTS</v-btn>
    <v-btn @click="navigateToTable">TABLE</v-btn>
    <img src="./assets/pikachuIcon.ico" alt="Pokémon" class="img2" />
  </div>

  <RouterView></RouterView>

  <div class="Footer">

  </div>
</template>

<script>
import Home from "./home.vue"; //Pantalla inicio
import LoadingScreen from "./LoadingScreen.vue"; //Pantalla de carga
import carts from "./Carts.vue";
import galeria from "./galeria.vue";
import { RouterLink } from "vue-router";

export default {
  name: "App",
  components: {
    Home,
    LoadingScreen,
    carts,
    galeria,
  },
  data() {
    return {
      home: true, //True si se muestra pantalla de inicio
      loading: false, //True si se muestra pantalla de carga
    };
  },
  methods: {
    //Metodo que nos permite cambiar nuestra pantalla de carga
    toggleHome() {
      this.home = false;
    },
    navigateToHome() {
      this.$router.push("/");
    },
    navigateToCarts() {
      this.$router.push("/carts");
    },
    navigateToTable() {
      this.$router.push("/table");
    },
  },
};
</script>

<style>
.top {
  text-align: center;
}

.pikachuHome {
  width: 30%;
  height: auto;
}
.top h3 {
  text-align: center;
  font-size: 30px;
  font-weight: 300;
  color: #222;
  letter-spacing: 1px;
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
  background-color: #f8f8f8;
}

.top span {
  font-size: medium;
}

.listDev {
  font-style: italic;
  padding-top: 0%;
}

.listDev a {
  text-decoration: none;
  color: black;
}
</style>
