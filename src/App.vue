<script  lang="ts">
import NavDrawer from './components/NavigationDrawer.vue'

export default {
  name: 'App',

  components: {
    NavDrawer,   
  },

  setup: () => ({    
  }),
}
</script>

<template>
  <v-app>

    <NavDrawer app/>

    <v-app-bar app>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view>         
        </router-view>
      </v-container>
    </v-main>

  </v-app>
</template>


