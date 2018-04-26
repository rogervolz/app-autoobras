<template>
       <v-flex xs12 sm12 offset-sm1 md12 offset-md1>
        <v-container grid-list-xs fluid text-xs-center>
          <v-layout row wrap>
              <!-- ======  ID ================================= -->
                <v-card width="35px" >
                  <p class="text-xs-center">ID</p>
                  <p class="text-xs-center">ID</p>
                </v-card>

              <!-- ======  TASK ================================= -->
              <v-flex xs9 >
                <v-card  @mouseover="showMenu=!showMenu">
                  <v-container grid-list-xs>
                    <v-layout row wrap>
                        <v-flex xs4 sm4 md4>
                            <v-text-field label="Tarefa/Subtarefa" required></v-text-field>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs4 sm4 md4>
                            <v-text-field label="Custo/Orç." ></v-text-field>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 sm2 md2>
                            <v-text-field label="Início" ></v-text-field>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 sm2 md2>
                            <v-text-field label="Fim" ></v-text-field>
                        </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>

              </v-flex>

              <!-- ======  selector PESO ================================= -->
              <v-flex xs2>
                <v-card width="50px" >
                  <v-layout row wrap>
                    <v-select
                    :items="items"
                    v-model="peso"
                    label="Peso"
                    single-line
                    auto
                    hide-details
                  ></v-select>
                  <app-btn-editor-task ></app-btn-editor-task>
                  </v-layout>
                </v-card>
              </v-flex>


                <!-- ======  CLOSE ================================= -->
                <!-- <v-btn flat small icon><v-icon>close</v-icon></v-btn>
                <v-btn flat small icon><v-icon>add_circle</v-icon></v-btn> -->



            </v-layout>
          </v-container>
      </v-flex>

</template>

<script>
import appBtnEditorTask from '../../Shared/BtnEditorTask.vue'

export default {

  data () {
      return{
          dialog: false,
          showMenu: false,
          peso:0,
          items: [
          { text: 1 },
          { text: 3 },
          { text: 5 },
          { text: 8 },
          { text: 13 },
          { text: 21 },
          { text: 34 }
        ],
      }
  },
  components:{
      appBtnEditorTask
  }

}

</script>


