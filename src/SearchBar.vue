<template>
    <v-text-field
      v-model="query"
      label="Buscar Pokémon"
      @input="onInput"
      clearable
    ></v-text-field>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
      };
    },
    methods: {
      onInput() {
        this.$emit('search', this.query);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes añadir estilos personalizados aquí */
  </style>
  