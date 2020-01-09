<template>
	<div class="chatbox" :class="{'chatbox-show':isShow}">
		<div class="chatbox__message" ref="chatBox">
			<div
				class="chatbox__message__item"
				v-for="(message,idx) in messageList"
				:key="idx"
			>{{message.name}} : {{message.message}}</div>
		</div>
		<form action="javascript:void(0);" @submit="sand" class="chatbox__input">
			<input v-model="name" placeholder="이름" type="text" style="flex:1;" required />
			<input v-model="message" placeholder="메세지" type="text" style="flex:3" required />
			<button style="flex:1;">보내기</button>
		</form>
		<div class="chatbox__toggleButton" @click="isShow = !isShow">{{isShow ? '↑' : '↓'}}</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
interface SendMessageData {
	message: string;
	name: string;
}

export default Vue.extend({
	data() {
		return {
			isShow: false as boolean,
			name: "" as string,
			message: "" as string,
			messageList: [] as SendMessageData[]
		};
	},
	sockets: {
		chat_sendMessage(this: any, data: SendMessageData) {
			this.messageList.push(data);
		}
	},
	methods: {
		sand() {
			if (this.message) {
				this.$socket.client.emit("chat_sendMessage", {
					roomName: this.getRoomName,
					name: this.name,
					message: this.message
				});
				this.message = "";
			}
		}
	},
	watch: {
		messageList() {
			this.$nextTick(() => {
				let chatBox = this.$refs.chatBox as HTMLDivElement;
				chatBox.scrollTop = chatBox.scrollHeight;
			});
		}
	},
	created() {
		this.name = this.$socket.client.id;
	},
	computed: {
		getRoomName(): string {
			return this.$route.params.roomName;
		}
	}
});
</script>
<style lang="scss" scoped>
.chatbox {
	position: fixed;
	right: 0;
	top: -300px;
	width: 400px;
	height: 300px;

	background-color: white;

	display: flex;
	flex-direction: column;

	z-index: 10000;

    transition: 0.5s;

	.chatbox__message {
		flex: 1;
		overflow-y: auto;
	}
	.chatbox__input {
		display: flex;

		input,
		button {
			width: 100%;
		}
	}
	.chatbox__toggleButton {
        cursor: pointer;
		position: absolute;
		bottom: -60px;
		right: 0;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		color: white;
		font-weight: bold;
		background-color: black;

		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.chatbox-show {
	top: 0;
}
</style>