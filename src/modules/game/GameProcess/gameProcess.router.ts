import { Socket } from "socket.io"
import { IWsRoute, wsRouter } from "src/helpers/wsRouter"
import gameProcessController from "./gameProcess.controller"

export const gameProcessRouter = (socket: Socket) => {
	const routes: IWsRoute[] = [
		{
			route: "gameProcess:cast",
			handler: gameProcessController.cast(socket),
		},
	]

	wsRouter(socket, routes)
}
