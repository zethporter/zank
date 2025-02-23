import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useGameStore } from "../worker";

import Die from "../components/Die";
import Players from "../components/Players";
import Scoreboard from "../components/Scoreboard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [diceValues, setDiceValues] = useState<[number, number]>([0, 0]);
  const game = useGameStore();

  const rollDice = async () => {
    setDiceValues([0, 0]);
    const newValues = game.rollDice();
    setDiceValues(game.rollDice());
    await new Promise((resolve) => setTimeout(resolve, 700));
    game.completeRoll();
  };
  switch (game.gameStatus) {
    case "lobby":
      return (
        <div className="flex flex-col gap-5 items-center">
          <Players
            players={game.players}
            addPlayer={game.addPlayer}
            removePlayer={game.removePlayer}
            movePlayer={game.movePlayer}
            changeNumberOfRounds={game.changeNumberOfRounds}
          />
          <button
            type="button"
            className="btn btn-wide btn-secondary btn-soft"
            disabled={game.players.length === 0}
            onClick={() => game.startGame()}
          >
            Start Game
          </button>
        </div>
      );
    case "playing":
      return (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-row w-full items-center gap-2">
            <progress
              className="progress progress-accent grow"
              value={game.currentRound}
              max={game.totalRounds}
            ></progress>
            <div className="badge badge-accent">{game.currentRound}</div>
          </div>
          <div className="flex flex-col content-center items-center gap-1">
            <div className="stat-value text-secondary">{game.currentScore}</div>
            <div className="badge badge-primary">{game.roundRollCount}</div>
          </div>
          <button
            type="button"
            onClick={() => rollDice()}
            className="flex flex-row gap-3 w-full justify-center"
          >
            <Die value={diceValues[0]} />
            <Die value={diceValues[1]} />
          </button>
          <Scoreboard
            players={game.players}
            bank={game.bank}
            currentScore={game.currentScore}
          />
        </div>
      );
    case "finished":
      return (
        <button
          type="button"
          className="btn btn-wide btn-primary btn-soft"
          onClick={() => game.newGame(true)}
        >
          New Game
        </button>
      );
  }
}
