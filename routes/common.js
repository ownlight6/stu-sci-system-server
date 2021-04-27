const express = require("express")
const router = express.Router()

let common = require("../controllers/commonController")

router.get("/paperName", common.paperName)
router.get("/competitionName", common.competitionName)
router.get("/paperList", common.paperList)
router.get("/competitionList", common.competitionList)

module.exports = router