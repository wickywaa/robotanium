interface camera{
  id:string;
  name:string;
}

export interface IBot {
id: string,
name: string;
img: string;
imageUrl: string;
cockpits: camera[]
}

export interface ICockpit {
  name: string;
}

export interface ICreateBotDTo {
  name: string;
  image?: File;
  password: string;
  cockpits: string[];
  botImageUrl: string;
}