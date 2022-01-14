<script setup lang="ts">
import { reactive } from "vue";
import Apps from "../components/Apps.vue"
import http from '@/services/http';
import appInterface from "../entity/app";

import { useI18n } from "vue-i18n";

const { t } = useI18n({ inheritLocale:true });

const state = reactive({
  myApps:{},
  vAlertVisible:false,
});

http.get(`installedStack`).then((response) => {
    console.log(response);
    state.myApps=response.data.stacksInstalled
    console.log(state.myApps); 
  }, (error) => {
    console.log(error); 
});

const update = async (dir:string) => { 
 
};

</script>
<template>   

   <v-row align="center"
      justify="center">
      <h1>Liste des applications installées </h1>
  </v-row>

  <v-row>
    <Apps :apps="state.myApps" :view="true" :update="true" :config="false" :info="false" :delete="true"></Apps>
  </v-row>
</template>