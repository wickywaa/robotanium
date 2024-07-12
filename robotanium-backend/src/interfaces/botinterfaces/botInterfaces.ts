export interface ICreateTankBot {
  botName: '',
  botId: '',
  password:string,
  status:'online'| 'offline',
  mainPhotoUrl: '',
  otherPhotosUrls: [],
  sessionId: string;
}
