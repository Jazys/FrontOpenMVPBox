<script setup lang="ts">
import http from '@/services/http';
import { toRefs, defineProps, unref, ref, reactive } from 'vue'

const props = defineProps<{
  app: {},
}>();

let { app } = toRefs(props);

const state = reactive({
  vAlertVisible:false,
});


const deployStack = async () => {    
 
  let param={
    "userid":1,
    "env":app.value.env,
    "id":app.value.id
  }

   console.log(param);

  http.post(`create`, param).then((response) => { 
      console.log(response); // Succès !
      state.vAlertVisible=true;
    }, (error) => {
       state.vAlertVisible=true;
      console.log(error); // Erreur !
  });
};

</script>

<template>

  <v-alert v-model="state.vAlertVisible" type="success" dismissible> 
    La requete a ete envoyee
  </v-alert>

  <v-card 
    class="mx-auto"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      alt="logo"
      :src="app.logo"
    >
      <v-card-title>{{app.title}}</v-card-title>
    </v-img>    

    <v-card-text class="text--primary">
      <div>{{app.description}}</div>
    </v-card-text>

    <v-row v-for="(env, i) in app.env"
    :key="i">
      <v-text-field
        :label="env.name"
        v-model="env.value"
        outlined
      ></v-text-field>
    </v-row>

    <v-card-actions>  
      <v-btn
        color="orange"
        text
        @click="deployStack"
      >
        Deployer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>