const express = require('express');
const app = express();

//解决跨域
const cors = require("cors")
app.use(cors())

//post请求
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//引入路由
const commonRouter = require("./routes/common")
app.use("/common", commonRouter)
const counselorRouter = require("./routes/counselor")
app.use("/counselor", counselorRouter)
const studentRouter = require("./routes/student")
app.use("/student", studentRouter)

app.get("/", async (req, res, next) => {
    res.send({
        code: 0,
        data: "大学生课外科技活动成果管理系统",
        msg: "成功"
    })
})

let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://localhost:3000');
});