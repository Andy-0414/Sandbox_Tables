<template>
	<div class="prop" @mousedown="$emit('mousedown',$event)"></div>
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
			if (this.propData.isGrap) {
				propElement.style.boxShadow = `0px 10px 5px rgba(0,0,0,0.2)`;
				propElement.style.transform = `translateY(-10px)`;
			} else {
				propElement.style.boxShadow = `0px 0px 5px rgba(0,0,0,0.2)`;
				propElement.style.transform = `translateY(0px)`;
			}
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

	transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);
}
</style>
