import Vue from 'vue'
import App from './App.vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://localhost:8081');
Vue.use(VueSocketIO, SocketInstance)

new Vue({
  el: '#app',
  render: h => h(App)
})
