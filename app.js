import { list } from 'pm2';

const express = require('express')
const app = express()

function toJSON() {
  JSONlists = "[";
  lists.forEach((item, index) => {
    JSONlists += "{";
    JSONlists += "id:" + item.id + ",content:" + item.content;
    JSONlists += "},";
  });
  JSONlists = "]";
}

function deleteItem(){
  deleteID = req.body.id;
  for(var i=0;i<lists.length;i++) {
    if(lists[i].id == deleteID) {
      lists.splice(id,1);
    }
    break
  }
}

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname+"/todolist.html");
})

app.get('/delete', function (req, res) {
  deleteItem();
  toJSON();
  res.send(JSONlists);
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
})
