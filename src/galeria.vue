<template>
  <v-container fluid>
    <v-carousel>
      <v-carousel-item v-for="(pokemon, index) in pokemons" :key="index">
        <v-img :src="pokemon" aspect-ratio="2" alt="imagen poke"></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'galeria',
  data() {
    return {
      url: 'https://pokeapi.co/api/v2/pokemon/12',
      pokemons: [], // Array para almacenar las imágenes de los Pokémon
    };
  },
  methods: {
    obtenerSprites() {
      axios.get(this.url)
        .then(response => {
          // Validar la estructura de la respuesta
          const pokemon = response.data;
          this.pokemons.push(pokemon.sprites.back_default);
                    this.pokemons.push(pokemon.sprites.front_default);
                    this.pokemons.push(pokemon.sprites.other.home.front_default)
                    this.pokemons.push(pokemon.sprites.back_shiny);
                    this.pokemons.push(pokemon.sprites.front_shiny);
                    this.pokemons.push(pokemon.sprites.other.home.front_shiny);
                    this.pokemons.push(pokemon.sprites.other.home.front_default);
                    this.pokemons.push(pokemon.sprites.other.showdown.back_female);
                    this.pokemons.push(pokemon.sprites.versions['generation-i']['red-blue'].front_transparent);
                    this.pokemons.push(pokemon.sprites.versions['generation-i'].yellow.front_gray);
        })
        .catch(error => {
          // Manejar errores de red o de la API
          console.error('Error al obtener los sprites:', error);
        });
    },
  },
  mounted() {
    this.obtenerSprites();
  }
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>

<style scoped>
.pokemon-info {
  text-align: center;
  margin-bottom: 20px;
}
.images {
  display: flex;
  justify-content: center;
}
.images img {
  margin: 0 10px;
}
</style>