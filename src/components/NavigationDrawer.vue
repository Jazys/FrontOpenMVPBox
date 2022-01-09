<script setup lang="ts">
import { ref } from 'vue'

const links = [
  { title: 'Mes App', icon: 'mdi-view-dashboard', route:"/myApp" },
  { title: 'App Store', icon: 'mdi-image', route:"/storeApp" },
  { title: 'Configuration', icon: 'mdi-help-box', route:"/conf" }
]
</script>

<template>
  <v-card
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            OpenMVPBox
          </v-list-item-title>
          <v-list-item-subtitle>
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