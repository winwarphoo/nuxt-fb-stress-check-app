<template>
    <v-row v-if="!isShow" class="mt-1" align="center" justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-card-text class="text-h6" align="center" justify="center">ストレスチェックは以上です。</v-card-text>
        <v-card-text class="text-h6" align="center" justify="center">ありがとうございました。</v-card-text>
        <v-card-text v-if="totalLength != 57" class="text-h6 unanswer" align="center" color="primary" justify="center">未回答の問題が【{{ 57- totalLength }}】問あります！</v-card-text>
        <v-card-text align="center" justify="center">
          <v-btn color="primary" :disabled="totalLength != 57" @click="showResult">
          結果表示
        </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
    <result-form v-else />
</template>

<script>
// import ResultForm from './ResultForm.vue'
export default {
  name: 'CompleteForm',
  // components: { ResultForm },
  data () {
   return {
      isShow: false,
      totalLength: 0
    }
  },
  mounted () {
    // get total result size from store
    this.totalLength = Object.keys(this.$store.state.selectedValue).length
  },
  methods: {
    showResult(){
      this.isShow = true
      this.$emit('showResult', this.isShow)
    }
  }
}
</script>

<style scoped>
.unanswer {
  color: blue;
}
</style>
