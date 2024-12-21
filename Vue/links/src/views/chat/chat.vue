<template>
  <div class="content">
    <div class="leftbox">
      <div class="userbox">
        <div class="avatarbox">
          <img :src="userData.userData.avatar" alt="">
        </div>
        <span style="font-size: 16px;">{{ userData.userData.username }}</span>
      </div>
      <div class="out" @click="getOut">

      </div>
    </div>
    <div class="rightbox">
      <div class="chatHead">
        <h3>LinKs 在线聊天室</h3>
        <div class="online-account" @click="showOnlineList">
          <h4 style="padding: 5px 8px;">在线人数 {{ onlineUserStore.onlineUser.length }} 人</h4>
        </div>
      </div>
      <div class="chatMain">
        <ChatMain>
          <div class="online-user-list" v-show="isShowOnlineList">
            <div class="online-user-box" v-for="(item, index) in onlineUserStore.onlineUser" :key="index">
              <div class="online-avatarbox">
                <img :src="item.avatar" alt="">
              </div>
              <div class="onlineuser">
                <span style="font-size: 0.9rem;">{{ item.username }}</span>
                <span style="font-size: 0.8rem;">{{ item.account }}</span>
              </div>
            </div>
          </div>
        </ChatMain>
      </div>
      <div class="chatInput">
        <ChatInput />
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import ChatInput from '@/components/chatInput.vue';
import ChatMain from '@/components/chatMain.vue';
import { useOnlineUserStore } from '@/stores/onlineUser';
import { useSocketStore } from '@/stores/socketStore';
import { useUserDataStore } from '@/stores/userData';
import {  ref } from 'vue';
const socketStore = useSocketStore()

const onlineUserStore = useOnlineUserStore()
const userData = useUserDataStore()

let isShowOnlineList = ref(false)

function showOnlineList(){
  isShowOnlineList.value = !isShowOnlineList.value
}

function getOut(){
  socketStore.socket.disconnect()
}
</script>

<style scoped>
.onlineuser {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.online-avatarbox {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.online-user-box {
  display: flex;
  height: 60px;
  align-items: center;
  width: 160px;
  border-bottom: 1px solid #eaeaea;
  padding: 3px;
}

.online-user-box:hover {
  background-color: #f5f5f5;
}

.online-user-list {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 5px;
  right: 30px;
  border: 1px solid #e1e1e1;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.online-account {
  padding: 0 10px;
  margin-right: 30px;
  cursor: pointer;
  border-radius: 6px;
}

.chatHead {
  width: 100%;
  height: 10%;
  padding-left: 5px;
  display: flex;
  align-items: end;
  min-height: 50px;
  justify-content: space-between;
}

.chatMain {
  width: 100%;
  height: 455px;
  border-bottom: 1px solid rgb(224, 224, 224);
  border-top: 1px solid rgb(224, 224, 224);
}

.chatInput {
  width: 100%;
  height: 25%;
  min-height: 80px;
}

.content {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 585px;
}

.leftbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 10%;
  height: 100%;
  min-width: 100px;
  min-height: 520px;
}

.rightbox {
  width: 90%;
  height: 100%;
  background-color: rgb(245, 246, 247);
  border-left: 1px solid rgb(234, 234, 234);
  min-width: 600px;
  min-height: 250px;
}

img {
  width: 100%;
  height: 100%;
}

.avatarbox {
  width: 70px;
  height: 70px;
  border-radius: 8px;
}

.userbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.out {
  width: 60px;
  height: 60px;
  background-color: rgba(149, 146, 146, 0.941);
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>
