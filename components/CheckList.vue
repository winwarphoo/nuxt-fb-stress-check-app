<template>
<v-container>
  <v-card  v-if="!isComplete" color="#FDEDEC" flat tile>
    <v-card-subtitle v-if="onboarding < 17">
      A.あなたの仕事についてうかがいます。最もあてはまるものに○を付けてください。
    </v-card-subtitle>
    <v-card-subtitle v-else-if="onboarding >= 17 && onboarding < 46 ">
      B.最近1 か月間のあなたの状態についてうかがいます。最もあてはまるものに○を付けてください。
    </v-card-subtitle>
    <v-card-subtitle v-else-if="onboarding >= 46 && onboarding < 55">
      C.あなたの周りの方々についてうかがいます。最もあてはまるものに○を付けてください。
    </v-card-subtitle>
    <v-card-subtitle v-else>
      D.満足度について
    </v-card-subtitle>

    <v-window v-model="onboarding">
      <v-window-item v-for="list in lists" :key="list.id">
        <div align="right" class="pr-5 font-weight-medium">{{ onboarding + 1 }} / {{ lists.length }}</div>
        <!-- <complete-form v-if="isComplete" />
        <result-form v-if="isShow" /> -->
        <CheckListForm :list="list" />
      </v-window-item>
    </v-window>
    <v-card-actions class="justify-space-between">
      <v-btn :disabled="onboarding === 0" text @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <!-- <v-btn v-if="onboarding + 1 !== lists.length" text @click="next"> -->
        <!-- <v-btn v-if="!isComplete" text @click="next"> -->
      <v-btn v-if="!isComplete" text @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card  color="#FDEDEC" flat tile>
    <complete-form v-if="isComplete" />
  </v-card>
</v-container>
</template>

<script>
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import CheckListForm from './CheckListForm.vue'
// import ResultForm from './ResultForm.vue'
import CompleteForm from './CompleteForm.vue'
// import ResultForm from './ResultForm.vue'
const collectionRef = collection(db, 'questions')
export default {
  name: 'CheckList',
  components: { CheckListForm, CompleteForm },
  data () {
   return {
      lists: [],
      onboarding: 0,
      selection: '',
      isComplete: false,
      isShow: false,
      totalResult: 0,
      // total: {'A':0,'B':0,'C':0,'D':0},
      stressStatus: ''
    }
  },
  mounted () {
    const q = query(collectionRef)
    onSnapshot(q, (querySnapshot) => {
      this.lists = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  },
  methods: {
    showResult(){
      this.isComplete = false
      this.isShow = true;
    },
    next () {
      // check final question of stress check questions
      if(this.onboarding === 56) {
        // if final question, show complete form
        this.isComplete = true
      }

      // got to next question
      this.onboarding =
        this.onboarding + 1 === this.lists.length ? 0 : this.onboarding + 1
    },
    prev () {
      // back to next question
      this.onboarding =
        this.onboarding - 1 < 0 ? this.lists.length - 1 : this.onboarding - 1
    }
  }
}
</script>
