<template>
  <v-flex xs12 ma-3>
    <!-- =============  EDITOR  ========================================================== -->

    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs8 sm4 md4>
                <v-text-field label="Tarefa" v-model="editedItem.task"></v-text-field>
              </v-flex>
              <v-flex xs8 sm4 md4>
                <v-text-field label="Custo" v-model="editedItem.custo"></v-text-field>
              </v-flex>
              <v-flex xs8 sm4 md4>
                <v-text-field label="Início" v-model="editedItem.inicio"></v-text-field>
              </v-flex>
              <v-flex xs8 sm4 md4>
                <v-text-field label="Fim" v-model="editedItem.fim"></v-text-field>
              </v-flex>
              <v-flex xs8 sm4 md4>
                <v-text-field label="Peso" v-model="editedItem.peso"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- =============  TABELA ========================================================== -->

    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>
            <v-edit-dialog
              :return-value.sync="props.item.task"
              lazy
            > {{ props.item.task }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.task"
                single-line
                counter
                :rules="[max25chars]"
              ></v-text-field>
            </v-edit-dialog>
        </td>
        <td class="text-xs-right">
            <v-edit-dialog
                :return-value.sync="props.item.custo"
                lazy
              > {{ props.item.custo }}
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="props.item.custo"
                  single-line
                  counter
                  :rules="[max25chars]"
                ></v-text-field>
              </v-edit-dialog>
        </td>
        <td class="text-xs-right">
              <v-edit-dialog
                  :return-value.sync="props.item.inicio"
                  lazy
                > {{ props.item.inicio }}
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="props.item.inicio"
                    single-line
                    counter
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
        </td>
        <td class="text-xs-right">
              <v-edit-dialog
                  :return-value.sync="props.item.fim"
                  lazy
                > {{ props.item.fim }}
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="props.item.fim"
                    single-line
                    counter
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
        </td>
        <td class="text-xs-right">
                <v-edit-dialog
                    :return-value.sync="props.item.peso"
                    lazy
                  > {{ props.item.peso }}
                    <v-text-field
                      slot="input"
                      label="Edit"
                      v-model="props.item.peso"
                      single-line
                      counter
                      :rules="[max25chars]"
                    ></v-text-field>
                </v-edit-dialog>
          </td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: 'Tarefas',
          align: 'left',
          sortable: false,
          value: 'task'
        },
        { text: 'Custo', value: 'custo' },
        { text: 'Início', value: 'inicio' },
        { text: 'Fim', value: 'fim' },
        { text: 'Peso', value: 'peso' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        task: '',
        custo: 0,
        fim: 0,
        inicio: 0,
        peso: 0
      },
      defaultItem: {
        task: '',
        custo: 0,
        fim: 0,
        inicio: 0,
        peso: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Tarefa' : 'Editar tarefa'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = [
          {
            task: 'Frozen Yogurt',
            custo: 159,
            fim: 6.0,
            inicio: 24,
            peso: 4.0
          },
          {
            task: 'Ice cream sandwich',
            custo: 237,
            fim: 9.0,
            inicio: 37,
            peso: 4.3
          },
          {
            task: 'Eclair',
            custo: 262,
            fim: 16.0,
            inicio: 23,
            peso: 6.0
          },
          {
            task: 'Cupcake',
            custo: 305,
            fim: 3.7,
            inicio: 67,
            peso: 4.3
          },

        ]
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
