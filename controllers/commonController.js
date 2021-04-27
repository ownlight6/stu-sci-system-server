const { getCompetition, getCompetitionName } = require("../untils/competition")
const { getPaper, getPaperName } = require("../untils/paper")

//查看论文属性
paperName = async (req, res, next) => {
    try {
        res.send({
            code: 0,
            msg: "成功",
            data: await getPaperName()
        })
    } catch (err) {
        res.send({
            code: 1,
            msg: "失败",
            data: null
        })
    }
}

//查看竞赛属性
competitionName = async (req, res, next) => {
    try {
        res.send({
            code: 0,
            msg: "成功",
            data: await getCompetitionName()
        })
    } catch (err) {
        res.send({
            code: 1,
            msg: "失败",
            data: null
        })
    }
}

//获取论文列表
paperList = async (req, res, next) => {
    try {
        let { sno } = req.query
        let data = await getPaper(sno)
        res.send({
            code: 0,
            msg: "成功",
            data: data
        })
    } catch (err) {
        res.send({
            code: 1,
            msg: "失败",
            data: null
        })
    }
}

//获取竞赛列表
competitionList = async (req, res, next) => {
    try {
        
        let { sno } = req.query
        let data = await getCompetition(sno)
        res.send({
            code: 0,
            msg: "成功",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.send({
            code: 1,
            msg: "失败",
            data: null
        })
    }
}

module.exports = {
    paperName, competitionName, paperList, competitionList
}