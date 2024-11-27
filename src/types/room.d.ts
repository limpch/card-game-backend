import { Server } from "socket.io"
import { IRoomCard } from "./card"
import { IRoomCharacter } from "./character"

export type TRoomStep = "setup" | "gameStarts" | "play" | "end"

export interface IRoomCard {
	id: number
	effects: [string, string][]
}
