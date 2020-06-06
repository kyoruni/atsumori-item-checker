<template>
  <div class="header">
    <v-toolbar :short="true" :dark="true" :color="mainColor">
      <v-toolbar-title>あつ森アイテムチェッカー</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import variables from '@/assets/scss/_variables.scss'

export default {
  computed: {
    mainColor () {
      return variables.mainColor
    }
  }
}
</script>