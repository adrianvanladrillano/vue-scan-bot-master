import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import WebCam from "vue-web-cam";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  WebCam,
  store,
  render: (h) => h(App),
}).$mount("#app");
