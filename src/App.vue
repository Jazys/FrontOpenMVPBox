<script setup  lang="ts">
import NavDrawer from './components/NavigationDrawer.vue'
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: 'global' })

</script>

<template>
  <v-app>

    <NavDrawer app/>

    <v-app-bar app color="#C5CAE9">   
      <v-spacer></v-spacer>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="fr">fr</option>
      </select>        
    </v-app-bar>

    <v-main app style="
      background: #E8EAF6; overflow-y: scroll ; max-height:950px">
      <v-container fluid>
        <router-view>         
        </router-view>
      </v-container>
    </v-main>

  </v-app>
</template>


