<template>
	<Prop @contextmenu="reverse" class="card" v-model="propData" v-on="$listeners"></Prop>
</template>

<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import { Card } from "./Card";

export default Vue.extend({
	model: {
		prop: "propData",
		event: "change"
	},
	props: {
		propData: Card
	},
	components: {
		Prop: PropComponent
	},
	watch: {
		propData: {
			deep: true,
			handler() {
				this.render();
			}
		}
	},
	methods: {
		render() {
			let propElement: HTMLDivElement = this.$el as HTMLDivElement;
		},
		reverse(e: MouseEvent) {
			e.preventDefault();
			this.propData.reverse();
			this.$emit("stateChange", false);
		}
	}
});
</script>

<style lang="scss" scoped>
.card {
	background-color: white;
	border-radius: 5px;
}
</style>