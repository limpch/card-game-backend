import { Router } from "express"
import { authMiddleware } from "src/middlewares/auth.middleware"
import authRouter from "src/modules/auth/auth.router"
import charactersRouter from "src/modules/characters/characters.route"

const mainRouter = Router()

mainRouter.use("/auth", authRouter)
mainRouter.use(authMiddleware)
mainRouter.use("/characters", charactersRouter)

export default mainRouter
