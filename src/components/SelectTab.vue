<template>
  <div class="select-tab">
    <v-tabs dark fixed-tabs :backgroundColor="tabColor" :icons-and-text="true">
      <v-tab v-for="tabItem in tabItems" :key="tabItem.id" class="font-weight-bold">
        {{ tabItem.name }}
        <v-icon>{{ tabItem.icon }}</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import variables from '@/assets/scss/_variables.scss'

export default {
  computed: {
    tabColor () {
      return variables.tabColor
    }
  },
  data () {
    return {
      tabItems: [
        { id: 1, name: 'ムシ', icon: 'fas fa-bug' },
        { id: 2, name: 'サカナ', icon: 'fas fa-fish' },
      ]
    }
  }
}
</script>
