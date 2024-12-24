import { defineStore } from 'pinia'
interface IOnlineUserData {
  id: number,
  account: string,
  username: string,
  avatar: string
}

export const useOnlineUserStore = defineStore('OnlineUserStore', () => {
  const onlineUser:(IOnlineUserData[]) = []
  function clearOnlineUserStore(){
    onlineUser.length = 0
  }
  return { onlineUser,clearOnlineUserStore }
},
{
  persist:true,
})
