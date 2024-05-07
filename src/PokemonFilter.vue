<template>
    <div class="filtro">
      <input 
        v-model="searchTerm" 
        @input="updateSearchTerm" 
        placeholder="Buscar por nombre o ID" 
      />
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    updateSearchTerm() {
      // console.log('updateSearchTerm exec')
      this.$emit('update-search-term', this.searchTerm);
    }
  }
};
</script>

  
  <style>
  input {
    text-align: center;
  }
  
  .filtro {
    color: #000;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
  }
  </style>
  