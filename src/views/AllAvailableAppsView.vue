<script setup lang="ts">
import { reactive } from "vue";
import Apps from "../components/Apps.vue"
import http from '@/services/http';


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

  <Apps :apps="state.allApps"></Apps>
</template>