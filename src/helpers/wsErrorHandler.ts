import { Socket } from "socket.io"

export const wsErrorHandler = (socket: Socket, cb: Function) => {
	return async (...args: any[]) => {
		try {
			return await cb(...args)
		} catch (error) {
			socket.emit("error", error.message)
		}
	}
}
