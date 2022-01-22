<script setup lang="ts">
import http from '@/services/http';
import App from "../components/AppDeploy.vue"
import Appinfo from "../components/AppInfo.vue"
import Appview from "../components/AppView.vue"
import { toRefs, watchEffect,  defineProps, reactive } from 'vue'
import appInterface from "../entity/app"
import { useI18n } from "vue-i18n";

const { t } = useI18n({ inheritLocale:true });
const props = defineProps<{
  apps: appInterface[],
  view:boolean,
  update:boolean
  config:boolean
  info:boolean,
  delete:boolean,
  download:boolean,
  askToAdd:boolean
}>();

const state = reactive({
  deployAppActive:false,
  infoAppActive:false,
  viewAppActive:false,
  vDialogDel:false,
  vDialogSoonAvailable:false,
  loading:false,
  confirmDel:false,
  appToDel:'',
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
      state.appToDel='';
    }, (error) => {      
      console.log(error); 
      state.loading=false;
      state.vDialogDel=true;  
  });
};

const addfunc = async (func_name:string) => { 

  //state.loading=true;
 
  http.get(`addfunc/`+func_name).then((response) => { 
      console.log(response);   
      //state.loading=false;
      state.vDialogSoonAvailable=true;    
    }, (error) => {      
      console.log(error); 
      state.loading=false;
      state.vDialogSoonAvailable=true;  
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
          {{ t('Apps.operation') }}
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
         {{ t('Apps.success') }}
        </v-card-title>

        <v-card-text>
          {{ t('Apps.uninstall') }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="state.vDialogDel = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="state.vDialogSoonAvailable"     
    > 
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ t('Apps.notavailable') }}
        </v-card-title>

        <v-card-text>
          {{ t('Apps.message') }}          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="state.vDialogSoonAvailable = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-dialog
        v-model="state.confirmDel"      
  >
    <v-card
    >
      <v-card-subtitle class="pb-0">
        {{ t('Apps.titleConfirmDel') }}  
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div></div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="grey"
          text
          @click="state.confirmDel=false"
        >
          No
        </v-btn>

        <v-btn
          color="red"
          text
          @click="state.confirmDel=false; deleteStack(state.appToDel)"
        >
          Yes
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
      :color="app.enable=='yes' ? '#F5F5F5' : '#FFF59D'"
    >
      <center>
        <v-img
          class="white--text align-end"
          height="150px"
          width="150px"
          alt="logo"
          :src="app.logo"
        />  
        
        <v-card-title>{{app.title}}</v-card-title>
      </center>   

      <v-card-text class="text--primary">
        <div>{{app.description}}</div>
      </v-card-text>

      <v-card-actions>  
        <v-btn
          rounded
          color="orange"
          text
          @click="state.deployAppActive=true; state.idSelectedStack=i"
          v-show="app.enable=='yes' && config"
        >
          {{ t('Apps.configuration') }}
        </v-btn>
        <v-btn
          color="yellow"
          rounded
          text
          @click="state.infoAppActive=true; state.idSelectedStack=i"
          v-show="info"
        >
          Info
        </v-btn>
        <v-btn
          color="green"
          rounded
          text
          @click="addfunc('AskToAdd_'+app.title)"  
          v-show="askToAdd && app.enable=='no'"
        >
          {{ t('Apps.asktoadd') }}
        </v-btn>
        <v-btn
          color="yellow"
          rounded
          text
          @click="state.viewAppActive=true; state.idSelectedStack=i"
          v-show="view"
        >
          View
        </v-btn>
        <v-btn
          color="green"
          rounded
          text
          @click="addfunc('Update_'+app.title)"
          v-show="update"
        >
          Update
        </v-btn>
        <v-btn
          color="orange"
          rounded
          text
          @click="addfunc('Download_'+app.title)"  
          v-show="download"
        >
          Download
        </v-btn>
        <v-btn
          color="red"
          rounded
          text
          @click="state.confirmDel=true; state.appToDel=app.userId+'_'+app.title"  
          v-show="delete"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  </v-row>
</template>
