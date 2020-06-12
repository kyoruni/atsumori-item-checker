<template>
  <div class="history">
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
  </div>
</template>

<script>
import histories from '@/assets/histories.json'

export default {
  data () {
    return {
      histories,
    }
  }
}
</script>
