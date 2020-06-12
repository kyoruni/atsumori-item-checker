<template>
  <div class="about">
    <v-dialog v-model="dialog" scrollable width="800">
      <v-card style="height: 400px;">
        <v-card-title primary-title>
          あつ森アイテムチェッカー（作成中）
        </v-card-title>
        <v-card-text>
          <h3 class="mb-2">つくった人</h3>
          <ul class="mb-7">
            <li>きょるに @kyoruni</li>
          </ul>
          <h3 class="mb-2">このページについて</h3>
          <ul class="mb-7">
            <li>自分で使う用に作ったため、突然ページが消える可能性があります。ご了承ください。</li>
            <li>一覧にないアイテムや誤字などありましたら、DMやリプライでこっそりお知らせいただけるとうれしいです！</li>
            <li>不具合がありましたら、DMやリプライでこっそり(以下略)</li>
            <li>スマホ閲覧推奨です。</li>
          </ul>
          <h3 class="mb-2">データの保存について</h3>
          <ul class="mb-7">
            <li>チェック状況は、お使いのブラウザのローカルストレージ上に保存しています。</li>
            <li>異なる端末、ブラウザでのデータ共有はできません。</li>
            <li>ブラウザの閲覧履歴を削除すると、データが消えてしまいます。</li>
            <li>作成中のため、突然データリセットを行う可能性があります。</li>
          </ul>
          <h3 class="mb-2">データを消したい</h3>
          <ul>
            <li>以下ボタンよりチェック状況を全削除することができます。</li>
          </ul>
          <v-card-actions class="mb-7">
            <v-btn depressed color="error" class="font-weight-bold" @click="deleteButton()">
              チェック状況全削除
            </v-btn>
          </v-card-actions>
          <h3 class="mb-2">お借りしました</h3>
          <ul class="mb-7">
            <li>
              <a href="https://docs.google.com/spreadsheets/d/1toBugUGUhtH1IB5b3PU-qaOJOsSkijaWU-Egg_R90R4/edit#gid=1883714103" target="_blank">
                ACNH Translations
              </a>（アイテムデータ）
            </li>
          </ul>
          <h3 class="mb-2">動作確認</h3>
          <ul class="mb-7">
            <li>PC：Chrome, Safari</li>
            <li>SP：iPhone8 Chrome Safari</li>
          </ul>
          <!-- 更新履歴 -->
          <history/>
        </v-card-text>
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
