import Vue from "vue";
import Popup from "./Popup.vue";

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: h => h(Popup)
}).$mount("#app");
