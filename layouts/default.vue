<template>
  <v-app dark>
    <v-app-bar color="#F5B7B1 " class="white--text" app>
      <v-toolbar-title to="/">
        ストレスチェック
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="white--text"
        icon
        text
        to="/"
      >
        <v-icon>mdi-home-variant-outline</v-icon>
      </v-btn>
      <v-btn
        class="white--text"
        icon
        text
        to="/signup"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} — ストレスチェック</span>
    </v-footer>
  </v-app>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../plugins/firebase'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'Stress Check',
    }
  },
  mounted () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch('setUser', {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email
        })
      }
    })
  }
}
</script>
