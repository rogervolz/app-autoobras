<template>
  <v-container >
    <v-spacer></v-spacer>
        <v-bottom-nav
          justify-center
          app
          :value="true"
          active.sync="0"
          color="primary"
          >
              <v-btn
                dark
                icon
                flat
                small
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link">
              <v-icon>{{item.icon}}</v-icon>
                <!-- {{item.title}} -->
              </v-btn>
      </v-bottom-nav>
  </v-container>
</template>

<script>
import {NavBarIcons} from './NavBarIcons.js'

export default {
   mixins: [NavBarIcons],
   computed:{
       userIsAuthenticated () {
         console.log('Header.vue - user is Authenticated', this.$store.getters.user)
         return this.$store.getters.user !== null && this.$store.getters.user !== undefined
       }
    },
    methods:{
      onLogout(){
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
}
</script>
