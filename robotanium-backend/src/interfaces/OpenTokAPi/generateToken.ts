export interface IGeneratetoken {
  sessionId: string;
  role: 'publisher' | 'subscriber' | 'moderator';
  expireTime: number; 
}