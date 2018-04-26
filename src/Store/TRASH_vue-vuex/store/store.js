import Vue from 'vue';
import Vuex from 'vuex';
import mCounter from './modules/counter';

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

//=============== UNIQUE NAMES ===========================

export const store = new Vuex.Store({ // central local de storage
    state: {
      value: 0
    },
    getters,// actions: actions - mesmo nome o ES6 permite escrever um só
    mutations,// actions: actions - mesmo nome o ES6 permite escrever um só
    actions, // actions: actions - mesmo nome o ES6 permite escrever um só
    modules:{
      mCounter
    }
});
