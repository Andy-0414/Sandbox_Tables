<template>
	<div class="prop" @click="$emit('click',$event)"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from "./Prop";
export default Vue.extend({
	model: {
		prop: "propData",
		event: "change"
	},
	props: {
		propData: Prop
	},
	mounted() {
		this.render();
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
			propElement.style.left = `${this.propData.position.x}px`;
			propElement.style.top = `${this.propData.position.y}px`;
		}
	}
});
</script>

<style lang="scss" scoped>
.prop {
	position: absolute;

	width: 100px;
	height: 100px;

	background-color: grey;
}
</style>
