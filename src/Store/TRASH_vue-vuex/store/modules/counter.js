import * as types from '../types';

const state = {
  counter:0
};

const getters = {
  [types.DOUBLE_COUNTER]: state => {
    return state.counter *2;
  },
  [types.CLICK_COUNTER]: state => {
    return state.counter + 'Clicks';
  }
};

const mutations = {
  increment: (state, payload) => {
    state.counter += payload;
  },
  decrement: (state, payload) => {
    state.counter -= payload;
  }
};

const actions = {
  increment: ({ commit }, payload ) => {
    commit('increment', payload);
  },
  decrement: ({ commit }, payload ) => {
    commit('decrement', payload);
  },
  asyncIncrement: ({ commit }, payload ) => { //usado para sincronização assincrona
    setTimeout(()=>{
      commit('increment', payload.by);
    },payload.duration);
  },
  asyncDecrement: ({ commit }, payload ) => { //usado para sincronização assincrona
    setTimeout(()=>{
      commit('decrement',payload.by);
    },payload.duration);
  }
};

export default  { // exporta um objeto que será importado no STORE CENTRAL - store.js
  state, // é igual a state: state, --- só é permito pelo ES6
  mutations,
  actions,
  getters
}
