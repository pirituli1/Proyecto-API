<template>
  <img src="./assets/pikachuIcon.ico" alt="Pokémon" class ="img1"> 
  <!-- img pokemon  -->
  <img src="./assets/pikachuIcon.ico" alt="Pokémon" class ="img2">
  <div class="contenedor">
    <LoadingScreen :loading="loading" v-if="loading" />

    
    <v-container>
      <!-- Componente de búsqueda -->
      <browser @buscarPokemon="buscarPokemon" class="browser" />

      <v-row>
        <!-- Agregar bien el v-for -->
        <v-col
          v-for="pokemon in pokemonsPaginados"
          :key="pokemon.nombre"
          cols="12"
          sm="6"
          md="4"
        >
          <!-- Contenido del Pokémon -->
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
                v-for="(imagen, index) in [pokemon.img, pokemon.imgAdicional]"
                :key="index"
              >
                <v-img
                  :src="imagen"
                  :alt="'Imagen de ' + pokemon.nombre"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-card-title class="text-h5">{{ pokemon.nombre }}</v-card-title>
            <v-card-text>
              <v-card-item>
                <div class="textCard">

                  <!-- <a class="titleCard">{{ pokemon.id }}</a> -->
                  <p>Altura: {{ pokemon.altura }}</p>
                  <p>Peso: {{ pokemon.peso / 10 }}</p>
                  <p>Habilidades:</p>
                  <ul>
                    <li v-if="pokemon.habilidad1">
                      Habilidad 1:{{ pokemon.habilidad1 }}
                    </li>
                    <li v-if="pokemon.habilidad2">
                      Habilidad 2:{{ pokemon.habilidad2 }}
                    </li>
                  </ul>

                </div>
              </v-card-item>
              <table></table>
            </v-card-text>

            <!-- Boton para detalles -->
            <v-dialog max-width="800">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="BotonTarjeta"
                  v-bind="activatorProps"
                  color="surface-variant"
                  text="Detalles"
                  variant="flat"
                ></v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <BottonDialog :pokemonid="pokemon.id" />
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      text="Cerrar"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <!-- Boton para galeria -->

            <v-dialog max-width="1000">
              <template v-slot:activator="{ props: activatorProps }">
                <div class="btn1">
                  <!-- !! HEX INCORRECTO EN EL COLOR eliminado: color="#5DADE2 "  -->
                  <v-btn
                    class="BotonTarjeta"
                    text="Galeria"
                    v-bind="activatorProps"
                    variant="flat"
                  ></v-btn>
                </div>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <!-- Galeria -->
                    <galeria :pokemonid="pokemon.id" />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Cerrar"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <v-pagination
      v-model="paginaActual"
      :length="totalPaginas"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      @input="cambiarPagina"
    ></v-pagination>
  </div>
</template>

<script>
import { API_URL, POKEMON_ENDPOINT } from "./components/rutas";
import BottonDialog from "./dialogCarts.vue";
import galeria from "./galeria";
import LoadingScreen from "./LoadingScreen.vue";
import browser from "./browser.vue";
import axios from "axios";

