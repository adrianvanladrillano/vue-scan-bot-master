<template>
  <div>
    <v-bottom-navigation grow app>
      <v-btn x-large color="" to="/History">
        <span class="black--text">History</span>
        <v-icon color="black accent-4">mdi-folder-multiple</v-icon>
      </v-btn>

      <div>
        <v-btn
          fab
          large
          elevation="10"
          color="teal accent-3"
          small
          style="margin-top: -3vh; border-radius: 100%"
          to="/Home"
        >
          <v-icon class="mx-5 my-6" color="">mdi-qrcode</v-icon>
        </v-btn>
      </div>

      <v-btn x-large color="transparent" dark to="/Settings">
        <span class="black--text">Settings</span>
        <v-icon color="black accent-4">mdi-clipboard-alert</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>
