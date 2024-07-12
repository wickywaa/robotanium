export interface ICreateTankBot {
  botName: string;
  botId: string;
  password: string;
  status: boolean;
  mainPhotoUrl: string;
  otherPhotosUrls: [];
  idToken: string;
  uid: string;
}

export const EmptyCreateTankBot: ICreateTankBot = {
  botName: "",
  botId: "",
  password: "",
  status: false,
  mainPhotoUrl: "",
  otherPhotosUrls: [],
  idToken: "",
  uid: "",
};

export interface ITankBot {
  botName: string;
  botId: string;
  status: boolean;
  players: number;
  mainPhotoUrl: string;
  otherPhotoUrls: string[];
  sessionId: string;
}

export type controlPadDirections =
  | "forwardRight"
  | "forwardLeft"
  | "backRight"
  | "backLeft"
  | "moveForward"
  | "moveBack"
  | "spinRight"
  | "spinLeft"
  | "turretLeft"
  | "turretRight"
  | "stop";

export interface tankSteeringInterface {
  direction: controlPadDirections;
  angle: number;
  speed: number;
}

export interface tankTurretSteeringInterface {
  direction: 'left' | 'right' | 'stop'
}
