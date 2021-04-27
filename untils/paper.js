const fs = require('fs');
const path = require("path");

//查看论文列表
function getPaper(sno) {
    return new Promise((res, rej) => {
        fs.readFile(path.join(__dirname, '../static/paper.txt'), 'utf-8', function (err, data) {
            if (err) {
                throw err;
            }
            let num = data.split("\n")
            fs.readFile(path.join(__dirname, '../static/paper_name.txt'), 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                let name = data.split(" ")
                let dataObj = []
                for (let j = 0; j < num.length - 1; j++) {
                    let Obj = {}
                    for (let i = 0; i < name.length; i++) {
                        Obj[name[i]] = num[j].split(" ")[i]
                    }
                    dataObj.push(Obj)
                }
                let dataNum = num.length - 1

                if (sno) {
                    let snoObj = []
                    for (let i = 0; i < dataObj.length; i++) {
                        if (dataObj[i].学号 == sno)
                            snoObj.push(dataObj[i])
                    }
                    dataObj = snoObj
                    dataNum = dataObj.length
                }

                res({
                    data: dataObj, num: dataNum,
                })
            });
        });
    })
}

//查看论文属性
function getPaperName() {
    return new Promise((res, rej) => {
        fs.readFile(path.join(__dirname, '../static/paper_name.txt'), 'utf-8', function (err, data) {
            if (err) {
                throw err;
            }
            let arr = data.split(" ")
            res({
                data: arr, num: arr.length
            })
        });
    })
}

//查看学号
async function getPaperSno(arr) {
    let name = await getPaperName()
    let data = arr.split(" ")
    let sno
    for (let i = 0; i < name.data.length; i++) {
        if (name.data[i] == "学号")
            sno = data[i - 1]
    }
    return sno
}

//重新写入文件
function writePaper(data) {
    let newData = []
    for (let i = 0; i < data.length; i++) {
        let arr = ''
        for (let key in data[i]) {
            arr += data[i][key]
            if (key != '审核')
                arr += " "
        }
        newData[i] = arr
    }
    let newArr = ''
    for (let i = 0; i < newData.length; i++) {
        newArr += newData[i] + '\n'
    }
    fs.writeFile(path.join(__dirname, '../static/paper.txt'), newArr, function (err) {
        if (err) {
            throw err;
        }
    });
}

module.exports = {
    getPaper, getPaperName, getPaperSno, writePaper
}