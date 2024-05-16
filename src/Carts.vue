<template>
  <img src="/home/erandyluna/from/ApiPokemon/src/assets/pikachuIcon.ico" alt="Pokémon" class ="img1"> 
  <!-- img pokemon  -->
  <img src="/home/erandyluna/from/ApiPokemon/src/assets/pikachuIcon.ico" alt="Pokémon" class ="img2">
    <h1 class="titulo">pokemon</h1>

  <div class ="contenedor">
    <LoadingScreen :loading=loading v-if="loading" />
    <v-container>
      <v-row>
        <v-col
          v-for="pokemon in pokemons"
          :key="pokemon.nombre"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card outlined>
            <v-carousel :continuous="false"
      :show-arrows="true"
      delimiter-icon="mdi-square"
      height="300"
      hide-delimiter-background
      class='cartsBackground'>
              <v-carousel-item
                v-for="(imagen, index) in [pokemon.img, pokemon.imgAdicional]"
                :key="index"
              >
                <v-img :src="imagen" :alt="'Imagen de ' + pokemon.nombre" ></v-img alt=`imagen de ${this.pokemon.name}`>
              </v-carousel-item>
            </v-carousel>
            <v-card-title class="text-h5">{{ pokemon.nombre}}</v-card-title>
            <v-card-text>
            <div class='textCard'>
              <p>Altura: {{ pokemon.altura }}</p>
              <p>Peso: {{ pesoKilogramos(pokemon.peso) }}</p>
              <p>Habilidades:</p>
              <ul>
                <li v-if="pokemon.habilidad1">
                  Habilidad 1:{{ pokemon.habilidad1 }}
                </li>
                <li v-if="pokemon.habilidad2">
                  Habilidad 2:{{ pokemon.habilidad2 }}
                </li>
                <li>
                  Numero de pokemon: {{ pokemon.id }}
                </li>
              </ul>
            </div>
            </v-card-text>

            <!-- Boton para detalles -->
            <v-dialog max-width="800">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="BotonTarjeta"
                  v-bind="activatorProps" 
                  color="surface-variant"
                  text="Detalles"
                  variant="flat"
                  @click="enviarId(pokemon.id)"
                  
                ></v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="">
                  <v-card-text>
                    <BottonDialog :idPokemon="idPokemon" />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close Dialog"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <!-- Boton para galeria -->
            <v-dialog max-width="1000">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="BotonTarjeta"
                  v-bind="activatorProps"
                  color="#5DADE2 "
                  text="Galeria"
                  append-icon="$iconsGaleria.ico"
                  variant="flat"
                  @click="enviarId(pokemon.id)"
                ></v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="">
                  <v-card-text>
                    <galeria />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close Dialog"
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
  </div>
</template>

<script>
import { API_URL, POKEMON_ENDPOINT } from './components/rutas';
import BottonDialog from './dialogCarts.vue';
import galeria from './galeria';
import LoadingScreen from './LoadingScreen.vue';

export default {
  components: {
    BottonDialog,
    galeria,
    LoadingScreen,
  },
  data() {
    return {
      pokemons: [],
      pokemonsAPI: [`${API_URL}${POKEMON_ENDPOINT}?limit=100`],
      dialogue: false,
      idPokemon: '',
      loading: false,
    };
  },
  mounted() {
    this.fetchPokemonData();
  },
  methods: {
    async fetchPokemonData() {
      this.loading = true; // Mostrar pantalla de carga
      try {
        const pokemonData = await Promise.all(
          this.pokemonsAPI.map((url) =>
            fetch(url).then((response) => response.json())
          )
        );

        const pokemonPromises = pokemonData[0].results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );

        const pokemonDetails = await Promise.all(pokemonPromises);

        this.pokemons = pokemonDetails.map((pokemon) => ({
          nombre: pokemon.name,
          peso: pokemon.weight,
          altura: pokemon.height,
          habilidad1: pokemon.abilities
            ? pokemon.abilities[0]?.ability.name
            : '',
          habilidad2: pokemon.abilities
            ? pokemon.abilities[1]?.ability.name
            : '',
          img: pokemon.sprites.front_default,
          imgAdicional: pokemon.sprites.front_shiny,
          id: pokemon.id,
        }));

        this.loading = false; // Ocultar pantalla de carga
      } catch (error) {
        console.error('Error al obtener datos de los Pokémon:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
        this.loading = false; // Asegúrate de ocultar la pantalla de carga en caso de error
      }
    },
    pesoKilogramos(peso) {
      return peso / 10;
    },
    enviarId(param) {
      this.idPokemon = { id: param };
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
