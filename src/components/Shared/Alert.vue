<template>
  <v-alert type="error" dismissible @input="onClose" :value="true">
      {{text}}
    </v-alert>
</template>

<script>
export default { //  ================    
    props:['text'],
    methods: {
      onClose(){
          this.$emit('dismissed') // dismissed é um nome escolhido. que é o mesmo em SIGNUP.VUE @dismissed
      }
  }
}
</script>
