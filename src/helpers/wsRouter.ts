import { Socket } from "socket.io"
import { wsErrorHandler } from "./wsErrorHandler"

export interface IWsRoute {
	route: string
	handler: (...args: any[]) => void
}

export const wsRouter = (socket: Socket, routes: IWsRoute[]) => {
	routes.forEach(route => {
		socket.on(route.route, wsErrorHandler(socket, route.handler))
	})
}
