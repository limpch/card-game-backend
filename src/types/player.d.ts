import { Server } from "socket.io"

export interface IPlayerBase {
	id: number
	name: string
	socket: Server
}
