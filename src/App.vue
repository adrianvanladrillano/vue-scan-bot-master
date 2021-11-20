<template>
  <v-app>
    <v-app-bar app color="" dark v-if="this.$route.path != '/login'">
      <h1 class="">SCAN<span class="teal--text text--accent-3">BOT</span></h1>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer
      dark
      color="black"
      class="px-5 py-5"
      app
      v-if="this.$route.path == '/login'"
    >
      <v-row class="text-center">
        <v-col>
          <p class="font-weight-medium">
            Im a new user?
            <router-link
              to="/Register"
              class="font-weight-bold teal--text text--accent-3 text-decoration-none"
              >Sign up</router-link
            >
          </p>
        </v-col>
      </v-row>
    </v-footer>

    <v-footer
      color="black"
      app
      padless
      v-if="this.$route.path != '/login' && this.$route.path != '/Register'"
    >
      <BottomNav />
    </v-footer>
  </v-app>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue";
export default {
  name: "App",

  components: { BottomNav },
  data: () => ({
    //
  }),
  mounted() {
    console.log(this.$route.path);
    this.$store.dispatch("getUsers");
  }
};
</script>
