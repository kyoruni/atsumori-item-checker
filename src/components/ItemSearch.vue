<template>
  <div class="item-search">
    <v-col cols="12" md="6" offset-md="3" sm="8" offset-sm="2">
      <v-text-field
        single-line
        outlined
        label="検索（前方一致）"
        prepend-inner-icon="fas fa-search"
        v-model="searchText"
      />
    </v-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: null,
    }
  },
  watch: {
    searchText (value) {
      this.$emit('searchItem', value)
    }
  }
}
</script>
