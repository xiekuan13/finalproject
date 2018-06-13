const express = require('express')
const app = express()

app.get('/todolist.html', function (req, res) {
  res.sendFile(__dirname+"/todolist.html")
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})