Eran, [07/05/2024 12:14 p. m.]
<template>
  <div class = "contenedor">
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
                <v-img :src="imagen" :alt="'Imagen de ' + pokemon.nombre" ></v-img alt=imagen de ${this.pokemon.name}>
              </v-carousel-item>
            </v-carousel>
            <v-card-title class="text-h5">{{ pokemon.nombre}}</v-card-title>
            <v-card-text class='textCard'>
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
            </v-card-text>

            <!-- Boton para detalles -->
            <v-dialog max-width="500">
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
                <v-card title="Dialog">
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
                  color="surface-variant"
                  text="Galeria"
                  variant="flat"
                  @click="enviarId(pokemon.id)"
                ></v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Dialog">
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
      pokemonsAPI: [${API_URL}${POKEMON_ENDPOINT}?limit=100],
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
.contenedor{
  background-color: black;
}

.text-h5 {
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  background-image: url('./assets/text-h5cats.jpeg');
  background-color: #03a9f4;
  color: #C62828;
  background-position: center center; /* Centra horizontal y verticalmente */
  background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.BotonTarjeta {
  background-color: #74992e;
  color: #85C1E9;
  border-style: inset;
  padding: 10px 14px; /* Aumentamos el relleno para mayor separación */
  border-width: 2px; /* Ajustamos el tamaño del borde */
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 5%;

}


.cartsBackground{
    background-image:url('./assets/image.png');
    background-position: center center; /* Centra horizontal y verticalmente */
    background-size: cover; /* Ajusta el tamaño de la imagen de fondo */
}

.textCard {
  text-align: start;
  color: #607d8b;
  font-family: 'Press Start 2P', cursive;
  font-weight: bold;
  font-size: 500px; /* Tamaño de fuente más grande */
  margin: 2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Agrega una sombra al texto */
  letter-spacing: 2px; /* Aumenta el espaciado entre letras */
  line-height: 1.2; /* Ajusta la altura de línea del texto */
}

</style>