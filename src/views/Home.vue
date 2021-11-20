<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <v-snackbar top right v-model="snackbar" min-width="50px" rounded>
      <h3 class="teal--text text--accent-3">Notice</h3>
      <small>Center the QR code/ Barcode to scan</small>
    </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      snackbar: true
    };
  }
};
</script>
