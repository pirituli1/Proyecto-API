<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { API_URL, POKEMON_ENDPOINT } from './components/rutas';
import axios from 'axios';

const props = defineProps({
  idPokemon: {
    type: Object,
    required: true
  }
});

// Define una referencia reactiva para almacenar el ID del Pokémon
const id = ref(null);
const nombre = ref(null);
const habilidad1 = ref(null);
const habilidad2 = ref(null);


/**
 * ! Stadisticas base
 */
const hp = ref(null);
const ataque = ref(null);
const defensa = ref(null);
const ataqueSp = ref(null);
const defensaSp = ref(null);
const velocidad = ref(null);

/**
 * !tipos
 */
 const tipo1 = ref(null);

 const tipo2 = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}${POKEMON_ENDPOINT}/${props.idPokemon.id}`);
    // Extrae el ID del response y guárdalo en la referencia 'id'
    id.value = response.data.id;
    nombre.value = response.data.name;
    habilidad1.value = response.data.abilities ? response.data.abilities[0] ?.ability.name : '';
    habilidad2.value = response.data.abilities ? response.data.abilities[1] ?.ability.name : '';

    /**
     * ! Stadisticas base
     */
    hp.value = response.data.stats[0].base_stat;
    ataque.value = response.data.stats[1].base_stat;
    defensa.value = response.data.stats[2].base_stat;
    ataqueSp.value = response.data.stats[3].base_stat;
    defensaSp.value = response.data.stats[4].base_stat;
    velocidad.value = response.data.stats[5].base_stat;

    /**
     * !Tipos
     */
    tipo1.value = response.data.types[0].type.name
    tipo2.value = response.data.types[1].type.name
  } catch (error) {
    console.error('Error al obtener detalles del Pokémon:', error);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
});

</script>

<template>
  <div class="pokemon-info"> 
    <p class="id">Id: {{ id }}</p>
    <div class="nombre-container">
      <p class="nombre"> {{ nombre }}</p>
    </div>
    <div class="container">
      <p class="titulos"><img  class="PokebolaImagen-Container" src="/home/erandyluna/from/ApiPokemon/src/assets/pokebola.png"> Tipos:</p>
      <ul>
        <li :style="{ backgroundImage: 'url(' + tipo1Icon + ')' }">{{ tipo1 }}</li>
        <li :style="{ backgroundImage: 'url(' + tipo2Icon + ')' }">{{ tipo2 }}</li>
      </ul>
    </div>
    <div class="container">
      <p class="titulos"><img  class="PokebolaImagen-Container" src="/home/erandyluna/from/ApiPokemon/src/assets/habilidadespokemon.png"> Habilidades:</p>
      <ul>
        <li>{{ habilidad1 }}</li>
        <li>{{ habilidad2 }}</li>
      </ul>
    </div>
    <div class="container">
      <p class="titulos"><img  class="PokebolaImagen-Container" src="/home/erandyluna/from/ApiPokemon/src/assets/estadisticaspokemon.png"> Estadisticas:</p>
      <ul>
        <li>Vida = {{ hp }}</li>
        <li>Ataque = {{ ataque }}</li>
        <li>Defensa = {{ defensa }}</li>
        <li>Ataque Especial = {{ ataqueSp }}</li>
        <li>Defensa Especial = {{ defensaSp }}</li>
        <li>Velocidad = {{ velocidad }}</li>
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

