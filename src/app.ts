import express from "express"
import { createServer } from "http"
import { WSs } from "./WSs"
import mainRouter from "./router"
import { Sequelize } from "sequelize-typescript"
import { dbConfig } from "./configs/db.config"
import { User } from "./models/User.model"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.PORT)

const PORT = process.env.PORT || 5000
const app = express()
const server = createServer(app)
const wss = new WSs(server)

console.log(dbConfig)

const sequelize = new Sequelize({
	dialect: "postgres",
	...dbConfig(),
	models: [User],
})

app.use(express.json())
app.use(mainRouter)

sequelize
	.sync()
	.then(() => {
		server.listen(PORT, () => {
			console.log(`server running at http://localhost:${PORT}`)
		})
	})
	.catch(err => console.log(err))
