// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as firebase from "firebase"
import {store} from './Store/store'
import DateFilter from "./filters/date"
//import {store} from  './store/store' // { store } = nome da constante dentro do arquivo store.js

import Header from "@/components/Toolbar/Header.vue"
import Footer from "@/components/Toolbar/Footer.vue"
import RadioPeao from "@/components/Radio-peao/Radio-peao.vue";
import Agenda from "@/components/Agenda/Agenda.vue";
import Diario from "@/components/Diario/Diario.vue";
import Financeiro from "@/components/Financeiro/Financeiro.vue";

import colors from "../node_modules/vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken3,
    secondary: colors.cyan.darken2,
    accent: colors.lime.darken4,
    error: colors.red.accent2,
    info: colors.cyan.darken2,
    success: colors.green.accent1,
    warning: colors.yellow.darken3,
    agenda: colors.indigo.accent2,
    financeiro: colors.green.lighten2,
    diario: colors.orange.lighten2,
    radioPeao: colors.blueGrey.darken1
  }
});

Vue.config.productionTip = false

// Vue.filter("dateFilter", DateFilter);
Vue.component("app-header", Header);
Vue.component("app-footer", Footer);
Vue.component("app-radio-peao", RadioPeao);
Vue.component("app-agenda", Agenda);
Vue.component("app-diario", Diario);
Vue.component("app-financeiro", Financeiro);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({ // copiar os dados do Firebase Auth
            apiKey: "AIzaSyAsbMwR1AhGqRJMs0FhFfwb2kBf5cTuF8U",
            authDomain: "app-autoobras.firebaseapp.com",
            databaseURL: "https://app-autoobras.firebaseio.com",
            projectId: "app-autoobras",
            storageBucket: "app-autoobras.appspot.com",
            messagingSenderId: "229522198308"
    })
    firebase.auth().onAuthStateChanged((user)=>{ //listener do firebase que verifica se user existe
      if (user){
        this.$store.dispatch('autoSignIn',user)
        //this.$store.dispatch('fetchUserData')
      }
    })
    //this.$store.dispatch('loadMeetups')
  }
})
