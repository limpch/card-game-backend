import { Router } from "express"
import cardsController from "./cards.controller"
import roleMiddleware from "src/middlewares/role.middleware"

const router = Router()

router.get("/", cardsController.getAllCards)
router.get("/:id", roleMiddleware("admin"), cardsController.getCardById)
router.post("/", roleMiddleware("admin"), cardsController.createCard)
router.patch("/:id", roleMiddleware("admin"), cardsController.updateCard)
router.delete("/:id", roleMiddleware("admin"), cardsController.deleteCard)

export default router
