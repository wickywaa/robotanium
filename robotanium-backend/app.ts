import { Socket } from "socket.io";
require("dotenv").config();
import { userobject, botObject, messageObject } from "./src/interfaces/userInterfaces/userInterfaces";
import { setBotStatus, getBotById, getBotPasswordById } from "./src/firebase/firebase";
import { PasswordService } from "./src/Services";
import { auth } from './src/firebase/firebase';
import {botClientRouter,adminRouter,botRouter, userRouter, gameRouter} from  './src/Routers';
const passwordService = new PasswordService();

import { createSessionToken, createSessionId } from "./src/Services/vonage.service";

const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
  allowEIO3: true,
  requestCert: false,
  transports:["polling","websocket"],
  cors: {
    origin: '*',
  }
});
import { IGeneratetoken } from "./src/interfaces";

const PORT = 8080;
let users: userobject[] = [];
let bots: botObject[] = [];
let messages: messageObject[] = [];
app.use(express.json());
app.use(cors());
app.use(adminRouter);
app.use(userRouter);
app.use(botRouter);
app.use(gameRouter);
app.use(botClientRouter)

export const addUser = () => { };

io.on("connection", (socket: Socket) => {
  socket.on("disconnect", () => {
    const BotLeaving = bots.find((bot) => bot.socketId === socket.id);
    if (BotLeaving !== undefined) {
      setBotStatus(BotLeaving.botId, false);
    }
    const newusers = users.filter((user) => {
      return user.socketId !== socket.id;
    });

    const newBots = bots.filter((bot) => {
      return bot.socketId !== socket.id;
    });

    users = newusers;
    bots = newBots;
    socket.broadcast.emit("user_list", users);
    socket.broadcast.emit("bot_list", bots);
  });

  socket.on("add user", (socket: Socket) => {
    console.log('recieved message', socket)
   });

  socket.on("registeruser", (user: userobject) => {
    console.log('hshd')
    const filteredusers = users.filter((olduser) => user.email != olduser.email);
    users = [...filteredusers, user];
    io.sockets.emit("user_list", users);
    io.sockets.emit("bot_list", bots);
  });

  socket.on("registerBot", async (data:{Id:string, password:string}) => {
    const Id = data.Id;
    const password = data.password
    try {
      const bot = await getBotById(Id);
      const botPassword = await getBotPasswordById(Id);
      const passswordsMatch = await passwordService.comparePasswords(password, botPassword??'');

      if (!passswordsMatch) {
        throw new Error("passwords do not match");
      }
      const newBot: botObject = {
        botId: Id,
        socketId: socket.id,
        userName: undefined,
        userUid: undefined,
      };

      const filteredBots = bots.filter((oldbot) => newBot.botId !== oldbot.botId);
      bots = [...filteredBots, newBot];
      io.sockets.emit("bot_list", bots);
      const endTime = new Date().getTime() + 864000000;
      const options: IGeneratetoken = {
        role: "publisher",
        sessionId: bot.sessionId,
        expireTime: endTime,
      };
      const selectedBot = bots.find((bot) => bot.botId === Id);
      const token = await createSessionToken({ role: "publisher", sessionId: bot.sessionId, expireTime: endTime });
      io.sockets.emit("bot_list", bots);
      io.sockets.to(selectedBot?.socketId).emit("startGame", { sessionId: bot.sessionId, token });
      setBotStatus(Id, true);
    } catch (e) { }
  });

  socket.on("add_chat_message", (message: messageObject) => {
    messages.push(message);
    io.sockets.emit("messages_list", messages);
  });

  socket.on("connect_to_bot", async (message: { token: string, botId: string }) => {
    if (!message.token?.length) return;
    await auth.verifyIdToken(message.token)
      .then((decodedToken) => {
        const emailOkay = decodedToken.email?.endsWith('@robotanium.com')
        const botExists = bots.find((bot) => bot.botId === message.botId)
        if (emailOkay && botExists) {
          const updatedBot: botObject = {
            botId: botExists.botId,
            socketId: botExists.socketId,
            userUid: decodedToken.uid,
            userName: decodedToken.email
          }
          bots = bots.map((bot) => bot.botId === message.botId ? updatedBot : bot);
        }
      })
  })

  socket.on("send_bot_message", (message:{controls:string,token:string,botId:string}) => {
    console.log(message)
    const selectedBot = bots.find((bot) => {
      return bot.botId === message.botId;
    });
    if(!selectedBot) {
      return 
    }

    io.sockets.to(selectedBot?.socketId).emit("setControls", message.controls);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port, ${PORT}`);
});
