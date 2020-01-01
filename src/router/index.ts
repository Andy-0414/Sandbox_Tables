import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Room from "../views/Room.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "main",
		component: Main
	},
	{
		path: "/room/:roomId",
		name: "room",
		component: Room
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
