<template>
    <div>
       <h3>Some User Details</h3>
       <p>User loaded has ID: {{ $route.params.id }} </p>
       <router-link
          tag="button"
          :to="link"
          class="btn btn-primary">Edit User </router-link> <!-- :to="'/user/' + $route.params.id + '/edit'" -->
    </div>
</template>
<script>
    export default {
      data () {
        return {
          link: {
            name: 'userEdit',
            params: {
              id: this.$route.params.id
            },
            query: {
              locale: 'pt',
              q: 100
            },
            hash: '#data'
          }
        }
      },
      beforeRouteEnter: (to, from, next) => {
        if (true){ //aqui pode usar para verificar se o usuário está autenticado ou alguma outra checagem antes de carregar o componente
          next();
        }else{
          next(false); //next( vm => { vm.link; });
        }

      }
    }
</script>
