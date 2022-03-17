<template>
  <v-card color="transparent" height="500">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-card-text class="text-h5">ストレスチェックの結果</v-card-text>
        <v-card-text class="text-h6">受けた日付：{{date}}</v-card-text>
        <v-card-text class="text-h6">ストレス：&nbsp;{{stressStatus}}</v-card-text>
        <v-card-text class="text">A：&nbsp;{{totalA}}点</v-card-text>
        <v-card-text class="text">B：&nbsp;{{totalB}}点</v-card-text>
        <v-card-text class="text">C：&nbsp;{{totalC}}点</v-card-text>
        <v-card-text class="text">D：&nbsp;{{totalD}}点</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { addDoc,collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../plugins/firebase'
const resultRef = collection(db, 'results')
export default {
  name: 'ResultForm',
  data () {
   return {
      date:'',
      total:{},
      totalA: 0,
      totalB: 0,
      totalC: 0,
      totalD: 0,
      totalResult:{'A':0,'B':0,'C':0,'D':0},
      stressStatus:''
    }
  },
  mounted () {
    // get current date with YYYY/MM/DD format
    const now = new Date();
    this.date = now.getFullYear() + '/' + (now.getMonth()+1) + '/' + now.getDate()

    // get total result from store
    this.total = this.$store.state.selectedValue

    // calculate total points for each part
    let keys = []
    let values = []
    keys = Object.keys(this.total)
    values = Object.values(this.total)
    keys.forEach((key,index) => {
      if(key <= 'A17') {
        this.totalA += values[index]
      } else if(key > 'A17' && key <= 'B29') {
        this.totalB += values[index]
      } else if(key > 'B29' && key <= 'C09') {
        this.totalC += values[index]
      } else {
        this.totalD += values[index]
      }
    })

    // store each part points for saving database
    this.totalResult.A = this.totalA
    this.totalResult.B = this.totalB
    this.totalResult.C = this.totalC
    this.totalResult.D = this.totalD

    // calculate stress status depends on total points
    if ( (this.totalA + this.totalB + this.totalC + this.totalD) > 70 ){
        this.stressStatus = '高ストレス'
      }else if((this.totalA + this.totalB + this.totalC + this.totalD) > 28){
        this.stressStatus = '普通ストレス'
      }else{
        this.stressStatus = 'ストレスなし'
      }

      // save total points and stress to database
    this.saveData(this.totalResult,this.stressStatus)
  },
  methods:{
    saveData (data,stressStatus) {
    addDoc(resultRef, {
      checked_at: serverTimestamp(),
      user_name: this.$store.state.user.displayName,
      user_id: this.$store.state.user.uid,
      stress_status: stressStatus,
      total: data
    })
  }
  }
}
</script>
