<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n({ inheritLocale:true });

console.log(window.location.host);


const links = [
  { title: t('NavigationDrawer.myapp'), icon: 'mdi-home', route:"/myApp" },
  { title: t('NavigationDrawer.apps'), icon: 'mdi-view-dashboard', route:"/storeApp" },
  { title: t('NavigationDrawer.conf'), icon: 'mdi-wrench', route:"/conf" },
  { title: t('NavigationDrawer.support'), icon: 'mdi-email', route:"/support" },
  { title: "Portainer", icon: 'mdi-dialpad ', route:"/traefik" },
  { title: "Treafik", icon: 'mdi-dialpad', route:"/portainer" }
]
</script>

<template>
  <v-card
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent  color="#C5CAE9">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            OpenMVPBox
          </v-list-item-title>
          <v-list-item-subtitle class="text-h6">
            App configuration
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item 
         class="tile"
          v-for="item in links"
          :key="item.title"         
          @click="$router.push({ path: item.route })"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<style scoped>
  .tile {
    margin: 5px;
    border-radius: 4px;
  }
  .tile:hover {
    background: green;
  }
  .tile:active {
    background: yellow;
  }
</style>