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
  };
  return (
    <div
      // onClick={() => rollDice()}
      className="flex flex-wrap flex-row justify-center gap-4"
    >
      {/* <Die value={diceValues[0]} />
      <Die value={diceValues[1]} /> */}
      <Players
        players={game.players}
        addPlayer={game.addPlayer}
        removePlayer={game.removePlayer}
        movePlayer={game.movePlayer}
      />
      <Scoreboard players={game.players} bank={game.bank} />
      <p>{`Current Player: ${game.currentPlayer}`}</p>
      <p>{`Current round: ${game.currentRound}`}</p>
    </div>
  );
}
