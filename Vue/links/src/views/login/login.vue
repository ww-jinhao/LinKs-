<template>
  <div class="content">
    <div class="main">
      <h2> Links 在线聊天室</h2>
      <form class="form-box" @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="account">账号</label>
          <input id="account" class="ipt" type="text" placeholder="请输入账号" required v-model="data.account" />
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input id="password" class="ipt" type="password" placeholder="请输入密码" required v-model="data.password" />
        </div>
        <button type="submit" class="login-btn">登录</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useUserDataStore } from '@/stores/userData';
import { login } from '@/views/login/login';
import { reactive } from 'vue';
const userData = useUserDataStore()

const data = reactive({
  account: '',
  password: ''
})

async function handleSubmit() {
  const formdata = {
    account: data.account,
    password: data.password
  }
  try {
    const res = await login(formdata)
    const token = res.data.token

    userData.userData.id = res.data.data.id
    userData.userData.account = res.data.data.account
    userData.userData.username = res.data.data.username
    userData.userData.avatar = res.data.data.avatar

    console.log(userData.userData);

    if(token){
      localStorage.setItem('token', token)
    }
    router.push('/chat')
  } catch (error:any) {
    if(error.response){
      console.log(error.response.data.message);
    }

  }

}
</script>

<style scoped>
.content {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url("https://bu.dusays.com/2023/08/21/64e354529345d.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.main {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.main h2 {
  margin-bottom: 20px;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-group label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.ipt {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  outline: none;
  background-color: #fff;
  color: #333;
}

.ipt:focus {
  border-color: rgb(83, 119, 236);
  box-shadow: inset 0 1px 1px rgba(163, 170, 244, 0.075);
}

.login-btn {
  width: 65%;
  padding: 12px;
  background-color: rgb(82, 127, 234);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin: 0 auto;
}

.login-btn:hover {
  background-color: darken(rgba(82, 132, 249, 0.662), 60%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
