<script setup>
import SocketConnector from './SocketConnector.vue'

</script>

<template>
  <div class="server-asker">
    <h2>Ask the server!</h2>
    <h3>Connect as a student</h3>
    <SocketConnector :playerType="student"/>
    <h3>Connect as a teacher</h3>
    <SocketConnector :playerType="teacher"/>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
button {
  margin: 15px;
}
</style>
