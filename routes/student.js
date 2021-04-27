const express = require("express")
const router = express.Router()

let student = require("../controllers/studentController")

router.post("/login", student.login)
router.post("/addPaper", student.addPaper)
router.post("/addCompetition", student.addCompetition)

module.exports = router