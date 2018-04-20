<template>
  <v-container fluid grid-list-xs>

      <!-- ========================    linha 1 ==================== -->
    <v-spacer></v-spacer>
    <v-layout row wrap>

      <app-agenda></app-agenda>

      <app-radio-peao></app-radio-peao>

    </v-layout>

      <!-- ========================    linha 1 ==================== -->

      <!-- ========================    linha 2 ==================== -->
    <v-spacer></v-spacer>
    <v-layout row wrap>

      <app-financeiro></app-financeiro>

      <app-diario></app-diario>

    </v-layout>
    <v-spacer></v-spacer>
      <!-- ========================    linha 2 ==================== -->
  </v-container>
</template>

