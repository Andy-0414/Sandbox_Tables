<template>
	<div class="room" @mousemove="moveMouse" @mouseup="deselectProp" draggable="false">
		<component
			:is="prop.componentName"
			v-for="(prop,idx) in propList"
			:key="idx"
			v-model="propList[idx]"
			@mousedown="selectProp($event,idx)"
		/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import CardComponent from "@/components/Card/Card.vue";
import { Prop, Vector2D } from "@/components/Prop.ts";
import { Card } from "../components/Card/Card";

export default Vue.extend({
	components: {
		Prop: PropComponent,
		Card: CardComponent
	},
	data() {
		return {
			propList: Card.createTrumpCardPack() as Prop[],

			currentProp: null as null | Prop,
			currentOffsetX: 0 as number,
			currentOffsetY: 0 as number
		};
	},
	created() {
		console.log(Prop.createUUID());
	},
	watch: {
		propList: {
			deep: true,
			handler() {
				console.log("change");
			}
		}
	},
	methods: {
		selectProp(e: MouseEvent, idx: number) {
			if (!this.propList[idx].isGrap) {
				this.propList.forEach(prop => {
					prop.zIndex--;
				});
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