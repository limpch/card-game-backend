import { Server } from "socket.io"
import { IRoomCard } from "./card"

export type TRoomStep = "setup" | "gameStarts" | "play" | "end"

export interface IRoomCard {
	id: number
	effects: [string, string][]
}
