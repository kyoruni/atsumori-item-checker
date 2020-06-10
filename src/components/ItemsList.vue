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
    storageKey () {
      return this.category
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

      // 保存
      this.saveItems()
    },
    changeChildCheckBox (target) {
      // 親のIDを取得：子供IDの1桁目
      const parentId = Number(target.id.slice(0, 1))

      // 対象のアイテムを取得
      const parentItem = this.items.find(item => item.id === parentId)
      const color = parentItem.colors.find(color => color.id === target.id)

      // チェックボックスの変更
      this.$set(color, 'checked', color.checked)

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
      // ローカルストレージから取得
      const localStorageItems = localStorage.getItem(this.storageKey)

      // チェック済アイテムに追加
      if (localStorageItems) {
        this.checkedItems = localStorageItems.split(',')

        // バイナリデータに変換
        let hoge
        let piyo
        if (this.checkedItems) {
          hoge = this.bufferToBase64(this.checkedItems)
          piyo = this.base64ToBuffer(hoge)
        }
        console.log('暗号化 >>>>')
        console.log(hoge)
        console.log('復号化 >>>>')
        console.log(piyo)
      }

      // チェック状況に反映させる
      this.checkedItems.forEach(checkedItem => {
        let item
        // 親アイテムを検索
        item = this.items.find(item => item.id === Number(checkedItem))
        // 子供アイテムを検索
        if (!item) item = this.items.filter(item => item.variation).colors.find(color => color.id === Number(checkedItem))

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
      localStorage.setItem(this.storageKey, this.checkedItems)
    },
    // バイナリデータに変換
    bufferToBase64 (buf) {
      if (buf instanceof ArrayBuffer) buf = new Uint8Array(buf)
      if (buf instanceof Uint8Array) buf = Array.from(buf)

      let binstr = buf.map(b => String.fromCharCode(b)).join("")
      return btoa(binstr)
    },
    // バイナリから復元
    base64ToBuffer (b64) {
      var binstr = atob(b64)
      var buf = new Uint8Array(binstr.length)
      Array.from(binstr).forEach((ch, i) => buf[i] = ch.charCodeAt(0))
      return buf
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
