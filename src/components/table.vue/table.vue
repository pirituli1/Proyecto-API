<template>
  <p class="tituloTable">Buscar pokemon por tipos</p>
  <p class="textoTable">
    Podrás buscar tus pokemon por tipos. Por favor selecciona 2 tipos.
  </p>
  <div class="dialog">
    <!-- Boton 1 -->
    <v-btn @click="dialogTipo1 = true"> TIPO1: {{ tipo1 }} </v-btn>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogTipo1"
      width="auto"
    >
      <!-- Contenido del diálogo -->
      <dialogTable :tipo1="tipo1" :tipo2="tipo2" :tipos="tipos" :botton1="botton1" ></dialogTable>

      <v-btn class="ms-auto" text="Cerrar" @click="dialogTipo1 = false"></v-btn>
    </v-dialog>

    <!-- Boton 2 -->
    <v-btn @click="dialogTipo2 = true"> TIPO2: {{ tipo2 }} </v-btn>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogTipo2"
      width="auto"
    >
      <!-- Contenido del diálogo -->
      <dialogTable :tipo1="tipo1" :tipo2="tipo2" :tipos="tipos" :botton2="botton2" ></dialogTable>

      <v-btn class="ms-auto" text="Cerrar" @click="dialogTipo2 = false"></v-btn>
    </v-dialog>

    <v-btn @click="randomizar">
      <!-- !! incluir botón o imagen de recarga !! -->
    </v-btn>
  </div>

  <div class="table">
    <div v-if="loading"> <LoadingScreen :loading="loading" v-if="loading"></LoadingScreen> </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Pokemon</th>
          <th class="text-left">Tipo 1</th>
          <th class="text-left">Tipo 2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pokemon in filteredPokemon" :key="pokemon.nombre">
          <td>{{ pokemon.nombre }}</td>
          <td>{{ pokemon.tipos.tipo1 }}</td>
          <td>{{ pokemon.tipos.tipo2 }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { getTypePokemon } from "@/apis/apiPokemon";
import LoadingScreen from "@/LoadingScreen.vue";
import dialogTable from "@/dialogCarts.vue"

export default {
  components:{
    LoadingScreen,
    dialogTable
  },
  data() {
    return {
      pokemon: [],
      filteredPokemon: [], // Lista filtrada de Pokémon
      dialogTipo1: false,
      dialogTipo2: false,
      tipos: [
        "grass",
        "poison",
        "fire",
        "rock",
        "water",
        "bug",
        "ghost",
        "flying",
        "normal",
        "fairy",
        "ground",
        "electric",
        "dark",
        "ice",
        "steel",
        "psychic",
        "fighting",
        "dragon",
      ],
      tipo1: "",
      tipo2: "",
      loading: true,
      botton1: true,
      botton2: true,

    };
  },
  methods: {
    async randomizar() {
      // Generar tipos aleatorios
      const randomIndex1 = Math.floor(Math.random() * this.tipos.length);
      let randomIndex2 = Math.floor(Math.random() * this.tipos.length);

      // while (randomIndex2 === randomIndex1) {
      //   randomIndex2 = Math.floor(Math.random() * this.tipos.length);
      // }

      this.tipo1 = this.tipos[randomIndex1];
      this.tipo2 = this.tipos[randomIndex2];

      // Filtrar Pokémon
      this.filterPokemon();
    },
    async filterPokemon()  {
      // Filtrar Pokémon basado en los tipos seleccionados
      this.loading = true;
      try {
        if(this.tipo1 === this.tipo2){
          this.filteredPokemon = this.pokemon.filter((poke)=> (poke.tipos.tipo1 === this.tipo1));
        }
        else if(this.tipo1 && this.tipo2) {
          this.filteredPokemon = this.pokemon.filter(
            (poke) =>
              (poke.tipos.tipo1 === this.tipo1 && poke.tipos.tipo2 === this.tipo2) ||
              (poke.tipos.tipo1 === this.tipo2 && poke.tipos.tipo2 === this.tipo1)
          );
        } else if (this.tipo1) {
          this.filteredPokemon = this.pokemon.filter(
            (poke) =>
              poke.tipos.tipo1 === this.tipo1 || poke.tipos.tipo2 === this.tipo1
          );
        } else if (this.tipo2) {
          this.filteredPokemon = this.pokemon.filter(
            (poke) =>
              poke.tipos.tipo1 === this.tipo2 || poke.tipos.tipo2 === this.tipo2
          );
        } else {
          // Si no se han seleccionado tipos, mostrar todos los Pokémon
          this.filteredPokemon = [...this.pokemon];
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    // Obtener todos los Pokémon
    this.pokemon = await getTypePokemon();
    const randomIndex1 = Math.floor(Math.random() * this.tipos.length);
    let randomIndex2 = Math.floor(Math.random() * this.tipos.length);
    
    // Asegúrate de que el segundo tipo no sea igual al primero
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * this.tipos.length);
    }
     // Asigna los tipos aleatorios a las variables tipo1 y tipo2
     this.tipo1 = this.tipos[randomIndex1];
    this.tipo2 = this.tipos[randomIndex2];
    // Filtrar Pokémon inicialmente
    this.filterPokemon();
    this.loading = false;
  },
};
</script>

<style></style>
