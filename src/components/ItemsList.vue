<template>
  <div class="items-list">
    {{ category }}
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import musicList from '@/assets/list/music.json'

export default {
  props: [
    'category'
  ],
  data () {
    return {
      items: []
    }
  },
  methods: {
    initComponent () {
      switch (this.category) {
        case 'music':
          this.items = musicList
          break
        default:
          this.items = []
          break
      }
    }
  },
  beforeMount () {
    this.initComponent()
  },
  watch: {
    category () {
      this.initComponent()
    }
  }
}
</script>
