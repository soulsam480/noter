import { io, Socket } from 'socket.io-client';
import Vue from 'vue';
//todo get reactive token from store after getting new token

let sock: Socket;

export const createWs = (mainToken: string) => {
  sock = io(
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_WS
      : 'http://localhost:4000',
    {
      path: '/ws',
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${mainToken}`,
      },
    },
  );
  sock.on('connect', () => {
    console.log('connected');
  });
  Vue.prototype.$io = sock;
  return sock;
};

export { sock };
