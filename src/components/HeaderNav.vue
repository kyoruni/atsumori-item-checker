<template>
  <div class="header">
    <v-toolbar short dark flat extension-height="72" :color="mainColor">
      <v-toolbar-title>あつ森アイテムチェッカー（仮）</v-toolbar-title>
      <v-spacer/>
      <v-btn icon @click="aboutButton()">
        <v-icon>fas fa-question-circle</v-icon>
      </v-btn>
      <about ref="dialog"/>
      <!-- カテゴリー一覧 -->
      <template v-slot:extension>
        <v-tabs dark fixed-tabs show-arrows :backgroundColor="mainColor" :icons-and-text="true">
          <v-tabs-slider :color="sliderColor"/>
          <v-tab
            v-for="tabItem in tabItems.filter(tabItem => tabItem.showFlg)"
            :key="tabItem.id"
            class="font-weight-bold"
            :style="{ fontSize: '10px' }"
            @click="changeTab(tabItem.name)"
          >
            {{ tabItem.text }}
            <v-icon>{{ tabItem.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import variables from '@/assets/scss/_variables.scss'
import categories from '@/assets/json/categories.json'
import About from '@/components/About'

export default {
  components: {
    About,
  },
  computed: {
    mainColor () {
      return variables.mainColor
    },
    sliderColor () {
      return variables.sliderColor
    },
  },
  data () {
    return {
      tabItems: categories
    }
  },
  methods: {
    changeTab (tab) {
      this.$emit('changeTab', tab)
    },
    aboutButton () {
      this.$refs.dialog.open()
    }
  },
}
</script>