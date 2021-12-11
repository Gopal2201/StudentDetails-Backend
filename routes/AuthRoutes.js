const router = require("express").Router();
const service = require("../Services/AuthServices")

router.post("/register", service.register) // Registering new Admin User
router.post("/login", service.login) // Logging in with existing User

module.exports = router;