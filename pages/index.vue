<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <login-form v-if="!$store.getters.isLoggedIn" />
      <stress-list v-else />
    </v-col>
  </v-row>

</template>

<script>
import LoginForm from '~/components/LoginForm.vue'
import StressList from '~/components/StressList.vue'
export default {
  name: 'IndexPage',
  components: { LoginForm, StressList },
}
</script>
