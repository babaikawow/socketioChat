<template>
	<div id="side">
		<h2>Welcome {{$parent.username }}</h2>
		<h3> {{ $parent.online }} user online </h3>
		<h4>Search users</h4>
		<input type="text" v-model="searchUser" placeholder="Type username..">
		<div class="user" v-for="(user, index) in userList" :index="index" :id="user.id">
			<img class="aside-avatar" src="../assets/avatar.jpg" alt="">
			<span>
				{{ user.username }}
			</span>
		</div>

	</div>
</template>

<script>
	export default  {
		
		data(){ 
			return {
				searchUser: '',
				users: []
		}},
		sockets: {

			addUser(user){
				this.users.push(user);
			},

			usersList(list) {
				console.log(list);
				this.users = list;
			},

			removeUser(user){
				var uId = document.getElementById(user.id);
				var index = uId.getAttribute('index');
				this.users.splice(index, 1);
			}
		},
		computed:{
			userList: function(){
				var search = this.searchUser.toLowerCase();
				return this.users.filter(function(item, i) {
					var res = item.username.toLowerCase().match(search);
					return res !== null;
				})
			}
		}
	}
</script>

<style lang="scss">

	.user{
		display: 	block;
		color:		#767575;

		padding:	15px 10px;
		text-align:	left;
			&:hover {
		        background: #E8E6E6;         
		    }
		    span{
		    	margin-left:10px;
		    }
	}
		

		.aside-avatar{
			
			height:	50px;
			display: inline-block;
			vertical-align: middle;
		}
</style>