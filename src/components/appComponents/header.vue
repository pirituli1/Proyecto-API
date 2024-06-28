
  <template>
      <div class="Header">
          <img src="./assets/pikachuIcon.ico" alt="Pokémon" class="img1" />
          <v-btn @click="navigateToHome">HOME</v-btn>
          <v-btn @click="navigateToCarts">CARTS</v-btn>
          <v-btn @click="navigateToTable">TABLE</v-btn>
          <img src="./assets/pikachuIcon.ico" alt="Pokémon" class="img2" />
        </div>
  </template>

  <script>
  import { RouterLink } from "vue-router";
export default {
  name: "header",
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