<template>
	<div class="prop" v-on="$listeners"></div>
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
				this.propData.transform.translate3D[1] = -10;
			} else {
				propElement.style.boxShadow = `0px 0px 5px rgba(0,0,0,0.2)`;
				this.propData.transform.translate3D[1] = 0;
			}

			propElement.style.width = `${this.propData.size.x}px`;
			propElement.style.height = `${this.propData.size.y}px`;
			propElement.style.left = `${this.propData.position.x}px`;
			propElement.style.top = `${this.propData.position.y}px`;

			propElement.style.backgroundImage = `url(${this.propData.getImage()})`;
			propElement.style.transform = this.propData.getTransform();
			propElement.style.zIndex = this.propData.zIndex.toString();
		}
	}
});
</script>

<style lang="scss" scoped>
.prop {
	position: absolute;

	width: 100px;
	height: 100px;

	transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1),
		box-shadow 0.5s cubic-bezier(0.175, 0.885, 0.32, 1);
	background-size: cover;
}
</style>
