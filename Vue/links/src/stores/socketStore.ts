import { defineStore } from 'pinia'
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';


export const useSocketStore = defineStore('socketStore', () => {
  const socket = io("http://47.236.204.237:3000");
  // const socket = io("http://localhost:3000");
  return { socket } as {socket:Socket}
})
