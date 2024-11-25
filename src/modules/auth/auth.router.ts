import { Router } from "express"
import { authController } from "./auth.controller"
import { body } from "express-validator"

const router = Router()

router.post(
	"/login",
	body("telegramLogin", "Для логина необходим telegramLogin").isString(),
	authController.login
)

router.get("/logout", authController.logout)

export default router
