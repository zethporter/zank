import { create } from "zustand";
import { toast } from "sonner";
import { type Game, type User } from "./gameSchema";

const findNextPlayer = (players: User[], currentPlayer: number) => {
  let _currentPlayer = currentPlayer + 1;
  let returner = null;
  while (typeof returner !== "number") {
    console.error("player", {
      _currentPlayer,
      players,
      length: players.length,
    });
    if (_currentPlayer > players.length - 1) {
      _currentPlayer = 0;
    }
    if (players[_currentPlayer].banked) {
      _currentPlayer++;
    } else {
      returner = _currentPlayer;
    }
  }
  return returner;
};

const checkIfAllBanked = (players: User[]) => {
  return players.every((player) => player.banked);
};

const resetBankedPlayers = (players: User[]) => {
  return players.map((player) => {
    player.banked = false;
    return player;
  });
};

const scoreCalculator = (
  rv1: number,
  rv2: number,
  currentRollIndex: number,
  currentScore: number,
) => {
  if (currentRollIndex >= 3) {
    if (rv1 + rv2 === 7) {
      return currentScore + 70;
    }
    return currentScore + rv1 + rv2;
  }
  if (rv1 === rv2) {
    return currentScore * 2;
  }
  return currentScore + rv1 + rv2;
};

export const useGameStore = create<Game>()((set) => ({
  id: "5ad2f5c4-0062-4d31-88f8-65bb6f61006e",
  gameCode: "defaultGameCode",
  totalRounds: 10,
  currentRound: 0,
  roundRollCount: 0,
  currentScore: 0,
  currentPlayer: 0,
  gameStatus: "lobby",
  players: [],
  addPlayer: (player) =>
    set((state) => {
      return {
        players: [
          ...state.players,
          {
            id: crypto.randomUUID(),
            userName: player,
            displayName: player,
            score: 0,
            banked: false,
            ip: "127.0.0.1",
            isGameMaster: state.players.length === 0,
          },
        ],
      };
    }),
  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    })),
  movePlayer: (playerIndex, dir) =>
    set((state) => {
      if (dir === "up" && playerIndex === 0) return state;
      if (dir === "down" && playerIndex === players.length - 1) return state;
      const players = state.players;
      if (dir === "up") {
        const currentPlayer = players[playerIndex];
        players[playerIndex] = players[playerIndex - 1];
        players[playerIndex - 1] = currentPlayer;
      }
      if (dir === "down") {
        const currentPlayer = players[playerIndex];
        players[playerIndex] = players[playerIndex + 1];
        players[playerIndex + 1] = currentPlayer;
      }
      return {
        players,
      };
    }),
  changeNumberOfRounds: (totalRounds) =>
    set((state) => (state.gameStatus === "lobby" ? { totalRounds } : state)),
  startGame: () => set((state) => ({ gameStatus: "playing", currentRound: 1 })),
  completeRoll: ([rv1, rv2]) =>
    set((state) => {
      const currentRollIndex = state.roundRollCount + 1;
      if (currentRollIndex > 3 && rv1 + rv2 === 7) {
        if (state.currentRound === state.totalRounds) {
          return { gameStatus: "finished" };
        }
        const players = resetBankedPlayers(state.players);
        const currentPlayer = findNextPlayer(players, state.currentPlayer);
        return {
          players,
          currentPlayer,
          currentRound: state.currentRound + 1,
          roundRollCount: 0,
        };
      }
      const currentScore = scoreCalculator(
        rv1,
        rv2,
        currentRollIndex,
        state.currentScore,
      );
      return { currentRollIndex, currentScore };
    }),
  bank: (playerId) =>
    set((state) => {
      toast.success(`Banked ${playerId}`);
      let currentPlayerIsUp = false;
      const players = state.players.map((player, i) => {
        if (player.id === playerId) {
          if (i === state.currentPlayer) {
            currentPlayerIsUp = true;
          }
          return { ...player, banked: true };
        }
        return player;
      });
      if (checkIfAllBanked(players)) {
        return {
          players: resetBankedPlayers(players),
          currentRound: state.currentRound + 1,
          roundRollCount: 0,
        };
      }
      const currentPlayer = currentPlayerIsUp
        ? findNextPlayer(players, state.currentPlayer)
        : state.currentPlayer;
      return {
        players,
        currentPlayer,
      };
    }),
  newGame: (keepPlayers) =>
    set((state) => ({
      players: keepPlayers
        ? state.players.map((player) => ({
            ...player,
            banked: false,
            score: 0,
          }))
        : [],
      currentRound: 0,
      roundRollCount: 0,
      currentScore: 0,
      currentPlayer: 0,
      gameStatus: "lobby",
    })),
  rollDice: () => [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)],
}));
