<template>
    <v-row v-if="!isShow" class="mt-1" align="center" justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-card-text class="text-h6" align="center" justify="center">ストレスチェックは以上です。</v-card-text>
        <v-card-text class="text-h6" align="center" justify="center">ありがとうございました。</v-card-text>
        <v-card-text align="center" justify="center">
          <v-btn color="primary" @click="showResult">
          結果表示
        </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
    <result-form v-else />
</template>

<script>
import ResultForm from './ResultForm.vue'
export default {
  name: 'CompleteForm',
  components: { ResultForm },
  data () {
   return {
      isShow: false
    }
  },
  methods: {
    showResult(){
      this.isShow = true;
    }
  }
}
</script>
