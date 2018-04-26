<template>
  <div>
    <!-- ===================   CARD TOPO       ================== -->
    <v-layout row justify-center>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs5>
              <v-card>
                <p>TESTE</p>
                <p>TESTE</p>
                <p>TESTE</p>
              </v-card>
          </v-flex>
          <v-flex xs5>
              <v-card>
                <p>TESTE</p>
                <p>TESTE</p>
                <p>TESTE</p>
              </v-card>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2>
            <v-container grid-list-xs>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex xs4>
                    <!-- ============== formulário ================ -->
                      <app-creator-form ></app-creator-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <!-- ============== TABELA ================ -->

    <app-radio-peao></app-radio-peao>

    <!-- ===============  CREATOR ============================================ -->
    <v-divider></v-divider>

    <app-creator-task></app-creator-task>

    <!-- ===============  CREATOR ============================================ -->

  </div>
</template>

<script>
import appCreatorForm from './RPCreatorForm.vue'
import appCreatorTask from './RPCreatorTask.vue'
import appRadioPeao from '../RadioPeao.vue'

export default {
    components:{
      appCreatorForm,
      appCreatorTask,
      appRadioPeao
  }
}
</script>

