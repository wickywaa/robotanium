export interface IGame {
  name:string;
  startTime: number;
  endTime: number;
  players: string[];
  adminPlayerId: string;
  bots: {
    _id: string;
    cockpits: {_id: string, userId: string}[];
  }[];
  gameType: 'public' | 'private';
  reason: 'game' | 'practise' | 'test';
  chatEnabled: boolean;
  voiceChatEnabled: boolean;
  camerasEnabled: boolean;
  gamestopped: boolean;
  gamesStoppedBy: string
  gameStoppedReason: string;
  gameinSeconds: number;
  chat: {
    userId: string;
    message: string;
  }[]
  notes: {
    adminId: string;
    note: string;
  }[]
}

export const emptyGame = {
  name: `test game ${new Date().getTime()}`,
  startTime: new Date().getTime(),
  endTime: null,
  players: [],
  adminPlayerId: '',
  bots: [],
  gameType: 'private',
  reason: 'test',
  chatEnabled: false,
  voiceChatEnabled: false,
  camerasEnabled: false,
  gamestopped: false,
  gamesStoppedBy: null,
  gameStoppedReason: '',
  gameinSeconds: 0,
  chat:[],
  notes: [],
}

export interface ICreateGameDto {
  name:string,
  startTime: number,
  endTime: number, 
  players: string[],
  adminPlayerId: string;
  bots: {
    _id: string,
    cockpits: {_id: string, userId: string}[]
  }[];
  gameType: 'public' | 'private',
  reason: 'game' | 'practise' | 'test',
  chatEnabled: boolean;
  voiceChatEnabled: boolean;
  camerasEnabled: boolean;
}