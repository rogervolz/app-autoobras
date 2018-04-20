<template>
  <v-app app>
    <v-container>
      <v-layout row wrap>
        <v-container grid-list-xs>
            <app-header></app-header>
        </v-container>

         <v-content fluid>
              <transition name="slide" mode="out-in">
                      <router-view></router-view>
              </transition>
         </v-content>

        <v-container grid-list-xs>
            <app-footer></app-footer>
        </v-container>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>

</script>

<style>
.slide-enter{
    opacity: 0;
  }
  .slide-enter-active{
    animation: slide-in 0.2s ease-out forwards;
    transition: opacity .0.6s;
  }
  .slide-leave{
    opacity: 1;
    transform: translateX(0);
  }
  .slide-leave-active{
    animation: slide-out 0.2s ease-out forwards;
    transition: opacity 0.5s;
    opacity: 0.6;
    /*position: absolute;*/
  }
  /*.slide-move{ /* utilizado para animação de elemnt group
    transition: transform 0.6s;
  }*/


  @keyframes slide-in {
    0% {
      transform: translateY(-30px);
    }
    100%{
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    0% {
      transform: translateY(0);
    }
    100%{
      transform: translateY(-30px);
    }
  }

</style>
