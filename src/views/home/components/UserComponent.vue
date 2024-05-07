<script setup>
import { ref } from 'vue';
import EditUser from './EditUser.vue'
import UserDetails from './UserDetails.vue'

const edit = ref(false)
const edit_text = ref("")

function start_edit(){
    edit.value = !edit.value
    if(edit.value){
        edit_text.value.textContent = "Back"
    }else{
        edit_text.value.textContent = "Edit"
    }
}

</script>

<template>
  <button @click="start_edit" id="user_edit_button"><span ref="edit_text">Edit</span></button>
  <UserDetails v-if="!edit" />
  <EditUser v-else/>
</template>

<style>

#user_edit_button{
    font-size: 1vw;
    position: absolute;
    left:22vw;
    top:-1vw;
}

</style>