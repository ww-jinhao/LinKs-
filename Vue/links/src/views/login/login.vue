<template>
  <div class="content">
    <div class="main">
      <h2> Links 在线聊天室</h2>
      <form class="form-box" @submit.prevent="handleSubmitLogin" v-show="isLogin">
        <div class="input-group">
          <label for="account">账号</label>
          <input id="account" class="ipt" type="text" placeholder="请输入账号" required v-model="logindata.account" />
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input id="password" class="ipt" type="password" placeholder="请输入密码" required v-model="logindata.password" />
        </div>
        <div style="display: flex;justify-content: space-evenly;">
          <button @click="goRegister" type="button" class="login-btn">去注册</button>
          <button type="submit" class="login-btn">登录</button>
        </div>
      </form>
      <form class="form-box" @submit.prevent="handleSubmitRegister" v-show="!isLogin">
        <div class="input-group">
          <label for="account">账号</label>
          <input id="account" class="ipt" type="text" placeholder="请输入账号" readonly v-model="registerdata.account" />
        </div>
        <div class="input-group">
          <label for="username">用户名</label>
          <input id="username" class="ipt" type="text" placeholder="请输入用户名" required v-model="registerdata.username" />
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input id="password" class="ipt" type="password" placeholder="请输入密码" required
            v-model="registerdata.password" />
        </div>
        <div style="display: flex;justify-content: space-evenly;">
          <button @click="goLogin" type="button" class="login-btn">去登录</button>
          <button type="submit" class="login-btn">注册</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useUserDataStore } from '@/stores/userData';
import { login, getNextAccount, register } from '@/views/login/login';
import { ElMessage } from 'element-plus';
import { ref, reactive, onBeforeMount, onMounted } from 'vue';

const userData = useUserDataStore()

let isLogin = ref(true)

onBeforeMount(async () => {
  try {
    let res = await getNextAccount()
    registerdata.account = res.data.account
  }
  catch (error: any) {
    if (error.response) {
      ElMessage.error("获取注册账号失败，请重试")
    }
  }

})

const logindata = reactive({
  account: '',
  password: ''
})

interface Irdata {
  account: number | null,
  password: string,
  avatar: string,
  username: string,
}
const registerdata = reactive<Irdata>({
  account: null,
  password: '',
  avatar: "https://bu.dusays.com/2024/12/19/6763f65a7d064.jpg",
  username: ''
})

function goLogin() {
  isLogin.value = true
}

function goRegister() {
  isLogin.value = false
}


async function handleSubmitRegister() {
  const formdata = {
    account: registerdata.account,
    password: registerdata.password,
    avatar: registerdata.avatar,
    username: registerdata.username
  }
  try {
    await register(formdata)
    registerdata.account = null
    registerdata.password = ''
    registerdata.username = ''
  }
  catch (error: any) {
    if (error.response) {
      ElMessage.error("注册账号失败，请重试")
    }
  }
}

async function handleSubmitLogin() {
  const formdata = {
    account: logindata.account,
    password: logindata.password
  }
  try {
    const res = await login(formdata)
    const token = res.data.token

    userData.userData.id = res.data.data.id
    userData.userData.account = res.data.data.account
    userData.userData.username = res.data.data.username
    userData.userData.avatar = res.data.data.avatar

    if (token) {
      localStorage.setItem('token', token)
    }
    router.push('/chat')
  } catch (error: any) {
    if (error.response) {
      ElMessage.error(error.response.data.message)
    }
    else{
      ElMessage.error("请求失败")
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
  width: 40%;
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
