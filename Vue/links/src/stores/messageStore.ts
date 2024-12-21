import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { IMessage } from '@/type/chatMessage'
export const useMessageStore = defineStore('messageStore', () => {
  const message = reactive<IMessage[]>([])
  return { message }
},
  {
    persist: true,
  })
