<template>
  <div class="about">
    <v-dialog v-model="dialog" scrollable width="800">
      <v-card style="height: 400px;">
        <v-card-title primary-title>
          あつ森アイテムチェッカー（仮）
        </v-card-title>
        <v-card-text>
          <!-- 説明文 -->
          <div v-for="about in abouts" :key="about.id">
            <h3 class="mb-2">★ {{ about.title }}</h3>
            <ul class="mb-7">
              <li v-for="(content, index) in about.contents" :key="index">
                <!-- リンクありの場合 -->
                <div v-if="about.linkURL">
                  <a :href="about.url" target="_blank">
                    {{ content }}
                  </a> {{ about.extraText }}
                </div>
                <!-- リンクなしの場合 -->
                <div v-else>
                {{ content }}
                  <!-- 全削除ボタン -->
                  <v-card-actions v-if="about.showDeleteButton">
                    <v-btn depressed color="error" class="font-weight-bold" @click="deleteButton()">
                      チェック状況全削除
                    </v-btn>
                  </v-card-actions>
                </div>
              </li>
            </ul>
          </div>
          <!-- 更新履歴 -->
          <history/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import abouts from '@/assets/json/about.json'
import categories from '@/assets/json/categories.json'
import History from '@/components/History'

export default {
  components: {
    History,
  },
  data() {
    return {
      dialog: false,
      abouts,
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
