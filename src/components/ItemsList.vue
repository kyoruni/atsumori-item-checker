<template>
  <div class="items-list">
    {{ category }}
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="item in items" :key="item.id">
          <template>
            <v-list-item-action>
              <v-checkbox
                color="primary"
                v-model="item.checked"
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    },
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