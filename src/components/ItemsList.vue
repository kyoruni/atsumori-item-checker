<template>
  <div class="items-list">
    {{ category }}
    <v-list rounded>
      <v-list-item-group>
        <v-list-item v-for="item in items" :key="item.id">
          <template>
            <v-list-item-action>
              <v-checkbox
                :color="checkBoxColor"
                v-model="item.checked"
              />
            </v-list-item-action>
            <v-list-item-content @click="changeCheckBox(item)">
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import variables from '@/assets/scss/_variables.scss'
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
  computed: {
    checkBoxColor () {
      return variables.checkBoxColor
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
    changeCheckBox (target) {
      const item = this.items.find(item => item.id === target.id)
      item.checked = !item.checked
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
