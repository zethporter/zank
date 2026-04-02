import handler from '@tanstack/react-start/server-entry'
import { GameRoom } from './durable-objects/GameRoom'

export { GameRoom }

export default {
  fetch: handler.fetch,
}
