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
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-home-variant-outline</v-icon>
      </v-btn>
      <v-btn
        class="white--text"
        icon
        text
        to="/login"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
        class="white--text"
        icon
        text
        to="/signup"
        v-bind="attrs"
        v-on="on"
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
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} — <strong>ストレスチェック</strong></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'Stress Check',
    }
  },
}
</script>
