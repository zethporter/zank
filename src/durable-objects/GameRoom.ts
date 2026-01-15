import { DurableObject } from 'cloudflare:workers'

export class GameRoom extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
  }

  async fetch(request: Request): Promise<Response> {
    // Handle game state updates
    return new Response('Game room active')
  }

  async handleMove(playerId: string, move: any) {
    // Your game logic here
    await this.ctx.storage.sql.exec(
      'INSERT INTO moves (player_id, move_data) VALUES (?, ?)',
      playerId,
      JSON.stringify(move),
    )
  }
}
