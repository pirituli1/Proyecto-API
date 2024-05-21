<template>
<h1>Tabla de tipos</h1>
<!-- Menu togeable -->
<div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Tipo 1
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      color="primary"
    >
      Tipo 2

      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>

  </div>
</template>

<script>
import { getPokemonData } from './apis/apiPokemon';
export default{
     name:'Table',
     data: ()=>({
          // Tipos pokemon
          items: [
             { title: 'Planta' },
             { title: 'Fuego' },
             { title: 'Agua' },
             { title: 'Veneno' },
             { title: 'Volador' },
             { title: 'Bicho' },
             { title: 'Normal' },
             { title: 'Electrico' },
             { title: 'Tierra' },
             { title: 'Lucha' },
             { title: 'Psiquico' },
             { title: 'Acero' },
             { title: 'Hielo' },
             { title: 'Fantasma' },
             { title: 'Dragon' },

           ],
          tipoSeleccionado1: null,
          tipoSeleccionado2: null,
     })
}
</script>

