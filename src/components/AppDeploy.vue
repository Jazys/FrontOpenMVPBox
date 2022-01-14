<script setup lang="ts">
import http from '@/services/http';
import { toRefs, defineProps, unref, ref, reactive } from 'vue'
import appInterface from "../entity/app"

const props = defineProps<{
  app: appInterface,
}>();

let { app } = toRefs(props);

const state = reactive({
  vAlertVisible:false,
  loading:false,
});


const deployStack = async () => {    
 
  let param={
    "userid":1,
    "env":app.value.env,
    "id":app.value.id
  }

  console.log(param);
  state.loading=true;

  http.post(`create`, param).then((response) => { 
      state.loading=false;
      console.log(response); // Succès !       
      state.vAlertVisible=true;
     
    }, (error) => {
       state.vAlertVisible=true;
      console.log(error); // Erreur !
  });
};

</script>

<template>

  <v-dialog
      v-model="state.loading"
      hide-overlay
      persistent  
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Opération en cours
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
 
  <v-dialog
      v-model="state.vAlertVisible"     
    > 
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         Succès
        </v-card-title>

        <v-card-text>
          L'application a été installée
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="state.vAlertVisible = false"
          >
            Quitter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-card  
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

      <v-divider></v-divider>
      <br/>

      <v-row v-for="(env, i) in app.env"
      :key="i">
        <v-text-field
          :label="env.name"
          v-model="env.value"
          outlined
        ></v-text-field>
      </v-row>
    </v-card-text>

  

    <v-card-actions>  
      <v-spacer></v-spacer>
      <v-btn
        right
        color="orange"
        text
        @click="deployStack"
      >
        Deployer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>