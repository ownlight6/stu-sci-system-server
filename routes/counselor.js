const express = require("express")
const router = express.Router()

let counselor = require("../controllers/counselorController")

router.post("/addPaper", counselor.addPaper)
router.post("/addCompetition", counselor.addCompetition)
router.post("/checkPaper", counselor.checkPaper)
router.post("/checkCompetition", counselor.checkCompetition)
router.get("/sortStudent", counselor.sortStudent)
router.get("/studentList", counselor.studentList)

module.exports = router