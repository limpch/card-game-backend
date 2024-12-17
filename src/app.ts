import express from "express"
import { createServer } from "http"
import { WSs } from "./WSs"
import mainRouter from "./router"
import { Sequelize } from "sequelize-typescript"
import { dbConfig } from "./configs/db.config"
import { User } from "./models/User.model"
import { Character } from "./models/Character.model"
import dotenv from "dotenv"
import { Card } from "./models/Card.model"
import { UserCharacter } from "./models/UserCharacter.model"
import { UserCard } from "./models/UserCard.model"
import cors from "cors"
import { UserSubscription } from "./models/UserSubscription.model"
import { Subscription } from "./models/Subscription.model"
import { Deck } from "./models/Deck.model"
import { DeckCard } from "./models/DeckCard.model"
import { loadGameContent } from "./common/loadGameContent"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(
	cors({
		origin: ["http://localhost:3000", "https://admin.socket.io"],
		credentials: true,
	})
)
app.use(express.json())
app.use("/api", mainRouter)

const server = createServer(app)
export const ws = new WSs(server)

const sequelize = new Sequelize({
	dialect: "postgres",
	...dbConfig(),
	models: [
		User,
		Character,
		Card,
		UserCharacter,
		UserCard,
		Subscription,
		UserSubscription,
		Deck,
		DeckCard,
	],
})

sequelize
	.sync({
		// force: true,
		// alter: true,
	})
	// .then(() => loadGameContent())
	.then(() => {
		server.listen(PORT, () => {
			console.log(`server running at http://localhost:${PORT}`)
		})
	})
	.catch(err => console.log(err))
