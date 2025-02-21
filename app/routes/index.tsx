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
  const [diceValues, setDiceValues] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const game = useGameStore();

  const rollDice = async () => {
    const newValues = game.rollDice();
    setDiceValues([null, null]);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setDiceValues(game.rollDice());
    game.completeRoll(diceValues);
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
        <div className="flex flex-col gap-5 items-center">
          <h3>{game.currentScore}</h3>
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
      return <p>Game Over</p>;
  }
}
