<template>
  <v-card color="#FDEDEC">
    <template>

  <v-card v-if="!isComplete && !isShow ">
    <v-card-subtitle v-if="onboarding < 17" class="text">
      A.あなたの仕事についてうかがいます。最もあてはまるものに○を付けてください。
    </v-card-subtitle>
    <v-card-subtitle v-else-if="onboarding >= 17 && onboarding < 46 " class="text">
      B.最近1 か月間のあなたの状態についてうかがいます。最もあてはまるものに○を付けてください。
    </v-card-subtitle>
    <v-card-subtitle v-else-if="onboarding >= 46 && onboarding < 55" class="text">
      C.あなたの周りの方々についてうかがいます。最もあてはまるものに○を付けてください。
    </v-card-subtitle>
    <v-card-subtitle v-else class="text">
      D.満足度について
    </v-card-subtitle>
  </v-card>

      <v-window v-model="onboarding">
        <v-window-item v-for="list in lists" :key="list.id">
          <template v-if="!isComplete && !isShow">
            <div align="right" class="pr-5 font-weight-medium">{{ onboarding + 1 }} / {{ lists.length }}</div>
            <CheckListForm  :list="list" />
          </template>
          <complete-form v-if="isComplete || isShow" @add="showResult" />
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between">
        <v-btn :disabled="onboarding === 0 && !isComplete" text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn :disabled="isComplete || isShow" text @click="next">
        <!-- <v-btn v-if="!isComplete" text @click="next"> -->
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </template>
    <!-- <complete-form v-if="isComplete" /> -->
  </v-card>
  <!-- <v-card  color="#FDEDEC" flat tile>
    <complete-form v-if="isComplete" />
  </v-card> -->
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
    next () {
      // check final question of stress check questions
      if(this.onboarding === this.lists.length - 1) {
        // if final question, show complete form
        this.isComplete = true
      }

      // got to next question
      this.onboarding =
        this.onboarding + 1 === this.lists.length ? this.lists.length : this.onboarding + 1
    },
    prev () {

      // back to next question
      this.onboarding =
        this.onboarding - 1 < 0 ? this.lists.length - 1 : this.onboarding - 1

      if(this.onboarding === this.lists.length - 1 && this.isComplete) {
        this.onboarding = this.lists.length -1
        this.isComplete = false
      }
    },
    showResult(isShow) {
      this.isShow = isShow
      this.isComplete = !isShow
    }
  }
}
</script>

<style scoped>
 .text {
   min-height: 80px;
 }
</style>
