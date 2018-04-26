import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Header from "@/components/Toolbar/Header.vue"
import Footer from "@/components/Toolbar/Footer.vue"
import RadioPeao from "@/components/RadioPeao/RadioPeao.vue";
import Creator from "@/components/RadioPeao/CreateTask/RPCreator.vue";
import SignIn from "../components/User/SignIn.vue"
import SignUp from "../components/User/SignUp.vue"
import AuthGuard from "./auth-guard"

const User = resolve => {
  //só carrega o componente se ele for solicitado
  require.ensure(["@/components/User/User.vue"], () => {
    resolve(require("@/components/User/User.vue"))
  })
}

const UserStart = resolve => {
  //só carrega o componente se ele for solicitado
  require.ensure(["@/components/User/UserStart.vue"], () => {
    resolve(require("@/components/User/UserStart.vue"));
  })
}

const UserEdit = resolve => {
  //só carrega o componente se ele for solicitado
  require.ensure(["@/components/User/UserEdit.vue"], () => {
    resolve(require("@/components/User/UserEdit.vue"));
  });
};

const UserDetail = resolve => {
  //só carrega o componente se ele for solicitado
  require.ensure(["@/components/User/UserDetail.vue"], () => {
    resolve(require("@/components/User/UserDetail.vue"));
  });
};

const Capa = resolve => {
  //só carrega o componente se ele for solicitado
  require.ensure(["@/components/Capa.vue"], () => {
    resolve(require("@/components/Capa.vue"));
  });
};

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: "/",
      name: "Home",
      component: Home
    },*/
    {
      path: "/",
      name: "Capa",
      component: Capa
    },
    {
      path: "/app",
      name: "Capa",
      component: Capa
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/radioPeao",
      name: "Radio-Peao",
      component: RadioPeao
    },
    {
      path: "/criadorObra",
      name: "Creator",
      component: Creator
    },
    {
      path: "/user",
      component: User,
      children: [
        { path: "", component: UserStart },
        {
          path: ":id",
          component: UserDetail,
          beforeEnter: (to, from, next) => {
            console.log("inside route setup");
            next();
          }
        },
        { path: ":id/edit", component: UserEdit, name: "userEdit" }
      ]
    },
    { path: "/redirect-me", redirect: { name: "Home" } }, // redirecionar
    { path: "*", redirect: "/" }
  ],
  mode: "history"
});
