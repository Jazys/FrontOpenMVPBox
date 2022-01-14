<script setup lang="ts">
import http from '@/services/http';
import App from "../components/AppDeploy.vue"
import Appinfo from "../components/AppInfo.vue"
import Appview from "../components/AppView.vue"
import { toRefs, watchEffect,  defineProps, reactive } from 'vue'
import appInterface from "../entity/app"

const props = defineProps<{
  apps: appInterface[],
  view:boolean,
  update:boolean
  config:boolean
  info:boolean,
  delete:boolean
}>();

const state = reactive({
  deployAppActive:false,
  infoAppActive:false,
  viewAppActive:false,
  vDialogDel:false,
  loading:false,
  idSelectedStack:-1,
});

const { apps } = toRefs(props);

const init = async () => {  
  console.log("init AllAvailableStack");
};

init();

function onQuitDialog() {
  state.infoAppActive=false;
  state.viewAppActive=false;
}

const deleteStack = async (dir:string) => { 

  state.loading=true;
 
  http.delete(`delete/`+dir).then((response) => { 
      console.log(response);   
      state.loading=false;
      state.vDialogDel=true;    
    }, (error) => {      
      console.log(error); 
      state.loading=false;
      state.vDialogDel=true;  
  });
};
//watchEffect(() => console.log(apps.value));
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
      v-model="state.vDialogDel"     
    > 
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         Succès
        </v-card-title>

        <v-card-text>
          L'application a été desinstallée
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="state.vDialogDel = false"
          >
            Quitter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-dialog
        v-model="state.deployAppActive"      
  >
  <App :app="apps[state.idSelectedStack]"></App>
  </v-dialog>

  <v-dialog
        v-model="state.infoAppActive"      
  >
  <Appinfo :app="apps[state.idSelectedStack]" @quitDialog="onQuitDialog"></Appinfo>
  </v-dialog>

  <v-dialog
        v-model="state.viewAppActive"      
  >
  <Appview :app="apps[state.idSelectedStack]" @quitDialog="onQuitDialog"></Appview>
  </v-dialog>


<v-row>
 <v-col
    v-for="(app, i) in apps"
    :key="i"
    cols="3"
    >
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

      <v-card-actions>  
        <v-btn
          color="orange"
          text
          @click="state.deployAppActive=true; state.idSelectedStack=i"
          v-show="app.enable=='yes' && config"
        >
          Configurer
        </v-btn>
        <v-btn
          color="yellow"
          text
          @click="state.infoAppActive=true; state.idSelectedStack=i"
          v-show="info"
        >
          Info
        </v-btn>
        <v-btn
          color="yellow"
          text
          @click="state.viewAppActive=true; state.idSelectedStack=i"
          v-show="view"
        >
          View
        </v-btn>
        <v-btn
          color="green"
          text
          v-show="update"
        >
          Update
        </v-btn>
        <v-btn
          color="red"
          text
          @click="deleteStack(app.userId+'_'+app.title)"  
          v-show="delete"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  </v-row>
</template>
