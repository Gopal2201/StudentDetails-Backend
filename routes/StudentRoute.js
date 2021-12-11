const router = require("express").Router();
const service = require("../Services/StudentServices")

router.get("/list", service.list)
router.post("/create", service.create)
router.put("/update/:ID", service.update)
router.delete("/delete/:ID", service.delete)

module.exports = router;