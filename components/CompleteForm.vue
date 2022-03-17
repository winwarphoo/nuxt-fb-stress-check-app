<template>
  <v-card color="transparent" height="500">
    <v-row v-if="!isShow" class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-card-text class="text-h6">ストレスチェックが終了しました。</v-card-text>
        <v-card-text class="text-h6">ありがとうございました。</v-card-text>
        <v-card-text>
          <v-btn color="primary" @click="showResult">
          結果表示
        </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
    <!-- <result-form v-else :total="total" :stress="stress" /> -->
    <result-form v-else />
  </v-card>
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
