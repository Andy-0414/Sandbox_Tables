<template>
	<div class="room" @mousemove="moveMouse" @mouseup="deselectProp" draggable="false">
		<button @click="createCard">카드 생성</button>
		<component
			:is="prop.componentName"
			v-for="(prop,idx) in propList"
			:key="idx"
			v-model="propList[idx]"
			@mousedown="selectProp($event,idx)"
			@stateChange="propUpdate(prop)"
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
			propList: [] as Prop[],

			currentProp: null as null | Prop,
			currentOffsetX: 0 as number,
			currentOffsetY: 0 as number
		};
	},
	sockets: {
		game_joinRoom(this: any, data: any) {
			this.propList = data.props.map((prop: Prop) =>
				this.jsonToPropObject(prop)
			);
			console.log(data.props);
		},
		game_propCreate(this: any, data: Prop) {
			let prop = this.jsonToPropObject(data);

			if (prop) this.propList.push(prop);
		},
		game_propUpdate(this: any, data: Card) {
			let prop = this.propList.find((prop: Prop) => prop._id == data._id);
			if (prop) {
				prop.update(data);
			}
		}
	},
	created() {
		this.$socket.client.emit("game_joinRoom", {
			roomName: this.getRoomName
		});
	},
	// watch: {
	// 	propList: {
	// 		deep: true,
	// 		handler() {
	// 			console.log("change");
	// 		}
	// 	}
	// },
	methods: {
		jsonToPropObject(data: Prop) {
			let prop;
			switch (data.componentName) {
				case "Prop":
					prop = Prop.copy(data);
					break;
				case "Card":
					prop = Card.copy(data);
					break;
			}
			return prop;
		},
		selectProp(e: MouseEvent, idx: number) {
			if (!this.propList[idx].isGrap) {
				this.propList.forEach(prop => {
					prop.zIndex--;
				});
				this.currentProp = this.propList[idx];
				this.currentProp.grap();
				this.currentOffsetX = e.offsetX;
				this.currentOffsetY = e.offsetY;
				this.update();
			}
		},
		deselectProp(e: MouseEvent) {
			if (this.currentProp) {
				this.currentProp!.putDown();
				this.update();
			}
			this.currentProp = null;
		},
		moveMouse(e: MouseEvent) {
			if (this.currentProp) {
				this.currentProp.position.setVector2D(
					e.clientX - this.currentOffsetX,
					e.clientY - this.currentOffsetY
				);
				this.update();
			}
		},
		update() {
			this.$socket.client.emit("game_propUpdate", {
				roomName: this.getRoomName,
				prop: this.currentProp
			});
		},
		propUpdate(prop: Prop) {
			this.$socket.client.emit("game_propUpdate", {
				roomName: this.getRoomName,
				prop: prop
			});
		},
		createCard() {
			let card = new Card(
				require(`@/assets/cards/2_of_diamonds.png`),
				require("@/assets/cards/back.png"),
				new Vector2D(100, 100),
				new Vector2D(100, 145)
			);
			this.$socket.client.emit("game_propCreate", {
				roomName: this.getRoomName,
				prop: card
			});
		}
	},
	computed: {
		getRoomName(): string {
			return this.$route.params.roomName;
		}
	}
});
</script>

<style lang="scss" scoped>
.room {
	user-select: none;
	touch-action: none;
	width: 100vw;
	height: 100vh;
	position: relative;
}
</style>