import { io, Socket } from 'socket.io-client';
import { store } from '../store/store';
import { ILoggedInUser } from '../models';
import { handleConnection, handleDisconnect } from './handleConnection';
import { handleUserListUpdate } from './userLists';

export const connectsocket = (userId: string,usertoken: string) => {
  
  console.log('connecting')
  console.log('userId', userId);
  console.log('usertoken', usertoken)

  const socket = io('http://localhost:47000',{
    auth: {
      type:'user',
      id:userId,
      token: usertoken
    },
    autoConnect:false,
  });

  if(!userId.length || !usertoken.length) return;
  console.log('should connect now')

  socket.connect();

  socket.on('connect',handleConnection)
  socket.on('disconnect', handleDisconnect)
  socket.on('connections',handleUserListUpdate)

}




// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:46000'
// ';
