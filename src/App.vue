<script setup  lang="ts">
import NavDrawer from './components/NavigationDrawer.vue'
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n({ inheritLocale:true });

const allLocales=["ef","er"];
</script>

<template>
  <v-app>

    <NavDrawer app/>

    <v-app-bar app>
      <v-spacer></v-spacer>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="fr">fr</option>
      </select>        
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view>         
        </router-view>
      </v-container>
    </v-main>

  </v-app>
</template>


