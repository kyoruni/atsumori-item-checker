<template>
  <div class="items-list">
    <!-- チェック数カウント -->
    <div class="d-flex justify-center">
      <h3 class="pr-5">{{ labelText }}</h3>
      <h4 class="font-weight-regular">
        <span class="checked-count">{{ checkedItemCount }}</span> / {{ itemCount }}
      </h4>
    </div>
    <!-- 検索欄 -->
    <item-search @searchItem="searchItem($event)"/>
    <!-- アイテムリスト -->
    <v-col cols="12" md="8" offset-md="2">
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
                  @change="changeParentCheckBox(displayItem)"
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
                  @change="changeChildCheckBox(color)"
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
                  @change="changeParentCheckBox(displayItem)"
                />
              </v-list-item-action>
              <v-list-item-title>{{ displayItem.name }}</v-list-item-title>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </div>
</template>

<script>
import variables from '@/assets/scss/_variables.scss'
import wallList from '@/assets/list/wall.json'
import floorList from '@/assets/list/floor.json'
import umbrellaList from '@/assets/list/umbrella.json'
import bugList from '@/assets/list/bug.json'
import fishList from '@/assets/list/fish.json'
import fossilList from '@/assets/list/fossil.json'
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
    storageKey () {
      return this.category
    },
    labelText () {
      let labelText
      switch (this.category) {
        case 'wall':
          labelText = 'かべがみ'
          break
        case 'floor':
          labelText = 'ゆかいた'
          break
        case 'umbrella':
          labelText = 'かさ'
          break
        case 'bug':
          labelText = 'ムシ'
          break
        case 'fish':
          labelText = 'サカナ'
          break
        case 'fossil':
          labelText = 'かせき'
          break
        case 'music':
          labelText = 'ミュージック'
          break
        default:
          labelText = '作成中'
      }
      return labelText
    },
    itemCount () {
      return this.items.length
    },
    checkedItemCount () {
      return this.items.filter(item => item.checked).length
    },
  },
  methods: {
    initComponent () {
      switch (this.category) {
        case 'wall':
          this.items = wallList
          this.displayItems = wallList
          break
        case 'floor':
          this.items = floorList
          this.displayItems = floorList
          break
        case 'umbrella':
          this.items = umbrellaList
          this.displayItems = umbrellaList
          break
        case 'bug':
          this.items = bugList
          this.displayItems = bugList
          break
        case 'fish':
          this.items = fishList
          this.displayItems = fishList
          break
        case 'fossil':
          this.items = fossilList
          this.displayItems = fossilList
          break
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
    changeParentCheckBox (target) {
      const item = this.items.find(item => item.id === target.id)
      this.$set(item, 'checked', item.checked)

      if (item.checked) {
        // チェックした時の処理：チェック済アイテムに追加
        this.checkedItems.push(item.id)
      } else {
        // チェック外した時の処理
        // 親のチェックを外す
        const itemIndex = this.checkedItems.indexOf(item.id)
        // チェック済アイテムから削除
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

      // 保存
      this.saveItems()
    },
    changeChildCheckBox (target) {
      // 対象のアイテムを取得
      const parentItem = this.items.find(item => item.id === target.parentId)
      const color = parentItem.colors.find(color => color.id === target.id)

      if (color.checked) {
        // チェックした時の処理
        // チェック済アイテムに追加
        this.checkedItems.push(color.id)
        // 親にチェックがなかったら、チェックを付ける
        if (!parentItem.checked) {
          this.$set(parentItem, 'checked', true)
          this.checkedItems.push(parentItem.id)
        }
      } else {
        // チェック外した時の処理：チェック済アイテムから削除
        const colorIndex = this.checkedItems.indexOf(color.id)
        this.checkedItems.splice(colorIndex, 1)
      }
      // ID順に並び替え
      this.checkedItems.sort()
      // 保存
      this.saveItems()
    },
    // チェック済アイテムの初期化
    initCheckedItems () {
      this.checkedItems = []
      // ローカルストレージから取得：バイナリになっているので、復元
      const localStorageItems = localStorage.getItem(this.storageKey)
      const checkedData = localStorageItems ? this.base64ToArray(localStorageItems) : null

      // チェック済アイテムに追加
      if (localStorageItems) this.checkedItems = checkedData

      // チェック状況に反映させる
      this.checkedItems.forEach(checkedItem => {
        let item
        // 親アイテムを検索
        item = this.items.find(item => item.id === Number(checkedItem))
        // 子供アイテムを検索
        if (!item) {
          // バリエーションのあるアイテムを全て取得
          const parentItems = this.items.filter(item => item.variation)

          // バリエーションのあるアイテムでループ：アイテムを見つけたら抜ける
          for (let i = 0; i <= parentItems.length - 1; i++) {
            item = parentItems[i].colors.find(color => color.id === checkedItem)
            if (item) break
          }
        }
        // id一致のデータがあれば、チェックボックスにチェックを入れる
        if (item) this.$set(item, 'checked', true)
      })
    },
    searchItem (inputText) {
      // 前方一致で検索
      const reg = new RegExp('^' + inputText)
      this.displayItems = this.items.filter(item => item.name.match(reg) || !inputText)
    },
    saveItems () {
      // 暗号化してローカルストレージに保存
      localStorage.setItem(this.storageKey, this.bufferToBase64(this.checkedItems))
    },
    // バイナリデータに変換
    bufferToBase64 (buf) {
      if (buf instanceof ArrayBuffer) buf = new Uint8Array(buf)
      if (buf instanceof Uint8Array) buf = Array.from(buf)

      let binstr = buf.map(b => String.fromCharCode(b)).join("")
      return btoa(binstr)
    },
    // バイナリから復元
    base64ToArray (b64) {
      var binstr = atob(b64)
      var buf = new Uint8Array(binstr.length)
      Array.from(binstr).forEach((ch, i) => buf[i] = ch.charCodeAt(0))

      // Unit8Array型になっているので、一旦カンマ区切りのStringに変換 → カンマ区切りで配列に変換
      let returnArray = buf.join(',').split(',')
      // 配列の中身が全てString型になっているので、数値型に変換して返す
      returnArray = returnArray.map(item => Number(item))
      return returnArray
    },
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

<style scoped>
.checked-count {
  color: #ef5350;
  font-weight: bold;
}
</style>
