<template>
  <div class="content">
    <div class="leftbox">
      <div class="userbox">
        <div class="avatarbox">
          <img :src="userData.userData.avatar" alt="">
        </div>
        <span style="font-size: 16px;">{{userData.userData.username}}</span>
      </div>
      <div class="out">
        <!-- 退出功能 -->
      </div>
    </div>
    <div class="rightbox">
      <div class="chatHead">
        <h3>LinKs 在线聊天室</h3>
      </div>
      <div class="chatMain">
        <ChatMain/>
      </div>
      <div class="chatInput">
        <ChatInput/>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import ChatInput from '@/components/chatInput.vue';
import ChatMain from '@/components/chatMain.vue';
import { useUserDataStore } from '@/stores/userData';

const userData = useUserDataStore()
</script>

<style scoped>
.chatHead{
  width: 100%;
  height: 10%;
  padding-left: 5px;
  display: flex;
  align-items: end;
  min-height: 50px;
}
.chatMain{
  width: 100%;
  height: 455px;
  border-bottom: 1px solid rgb(224,224,224);
  border-top: 1px solid rgb(224,224,224);
}
.chatInput{
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
  background-color: rgb(245,246,247);
  border-left: 1px solid rgb(234,234,234);
  min-width: 600px;
  min-height: 250px;
}

img{
  width: 100%;
  height: 100%;
}
.avatarbox{
  width: 70px;
  height: 70px;
  border-radius: 8px;
}
.userbox{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.out{
  width: 60px;
  height: 60px;
  background-color: rgba(149, 146, 146, 0.941);
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>
