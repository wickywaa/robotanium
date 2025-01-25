import * as mongoose from 'mongoose';
import { } from './interfaces';
import { IGame, IGameMethods, IGameModel } from './interfaces/games.interface';
import { Bot } from 'src/bots/bots.schema';

const { Schema } = mongoose;

const connectedCockpitSchema = new Schema({
  player: {
    id: { type: String, default: null },
    name: { type: String, default: null },
  }
});

const connectedBotSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  cockpits: [connectedCockpitSchema],
});

// Define the Game schema
export const gameSchema = new Schema({
  name: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: false },
  players: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  adminPlayerId: { type: String, required: true },
  bots: [connectedBotSchema],  // Now an array of connected bots
  gameType: {
    type: String,
    enum: ['public', 'private'],
    required: true,
  },
  reason: {
    type: String,
    enum: ['game', 'practise', 'test'],
    required: true,
  },
  chatEnabled: { type: Boolean, required: true },
  voiceChatEnabled: { type: Boolean, required: true },
  camerasEnabled: { type: Boolean, required: true },
  gamestopped: { type: Boolean, required: true },
  gamesStoppedBy: { type: Boolean, required: true },
  gameStoppedReason: { type: Boolean, required: true },
  gameinSeconds: { type: Number, required: true },
  chat: [
    {
      userId: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
  notes: [
    {
      adminId: { type: String, required: true },
      note: { type: String, required: true },
    },
  ]
});

// Create and export the Game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;