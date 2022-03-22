<template >
  <v-card color="#FDEDEC">
    <v-card-title class="text-body-1 text-sm-h6 text">
      {{ list.content }}
    </v-card-title>
    <v-card-text>
      <v-chip-group v-model="selection" active-class="primary--text " column class="answer-btn">
        <v-chip
          v-for="(answer, i) in list.answer_point"
          :key="i"
          :value="answer"
          class="button"
          pill
          @click="saveSelectedValue(list.id, list.answer_point[i])"
        >
        {{ list.answer_text[i] }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CheckListForm',
  props: {
    list: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      point:{id:'',value:0},
      selection: '',
      id: this.list.id
    }
  },
  mounted () {
    this.getSelectedValue()
  },
  methods: {
    saveSelectedValue (id,value) {
      // get selected answer's point with key and value
      this.point = {id,value};
      // save selected answer's to store
      this.$store.dispatch('setSelectedValue', this.point)
    },
    getSelectedValue () {
      const getAnswer = this.$store.getters.getSelectedValue
      let keys = []
      let values = []
      keys = Object.keys(getAnswer)
      values = Object.values(getAnswer)
      keys.forEach((key, index) => {
        if(key === this.id) {
          this.selection = values[index]
        }
      })
    }
  }
}
</script>

<style scoped>
.text {
  min-height: 180px;
  white-space: pre-wrap;
}
.answer-btn {
  max-width: 200px;
}
.button {
  min-width: 90%;
}
</style>
