import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
let url = process.env.NODE_ENV === "production" ? "https://sandbox-table.herokuapp.com/" : "localhost:3000";
Vue.use(VueSocketIOExt, io(url));
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
