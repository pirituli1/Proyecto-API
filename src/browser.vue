<template>
  <v-form class="browser">
    <v-container class='container'>
      <v-row>
        <v-col>
          <v-text-field label="Escribe nombre o id de pokemon para buscar.." clearable v-model="busqueda" :counter="11"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn block @click="buscarPokemon(busqueda)">Buscar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

  <script>
  export default {
    name: 'Browser',
    data() {
      return {
        busqueda: null, // Variable para almacenar la búsqueda
      };
    },
    methods: {
      buscarPokemon() {
        // Emitir evento con la información de búsqueda
        this.$emit('buscarPokemon', this.busqueda);
      },
    },
  };
  </script>
  
  <style>
  .container {
    background-color: whitesmoke;
  }
  </style>
  