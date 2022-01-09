<script setup lang="ts">
import App from "../components/AppDeploy.vue"
import { toRefs, watchEffect,  defineProps, reactive } from 'vue'

const props = defineProps<{
  apps: {} 
}>();

const state = reactive({
  deployAppActive:false,
  idSelectedStack:-1,
});

const { apps } = toRefs(props);

const init = async () => {  
  console.log("init AllAvailableStack");
};

init();
//watchEffect(() => console.log(apps.value));
</script>

<template>
  <v-dialog
        v-model="state.deployAppActive"      
  >
  <App :app="apps[state.idSelectedStack]"></App>
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
          @click="state.deployAppActive=true; state.idSelectedStack=app.id-1"
        >
          Configurer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  </v-row>
</template>