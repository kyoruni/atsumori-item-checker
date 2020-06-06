<template>
  <v-app>
    <header-nav @changeTab="changeTab($event)"/>
    <v-container>
      <v-row>
        <v-col mb="8" mb-offset="2">
          {{ currentTab }}
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
    HeaderNav,
  },
  data () {
    return {
      currentTab: 'furniture',
    }
  },
  methods: {
    changeTab (event) {
      this.currentTab = event
    }
  }
}
</script>
