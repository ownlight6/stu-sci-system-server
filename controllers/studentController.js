const fs = require('fs');
const path = require("path");
const { getPaper, getPaperSno } = require("../untils/paper")
const { getCompetition, getCompetitionSno } = require("../untils/competition")
const { getStudent } = require("../untils/student")

//学生登录
login = async (req, res, next) => {
    try {
        let {
            username,
            password
        } = req.body
        let stuList = await getStudent()
        let getUser = false
        for (let i = 0; i < stuList.length; i++) {
            if (username == stuList[i].学号) {
                getUser = true
                if (password == stuList[i].密码) {
                    res.send({
                        code: 0,
                        msg: "登录成功",
                        data: stuList[i].姓名
                    })
                } else {
                    res.send({
                        code: 1,
                        msg: "登录失败",
                        data: "密码错误"
                    })
                }
            }
        }
        if (getUser == false) {
            res.send({
                code: 1,
                msg: "登录失败",
                data: "无此用户"
            })
        }
    } catch (err) {
        res.send({
            code: 1,
            msg: "登录失败",
            data: null
        })
    }
}

//学生添加论文成果
addPaper = async (req, res, next) => {
    try {
        let { add } = req.body
        let paperList = await getPaper()
        let addData = (paperList.num + 1) + " " + add + ' 0\n'

        fs.appendFile(path.join(__dirname, '../static/paper.txt'), addData, async function (err) {
            if (err) {
                res.send({
                    code: 1,
                    msg: "添加失败",
                    data: null
                })
                throw err;
            }
            let sno = await getPaperSno(add)
            console.log(sno)
            res.send({
                code: 0,
                msg: "添加成功",
                data: await getPaper(sno)
            })
        });
    } catch (err) {
        console.log(err)
        res.send({
            code: 1,
            msg: "添加失败",
            data: null
        })
    }
}

//学生添加竞赛成果
addCompetition = async (req, res, next) => {
    try {
        let { add } = req.body

        let competitionList = await getCompetition()
        let addData = (competitionList.num + 1) + " " + add + ' 0\n'

        fs.appendFile(path.join(__dirname, '../static/competition.txt'), addData, async function (err) {
            if (err) {
                res.send({
                    code: 1,
                    msg: "添加失败",
                    data: null
                })
                throw err;
            }
            let sno = await getCompetitionSno(add)
            console.log(sno)
            res.send({
                code: 0,
                msg: "添加成功",
                data: await getCompetition(sno)
            })
        });
    } catch (err) {
        console.log(err)
        res.send({
            code: 1,
            msg: "添加失败",
            data: null
        })
    }
}


module.exports = {
    login, addPaper, addCompetition
}