import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 1000
})


new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
