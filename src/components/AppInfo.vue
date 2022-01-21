<script setup lang="ts">
import http from '@/services/http';
import { toRefs, defineProps, unref, ref, reactive } from 'vue'
import appInterface from "../entity/app"
import { useI18n } from "vue-i18n";

const { t } = useI18n({ inheritLocale:true });
const props = defineProps<{
  app: appInterface
}>();

let { app } = toRefs(props);

const state = reactive({
  vAlertVisible:false,
});

const emit = defineEmits({
  quitDialog: () => false
});

</script>

<template>

  <v-alert v-model="state.vAlertVisible" type="success" dismissible> 
    {{ t('Appinfo.operation') }}
  </v-alert>

  <v-card     
  >
    <v-img
      class="white--text align-end"
      height="200px"
      alt="logo"
      :src="app.logo"
    >
      <v-card-title>
        <span class="text-h5">{{app.title}}</span>       
      </v-card-title>
    </v-img>    

    <v-card-text class="text--primary">
      <div>{{app.description}}</div>
      
      <v-divider></v-divider>
      <p class="font-weight-black">
      Video :
      </p>
      <ul id="videos">
        <li v-for="aVideo in app.video" :key="aVideo.desc">
          <a :href="aVideo.link" target="_blank">{{ aVideo.desc }}</a>
        </li> 
      </ul>

      <p class="font-weight-black">
        Tutorials :
      </p>
      <ul id="tutorials">
        <li v-for="aTut in app.tutorials" :key="aTut.desc">
          <a :href="aTut.link" target="_blank">{{ aTut.desc }}</a>
        </li> 
      </ul>
    </v-card-text>

    <v-card-actions>  
      <v-spacer></v-spacer>
      <v-btn
        right
        rounded
        color="orange"
        text
        @click="emit('quitDialog')"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>