<script setup lang="ts">
import { reactive } from "vue";
import http from '@/services/http';

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

const deleteStack = async (dir:string) => { 
 
  http.delete(`delete/`+dir).then((response) => { 
      console.log(response);   
      state.vAlertVisible=true;
    }, (error) => {      
      console.log(error); 
      state.vAlertVisible=true;
  });
};

</script>
<template>  

  <v-alert v-show="state.vAlertVisible" type="success" dismissible> 
    La requete a ete envoyee
  </v-alert>

   <v-row align="center"
      justify="center">
      <h1>Liste des applications installées </h1>
  </v-row>

  <v-row>
 <v-col
    v-for="(app, i) in state.myApps"
    :key="i"
    cols="3"
    >
    <v-card 
      class="mx-auto"
    >       

      <v-card-text class="text--primary">
        <div>{{app}}</div>
      </v-card-text>

      <v-card-actions>  
        <v-btn
          color="orange"
          text
          @click="deleteStack(app)"
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  </v-row>
</template>