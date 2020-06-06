<template>
  <v-app>
    <header-nav/>
    <v-container>
      <v-row>
        <v-col mb="8" mb-offset="2">
          <select-tab @changeTab="changeTab($event)"/>
          {{ currentTab }}
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import SelectTab from '@/components/SelectTab'

export default {
  name: 'App',
  components: {
    HeaderNav,
    SelectTab,
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
