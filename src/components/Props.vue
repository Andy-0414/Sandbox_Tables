<template>
	<Prop @dblclick="pop" class="props" v-model="propData" v-on="$listeners">
		<template slot="content">x{{propData.props.length}}</template>
		<template slot="menu">
			<div class="prop__menu__item" @click="reverseAll">전부뒤집기</div>
			<div class="prop__menu__item" @click="shuffle">섞기</div>
			<div class="prop__menu__item" @click="spreadAll">전개</div>
		</template>
	</Prop>
</template>

<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import { Props } from "./Props";
import { Prop } from "./Prop";
import { Card } from "./Card/Card";

export default Vue.extend({
	model: {
		prop: "propData",
		event: "change"
	},
	props: {
		propData: Props
	},
	components: {
		Prop: PropComponent
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
		},
		emptyCheck() {
			if (this.propData.props.length == 0) {
				this.$socket.client.emit("game_propDelete", {
					roomName: this.getRoomName,
					prop: this.propData
				});
			}
		},
		pop() {
			let prop: Prop | undefined = this.propData.pop();
			if (prop) {
				this.$socket.client.emit("game_propCreate", {
					roomName: this.getRoomName,
					prop: prop
				});
				this.$emit("stateChange", false);
				this.emptyCheck();
			} else {
				this.emptyCheck();
			}
		},
		reverseAll() {
			this.propData.props.forEach(prop => {
				if (prop.componentName == "Card") {
					(prop as Card).reverse();
				}
			});
		},
		shuffle() {
			this.propData.shuffle();
			this.$emit("stateChange", false);
		},
		spreadAll() {
			this.propData.spread(this.propData.props.length).forEach(prop => {
				this.$socket.client.emit("game_propCreate", {
					roomName: this.getRoomName,
					prop: prop
				});
			});
			this.emptyCheck();
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
.props {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2em;
	color: #36afff;
}
</style>