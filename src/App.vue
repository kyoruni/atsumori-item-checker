<template>
  <v-app>
    <header-nav @changeTab="changeTab($event)"/>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
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
      currentTab: 'music',
    }
  },
  methods: {
    changeTab (event) {
      this.currentTab = event
    }
  }
}
</script>
