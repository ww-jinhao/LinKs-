import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { IMessage } from '@/type/chatMessage'
export const useMessageStore = defineStore('messageStore', () => {
  const message = reactive<IMessage[]>([])
  function clearMessageStore() {
    message.length = 0
  }
  return { message, clearMessageStore }

}
,{
  persist:true
}
)
