<template>
    <div>
        <h3>Edit the User</h3>
        <h1> AAAAAA {{ $route.params.id }} </h1>
        <p>Locale: {{ $route.query.locale }} </p>
        <p>Analytics: {{ $route.query.q }} </p>
        <hr>
        <button class="btn btn-primary" @click="confirmed = true">Confirm</button>
        <div style="height: 700px"></div>
        <p id="data">Some data</p>
    </div>
</template>

<script>
    export default {
      data() {
        return{
          confirmed: false
        }
      },
      beforeRouteLeave: (to, from, next) => {
        if (this.confirmed){
            next();
        }else{
          if (confirm('Are you sure?')){
            next();
          }else{
            next(false);
          }
        }
        console.log ('inside userEdit.vue beforeRouteLeave');
      }
    }


</script>
