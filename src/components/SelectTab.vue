<template>
  <div class="select-tab">
    <v-tabs dark fixed-tabs :backgroundColor="tabColor" :icons-and-text="true">
      <v-tab v-for="tabItem in tabItems" :key="tabItem.id" class="font-weight-bold" @click="changeTab(tabItem.name)">
        {{ tabItem.text }}
        <v-icon>fas {{ tabItem.icon }}</v-icon>
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
        { id: 1, name: 'bug', text: 'ムシ', icon: 'fa-bug' },
        { id: 2, name: 'fish', text: 'サカナ', icon: 'fa-fish' },
        { id: 3, name: 'bone', text: 'かせき', icon: 'fa-bone' },
        { id: 4, name: 'music', text: 'ミュージック', icon: 'fa-music' },
      ]
    }
  },
  methods: {
    changeTab (tab) {
      this.$emit('changeTab', tab)
    }
  }
}
</script>
