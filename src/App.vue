<template>
  <div id="app">
    <login v-if="!auth">login</login> 
    <template v-else>
      <side></side><!-- 
       --><chat></chat>
    </template>
   
  </div>
</template>

<script>
import aside from './components/Aside.vue';
import chat from './components/Chat.vue';
import login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    side: aside,
    chat: chat,
    login: login
  },

  data () {
    return {
      auth: false,
      username: '',
      online: ''
    }
  },
  methods: {
    logIn(username) {
      this.username = username;
      this.auth = true
      this.$socket.emit('logIn', this.username);
    }
  },
  sockets: {
    usersOnline( count ){
      this.online = count;
    } 
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #344759;
  height:100vh;

}

*{
  box-sizing: border-box;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#login{
  display: block;
  min-height: 85%;
  min-width: 60%;
  max-width: 80%;
  margin: 15px auto;
  
  border: 10px outset #40D64B;
  border-radius: 0 45%;
}

.block{
  display: inline-block;
  border: 1px solid black;
  height:100vh;
  overflow: auto;
 

}

#side{
  @extend .block;
  vertical-align:top;
  width:20%;
}

#chat{
   @extend .block;
   vertical-align:top;
   width:80%;

}

</style>
