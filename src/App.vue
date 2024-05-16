<template>
  <div id="app">
    <div v-if="home">
      <Home @toggle-home="toggleHome" />
    </div>

    <div v-else>
      <div v-if="loading">
        <LoadingScreen :loading="loading" />
      </div>
      <div v-else>
        <carts></carts>
      </div>
    </div>
  </div>
</template>

<script>
  import Home from './home.vue'; //Pantalla inicio
  import LoadingScreen from './LoadingScreen.vue'; //Pantalla de carga
  import carts from './Carts.vue';
  import galeria from './galeria.vue';
  export default {
    name: 'App',
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
    content: ' ';
    display: block;
    border-bottom: 1px solid #c50000;
    border-top: 1px solid #c50000;
    height: 5px;
    background-color: #f8f8f;
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
<!-- <template>
    <v-container>
      <v-row>
        <v-col v-for="pokemon in pokemons" :key="pokemon.nombre" cols="12" sm="6" md="4">
          <v-card class="pa-3" outlined>
            <v-img :src="pokemon.img" :alt="'Imagen de ' + pokemon.nombre"></v-img>
            <v-carousel hide-delimiters>
              <v-carousel-item v-for="(imagen, index) in [pokemon.img, pokemon.imgAdicional]" :key="index">
                <v-img :src="imagen" :alt="'Imagen de ' + pokemon.nombre"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-card-title class="text-h5">{{ pokemon.nombre }}</v-card-title>
            <v-card-text>
              <p>Altura: {{ pokemon.altura }}</p>
              <p>Peso: {{ pesoKilogramos(pokemon.peso) }}</p>
              <p>Habilidades:</p>
              <ul>
                <li v-if="pokemon.habilidad1">{{ pokemon.habilidad1 }}</li>
                <li v-if="pokemon.habilidad2">{{ pokemon.habilidad2 }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pokemons: [],
        pokemonsAPI: [
          'https://pokeapi.co/api/v2/pokemon/sprigatito',
          'https://pokeapi.co/api/v2/pokemon/golisopod',
          'https://pokeapi.co/api/v2/pokemon/goodra',
          'https://pokeapi.co/api/v2/pokemon/victreebel',
          'https://pokeapi.co/api/v2/pokemon/victreebel',
          'https://pokeapi.co/api/v2/pokemon/cyndaquil',
          'https://pokeapi.co/api/v2/pokemon/milotic',
          'https://pokeapi.co/api/v2/pokemon/cranidos',
          'https://pokeapi.co/api/v2/pokemon/bulbasaur',
        ],
      };
    },
    mounted() {
      this.fetchPokemonData();
    },
    methods: {
      fetchPokemonData() {
    Promise.all(this.pokemonsAPI.map(url => fetch(url).then(response => response.json())))
      .then(pokemonData => {
        this.pokemons = pokemonData.map(pokemon => ({
          nombre: pokemon.name,
          peso: pokemon.weight,
          altura: pokemon.height,
          habilidad1: pokemon.abilities[0] ? pokemon.abilities[0].ability.name : '',
          habilidad2: pokemon.abilities[1] ? pokemon.abilities[1].ability.name : '',
          img: pokemon.sprites.front_default, // Imagen normal
          imgAdicional: pokemon.sprites.front_shiny // Imagen shiny
        }));
      })
      .catch(err => {
        console.log("Error al ejecutar fetchPokemonData", err);
      });
  },
  
      pesoKilogramos(peso){
        return peso / 10;
      },
    }
  }
  </script> -->
