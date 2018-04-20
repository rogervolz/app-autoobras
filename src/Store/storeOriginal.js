import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
         state: {
           loadedMeetups: [
             {
               imageUrl:
                 "http://2.bp.blogspot.com/-zDq39TERdy0/UozH3Ak770I/AAAAAAAAUzs/TCZwJm6z65I/s1600/ligia+guerra+pato+branco.jpg",
               id: "sdfasdfsadf",
               title: "Lara e a Minnie",
               date: new Date(),
               location: "São Paulo",
               description: "É SP!"
             },
             {
               imageUrl:
                 "https://marcioantoniassi.files.wordpress.com/2014/01/pato-branco-pr.jpg",
               id: "çjkpiij",
               title: "Dante e maçã",
               date: new Date(),
               location: "Paris",
               description: "It's Paris!"
             }
           ],
           user: null,
           loading: false,
           error: null
         },
         mutations: {
           registerUserForMeetup(state, payload) {
             const id = payload.id;
             if (
               state.user.registeredMeetups.findIndex(
                 meetup => meetup.id === id
               ) >= 0
             ) {
               return;
             }
             state.user.registeredMeetups.push(id);
             state.user.fbKeys[id] = payload.fbKey;
           },
           unregisterUserFromMeetup(state, payload) {
             const registeredMeetups = state.user.registeredMeetups;
             registeredMeetups.splice(
               registeredMeetups.findIndex(
                 meetup => meetup.id === payload
               ),
               1
             );
             Reflect.deleteProperty(state.user.fbKeys, payload);
           },
           setLoadedMeetups(state, payload) {
             state.loadedMeetups = payload;
           },
           createMeetup(state, payload) {
             state.loadedMeetups.push(payload);
           },
           updateMeetup(state, payload) {
             const meetup = state.loadedMeetups.find(meetup => {
               return meetup.id === payload.id;
             });
             if (payload.title) {
               meetup.title = payload.title;
             }
             if (payload.description) {
               meetup.description = payload.description;
             }
             if (payload.date) {
               meetup.date = payload.date;
             }
             if (payload.location) {
               meetup.location = payload.location;
             }
           },
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
         actions: {
           registerUserForMeetup({ commit, getters }, payload) {
             commit("setLoading", true);
             const user = getters.user;
             firebase
               .database()
               .ref("/users/" + user.id)
               .child("/registrations/")
               .push(payload)
               .then(data => {
                 commit("setLoading", false);
                 commit("registerUserForMeetup", {
                   id: payload,
                   fbKey: data.key
                 }); //data é um objeto retornado pelo Firebase
               })
               .catch(eror => {
                 console.log(
                   "store.js - registerUserForMeetup ***ERROR***",
                   error
                 );
                 commit("setLoading", false);
               });
           },
           unregisterUserFromMeetup({ commit, getters }, payload) {
             commit("setLoading", true);
             const user = getters.user;
             if (!user.fbKeys) {
               return;
             }
             const fbKey = user.fbKeys[payload];
             firebase
               .database()
               .ref("/users/" + user.id + "/registrations/")
               .child(fbKey)
               .remove()
               .then(() => {
                 commit("setLoading", false);
                 commit("unregisterUserFromMeetup", payload);
               })
               .catch(eror => {
                 console.log(
                   "store.js - registerUserForMeetup ***ERROR***",
                   error
                 );
                 commit("setLoading", false);
               });
           },
           loadMeetups({ commit }) {
             commit("setLoading", true);
             firebase
               .database()
               .ref("meetups")
               .once("value")
               .then(data => {
                 const meetups = [];
                 const obj = data.val(); //pegar os valores do objeto que vem do firebase
                 for (let key in obj) {
                   meetups.push({
                     id: key,
                     title: obj[key].title,
                     description: obj[key].description,
                     imageUrl: obj[key].imageUrl,
                     location: obj[key].location,
                     date: obj[key].date,
                     creatorId: obj[key].creatorId
                   });
                 }
                 commit("setLoadedMeetups", meetups);
                 commit("setLoading", false);
               })
               .catch(eror => {
                 console.log(
                   " store.js  -- loadMeetups ***ERROR***",
                   error
                 );
                 commit("setLoading", false);
               });
           },
           createMeetup({ commit, getters }, payload) {
             const meetup = {
               title: payload.title,
               location: payload.location,
               description: payload.description,
               date: payload.date.toISOString(),
               creatorId: getters.user.id
             };
             //Reach out to firebase and store it
             let imageUrl;
             let key;
             firebase
               .database()
               .ref("meetups")
               .push(meetup)
               .then(data => {
                 console.log("store.js **firebase - dados**", data);
                 key = data.key;
                 return key;
               })
               .then(key => {
                 const filename = payload.image.name;
                 const ext = filename.slice(filename.lastIndexOf("."));
                 return firebase
                   .storage()
                   .ref("meetups/" + key + "." + ext)
                   .put(payload.image);
               })
               .then(fileData => {
                 imageUrl = fileData.metadata.downloadURLs[0];
                 return firebase
                   .database()
                   .ref("meetups")
                   .child(key)
                   .update({ imageUrl: imageUrl });
               })
               .then(() => {
                 //... significa que pega tudo do objeto "createMeetup" e acrescenta o que vem depois, id: key
                 commit("createMeetup", {
                   ...meetup,
                   imageUrl: imageUrl,
                   id: key
                 });
               })
               .catch(error => {
                 console.log(
                   "store.js **FIREBASE ERRO** SignUserUP",
                   error
                 );
               });
             //============================================ FIREBASE ===========================================
           },
           updateMeetupData({ commit }, payload) {
             commit("setLoading", true);
             const updateObj = {};
             if (payload.title) {
               updateObj.title = payload.title;
             }
             if (payload.description) {
               updateObj.description = payload.description;
             }
             if (payload.date) {
               updateObj.date = payload.date;
             }
             if (payload.location) {
               updateObj.location = payload.location;
             }
             firebase
               .database()
               .ref("meetups")
               .child(payload.id)
               .update(updateObj) //============= FIREBASE
               .then(() => {
                 commit("setLoading", false);
                 commit("updateMeetup", payload);
               })
               .catch(error => {
                 console.log(
                   "store.js **FIREBASE ERRO** updateMeetup",
                   error
                 );
                 commit("setLoading", false);
               });
           },
           signUserUp({ commit }, payload) {
             commit("setLoading", true);
             commit("clearError");
             firebase
               .auth()
               .createUserWithEmailAndPassword(
                 payload.email,
                 payload.password
               ) // ======= FIREBASE ======================================================
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
               .signInWithEmailAndPassword(
                 payload.email,
                 payload.password
               ) // ======= FIREBASE =============
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
           fetchUserData ({ commit , getters}) {
             commit("setLoading", true);
             firebase
               .database()
               .ref("/users/" + getters.user.id + "/registrations/")
               .once("value")
               .then(data => {
                 const dataPairs = data.val();
                 const registeredMeetups = []
                 let swappedPairs={}
                 for (let key in dataPairs){
                   registeredMeetups.push(dataPairs[key])
                   swappedPairs[dataPairs[key]] = key
                 }
                 const updatedUser = {
                   id:getters.user.id,
                   registeredMeetups: registeredMeetups,
                   fbKeys: swappedPairs
                 }
                 commit("setLoading", false)
                 commit("setUser", updatedUser)

                 console.log(registeredMeetups)
                 console.log(swappedPairs);
               })
               .catch(error =>{
                 console.log(error)
                 commit("setLoading", false)
               })
           },
           logout({ commit }) {
             firebase.auth().signOut();
             commit("setUser", null);
           },
           clearError({ commit }) {
             commit("clearError");
           }
         },
         getters: {
           loadedMeetups(state) {
             return state.loadedMeetups.sort((meetupA, meetupB) => {
               return meetupA.date > meetupB.date;
             });
           },
           featuredMeetups(state, getters) {
             return getters.loadedMeetups.slice(0, 5);
           },
           loadedMeetup(state) {
             return meetupId => {
               return state.loadedMeetups.find(meetup => {
                 return meetup.id === meetupId;
               });
             };
           },
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
