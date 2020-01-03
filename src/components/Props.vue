<template>
	<Prop @dblclick="pop" class="props" v-model="propData" v-on="$listeners">
		<template slot="content">x{{propData.props.length}}</template>
	</Prop>
</template>

<script lang="ts">
import Vue from "vue";
import PropComponent from "@/components/Prop.vue";
import { Props } from "./Props";
import { Prop } from "./Prop";

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
		pop() {
			let prop: Prop | undefined = this.propData.pop();
			if (prop) {
				this.$socket.client.emit("game_propCreate", {
					roomName: this.getRoomName,
					prop: prop
				});
				this.$emit("stateChange", false);
			}
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