import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserDataStore = defineStore('userData', () => {
  let id:number = 1
  let account:number = 1000000
  let username:string = '往往'
  let avatar:string = 'https://bu.dusays.com/2024/12/17/6761652f82d69.bmp'
  const userData = reactive({
    id,
    account,
    username,
    avatar,
  })
  return { userData }
})
