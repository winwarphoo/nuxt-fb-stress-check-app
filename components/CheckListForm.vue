<template>
  <v-card color="transparent" height="300" max-width="500">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-card-text class="text-h6">
          {{ list.content }}
        </v-card-text>
        <v-card-text>
          <v-chip-group active-class="primary--text" column>
            <v-chip v-for="(answer, i) in list.answer_text" :key="i" :value="list.answer_point[i]" @click="saveSelectedValue(list.id, list.answer_point[i])">{{ answer }}</v-chip>
          </v-chip-group>
          <!-- <div>Selected: {{ selection }}</div> -->
        </v-card-text>
      </v-col>
    </v-row>
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
      point:{id:'',value:0}
    }
  },
  methods: {
    saveSelectedValue (id,value) {
      // get selected answer's point with key and value
      this.point = {id,value};
      // save selected answer's to store
      this.$store.dispatch('setSelectedValue', this.point)
    }
  }
}
</script>
