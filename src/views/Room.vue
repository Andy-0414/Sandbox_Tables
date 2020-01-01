<template>
	<div class="room" @mousemove="moveMouse">
		<Prop
			v-for="(prop,idx) in propList"
			:key="idx"
			v-model="propList[idx]"
			@click="selectProp($event,idx)"
		></Prop>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import { Prop } from "@/components/Prop.ts";

export default Vue.extend({
	components: {
		Prop: PropComponent
	},
	data() {
		return {
			propList: [new Prop()] as Prop[],

			currentProp: null as null | Prop
		};
	},
	watch: {
		propList() {}
	},
	methods: {
		selectProp(e: MouseEvent, idx: number) {
			this.currentProp = this.propList[idx];
		},
		moveMouse(e: MouseEvent) {
			if (this.currentProp) {
				this.currentProp.position.setVector2D(e.clientX, e.clientY);
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.room {
    width: 100vw;
    height: 100vh;
	position: relative;
}
</style>