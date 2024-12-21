import { defineStore } from 'pinia'
interface IOnlineUserData {
  id: number,
  account: string,
  username: string,
  avatar: string
}

export const useOnlineUserStore = defineStore('OnlineUserStore', () => {
  const onlineUser:(IOnlineUserData[]) = []
  return { onlineUser }
},
{
  persist:true,
})
