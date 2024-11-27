import { Router } from "express"
import cardsController from "./cards.controller"
import roleMiddleware from "src/middlewares/role.middleware"

const router = Router()

router.get("/", cardsController.getAllCards)
router.post("/", roleMiddleware("admin"), cardsController.createCard)
router.put("/:id", roleMiddleware("admin"), cardsController.updateCard)
router.put("/:id/activity", roleMiddleware("admin"), cardsController.toggleActiveCard)
router.delete("/:id", roleMiddleware("admin"), cardsController.deleteCard)

export default router
