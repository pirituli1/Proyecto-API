<script>
import { API_URL, POKEMON_ENDPOINT } from './components/rutas';
import axios from 'axios';

export default {
  name: 'BottonDialog',
  data() {
    return {
      pokemon: {
        id: null,
        nombre: '',
        habilidad1: '',
        habilidad2: '',
        hp: null,
        ataque: null,
        defensa: null,
        ataqueSp: null,
        defensaSp: null,
        velocidad: null,
      },
    }
  },

  props: {
    pokemonid: {
      type: Number,
      required: true,
    }
  },

  methods: {
    async obtenerDatos() {
      try {
        const response = await axios.get(`${API_URL}${POKEMON_ENDPOINT}/${this.pokemonid}`)
        const pokemon = response.data;
        this.pokemon = {
          id: pokemon.id,
          nombre: pokemon.name,
          habilidad1: pokemon.abilities ? pokemon.abilities[0]?.ability.name : '',
          habilidad2: pokemon.abilities ? pokemon.abilities[1]?.ability.name : '',
          hp: pokemon.stats[0]?.base_stat,
          ataque: pokemon.stats[1]?.base_stat,
          defensa: pokemon.stats[2]?.base_stat,
          ataqueSp: pokemon.stats[3]?.base_stat,
          defensaSp: pokemon.stats[4]?.base_stat,
          velocidad: pokemon.stats[5]?.base_stat,
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.obtenerDatos();
  }
}
</script>

<template>
  <div class="pokemon-info"> 
    <p class="id">Id: {{ pokemon.id }}</p>
    <div class="nombre-container">
      <p class="nombre">{{ pokemon.nombre }}</p>
    </div>
    <div class="container">
      <p class="titulos"><img class="PokebolaImagen-Container" src="./assets/pokebola.png"> Tipos:</p>
      <ul>
        <!-- Agrega lógica para mostrar los tipos si es necesario -->
      </ul>
    </div>
    <div class="container">
      <p class="titulos"><img class="PokebolaImagen-Container" src="./assets/habilidadespokemon.png"> Habilidades:</p>
      <ul>
        <li>{{ pokemon.habilidad1 }}</li>
        <li>{{ pokemon.habilidad2 }}</li>
      </ul>
    </div>
    <div class="container">
      <p class="titulos"><img class="PokebolaImagen-Container" src="./assets/estadisticaspokemon.png"> Estadisticas:</p>
      <ul>
        <li>Vida = {{ pokemon.hp }}</li>
        <li>Ataque = {{ pokemon.ataque }}</li>
        <li>Defensa = {{ pokemon.defensa }}</li>
        <li>Ataque Especial = {{ pokemon.ataqueSp }}</li>
        <li>Defensa Especial = {{ pokemon.defensaSp }}</li>
        <li>Velocidad = {{ pokemon.velocidad }}</li>
      </ul>
    </div>
  </div>
</template>


<style scoped>

.pokemon-info {
  margin: 0 auto; /* Centrar el contenedor */
  background-image: url('./assets/pokemondialog5.jpg');
  background-size: cover; /* Hace que la imagen de fondo se ajuste y cubra todo el contenedor */
  background-position: center; /* Centra la imagen de fondo */
  border: 9px solid #00bcd4; /* Color del borde */
  padding: 90px;
  border-radius: 30px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  box-shadow: 0px 40px 4px rgba(0, 0, 0, 0.1); /* Agrega sombra al contenedor */
}

.id {
  font-weight: bold;
  text-align: start;
  font-size: 30px;
}

.nombre {
  color: #F1C40F;
  font-weight: bold;
  text-align: center;
  font-size: 50px;
  letter-spacing: 2px;
  padding: 2px;
  text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em #4DD0E1;
  text-emphasis: filled double-circle #ffb703;
  text-transform: uppercase;
}

.titulos {
  font-weight: bold;
  color: #FF5722;
  text-align:start;
  margin: 15 px;
  font-family: 'Press Start 2P', cursive;
  font-size: 29px;
  text-shadow: 1px 1px 2px red, 0 0 1em #FFEE58 , 0 0 0.2em #FFEE58 ;
}

.container{
  text-align:start;
  margin: 13px;
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  margin-left:150px;

}

ul {
  list-style-type: none; /* Quitamos la viñeta predeterminada */
}

li {
  padding-left: 20px; /* Agregamos espacio para la imagen de viñeta */
  background-repeat: no-repeat; /* Evitamos que la imagen de viñeta se repita */
  background-position: 0 50%; /* Alineamos la imagen de viñeta */
}

.PokebolaImagen-Container{
  width:40px;
  height:50;
}
</style>

