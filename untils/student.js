const fs = require('fs');
const path = require("path");

//查看学生列表
function getStudent() {
    return new Promise((res, rej) => {
        fs.readFile(path.join(__dirname, '../static/student.txt'), 'utf-8', function (err, data) {
            if (err) {
                throw err;
            }
            let arr = data.split("\r\n")
            let stu = []
            for (let i = 0; i < arr.length - 1; i++) {
                let stuObj = {}
                let newArr = arr[i].split(" ")
                stuObj.ID = newArr[0]
                stuObj.学号 = newArr[1]
                stuObj.姓名 = newArr[2]
                stuObj.密码 = newArr[3]
                stu.push(stuObj)
            }
            res(stu)
        });
    })
}

module.exports = {
    getStudent
}