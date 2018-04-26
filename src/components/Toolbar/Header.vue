<template>
    <v-container grid-list-xs app>
        <!-- ==========================================  botão esquerdo ============ -->
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
    <v-date-picker
        color="secondary"
        :landscape="false"
        :reactive="true"
        show-current>
    </v-date-picker>
    </v-navigation-drawer>
    <!-- ==========================================  botão esquerdo ============ -->
    <!-- ==========================================  toolbar ============ -->
    <v-toolbar
      dark
      class="primary"
      app
    >
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>date_range</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title >
          <router-link to="/" tag="span" style="cursor: pointer" ><img src="static/doc-images/Logo.png" width="140px" alt=""></router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
          <v-btn
            flat
            class="caption"
            v-if="userIsAuthenticated"
            @click="onLogout">
            <v-icon size=15px>exit_to_app</v-icon>
                Sair
          </v-btn>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- ==========================================  toolbar ============ -->
   <!-- ==========================================  Menu direito ============ -->
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
      v-touch="{
        right: () => swipe('rightDrawer'),
        left: ()=> swipe('!rightDrawer')
      }"
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon >compare_arrows</v-icon>
          </v-list-tile-action>
          <v-tooltip bottom>
            <span slot="activator">Trocar de Lado</span>
            <span >Ao clicar o menu alterna de lado</span>
          </v-tooltip>
        </v-list-tile>
      </v-list>

    <v-list>
      <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
          <v-list-tile-action>
            <v-icon > {{item.icon}}</v-icon>
            <v-spacer></v-spacer>
          </v-list-tile-action  >
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon> exit_to_app </v-icon>
            <v-spacer></v-spacer>
          </v-list-tile-action  >
          <v-list-tile-content>Sair</v-list-tile-content>
      </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <!-- ==========================================  botão direito ============ -->
    </v-container>
</template>

<script>
import {NavBarIcons} from './NavBarIcons.js'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AutoObras'
    }
  },
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
