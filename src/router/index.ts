import { Router } from "express"
import { authMiddleware } from "src/middlewares/auth.middleware"
import { errorMiddleware } from "src/middlewares/error.middleware"
import authRouter from "src/modules/auth/auth.router"
import cardsRouter from "src/modules/cards/cards.router"
import charactersRouter from "src/modules/characters/characters.route"
import decksRouter from "src/modules/decks/decks.router"

const mainRouter = Router()

mainRouter.use("/auth", authRouter)
mainRouter.use("/characters", authMiddleware, charactersRouter)
mainRouter.use("/cards", authMiddleware, cardsRouter)
mainRouter.use("/decks", authMiddleware, decksRouter)
mainRouter.use(errorMiddleware)

export default mainRouter
