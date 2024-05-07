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
    tipo2.value = response.data.types[1] ? response.data.types[1].type.name : null;
    // tipo2.value=response.data.types[1].type.name!==null?tipo1:''

  } catch (error) {
    console.error('Error al obtener detalles del Pokémon:', error);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
});
</script>

<template>
  <p>Id: {{ id }}</p>
  <p>Nombre: {{ nombre }}</p>
  <p>Tipos:
    <ul>
      <li>{{ tipo1 }}</li>
      <li>{{ tipo2  }}</li>
    </ul>
  </p>
  <p>Habilidades:
    <ul>
      <li>{{ habilidad1 }}</li>
      <li>{{ habilidad2}}</li>
    </ul>
  </p>
  <p>Estadisticas:
    <ul>
      <li> vida = {{ hp }}   </li>
        <li>ataque = {{ ataque }} </li>
        <li>defensa = {{ defensa }}</li>
        <li>ataque especial = {{ ataqueSp }}</li>
        <li>defensa especial = {{ defensaSp }}</li>
        <li>velocidad = {{ velocidad }}</li>
   
    </ul>
  </p>
</template>
