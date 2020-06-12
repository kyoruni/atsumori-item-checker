<template>
  <div class="about">
    <v-dialog v-model="dialog" scrollable width="800">
      <v-card>
        <v-card-title primary-title>
          あつ森アイテムチェッカー（作成中）
        </v-card-title>
        <v-card-text>
          <ul>
            <li>一覧にないアイテムや誤字などありましたら、DMでこっそりお知らせいただけるとうれしいです！</li>
          </ul>
        </v-card-text>
        <v-card-text>
          <ul>
            <li>チェック状況は、お使いのブラウザのローカルストレージ上に保存しています。</li>
            <li>異なる端末、ブラウザでのデータ共有はできません。</li>
            <li>ブラウザの閲覧履歴を削除すると、データが消えてしまいます。</li>
            <li>作成中のため、突然データリセットを行う可能性があります。すみません……。</li>
          </ul>
        </v-card-text>
        <v-card-text>
          <ul>
            <li>以下ボタンよりチェック状況を全削除することができます。</li>
          </ul>
          <v-card-actions>
            <v-btn depressed color="error" class="font-weight-bold" @click="deleteButton()">
              チェック状況全削除
            </v-btn>
          </v-card-actions>
        </v-card-text>
        <!-- 更新履歴 -->
        <history/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import categories from '@/assets/json/categories.json'
import History from '@/components/History'

export default {
  components: {
    History,
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    // 全データ削除
    deleteButton() {
      if (confirm('全てのチェック状況を削除します。※復元はできません！')) {
        categories.forEach(category => {
          localStorage.removeItem(category.name)
        })
      }
    }
  }
}
</script>