export default {
  components: {
    BottonDialog,
    galeria,
    LoadingScreen,
    browser,

  },
  data() {
    return {
      /**
       * @param {array} pokemonData Almacenará nuestras URL máximo de 10
       */
      pokemonData: [],
      /**
       * @param {array} pokemons Almacenará en forma de objetos la información de nuestros pokes.
       */
      pokemons: [],
      /**
       * @param {string} URL Creará nuestra URL en base a la variable limit y offset.
       */
      URL: "",
      /**
       * @param {boolean} loading Se encargará de determinar si está cargando algo.
       */
      loading: false,
      /**
       * @param {int} limit Encargado de determinar el límite de nuestras obtenciones número máximo: 1015
       */
      limit: 1025,
      /**
       * @param {int} offset Encargado de determinar el número de pokemon por el que empezaremos. Numero mínimo: 0
       */
      offset: 0,
      /**
       * @param nombresPokemon Variable que almacena todos los nombres de nuestros pokes
       */
      nombresPokemon: [],
      /**
       * @param {number } page Variable que nos dice en qué página nos encontramos
       */
      page: 1,
      paginaActual: 1, // Página actual
      tamanoPagina: 9, // Cantidad de elementos por página
    };
  },

  mounted() {
    this.main();
  },

  methods: {
    /**
     * Función main de nuestro script. Se ejecuta y se llamará al inicio de nuestra página.
     */
    async main() {
      await this.getNames();
      this.setURL();
      await this.getPokemonData(this.URL);
      await this.setPokemonData();
    },

    /**
     * BUILDING...
     */
    async getNames() {
      try {
        this.loading = true;
        let url = `${API_URL}${POKEMON_ENDPOINT}?limit=1302`;
        const response = await axios.get(url);
        const pokemonData = response.data.results;
        this.nombresPokemon = pokemonData.map((pokemon) => ({
          name: pokemon.name,
        }));
        return this.nombresPokemon;
        // aqui el push a mi array nombresPokemon
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * BUILDING...
     */
    setURL() {
      this.URL = `${API_URL}${POKEMON_ENDPOINT}?limit=${this.limit}&offset=${this.offset}`;
    },

    /**
     * @param {string} URL una URL para hacer una petición GET con Axios
     * @returns Un arreglo con los nuevos 10 pokemon
     */
    async getPokemonData(URL) {
      try {
        const response = await axios.get(URL);
        if (response.data && response.data.results) {
          let largo = response.data.results.length;
          for (let i = 0; i < largo; i++) {
            this.pokemonData.push(response.data.results[i]);
          }
        } else {
          console.error("Error 502: Error al obtener la información de la API");
        }
      } catch (error) {
        console.error("Error al obtener datos del Pokémon:", error);
      }
    },

    /**
     * Función encargada de obtener nuestra información de nuestros pokes. Instancia todo tipo de contenido.
     */
    async setPokemonData() {
      try {
        // this.pokemons = [];
        this.loading = true;
        for (const pokemonInfo of this.pokemonData) {
          const url = pokemonInfo.url;
          const response = await axios.get(url);

          const pokemonData = response.data;
          const pokemon = {
            nombre: pokemonData.name,
            peso: pokemonData.weight,
            altura: pokemonData.height,
            habilidad1: pokemonData.abilities
              ? pokemonData.abilities[0]?.ability.name || ""
              : "",
            habilidad2: pokemonData.abilities
              ? pokemonData.abilities[1]?.ability.name || ""
              : "",
            img: pokemonData.sprites.front_default,
            imgAdicional: pokemonData.sprites.front_shiny,
            id: pokemonData.id,
          };

          this.pokemons.push(pokemon);
          this.loading = false;
        }
      } catch (error) {
        console.error("Error al obtener datos del Pokémon:", error);
      }
    },
    /**
     * BULDING...
     */
    async buscarPokemon(pokemonBuscado) {
      console.log("Valor recibido:", pokemonBuscado);

      try {
        this.loading = true;
        // Validar si pokemonBuscado es un número
        let validacionNumero = parseInt(pokemonBuscado);
        if (!isNaN(validacionNumero)) {
          // Si es un número, buscar por ID
          if (validacionNumero > 1025) {
            // Fuera del rango
            console.error(`Fuera del rango`);
            return;
          }
          console.log("Valor recibido es un número entero:", validacionNumero);
          const url = `${API_URL}${POKEMON_ENDPOINT}${validacionNumero}`;
          const response = await axios.get(url);
          const dataPokemon = response.data;
          const pokemon = {
            nombre: dataPokemon.name,
            peso: dataPokemon.weight,
            altura: dataPokemon.height,
            habilidad1: dataPokemon.abilities
              ? dataPokemon.abilities[0]?.ability.name || ""
              : "",
            habilidad2: dataPokemon.abilities
              ? dataPokemon.abilities[1]?.ability.name || ""
              : "",
            img: dataPokemon.sprites.front_default,
            imgAdicional: dataPokemon.sprites.front_shiny,
            id: dataPokemon.id,
          };
          // Agregar el Pokémon encontrado al arreglo this.pokemons
          this.pokemons = [pokemon];
        } else {
          // Si no es un número, buscar por nombre
          let pokemonEncontrados = this.nombresPokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(pokemonBuscado.toLowerCase())
          );
          console.log("Pokémon encontrados:", pokemonEncontrados);
          if (pokemonEncontrados.length > 0) {
            // Actualizar el arreglo this.pokemons con los Pokémon encontrados
            this.pokemons = [];
            for (const pokemon of pokemonEncontrados) {
              const url = `${API_URL}${POKEMON_ENDPOINT}${pokemon.name}`;
              const response = await axios.get(url);
              const dataPokemon = response.data;
              const pokemonData = {
                nombre: dataPokemon.name,
                peso: dataPokemon.weight,
                altura: dataPokemon.height,
                habilidad1: dataPokemon.abilities
                  ? dataPokemon.abilities[0]?.ability.name || ""
                  : "",
                habilidad2: dataPokemon.abilities
                  ? dataPokemon.abilities[1]?.ability.name || ""
                  : "",
                img: dataPokemon.sprites.front_default,
                imgAdicional: dataPokemon.sprites.front_shiny,
                id: dataPokemon.id,
              };
              // Agregar el Pokémon al arreglo this.pokemons
              this.pokemons.push(pokemonData);
              this.loading = false;
            }
          } else {
            console.log("Error: no se encontraron coincidencias");
          }
        }
      } catch (error) {
        console.error("Error al buscar pokémon:", error);
      } finally {
        // Regresar a la primera página de la paginación
        this.paginaActual = 1;
      }
    },

    /**
     * BUILDING...
     */
    async cambiarPagina(pagina) {
      this.paginaActual = pagina;
      // Calculamos los índices de inicio y fin de la página actual
      const inicio = (this.paginaActual - 1) * this.tamanoPagina;
      const fin = this.paginaActual * this.tamanoPagina;
      // Actualizamos la lista de pokemons paginados con los pokemons de la página actual
      this.pokemonsPaginados = this.pokemons.slice(inicio, fin);
    },
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.pokemons.length / this.tamanoPagina);
    },
    pokemonsPaginados() {
      const inicio = (this.paginaActual - 1) * this.tamanoPagina;
      const fin = this.paginaActual * this.tamanoPagina;
      return this.pokemons.slice(inicio, fin);
    },
  },
};
</script>

