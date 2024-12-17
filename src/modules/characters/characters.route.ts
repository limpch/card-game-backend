import { Router } from "express"
import charactersController from "./characters.controller"
import roleMiddleware from "src/middlewares/role.middleware"

const router = Router()

router.get("/", charactersController.getAllCharacters)
router.get("/:id", roleMiddleware("admin"), charactersController.getCharacterById)
router.post("/", roleMiddleware("admin"), charactersController.createCharacter)
router.put("/:id", roleMiddleware("admin"), charactersController.updateCharacter)
router.delete("/:id", roleMiddleware("admin"), charactersController.deleteCharacter)

export default router
