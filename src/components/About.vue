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
            <li>異なる端末、ブラウザ間でのデータ共有はできません。</li>
            <li>作成中のため、突然データリセットを行う可能性があります。すみません……。</li>
          </ul>
        </v-card-text>
        <!-- 更新履歴 -->
        <history/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close()">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
    close() {
      this.dialog = false
    }
  }
}
</script>
