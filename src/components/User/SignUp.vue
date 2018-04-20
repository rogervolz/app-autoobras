<template>
    <v-container grid-list-xs>
      <v-layout row wrap v-if="error">
        <v-flex xs12 sm6 offset-sm3 >
          <app-alert @dismissed= "onDismissed" :text="error.message"> </app-alert>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-container grid-list-xs>
                <v-form @submit.prevent="onSignup">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        class="input-group--focused"
                        name="email"
                        label="Email"
                        id="email"
                        v-model="email"
                        type="email"
                        hint="teste@teste.com.br"
                        prepend-icon="mail"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        name="password"
                        label="Senha"
                        id="password"
                        v-model="password"
                        type="password"
                        hint="mínimo de 6 caracteres"
                        persistent-hint
                        prepend-icon="lock"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        name="confirmPassword"
                        label="Confirme a senha"
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password"
                        prepend-icon="lock"
                        :rules="[comparePasswords]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap pl-1>
                    <v-flex xs12 ml-4>
                        <v-btn
                            class="secondary"
                            :loading="loading"
                            :disabled="loading"
                            @click.native="loader = 'loading'"
                            type="submit"
                          >
                            Inscreva-se
                            <span slot="loader" class="custom-loader">
                              <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default { // ==============       :text="error.code"
  data(){
      return{
          email:'',
          password:'',
          confirmPassword:'',
          loader: null,
          loading: false
      }
  },
  computed:{
      comparePasswords (){
          return this.password !== this.confirmPassword ? 'As senhas não são iguais' : ''
      },
      user() {
        console.log('SignUp.vue - computed user', this.$store.getters.user)
        return this.$store.getters.user // vem do store.js Getters - user
      },
      error(){
        return this.$store.getters.error  // vem do store.js Getters - error
      }
  },
  watch:{
    user (value){
      if (value !== null && value.uid !== undefined )
        console.log('****SignUp.vue - watch user ROTA para /****', value.uid)
        this.$router.push('/')
    },
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
  },
  methods:{
      onSignup () {
          //vuex
          this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
          console.log('SignUp.vue - onSignup', {email: this.email, password: this.password, confirmPassword: this.confirmPassword})
      },
      onDismissed (){
        console.log('SignUp.vue - Dismissed Alert' )
        this.$store.dispatch('clearError')
      }
  }
}
</script>

<style>
  .custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
