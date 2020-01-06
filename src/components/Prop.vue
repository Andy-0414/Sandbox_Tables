<template>
	<div class="prop" v-on="$listeners" @contextmenu="toggleShowMenu">
		<slot name="content"></slot>
		<div class="prop__menu" v-if="isShowMenu" @click="toggleShowMenu">
			<div class="prop__menu__item" @click="remove">삭제</div>
			<slot name="menu"></slot>
		</div>
	</div>
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
	data() {
		return {
			isShowMenu: false as boolean
		};
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
		toggleShowMenu(e: MouseEvent) {
			e.preventDefault();
			this.isShowMenu = !this.isShowMenu;
		},
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
		},
		remove() {
			this.$socket.client.emit("game_propDelete", {
				roomName: this.getRoomName,
				prop: this.propData
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
.prop {
	position: absolute;

	width: 100px;
	height: 100px;

	transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1),
		box-shadow 0.5s cubic-bezier(0.175, 0.885, 0.32, 1);
	background-size: cover;
}
.prop__menu {
	top: 0;
	left: 100%;
	position: absolute;
	width: 200px;
	height: fit-content;

	border-radius: 5px;

	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

	z-index: 10000;
}
.prop__menu__item {
	padding: 10px;
	background-color: white;

	font-size: 16px;
	color: black;

	text-align: center;
}
</style>
