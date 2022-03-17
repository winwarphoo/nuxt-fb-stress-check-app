<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span> ようこそ {{ $store.state.user.displayName }} さん</span>
        <v-btn @click="$store.dispatch('logout')">Logout</v-btn>
      </v-col>
    </v-row><br>
    <check-list v-if="onStart"/>
    <v-row  v-else justify="center" align="center">
      <v-col cols="12">
        <v-card>
            <v-card-title>
              ストレスチェック
            </v-card-title>
          <v-card-subtitle>
            4つのSTEPによる簡単な質問です。質問は全部で57問です。
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="onStart=true">
              開始
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CheckList from './CheckList.vue'
export default {
  name: 'StressList',
  components: { CheckList },
  data () {
    return {
      onStart: false
    }
  }
}
</script>
