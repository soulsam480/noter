import { io, Socket } from 'socket.io-client';
import Vue from 'vue';
//todo get reactive token from store after getting new token

let sock: Socket;

export const createWs = (mainToken: string) => {
  sock = io('http://localhost:4000', {
    path: '/ws',
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${mainToken}`,
    },
  });
  Vue.prototype.$io = sock;
  return sock;
};

export { sock };
