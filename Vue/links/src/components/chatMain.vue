<template>
  <div ref="chatContainer" class="chat-content">
    <slot></slot>
    <div v-for="(item,index) in data" :key="index">
      <div v-if="item.id == 0" class="user-context">
        {{ item.username }} 加入了聊天室
      </div>
      <div v-else-if="item.id == userData.userData.id && item.id != 0" class="messagebox">
        <div style="display: flex;justify-content: right;width: 100%;margin-top: 10px;">
          <div class="self-message">
            <span>{{ item.message }}</span>
          </div>
          <div class="avatar">
            <img :src="userData.userData.avatar" alt="">
          </div>
        </div>
        <div class="self-timebox">
          {{ item.time }}
        </div>
      </div>
      <div v-else class="messagebox">

        <div style="display: flex;justify-content: left;width: 100%;margin-top: 10px;">
          <div class="avatarbox">
            <img :src="item.avatar" alt="">
          </div>
          <div style="max-width: 65%;">
            <div class="usernamebox">
              {{ item.username }}
            </div>
            <div class="other-message">
              {{ item.message }}
            </div>
            <div class="other-timebox">
              {{ item.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useMessageStore } from '@/stores/messageStore';
import { useUserDataStore } from '@/stores/userData';

const userData = useUserDataStore();
const messageStore = useMessageStore();
const data = messageStore.message;

const chatContainer = ref<HTMLDivElement | null>();

watch(data, () => {
  nextTick(() => {
    console.log(chatContainer.value?.scrollTop, chatContainer.value?.scrollHeight);

    if (chatContainer.value) {
      if (chatContainer.value.scrollHeight > 450) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight - 450
      }
      console.log(chatContainer.value?.scrollTop, chatContainer.value?.scrollHeight);
    }
  })
})
</script>

<style scoped>
.user-context{
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
}
.usernamebox {
  display: flex;
  justify-content: left;
  padding-left: 8px;
  font-size: 0.8rem;
  width: 100%;
  margin-top: -6px;
}

.other-timebox {
  display: flex;
  justify-content: left;
  padding-left: 8px;
  font-size: 0.8rem;
  width: 100%;
  margin-bottom: 3px;
}

.self-timebox {
  display: flex;
  justify-content: right;
  padding-right: 62px;
  font-size: 0.8rem;
  width: 100%;
  margin-bottom: 3px;
}

.chat-content {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-user-select: text; /* Chrome, Safari, Opera */
  -moz-user-select: text;    /* Firefox */
  -ms-user-select: text;     /* Internet Explorer/Edge */
  user-select: text;
  position: relative;
}

.messagebox {
  width: 100%;
}

.other-message {
  padding: 4px 20px;
  background-color: white;
  line-height: 30px;
  border-radius: 4px;
  font-size: 1rem;
  margin-left: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.self-message {
  padding: 4px 20px;
  background-color: rgb(30, 110, 255);
  line-height: 30px;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 5px;
  max-width: 65%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: white;
  white-space: pre-wrap;
}

.avatarbox {
  width: 40px;
  height: 80px;
  margin: 0 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  margin: 0 8px;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
</style>
