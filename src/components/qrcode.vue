<template>
  <div>
    <v-avatar
      class=""
      tile
      size="100%"
      style="max-width: 100%; max-height: 100%; overflow: hidden"
    >
      <qrcode-vue
        size="350"
        class="mt-5"
        :value="data"
        level="H"
        renderAs="svg"
        margin="50"
        style="position: relative"
      />
    </v-avatar>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: ["data"],
  name: "App",
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: "https://example.com",
      size: 800
    };
  }
};
</script>