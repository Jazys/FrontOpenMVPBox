<script setup lang="ts">
import { reactive } from "vue";
import Apps from "../components/Apps.vue"
import http from '@/services/http';

console.log(import.meta.env.VITE_URL_SRV);

const state = reactive({
  allApps:{},
});

http.get(`allStack`).then((response) => {
  state.allApps=response.data.stacks
  console.log(state.allApps); // Succès !
  }, (error) => {
  console.log(error); // Erreur !
});

</script>
<template>  
   <v-row align="center"
      justify="center">
      <h1>Liste des applications disponibles </h1>
  </v-row>

  <Apps :apps="state.allApps" :view="false" :update="false" :config="true" :info="true" :delete="false"></Apps>
</template>