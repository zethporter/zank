import { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

import type { User, Game } from "../worker/gameSchema";
const Players = ({
  players,
  addPlayer,
  removePlayer,
  movePlayer,
}: {
  players: User[];
  addPlayer: (player: string) => void;
  removePlayer: (player: string) => void;
  movePlayer: (playerKey: number, direction: "up" | "down") => void;
}) => {
  const [tempPlayer, setTempPlayer] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <form
        className="join"
        onSubmit={(e) => {
          e.preventDefault();
          if (tempPlayer !== null) {
            addPlayer(tempPlayer);
            setTempPlayer(null);
          }
        }}
      >
        <input
          type="text"
          className="input input-neutral join-item"
          placeholder={`Player's Name`}
          value={tempPlayer || ""}
          onChange={(e) => setTempPlayer(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary btn-soft join-item">
          Add Player
        </button>
      </form>
      <div className="flex flex-col gap-1">
        {players.map((player, index) => (
          <div key={player.id} className="flex flex-row w-full gap-1">
            <p className="grow">{player.displayName}</p>
            <button
              type="button"
              className="btn btn-sm btn-success btn-square btn-soft"
              onClick={() => movePlayer(index, "up")}
            >
              <ArrowUpIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-warning btn-square btn-soft"
              onClick={() => movePlayer(index, "down")}
            >
              <ArrowDownIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-error btn-square btn-soft"
              onClick={() => removePlayer(player.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
