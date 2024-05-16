<template>

  <div v-if="loading" class="loading-screen">

    <div class="loading-content">

      <v-progress-circular indeterminate color="error"  :size="77" :width="12"></v-progress-circular>
      <div class="loading-text">Cargando Imagenes...</div>

    </div>

  </div>

</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};

</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-text {
  margin-top: 1rem;
  color: white;
  font-weight: bold;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>