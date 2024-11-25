import { Socket } from "dgram"
import { Server } from "socket.io"

export class WSs {
	io: Server

	constructor(server: any) {
		this.io = new Server(server)
		this.connection()
	}

	connection() {
		this.io.on("connection", socket => {})
	}

	serveConnection(socket: Socket) {
		socket.on("server", (type, userdata) => {
			switch (type) {
			}
		})
	}
}
