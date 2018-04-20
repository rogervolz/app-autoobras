import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {   //====================================  STATE ========================
    user: null,
    loading: false,
    error: null
  },
  mutations: {      //====================================  MUTATIONS ========================

    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      console.log("store.js setLoading state.user", state.user);
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: { //====================================  ACTIONS ========================

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          payload.email, payload.password) // ======= FIREBASE ===========================================
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
          console.log("store.js signUserUp - setUser", newUser);
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log("store.js **ERRO** SignUserUP", error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password) // ======= FIREBASE =============
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
          console.log("store.js signUserIn - setUser", newUser);
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log("store.js erro store.js SignUserIN", error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id + "/registrations/")
        .once("value")
        .then(data => {
          const dataPairs = data.val();
          const registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          };
          commit("setLoading", false);
          commit("setUser", updatedUser);

          console.log(registeredMeetups);
          console.log(swappedPairs);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: { //====================================  GETTERS ========================

    user(state) {
      console.log("store.js ===USER ===", state.user);
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      console.log("store.js error state", state);
      return state.error;
    }
  }
});
