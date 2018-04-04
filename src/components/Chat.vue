<template>
	<div id="chat">
		<div id="chatBox">
			<template v-for="(message, index) in messages" >
				<template v-if="message.type === 'user'">
					<div :class="{'my-message':( message.name == username), 
								  'not-my-message': (message.name != username)}">
						<div style="display: inline: block;">
							<span> {{ message.name }} </span>
							<hr>
							<span> {{ message.message }} </span>
							<br>
							<span> {{message.date.hour}}:{{message.date.minutes}}:{{message.date.seconds}} </span>
						</div>
					</div>
				</template>
				

				<template v-else>
					<div class="sys-message">
						<span v-html="message.message"></span>
					</div>
					
				</template>
			</template>
			
		</div>
		<div id="messageBox">
			<img src="../assets/avatar.jpg" class="chat-avatar">
			<!-- <div id="input-message" 
				contenteditable="true" 
				placeholder="write a message...">
			</div> -->
			<textarea id="input-message" 
				contenteditable="true" 
				placeholder="write a message...">
			</textarea>
			<input id="input-send" type="button" value="send" 
			@click="sendMessage">
		</div>
	</div>
</template>

<script>
	export default  {
		
		data(){ 
			return {
				messages: [
				],
				message: ''
		}},
		computed: {
			username(){
				return this.$parent.username;
			}
		},
		methods:{
			sendMessage(){
				let el = document.getElementById('input-message');
				let message = el.innerText;
				el.innerText = '';
				this.$socket.emit('sendMessage', message);
				this.message = '';
			}
		},
		sockets:{
			receiveMessage(message) {
				this.messages.push(message);
			}
		}
	}
</script>

<style lang="scss">
	#chatBox{
		display: 	block;
		margin: 	0 auto;
		padding: 	0% 10%;
		height: 	80vh;
		width:		100%;
		overflow:	auto;
		text-align:	left;
		
		
	}	

		.my-message{
			max-width:200px;
			background:#B5E8CD;
			margin: 10px 0px;
			float:right;
			display: block;
			clear:both;
			border-radius: 5px;
			
		}

		.not-my-message{
			max-width:200px;
			margin: 10px 0px;
			background:#B0D3F7;
			float:left;
			display: block;
			clear:both;
			border-radius: 5px;
		},

		.sys-message{
			text-align: center;
			clear: both;
		}

	#messageBox{
		display: 	block;
		margin: 	0 auto;
		height: 	20vh;
		width:		80%;
		clear:		both;
		

	}
		.chat-avatar{
			display: inline-block;
			float:left;
			height: 10vh;
			margin: 5vh 10px;
			vertical-align: middle;
		}

		// #input-message{
		// 	height: 10vh;
		// 	margin: 5vh 20px;
		// 	float:left;
		// 	width: 60%;
		// 	resize: none;
		// 	overflow: auto;
		// 	pointer-events: none;
		// 	outline: none;
		// 	border-radius: 5px;
		// 	padding: 5px;
		// 	border: 	1px solid #B2B2B2;
			
			#input-message{
			height: 10vh;
			margin: 5vh 20px;
			float:left;
			width: 60%;
			resize: none;
			overflow: auto;
			
			border-radius: 5px;
			padding: 5px;
			border: 	1px solid #B2B2B2;
			}
		// 	&:empty{
		// 		&:before{
		// 		content: attr(placeholder);
		// 		color: #9aa2ab;
		// 		display: block;
		// 		margin-top: -1px;
		// 		margin-left: 1px;
		// 		pointer-events: none;
		// 		}
		// 	}
		// }

		#input-send{
			display:block;
			float:left;
			height: 6vh;
			margin: 7vh 5px;

		}
</style>