import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  userName: z.string(),
  displayName: z.string(),
  score: z.number(),
  // status: z.enum(["up", "onDeck", "inTheHole", "waiting"]),
  banked: z.boolean(),
  ip: z.string().ip(),
  isGameMaster: z.boolean().default(false),
});

export type User = z.infer<typeof userSchema>;

export const gameSchema = z.object({
  id: z.string().uuid(),
  gameCode: z.string(),
  totalRounds: z.number(),
  currentRound: z.number(),
  roundRollCount: z.number(),
  currentScore: z.number(),
  currentPlayer: z.number(),
  gameStatus: z.enum(["lobby", "playing", "finished"]),
  players: z.array(userSchema).default([]),
  addPlayer: z.function().args(z.string()).returns(z.void()),
  removePlayer: z.function().args(z.string().uuid()).returns(z.void()),
  movePlayer: z
    .function()
    .args(z.number(), z.enum(["up", "down"]))
    .returns(z.void()),
  changeNumberOfRounds: z.function().args(z.number()).returns(z.void()),
  startGame: z.function().returns(z.void()),
  completeRoll: z
    .function()
    .args(z.tuple([z.number().min(1).max(6), z.number().min(1).max(6)]))
    .returns(z.void()),
  bank: z.function().args(z.string().uuid()).returns(z.void()),
  newGame: z.function().args(z.boolean()).returns(z.void()),
  rollDice: z
    .function()
    .returns(z.tuple([z.number().min(1).max(6), z.number().min(1).max(6)])),
});

export type Game = z.infer<typeof gameSchema>;
