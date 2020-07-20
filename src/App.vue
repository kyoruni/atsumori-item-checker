<template>
  <v-app>
    <header-nav @changeTab="changeTab($event)"/>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <items-list :category="currentTab"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import ItemsList from '@/components/ItemsList'

export default {
  name: 'App',
  components: {
    HeaderNav,
    ItemsList,
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
