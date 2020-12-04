import Vue from "vue";
import Options from "./Options.vue";

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: h => h(Options)
}).$mount("#app");
