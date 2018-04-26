<template>
  <v-container fluid grid-list-xs>
      <!-- ========================    linha 1 ==================== -->
    <v-layout row wrap >
          <v-flex xs12 sm5 md5 lg5>
            <!-- <app-agenda></app-agenda> -->
            <!-- <app-camera></app-camera> -->
            <app-financeiro></app-financeiro>
          </v-flex>

          <v-flex xs12 sm7 md7 lg5>
              <app-radio-peao-card ></app-radio-peao-card>
          </v-flex>
    </v-layout>
      <!-- ========================    linha 1 ==================== -->

      <!-- ========================    linha 2 ==================== -->
    <v-layout row wrap>
        <v-flex xs12 sm5 md5 lg5>
          <app-diario></app-diario>
        </v-flex>
        <v-flex xs12 sm7 md7 lg5>
          <app-camera></app-camera>
        </v-flex>
    </v-layout>
      <!-- ========================    linha 2 ==================== -->
  </v-container>
</template>

<script>
export default {

}
</script>


