<template>
	<div class="room" @mousemove="moveMouse" @mouseup="deselectProp" draggable="false">
		<Prop
			v-for="(prop,idx) in propList"
			:key="idx"
			v-model="propList[idx]"
			@mousedown="selectProp($event,idx)"
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
			propList: [new Prop(), new Prop(), new Prop()] as Prop[],

			currentProp: null as null | Prop,
			currentOffsetX: 0 as number,
			currentOffsetY: 0 as number
		};
	},
	watch: {
		propList() {}
	},
	methods: {
		selectProp(e: MouseEvent, idx: number) {
			if (!this.propList[idx].isGrap) {
				this.currentProp = this.propList[idx];
				this.currentProp.grap();
				this.currentOffsetX = e.offsetX;
				this.currentOffsetY = e.offsetY;
			}
		},
		deselectProp(e: MouseEvent) {
			if (this.currentProp) {
				this.currentProp!.putDown();
			}
			this.currentProp = null;
		},
		moveMouse(e: MouseEvent) {
			if (this.currentProp) {
				this.currentProp.position.setVector2D(
					e.clientX - this.currentOffsetX,
					e.clientY - this.currentOffsetY
				);
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.room {
	touch-action: none;
	width: 100vw;
	height: 100vh;
	position: relative;
}
</style>