<template>
  <div class="inputbox" @keydown="entersubmit">
    <textarea class="input-textarea" v-model="inputMessage"></textarea>
    <div class="submitbox">
      <button class="send-button" @click="submitMessage">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/stores/userData';

import { ref, onMounted, onUnmounted } from 'vue';
import { useMessageStore } from '@/stores/messageStore';
import { useOnlineUserStore } from '@/stores/onlineUser';
import { useSocketStore } from '@/stores/socketStore';

const socketStore = useSocketStore()

const userData = useUserDataStore()
const messageStore = useMessageStore()
const onlineUserStore = useOnlineUserStore()


const inputMessage = ref('');


onMounted(() => {
  socketStore.socket.on('receiveMessage', (data) => {
    messageStore.message.push(data)
  });

  socketStore.socket.on('onlineUser', (data) => {
    onlineUserStore.onlineUser = data;
  });

  if (userData.userData.id) {
    socketStore.socket.emit('authenticate', {
      userId: userData.userData.id,
      account:userData.userData.account,
      username: userData.userData.username,
      avatar:userData.userData.avatar
    });
  }
});

onUnmounted(() => {
  const disconnectUserId = userData.userData.id;
  if (disconnectUserId) {
    socketStore.socket.emit("disconnertUser", disconnectUserId);
  }
  socketStore.socket.disconnect();
});


function submitMessage() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  const submitData = {
    id: userData.userData.id,
    message: inputMessage.value,
    avatar: userData.userData.avatar,
    username: userData.userData.username,
    time: currentTime
  }

  socketStore.socket.emit('sendMessage', submitData);

  inputMessage.value = '';
}

const entersubmit = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      return;
    } else {
      event.preventDefault();
      submitMessage()
    }
  }
}
</script>

<style scoped>
.inputbox {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  height: 95%;
}

.input-textarea {
  padding: 5px 10px;
  width: 100%;
  flex-grow: 1;
  outline: none;
  border: none;
  resize: none;
  background-color: rgb(245, 246, 247);
  font-size: 1.2rem;
  min-height: 40px;
}

.submitbox {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 20px;
  background-color: rgb(245, 246, 247);

}

.send-button {
  font-size: 1rem;
  margin-right: 8px;
  background-color: #287DFF;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #3d8eea;
}
</style>
