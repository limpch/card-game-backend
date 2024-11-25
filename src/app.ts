import express from "express"
import { createServer } from "http"
import { WSs } from "./WSs"
import mainRouter from "./router"
import { Sequelize } from "sequelize-typescript"
import { dbConfig } from "./configs/db.config"
import { User } from "./models/User.model"
import { Character } from "./models/Character.model"
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.middleware"
import { Card } from "./models/Card.model"
import { UserCharacter } from "./models/UserCharacter.model"
import { UserCard } from "./models/UserCard.model"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
const server = createServer(app)
new WSs(server)

const sequelize = new Sequelize({
	dialect: "postgres",
	...dbConfig(),
	models: [User, Character, Card, UserCharacter, UserCard],
})

app.use(express.json())
app.use("/api", mainRouter)
app.use(errorMiddleware)

sequelize
	.sync({
		// force: true,
	})
	.then(() => {
		server.listen(PORT, () => {
			console.log(`server running at http://localhost:${PORT}`)
		})
	})
	.catch(err => console.log(err))
