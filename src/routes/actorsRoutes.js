const express = require("express")
const router = express.Router()
const actorsController = require("../controllers/actorsController")

router.get("/actors/detail/:id", actorsController.detail)
router.get("/actors", actorsController.list)
router.get("/actors/add",actorsController.add)


router.get("/actors/edit/:id", actorsController.edit)


router.get("/actors/delete/:id",actorsController.delete)
router.post("/actors/delete/:id",actorsController.destroy)
router.post("/actors/create",actorsController.create)
router.post("/actors/update/:id",actorsController.update)

module.exports = router