import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import Vuetify from 'vuetify'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
// Vue.use(Vuetify)
// import 'vuetify/dist/vuetify.min.css'

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'

// Vue.use(VueMaterial)

Vue.config.productionTip = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
