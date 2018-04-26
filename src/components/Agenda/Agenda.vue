<template>
        <div id="components-demo">
          <button-counter></button-counter>
        </div>
</template>

<script>
import Vue from 'vue'

  Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

  export default {

  }
</script>


