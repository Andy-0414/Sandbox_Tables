<template>
	<div class="room">
		<div
			class="room__props"
			@mousemove="moveMouse"
			@touchmove="moveMouse"
			@mouseup="deselectProp"
			@touchend="deselectProp"
			@contextmenu.prevent="showSpawnMenu"
			draggable="false"
		>
			<component
				:is="prop.componentName"
				v-for="(prop,idx) in propList"
				:key="prop._id"
				v-model="propList[idx]"
				@mousedown="selectProp($event,idx)"
				@touchstart="selectProp($event,idx)"
				@stateChange="propUpdate(prop)"
			/>
			<div
				class="room__myhand"
				@mousemove="moveMouse"
				@touchmove="moveMouse"
				@mouseup="deselectPropAndAppendMyHands"
				@touchend="deselectPropAndAppendMyHands"
				ref="hands"
			>
				<component
					:is="prop.componentName"
					v-for="(prop,idx) in myHandsPropList"
					:key="prop._id"
					v-model="myHandsPropList[idx]"
					@mousedown="selectPropMyHands($event,idx)"
					@touchstart="selectPropMyHands($event,idx)"
					@stateChange="propUpdate(prop)"
				/>
			</div>
		</div>
		<SpawnMenu @createProp="createProp" v-if="isShowSpawnMenu"></SpawnMenu>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import CardComponent from "@/components/Card/Card.vue";
import PropsComponent from "@/components/Props.vue";
import SpawnMenuComponent from "@/components/SpawnMenu.vue";
import { Prop, Vector2D } from "@/components/Prop.ts";
import { Card } from "../components/Card/Card";
import { Props } from "../components/Props";
import { jsonToPropObject } from "../components/JsonToPropObject";

export default Vue.extend({
	components: {
		Prop: PropComponent,
		Props: PropsComponent,
		Card: CardComponent,
		SpawnMenu: SpawnMenuComponent
	},
	data() {
		return {
			propList: [] as Prop[],
			myHandsPropList: [] as Card[],

			currentProp: null as null | Prop,
			isHandToField: false as boolean,
			currentOffsetX: 0 as number,
			currentOffsetY: 0 as number,

			isShowSpawnMenu: false as boolean,
			spawnPointX: 0 as number,
			spawnPointY: 0 as number
		};
	},
	sockets: {
		game_joinRoom(this: any, data: any) {
			this.propList = data.props.map((prop: Prop) =>
				jsonToPropObject(prop)
			);
		},
		game_propCreate(this: any, data: Prop) {
			let prop = jsonToPropObject(data);
			if (prop) this.propList.push(prop);
		},
		game_propDelete(this: any, data: Prop) {
			let prop = jsonToPropObject(data);
			if (prop)
				this.propList.splice(
					this.propList.findIndex(
						(prop: Prop) => prop._id == data._id
					),
					1
				);
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
	methods: {
		showSpawnMenu(e: MouseEvent | TouchEvent) {
			this.isShowSpawnMenu = true;
			let cursor = (e as MouseEvent).clientX
				? (e as MouseEvent)
				: (e as TouchEvent).touches[0];
			this.spawnPointX = cursor.clientX;
			this.spawnPointY = cursor.clientY;
		},
		selectProp(e: MouseEvent, idx: number) {
			if (!this.propList[idx].isGrap && e.button != 2) {
				this.propList.forEach(prop => {
					prop.zIndex--;
				});
				this.currentProp = this.propList[idx];
				this.currentProp.grap();

				this.currentOffsetX = e.offsetX || this.currentProp.size.x / 2;
				this.currentOffsetY = e.offsetY || this.currentProp.size.y / 2;
				this.update();
			}
		},
		selectPropMyHands(e: MouseEvent | TouchEvent, idx: number) {
			if (
				!this.myHandsPropList[idx].isGrap &&
				(e as MouseEvent).button != 2
			) {
				this.currentProp = this.myHandsPropList[idx];
				this.myHandsPropList.splice(idx, 1);
				this.propList.push(this.currentProp);

				let cursor = (e as MouseEvent).clientX
					? (e as MouseEvent)
					: (e as TouchEvent).touches[0];
				this.currentProp.position.setVector2D(
					cursor.clientX - this.currentOffsetX,
					cursor.clientY - this.currentOffsetY
				);
				this.currentProp.grap();

				this.currentOffsetX =
					(e as MouseEvent).offsetX || this.currentProp.size.x / 2;
				this.currentOffsetY =
					(e as MouseEvent).offsetY || this.currentProp.size.y / 2;

				this.update();

				this.isHandToField = true;
			}
		},
		deselectProp(e: MouseEvent) {
			if (this.currentProp) {
				this.currentProp!.putDown();
				if (this.isHandToField) {
					this.propList.splice(
						this.propList.findIndex(
							prop => this.currentProp!._id == prop._id
						),
						1
					);
					this.$socket.client.emit("game_propCreate", {
						roomName: this.getRoomName,
						prop: this.currentProp
					});
				}
				this.update();
			}
			this.isHandToField = false;
			this.currentProp = null;
		},
		deselectPropAndAppendMyHands(e: MouseEvent | TouchEvent) {
			if (this.currentProp) {
				if (this.myHandsPropList.length >= 7) {
					this.deselectProp(e as MouseEvent);
				}
				this.currentProp!.putDown();
				if (this.currentProp.componentName == "Card") {
					this.myHandsPropList.push(this.currentProp as Card);
					if (!this.isHandToField) {
						this.$socket.client.emit("game_propDelete", {
							roomName: this.getRoomName,
							prop: this.currentProp
						});
					} else {
						this.propList.splice(
							this.propList.findIndex(
								prop => this.currentProp!._id == prop._id
							),
							1
						);
					}
				}
				this.update();
			}
			this.isHandToField = false;
			this.currentProp = null;
		},
		moveMouse(e: MouseEvent | TouchEvent) {
			if (this.currentProp) {
				let cursor = (e as MouseEvent).clientX
					? (e as MouseEvent)
					: (e as TouchEvent).touches[0];
				this.currentProp.position.setVector2D(
					cursor.clientX - this.currentOffsetX,
					cursor.clientY - this.currentOffsetY
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
		createProp(prop: Prop) {
			this.isShowSpawnMenu = false;
			prop.position.setVector2D(this.spawnPointX, this.spawnPointY);
			this.$socket.client.emit("game_propCreate", {
				roomName: this.getRoomName,
				prop: prop
			});
		}
	},
	watch: {
		myHandsPropList() {
			this.myHandsPropList.forEach((card, idx) => {
				let hands = this.$refs.hands as HTMLDivElement;
				let len = this.myHandsPropList.length;
				card.isReverse = true;
				card.position.setVector2D(
					hands.clientWidth / 2 + (len / 2 - (idx + 1)) * card.size.x,
					-card.size.y / 2
				);
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
	width: 100vw;
	height: 100vh;
}
.room__props {
	user-select: none;
	touch-action: none;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}
.room__myhand {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 1000px;
	height: 100px;

	border: 1px solid white;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 100px 100px 0 0;

	z-index: 10000;
}
</style>