<style>
.img2{
    float: right; /* Posiciona la imagen a la derecha */
    /* Opcional: ajusta el tamaño de la imagen */
    height: auto; /* Mantener la proporción de aspecto */
}

.contenedor{
  background-image: url('./assets/fondoPokemon2.jpeg');
  background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.text-h5 {
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  background-image: url('./assets/cintaCarts.jpg');
  background-color: #03a9f4;
  color: #C62828;
  background-position: center center; /* Centra horizontal y verticalmente */
  background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.BotonTarjeta {
  background-color: #74992e;
  color: #85C1E9;
  border-style: center;
  padding: 1px 15px; /* Aumentamos el relleno para mayor separación */
  border-width: 2px; /* Ajustamos el tamaño del borde */
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 5%;
   margin-left:120px;
}


.cartsBackground{
    background-image:url('./assets/image.png');
    background-position: center center; /* Centra horizontal y verticalmente */
    background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.textCard {
  font-size: 20px;
  font-weight: bold;
  color: #2E4053;
  text-align:start;
  font-family: 'Press Start 2P', cursive;
  margin-left:140px;
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
.titulo{
  color: #F1C40F;
  font-weight: bold;
  text-align: center;
  font-size: 50px;
  letter-spacing: 2px;
  padding: 2px;
  text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em #4DD0E1;
  text-transform: uppercase;
}
</style>
