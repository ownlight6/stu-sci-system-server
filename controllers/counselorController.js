const fs = require('fs');
const path = require("path");
const { getPaper, writePaper } = require("../untils/paper")
const { getCompetition, writeCompetition } = require("../untils/competition")
const { getStudent } = require("../untils/student")
const { CreateList, sortList, displayList } = require("../untils/nodeList")

//辅导员添加论文成果属性
addPaper = async (req, res, next) => {
    try {
        let { addName } = req.body

        fs.writeFile(path.join(__dirname, '../static/paper_name.txt'), addName, function (err) {
            if (err) {
                res.send({
                    code: 1,
                    msg: "添加失败",
                    data: null
                })
                throw err;
            }
            // 写入成功后读取测试
            fs.readFile(path.join(__dirname, '../static/paper_name.txt'), 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                res.send({
                    code: 0,
                    msg: "添加成功",
                    data
                })
            });
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

//辅导员添加竞赛成果属性
addCompetition = async (req, res, next) => {
    try {
        let { addName } = req.body

        fs.writeFile(path.join(__dirname, '../static/competition_name.txt'), addName, function (err) {
            if (err) {
                res.send({
                    code: 1,
                    msg: "添加失败",
                    data: null
                })
                throw err;
            }
            // 写入成功后读取测试
            fs.readFile(path.join(__dirname, '../static/competition_name.txt'), 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                res.send({
                    code: 0,
                    msg: "添加成功",
                    data
                })
            });
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

//辅导员审核论文
checkPaper = async (req, res, next) => {
    try {
        let { id, status } = req.body
        let { data, num } = await getPaper()
        let newDate = []
        for (let i = 0; i < num; i++) {
            if (data[i].ID == id) {
                data[i].审核 = status
            }
            newDate.push(data[i])
        }
        writePaper(newDate)
        let tip = ''
        switch (status) {
            case '1':
                tip = "审核通过"
                break;

            case '2':
                tip = "审核驳回"
                break;
        }
        res.send({
            code: 0,
            msg: tip,
            data: null
        })

    } catch (err) {
        res.send({
            code: 1,
            msg: "审核失败",
            data: null
        })
    }
}

//辅导员审核竞赛
checkCompetition = async (req, res, next) => {
    try {
        let { id, status } = req.body
        let { data, num } = await getCompetition()
        let newDate = []
        for (let i = 0; i < num; i++) {
            if (data[i].ID == id) {
                data[i].审核 = status
            }
            newDate.push(data[i])
        }
        writeCompetition(newDate)
        let tip = ''
        switch (status) {
            case '1':
                tip = "审核通过"
                break;

            case '2':
                tip = "审核驳回"
                break;
        }
        res.send({
            code: 0,
            msg: tip,
            data: null
        })

    } catch (err) {
        res.send({
            code: 1,
            msg: "审核失败",
            data: null
        })
    }
}

//辅导员统计成果排名
sortStudent = async (req, res, next) => {
    try {
        let stu = await getStudent()
        let stuList = []
        let stuName = []
        for (let i = 0; i < stu.length; i++) {
            stuList[i] = stu[i].学号
            stuName[i] = stu[i].姓名
        }
        let paper = await getPaper()
        let competition = await getCompetition()
        let value = new Array(stuList.length)
        for (let i = 0; i < value.length; i++) {
            value[i] = 0
        }
        for (let j = 0; j < stuList.length; j++) {
            for (let i = 0; i < paper.num; i++) {
                if (stuList[j] == paper.data[i].学号)
                    value[j] += 1
            }
        }
        for (let j = 0; j < stuList.length; j++) {
            for (let i = 0; i < competition.num; i++) {
                if (stuList[j] == competition.data[i].学号)
                    value[j] += 1
            }
        }

        //创建单链表
        let list = await CreateList(value, stuList, stuName)
        //快速排序
        let alsort = await sortList(list)
        //遍历链表
        let display = await displayList(alsort)
        res.send({
            code: 0,
            msg: "查看成功",
            data: display
        })
    } catch (err) {
        console.log(err)
        res.send({
            code: 1,
            msg: "查看失败",
            data: null
        })
    }
}

//辅导员获取学生列表
studentList = async (req, res, next) => {
    try {
        res.send({
            code: 0,
            msg: "获取成功",
            data: await getStudent()
        })
    } catch (err) {
        res.send({
            code: 1,
            msg: "获取失败",
            data: null
        })
    }
}

module.exports = {
    addPaper, addCompetition, checkPaper, checkCompetition, sortStudent, studentList
}