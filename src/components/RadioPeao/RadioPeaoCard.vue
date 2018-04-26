<template>
       <v-flex>
        <v-card color="radioPeao" >
          <!-- ===========  TÍTULO ============ -->
          <v-card-title dark class="textWhite">
            RÁDIO PEÃO
            <v-spacer></v-spacer>
            <v-flex xs4 style="cursor:pointer" @click.stop="goToCreator" slot="activator">
                <v-container grid-list-xs text-xs-center>
                  <v-flex xs4 fluid>
                    <v-layout row>
                      <v-btn small color="secondary" >
                          <v-icon>add</v-icon>
                          Obra
                      </v-btn>
                    </v-layout>
                  </v-flex>
                </v-container>
              </v-flex>
          </v-card-title>
         <!-- ===========  GRID RESUMO ============ -->
          <v-container grid-list-xs text-xs-center>
            <v-layout row wrap>
         <!-- ===========  CARD OBRA ============ -->
              <v-flex xs12 pa-1>
                <v-card color="secondary">
                  <app-card-obra light ></app-card-obra>
                </v-card>
              </v-flex>
         <!-- ===========  CARD CRIAR OBRAS ===================================================== -->


            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
</template>

<script>
import RPCardObra from './RPCardObra.vue'

export default {
  data(){
    return{
        dialog: false
    }
  },
  components:{
    appCardObra: RPCardObra
  },
  methods: {
    goToObra () {
      this.$router.push('/radioPeao')
    },
    goToCreator(){
      this.$router.push('/criadorObra')
    }
  }
}
</script>


