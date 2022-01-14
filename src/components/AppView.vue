<script setup lang="ts">
import http from '@/services/http';
import { toRefs, defineProps, unref, ref, reactive } from 'vue'
import appInterface from "../entity/app"

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
    La requete a ete envoyee
  </v-alert>

  <v-card     
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
        ></v-text-field>
      </v-row>
    </v-card-text>

    <v-card-actions>  
      <v-spacer></v-spacer>
      <v-btn
        right
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
.row {
margin-right: 0 !important;
}
</style>