import { Router } from "express"
import decksController from "./decks.controller"
import { body, param } from "express-validator"

const router = Router()

router.patch(
	"/:id",
	param("id").isInt().withMessage("Неверный ID"),
	body("cards").isArray({ min: 20, max: 20 }).withMessage("Неверное количество карт"),
	decksController.update
)

export default router
