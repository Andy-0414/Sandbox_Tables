<template>
	<div class="spawnMenu">
		<div class="spawnMenu__list">
			<div
				class="spawnMenu__list__item"
				v-for="spawnMenuItem in spawnMenuList"
				:key="spawnMenuItem.prop._id"
				@click.stop="selectProp(spawnMenuItem)"
				@contextmenu.capture.stop
				@dblclick.capture.stop
			>
				<component
					class="spawnMenu__list__item__prop"
					:is="spawnMenuItem.prop.componentName"
					v-model="spawnMenuItem.prop"
				/>
				<p class="spawnMenu__list__item__name">{{spawnMenuItem.name}}</p>
			</div>
		</div>
		<div class="spawnMenu__information">
			<div class="spawnMenu__information__propbox" @contextmenu.capture.stop @dblclick.capture.stop>
				<component
					class="spawnMenu__information__prop"
					v-if="currentItem != null"
					:is="currentItem.prop.componentName"
					v-model="currentItem.prop"
				/>
				<p v-if="currentItem != null">{{currentItem.name}}</p>
			</div>
			<div class="spawnMenu__information__config" v-if="currentItem != null">
				<p>
					사이즈 :
					<input class="sizeInput" type="text" v-model="currentItem.prop.size.x" /> X
					<input class="sizeInput" type="text" v-model="currentItem.prop.size.y" />
				</p>
				<p>
					이미지 :
					<input type="text" v-model="currentItem.prop.frontImage" />
				</p>
				<p v-if="currentItem.prop.componentName == 'Card'">
					뒷면 이미지 :
					<input
						type="text"
						v-model="currentItem.prop.backImage"
						@focus="currentItem.prop.reverse()"
						@blur="currentItem.prop.reverse()"
					/>
				</p>
			</div>
			<button class="spawnMenu__information__create" @click="createProp" v-if="currentItem != null">생성</button>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import CardComponent from "@/components/Card/Card.vue";
import PropsComponent from "@/components/Props.vue";
import { Prop, Vector2D } from "@/components/Prop.ts";
import { Card } from "../components/Card/Card";
import { Props } from "../components/Props";
import { jsonToPropObject } from "../components/JsonToPropObject";
import SpawnMenuList, { SpawnMenuItem } from "./SpawnMenu";

export default Vue.extend({
	components: {
		Prop: PropComponent,
		Props: PropsComponent,
		Card: CardComponent
	},
	data() {
		return {
			currentItem: null as SpawnMenuItem | null,
			spawnMenuList: SpawnMenuList()
		};
	},
	methods: {
		selectProp(item: SpawnMenuItem) {
			item.prop.position = new Vector2D(0, 0);
			this.currentItem = item;
		},
		createProp() {
			if (this.currentItem) {
				this.$emit("createProp", this.currentItem.prop);
			}
		}
	}
});
</script>
<style lang="scss" scoped>
.spawnMenu {
	user-select: none;

	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	margin: auto;

	width: 1280px;
	height: 720px;

	background-color: white;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

	z-index: 10000;

	display: flex;

	padding: 20px;

	.spawnMenu__list {
		flex: 1;
		background-color: #fafafa;
		margin-right: 20px;

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		overflow-y: scroll;
		.spawnMenu__list__item {
			position: relative;

			width: 600px;
			height: 600px;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.spawnMenu__list__item__prop {
				position: relative;
				left: 0 !important;
				top: 0 !important;
				max-width: 600px;
				max-height: 600px;
			}
			.spawnMenu__list__item__name {
				position: absolute;
				bottom: 50px;
				z-index: 1;
			}
		}
		.spawnMenu__list__item:hover {
			background-color: #eeeeee;
		}
	}
	.spawnMenu__information__config {
		input {
			background: none;
			border: none;
			border-bottom: 1px solid grey;
			padding: 5px;
		}
		input.sizeInput {
			width: 40px;
		}
	}
	.spawnMenu__information {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		background-color: #fafafa;
		.spawnMenu__information__propbox {
			position: relative;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			margin: 0 auto;

			width: 600px;
			height: 600px;

			p {
				position: absolute;
				bottom: 50px;
			}
		}
		.spawnMenu__information__prop {
			position: relative;
			left: 0 !important;
			top: 0 !important;
		}
		.spawnMenu__information__create {
			font-size: 24px;
			background: none;
			border: none;
			padding: 20px;
			background-color: #eeeeee;
		}
	}
}
</style>    