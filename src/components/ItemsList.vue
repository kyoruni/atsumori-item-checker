<template>
  <div class="items-list">
    {{ category }}
    <v-col cols="12" md="6" offset-md="3">
      <v-text-field
        single-line
        outlined
        label="検索（前方一致）"
        prepend-inner-icon="fas fa-search"
        v-model="searchText"
      />
    </v-col>
    <v-list>
      <v-list-item-group v-for="displayItem in displayItems" :key="displayItem.id">
        <!-- バリエーションあり：リスト開閉用のボタンを表示 -->
        <v-list-group v-if="displayItem.variation" :ripple="false">
          <!-- 親のリスト -->
          <template v-slot:activator>
            <!-- 親のチェックボックス -->
            <v-list-item-action>
              <v-checkbox
                v-model="displayItem.checked"
                :color="checkBoxColor"
                :ripple="false"
              />
            </v-list-item-action>
            <v-list-item-title>{{ displayItem.name }}</v-list-item-title>
          </template>
          <!-- 子のリスト -->
          <v-list-item no-action v-for="color in displayItem.colors" :key="color.id" :ripple="false">
            <!-- 子のチェックボックス -->
            <v-list-item-action>
              <v-checkbox
                v-model="color.checked"
                :color="checkBoxColor"
                :ripple="false"
              />
            </v-list-item-action>
            <v-list-item-title>{{ color.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!-- バリエーションなし：リスト開閉なし-->
        <v-list-item v-else :ripple="false">
          <template>
            <!-- チェックボックス -->
            <v-list-item-action>
              <v-checkbox
                v-model="displayItem.checked"
                :color="checkBoxColor"
                :ripple="false"
              />
            </v-list-item-action>
            <v-list-item-title>{{ displayItem.name }}</v-list-item-title>
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
      items: [],
      displayItems: [],
      searchText: null,
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
          this.displayItems = musicList
          break
        default:
          this.items = []
          this.displayItems = musicList
          break
      }
    },
    changeCheckBox (target) {
      const item = this.items.find(item => item.id === target.id)
      item.checked = !item.checked
    },
    itemSearch (inputText) {
      // 前方一致で検索
      const reg = new RegExp('^' + inputText)
      this.displayItems = this.items.filter(item => item.name.match(reg) || !inputText)
    }
  },
  beforeMount () {
    this.initComponent()
  },
  watch: {
    category () {
      this.initComponent()
    },
    searchText (value) {
      this.itemSearch(value)
    }
  }
}
</script>

<style>
.v-list-item--link:before {
  background-color: white !important;
}

.theme--light.v-list-item:hover::before {
  opacity: 0;
}
</style>
