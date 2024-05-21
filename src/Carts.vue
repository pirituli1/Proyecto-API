<template>
  <div class="contenedor">
    <LoadingScreen :loading="loading" v-if="loading" />
    <v-container>
      <SearchBar @search="buscarPokemon" />
      <v-row>
        <v-col
          v-for="pokemon in paginatedPokemons"
          :key="pokemon.nombre"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card outlined>
            <v-carousel
              :continuous="false"
              :show-arrows="true"
              delimiter-icon="mdi-square"
              height="300"
              hide-delimiter-background
              class="cartsBackground"
            >
              <v-carousel-item
                v-for="(imagen, index) in [pokemon.imagenes.img, pokemon.imagenes.imgAdicional]"
                :key="index"
              >
                <v-img :src="imagen" :alt="'Imagen de ' + pokemon.nombre"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-card-title class="text-h5">{{ pokemon.nombre }}</v-card-title>
            <v-card-text>
              <v-card-item>
                <div class="textCard">
                  <p> id: {{ pokemon.id}}</p>
                  <p> peso: {{ pokemon.peso / 10 }} kilos</p>
                  <p> altura: {{ pokemon.altura /10 }} metros  </p>
                </div>
              </v-card-item>
            </v-card-text>
            <v-dialog max-width="800">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="BotonTarjeta" v-bind="activatorProps" color="surface-variant" text="Detalles" variant="flat"></v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <BottonDialog :pokemonid="pokemon.id" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <v-dialog max-width="1000">
              <template v-slot:activator="{ props: activatorProps }">
                <div class="btn1">
                  <v-btn class="BotonTarjeta" text="Galeria" v-bind="activatorProps" variant="flat"></v-btn>
                </div>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <galeria :pokemonid="pokemon.id" />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="paginaActual"
        :length="totalPaginas"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        @input="cambiarPagina"
      ></v-pagination>
    </v-container>
  </div>
</template>


<script>
import { getAllPokemonData } from './apis/apiPokemon';
import BottonDialog from './dialogCarts.vue';
import galeria from './galeria';
import LoadingScreen from './LoadingScreen.vue';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    BottonDialog,
    galeria,
    LoadingScreen,
    SearchBar,
  },
  data() {
    return {
      pokemons: [],
      loading: true,
      paginaActual: 1,
      totalPaginas: 1,
      pokemonsPorPagina: 9,
      searchQuery: '',
    };
  },
  computed: {
    filteredPokemons() {
      if (!this.searchQuery) {
        return this.pokemons;
      }
      const query = this.searchQuery.toLowerCase();
      return this.pokemons.filter(pokemon => 
        pokemon.nombre.toLowerCase().includes(query) || 
        pokemon.id.toString().includes(query)
      );
    },
    paginatedPokemons() {
      const inicio = (this.paginaActual - 1) * this.pokemonsPorPagina;
      const fin = this.paginaActual * this.pokemonsPorPagina;
      return this.filteredPokemons.slice(inicio, fin);
    },
  },
  watch: {
    filteredPokemons() {
      this.totalPaginas = Math.ceil(this.filteredPokemons.length / this.pokemonsPorPagina);
      this.cambiarPagina(1); // Reinicia a la primera página al filtrar
    },
  },
  async created() {
    try {
      this.pokemons = await getAllPokemonData();
      this.totalPaginas = Math.ceil(this.pokemons.length / this.pokemonsPorPagina);
    } catch (error) {
      console.error('Error al cargar los datos de los Pokémon:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    cambiarPagina(page) {
      this.paginaActual = page;
    },
    buscarPokemon(query) {
      this.searchQuery = query;
    },
  },
};
</script>



<style>
.img2 {
  float: right; /* Posiciona la imagen a la derecha */
  /* Opcional: ajusta el tamaño de la imagen */
  height: auto; /* Mantener la proporción de aspecto */
}

.contenedor {
  background-image: url('./assets/fondoPokemon2.jpeg');
  background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.text-h5 {
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  background-image: url('./assets/cintaCarts.jpg');
  background-color: #03a9f4;
  color: #c62828;
  background-position: center center; /* Centra horizontal y verticalmente */
  background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.BotonTarjeta {
  background-color: #74992e;
  color: #85c1e9;
  border-style: center;
  padding: 1px 15px; /* Aumentamos el relleno para mayor separación */
  border-width: 2px; /* Ajustamos el tamaño del borde */
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 5%;
  margin-left: 120px;
}

.cartsBackground {
  background-image: url('./assets/image.png');
  background-position: center center; /* Centra horizontal y verticalmente */
  background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.textCard {
  font-size: 20px;
  font-weight: bold;
  color: #2e4053;
  text-align: start;
  font-family: 'Press Start 2P', cursive;
  margin-left: 140px;
  border-width: 15px;
}

ul {
  list-style-type: none; /* Quitamos la viñeta predeterminada */
}

li {
  padding-left: 20px; /* Agregamos espacio para la imagen de viñeta */
  background-repeat: no-repeat; /* Evitamos que la imagen de viñeta se repita */
  background-position: 0 50%; /* Alineamos la imagen de viñeta */
}

.titulo {
  color: #f1c40f;
  font-weight: bold;
  text-align: center;
  font-size: 50px;
  letter-spacing: 2px;
  padding: 2px;
  text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em #4dd0e1;
  text-transform: uppercase;
}
</style>
