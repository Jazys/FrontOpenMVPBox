<script setup lang="ts">
import { reactive } from "vue";
import Apps from "../components/Apps.vue"
import http from '@/services/http';
import { useI18n } from "vue-i18n";

const { t } = useI18n({ inheritLocale:true });

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
      <h1>{{ t('AppAvailable.title') }}  </h1>
  </v-row>
  <br/>

  <Apps  :apps="state.allApps" :view="false" :update="false" :config="true" :info="true" :delete="false" :download="false" :askToAdd="true" ></Apps>
</template>