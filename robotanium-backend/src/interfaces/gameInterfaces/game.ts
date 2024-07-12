export interface BotConnections {
  id:string;
  botId: string;
  clientName: string;
  clientId: string;
  PlayerId: string;
}

export interface BotInGame {
    id: string;
    name: string;
    connections: BotConnections[];
    botName: string;
}

export interface Player {
  playerId: string;
  botId: string;
  botName: string;
}

export enum gameType {
  private = 'private',
  public = 'public',
}
  
export interface IGame {
    gameId: string;
    gameType: String;
    map: string;
    numberOfBots: number;
    playersArray: Player[];
    duration: number;
    gameStartDate: Date;
    gameEndDate: Date;
    credits: number;
    created_at: Date;
    updated_at: Date; 
  }

  export interface databaseGame extends IGame {
    _id:string;
    gameType: String;
    map: string;
    numberOfPlayers: number;
    playersArray: Player[];
    duration: number;
    gameStartDate: Date;
    gameEndDate: Date;
    startTime: number;
    endTime: number;
    credits: number;
  }

  export interface FirebaseGame {credits: 35,
    duration: number;
    endTime: number;
    gameDate: string;
    gameType: 'Public' | 'Private';
    map: 'string';
    numberOfPlayers: number;
    playersArray: { 
      botId: string; 
      botName: string; 
      playerId: string }[],
    startTime: number
  }