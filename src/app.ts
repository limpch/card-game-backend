import express from "express"
import { createServer } from "http"
import { WSs } from "./WSs"
import { Server } from "socket.io"
import mainRouter from "./router"

const app = express()
const server = createServer(app)
const wss = new WSs(server)

app.use(express.json())
app.use(mainRouter)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`)
})
