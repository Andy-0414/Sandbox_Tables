<template>
	<div class="main">
		<h1 class="main__title">Sandbox Tables</h1>
		<div class="main__rooms">
			<div
				class="main__rooms__item"
				v-for="room in rooms"
				:key="room.roomName"
				@click="joinRoom(room.roomName)"
			>
				<p>{{room.roomName}}</p>
				<p>({{room.userCount}}명)</p>
			</div>
			<form class="main__rooms__item" @submit="joinRoom(roomName)">
				<input type="text" minlength="2" required v-model="roomName" />
				<button type="submit">방 만들기</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

interface RoomData {
	roomName: string;
	userCount: number;
}

export default Vue.extend({
	sockets: {
		game_getRooms(this: any, data: RoomData[]) {
			this.rooms = data;
		}
	},
	data() {
		return {
			rooms: [] as RoomData[],
			roomName: "" as string
		};
	},
	created() {
		this.$socket.client.emit("game_getRooms");
	},
	methods: {
		joinRoom(roomName: string) {
			this.$router.push({
				name: "room",
				params: {
					roomName: roomName
				}
			});
		}
	}
});
</script>

<style lang="scss" scoped>
.main {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    
	.main__title {
		font-size: 4em;
		color: #36afff;
		margin: 40px;
	}
	.main__rooms {
		width: 400px;
		height: auto;
		background-color: white;

		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
		.main__rooms__item {
			cursor: pointer;
			padding: 10px;
			display: flex;
			justify-content: space-between;

			input {
				flex: 1;
			}
		}
	}
}
</style>