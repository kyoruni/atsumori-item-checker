<template>
  <div class="items-list">
    {{ category }}
    <item-search @searchItem="searchItem($event)"/>
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
                @change="changeCheckBox(displayItem)"
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
                @change="changeCheckBox(displayItem)"
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
import ItemSearch from '@/components/ItemSearch'

export default {
  props: [
    'category'
  ],
  components: {
    ItemSearch,
  },
  data () {
    return {
      items: [], // カテゴリーのアイテムを全部入れておく用
      displayItems: [], // 画面に表示するアイテム用
      checkedItems: [],
    }
  },
  computed: {
    checkBoxColor () {
      return variables.checkBoxColor
    },
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
          this.displayItems = []
          break
      }
      this.initCheckedItems()
    },
    changeCheckBox (target) {
      const item = this.items.find(item => item.id === target.id)
      this.$set(item, 'checked', item.checked)

      if (item.checked) {
        // チェックした時の処理：チェック済アイテムに追加
        this.checkedItems.push(item.id)
      } else {
        // チェック外した時の処理

        // 親のチェックを外す
        const itemIndex = this.checkedItems.indexOf(item.id)
        this.checkedItems.splice(itemIndex, 1)

        // 子供のチェックを全て外す
        if (item.variation) {
          item.colors.forEach(color => {
            if (color.checked) {
              this.$set(color, 'checked', false)

              // チェック済アイテムから削除
              const colorIndex = this.checkedItems.indexOf(color.id)
              this.checkedItems.splice(colorIndex, 1)
            }
          })
        }
      }
      // ID順に並び替え
      this.checkedItems.sort()
    },
    // チェック済アイテムの初期化
    initCheckedItems () {
      this.checkedItems = []
      if (this.items.length > 0) {
        const items = this.items.filter(item => item.checked === true)
        // チェックのあるアイテムでループ
        items.forEach(item => {
          this.checkedItems.push(item.id)
          if (item.variation) {
            // 子供アイテムでループ
            item.colors.forEach(color => {
              if (color.checked) this.checkedItems.push(color.id)
            })
          }
        })
      }
    },
    searchItem (inputText) {
      // 前方一致で検索
      const reg = new RegExp('^' + inputText)
      this.displayItems = this.items.filter(item => item.name.match(reg) || !inputText)
    },
    saveItems () {
      // let checkItems = []
      const checkedItems = this.items.filter(item => item.checked === true)

      console.log(this.items)
      console.log(checkedItems)
    }
  },
  beforeMount () {
    this.initComponent()
  },
  watch: {
    category () {
      this.initComponent()
    },
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
