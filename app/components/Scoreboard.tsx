import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";

import type { User, Game } from "../worker/gameSchema";
import clsx from "clsx";
const Scoreboard = ({
  players,
  bank,
  currentScore,
}: {
  players: User[];
  bank: (playerId: string) => void;
  currentScore: number;
}) => {
  const [tempPlayer, setTempPlayer] = useState<string | null>(null);
  return (
    <ul className="list w-full sm:w-2/3 md:w-1/2 lg:w-1/4">
      {players.map((player, index) => (
        <li key={player.id} className="list-row">
          <p className="text-xl text-primary font-bold">{player.displayName}</p>
          <p className="grow text-right text-secondary font-semibold text-xl">
            {player.score}
          </p>
          <p
            className={twMerge(
              clsx(
                "text-right text-base-content font-light text-xl",
                player.banked ? "text-transparent" : null,
              ),
            )}
          >
            {player.score + currentScore}
          </p>
          <button
            disabled={player.banked}
            type="button"
            className="btn btn-sm btn-accent btn-square btn-soft"
            onClick={() => bank(player.id)}
          >
            <CurrencyDollarIcon className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Scoreboard;
