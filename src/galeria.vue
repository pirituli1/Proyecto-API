<template>
  {{  pokemonid }}
  <div class="pokemon-carousel">
    <v-container fluid class="custom-container" >
      <v-carousel class="custom-carousel" hide-delimiters>
        <v-carousel-item v-for="(pokemon, index) in pokemons" :key="index" >
          <div class="custom-carousel-item">
            <v-img :src="pokemon" aspect-ratio="2" alt="Imagen de Pokémon" class="imagen-personalizada"></v-img>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL, POKEMON_ENDPOINT } from './components/rutas';

export default {
  name: 'galeria',
  data(){
    return{
      URL : `${API_URL}${POKEMON_ENDPOINT}${this.pokemonid}`,
      pokemons: [],
    }
  },
    props:{
      pokemonid: {
        type:Number,
        require:true,
      }
    },
    methods:{
      async obtenerSprites() {
      await axios.get(this.url)
        .then(response => {
          const pokemon = response.data;
          this.pokemons.push(pokemon.sprites.front_default);
          this.pokemons.push(pokemon.sprites.other.home.front_default)
          this.pokemons.push(pokemon.sprites.back_shiny);
          this.pokemons.push(pokemon.sprites.front_shiny);
          this.pokemons.push(pokemon.sprites.other.home.front_shiny);
          this.pokemons.push(pokemon.sprites.other.home.front_default);
          this.pokemons.push(pokemon.sprites.other.showdown.back_female);
          this.pokemons.push(pokemon.sprites.versions['generation-iii'].emerald.front_default);
          this.pokemons.push(pokemon.sprites.versions['generation-iii'].emerald.front_shiny);
        }).then(console.log('Solucitud exitosa'))
        .catch(error => {
          console.error('Error al obtener los sprites:', error);
        });
    },

    async mounted(){
      await this.obtenerSprites();
    }
}
};
</script>

<style scoped>

.pokemon-carousel {
  /* area de relleno en el cuato lados */
 padding: 0px;
}

.custom-container {
  /* Estilos personalizados para el contenedor */
  max-width: 10000px;
  margin: 0 auto; /* Centrar el contenedor */
  background-image: url('./assets/backgroundCarrusel.jpg');
  background-color: #cccc;
  padding: 2px;
  border-radius: 50px;
  box-shadow: 0 9px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; 
  background-size: cover; /* Hace que la imagen de fondo se ajuste y cubra todo el contenedor */
  background-position: center; /* Centra la imagen de fondo */
}


.custom-carousel {
  border: 2px solid #ccc;
  border-radius: 0px;
}

.custom-carousel-item {
  object-fit: cover;
  justify-content: center;
  align-items: center;
}

.imagen-personalizada {
  width: 100%;
  height: auto
  
  }
</style>