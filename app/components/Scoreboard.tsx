import { useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";

import type { User, Game } from "../worker/gameSchema";
const Scoreboard = ({
  players,
  bank,
}: {
  players: User[];
  bank: (playerId: string) => void;
}) => {
  const [tempPlayer, setTempPlayer] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        {players.map((player, index) => (
          <div key={player.id} className="flex flex-row w-full gap-1">
            <p>{player.displayName}</p>
            <p className="grow">{player.score}</p>
            <button
              disabled={player.banked}
              type="button"
              className="btn btn-sm btn-success btn-square btn-soft"
              onClick={() => bank(player.id)}
            >
              <CurrencyDollarIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <pre className="text-primary">{JSON.stringify(players, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Scoreboard;
