<script setup lang="ts">
import http from '@/services/http';
import { toRefs, defineProps, unref, ref, reactive } from 'vue'
import appInterface from "../entity/app"
import { useI18n } from "vue-i18n";

const { t } = useI18n({ inheritLocale:true });
const props = defineProps<{
  app: appInterface,
}>();

let { app } = toRefs(props);

const state = reactive({
  vAlertVisible:false,
  loading:false,
  titleSucces:'',
  textSucess:''
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
      state.titleSucces=t('AppDeploy.success');
      state.textSucess=t('AppDeploy.appinstalled')+"\n ..  Infos : \n";
      state.textSucess+=response.data.info;
      console.log(response.data.info); // Succès !       
      state.vAlertVisible=true;
     
    }, (error) => {
       state.vAlertVisible=true;
      console.log(error); // Erreur !
  });
};

const addfunc = async (func_name:string) => { 

  let usermail:string|null="";

  //state.loading=true;
  if(localStorage.getItem('usermail') != null)
      usermail=localStorage.getItem('usermail');
 
  http.get(`addfunc/`+func_name+"_"+usermail).then((response) => { 
      console.log(response);   
      state.titleSucces=t('AppDeploy.success');
      state.textSucess=t('AppDeploy.addfunc');
      //state.loading=false;
       state.vAlertVisible=true;    
    }, (error) => {      
      console.log(error); 
      state.loading=false;
       state.vAlertVisible=true;  
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
           {{ t('AppDeploy.operation') }}
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
         {{state.titleSucces}}
        </v-card-title>

        <v-card-text>
          {{state.textSucess}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            rounded
            text
            @click="state.vAlertVisible = false"
          >
            Close
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
      <v-btn
        right
        rounded
        color="green"
        text
        @click="addfunc('ConfAvancee_'+app.title)"
      >
        Config Premium
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        right
        rounded
        color="yellow"
        text
        @click="addfunc('localDeploy_'+app.title)"
      >
      {{ t('AppDeploy.localDeploy') }}
      </v-btn>
      <v-btn
        right
        rounded
        color="orange"
        text
        @click="deployStack"
      >
      {{ t('AppDeploy.deploy') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>