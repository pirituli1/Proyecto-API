<!-- dialogTable.vue -->
<template>
  <div>
    <!-- Utiliza los props aquí -->

    <p v-if="botton1">
      <CCard style="width: 18rem">
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardSubtitle class="mb-2 text-body-secondary"
            >Card subtitle</CCardSubtitle
          >
          <CCardText
            >Some quick example text to build on the card title and make up the
            bulk of the card's content.</CCardText
          >
          <CCardLink href="#">Card link</CCardLink>
          <CCardLink href="#">Another link</CCardLink>
        </CCardBody>
      </CCard>
    </p>

    <p v-else>El segundo tipo seleccionado: {{ tipo1 }}</p>
  </div>
</template>

<script>
export default {
  name: "dialogTable",
  props: {
    tipo1: {
      type: String,
      required: true,
    },
    tipo2: {
      type: String,
      required: true,
    },
    tipos: {
      type: Array,
      required: true,
    },
    botton1: {
      type: Boolean,
      required: false,
    },
    botton2: {
      type: Boolean,
      required: false,
    },
  },
  async created() {
    try {
    } catch (error) {
      console.log(`Error al seleccionar los pokemon`, error);
    }
  },
};
</script>

<style scoped>
.cards {
  display: flex;
}
</style>
