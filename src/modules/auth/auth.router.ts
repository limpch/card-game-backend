import { Router } from "express"
import { authController } from "./auth.controller"
import { body } from "express-validator"

const router = Router()

router.post(
	"/login",
	body("telegramUserData", "Для логина необходим telegramUserData").isString(),
	authController.login
)

router.get("/logout", authController.logout)

export default router
