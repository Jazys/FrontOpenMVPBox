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

console.log(app)

const state = reactive({
  vAlertVisible:false,
});

const emit = defineEmits({
  quitDialog: () => false
});

</script>

<template>

  <v-alert v-model="state.vAlertVisible" type="success" dismissible> 
    {{ t('AppView.request') }}
  </v-alert>
  <v-card  style="overflow-y: auto ; max-height:600px" 
  >  

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
          maxlength="100"
        ></v-text-field>
      </v-row>
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
        Quiiter
      </v-btn>
    </v-card-actions>
  </v-card>
    
</template>

<style type="text/css">
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>