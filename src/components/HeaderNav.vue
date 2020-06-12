<template>
  <div class="header">
    <v-toolbar short dark flat extension-height="72" :color="mainColor">
      <v-toolbar-title>あつ森アイテムチェッカー（全体的に工事中）</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs dark fixed-tabs show-arrows :backgroundColor="mainColor" :icons-and-text="true">
          <v-tabs-slider :color="sliderColor"/>
          <v-tab v-for="tabItem in tabItems"
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

export default {
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
      tabItems: [
        { id: 1, name: 'furniture', text: 'かぐ', icon: 'fas fa-couch' },
        { id: 2, name: 'smallFurniture', text: 'こもの', icon: 'fas fa-coffee' },
        { id: 3, name: 'wallHangings', text: 'かべかけ', icon: 'fas fa-clipboard' },
        { id: 4, name: 'wallpaper', text: 'かべがみ', icon: 'fas fa-leaf' },
        { id: 5, name: 'carpet', text: 'ゆかいた', icon: 'fas fa-leaf' },
        { id: 6, name: 'rug', text: 'ラグ', icon: 'fas fa-leaf' },
        { id: 7, name: 'tops', text: 'トップス', icon: 'fas fa-tshirt' },
        { id: 8, name: 'bottoms', text: 'ボトムス', icon: 'fas fa-tshirt' },
        { id: 9, name: 'dress', text: 'ワンピース', icon: 'fas fa-tshirt' },
        { id: 10, name: 'hat', text: 'かぶりもの', icon: 'fab fa-redhat' },
        { id: 11, name: 'accessory', text: 'アクセサリ', icon: 'fas fa-glasses' },
        { id: 12, name: 'socks', text: 'くつした', icon: 'fas fa-socks' },
        { id: 13, name: 'shoues', text: 'くつ', icon: 'fas fa-shoe-prints' },
        { id: 14, name: 'bag', text: 'バッグ', icon: 'fas fa-shopping-bag' },
        { id: 15, name: 'umbrella', text: 'かさ', icon: 'fas fa-umbrella' },
        { id: 16, name: 'bug', text: 'ムシ', icon: 'fas fa-bug' },
        { id: 17, name: 'fish', text: 'サカナ', icon: 'fas fa-fish' },
        { id: 18, name: 'bone', text: 'かせき', icon: 'fas fa-bone' },
        { id: 19, name: 'art', text: 'めいが', icon: 'fas fa-paint-brush' },
        { id: 20, name: 'music', text: '曲', icon: 'fas fa-music' },
      ]
    }
  },
  methods: {
    changeTab (tab) {
      this.$emit('changeTab', tab)
    }
  },
}
</script>