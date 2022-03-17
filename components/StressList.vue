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
    </v-row><br>
    <v-row v-if="!onStart">
      <v-col>
        <h3>過去のストレスチェック結果</h3>
        <v-simple-table
          fixed-header
          height="300px"
        >
        <template #default>
          <thead>
            <tr>
              <th class="text-left text-h6">
                Date
              </th>
              <th class="text-left text-h6">
                Stress Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results" :key="result.id" >
              <td>{{ $dateFns.format(result.checked_at.toDate(), 'yyyy/MM/dd') }}</td>
              <td>{{ result.stress_status }}</td>
            </tr>
          </tbody>
        </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'
import { db } from '../plugins/firebase'
import CheckList from './CheckList.vue'
const resultCollectionRef = collection(db, 'results')

export default {
  name: 'StressList',
  components: { CheckList },
  data () {
    return {
      onStart: false,
      results: []
    }
  },computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    const q = query(resultCollectionRef, where('user_id', '==', this.$store.state.user.uid), orderBy('checked_at', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      this.results = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  }
}
</script>
