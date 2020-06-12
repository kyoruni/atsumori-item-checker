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
        <v-list>
          <v-list-item-group v-for="history in histories" :key="history.id" multiple>
            <v-divider/>
            <v-list-group :ripple="false">
              <!-- 親のリスト -->
              <template v-slot:activator>
                <v-icon class="mr-2" :small="true">fas fa-pen</v-icon>
                <v-list-item-title> version: {{ history.version }} 【{{ history.date }}】</v-list-item-title>
              </template>
            <!-- 子のリスト -->
            <ul>
              <v-list-item no-action v-for="(content, index) in history.contents" :key="index" :ripple="false">
                <li>{{ content }}</li>
              </v-list-item>
            </ul>
            </v-list-group>
          </v-list-item-group>
        </v-list>
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
import histories from '@/assets/histories.json'

export default {
  data() {
    return {
      dialog: false,
      histories,
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

<style scoped>
.hoge {
  background: #B8EEF7;
}
</style>
