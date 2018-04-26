<template>
  <v-layout row justify-center>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <!-- ======= botão para abrir formulário ========= -->
        <v-btn small color="secondary" slot="activator">
          <v-icon>add</v-icon>
          <span class="textWhite" > Obra</span>
        </v-btn>
      <!-- =========== formulário ==================== -->
      <v-card>
        <v-card-title>
          <span class="headline">Cadastro da Obra</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nome da Obra" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="Código da Obra"
                    hint="example of helper text only on focus"
                    required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Telefone da obra"
                  hint="11.9.8888.7777"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Endereço da Obra" ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email da Obra" ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Tipo da obra"
                  required
                  :items="['Industrial', 'Comercial', 'Reforma', 'Residencial', 'Loteamento', 'Projeto']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return{
          dialog: false
      }
    }
  }
</script>
