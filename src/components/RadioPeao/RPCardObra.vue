<template>
  <v-card>
    <!-- ========== CARD TITULO ====== -->
    <v-card  color="secondary">
      <v-card-title class="textWhite">
          OBRAS
          <v-spacer></v-spacer>
          <v-text-field
            dark
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
      </v-card-title>
    </v-card>

    <!-- ============= TABELA ============== -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      small
    >
      <template slot="items" slot-scope="props">
        <td
            class="text-xs-right"
            @click.stop="goToObra"
            style="cursor:pointer"
            >{{ props.item.numeroObra }}</td>
        <td
            @click.stop="goToObra"
            style="cursor:pointer"
            >{{ props.item.nomeObra }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Sua busca para "{{ search }}" não encontrou resultados.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'Núm', value: 'numeroObra' },
          {
            text: 'Nome Obra',
            align: 'left',
            sortable: false,
            value: 'nomeObra'
          },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        items: [
          {
            value: false,
            nomeObra: 'Frozen Yogurt',
            numeroObra: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            nomeObra: 'Ice cream sandwich',
            numeroObra: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            nomeObra: 'Eclair',
            numeroObra: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            nomeObra: 'Cupcake',
            numeroObra: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            nomeObra: 'Gingerbread',
            numeroObra: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            nomeObra: 'Jelly bean',
            numeroObra: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            nomeObra: 'Lollipop',
            numeroObra: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            nomeObra: 'Honeycomb',
            numeroObra: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            nomeObra: 'Donut',
            numeroObra: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            nomeObra: 'KitKat',
            numeroObra: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    }
  }
</script>



