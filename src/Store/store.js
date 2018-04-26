import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import Auth from './Modules/Auth.js'


Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
        Auth
    }
});

