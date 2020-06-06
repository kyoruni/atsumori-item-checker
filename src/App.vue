<template>
  <v-app>
    <header-nav/>
    <v-container>
      <v-row>
        <v-col mb="8" mb-offset="2">
          <v-card class="pa-2" outlined tile>
            hoge
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'App',
  components: {
    HeaderNav
  }
}
</script>
