import { list } from 'pm2';

const express = require('express')
const app = express()

var lists = [];
var JSONlists = "";
var count = 0;

class Item{
  constructor(id, content) {
    this.id = id;
    this.content = content || 'null';
  }
}

function toJSON(temp) {
  if(temp != undefined || arguments.length > 0) {
    tempLists = temp;
  }
  else {
    tempLists = lists;
  }
  JSONlists = "[";
  tempLists.forEach((item, index) => {
    JSONlists += "{";
    JSONlists += "id:'" + item.id + "',content:'" + item.content;
    JSONlists += "'},";
  });
  if(JSONlists.length > 1) {
    JSONlists = JSONlists.substring(0, JSONlists.length - 1);
  }
  JSONlists += "]";
}

function addItem(content) {
  var temp = new Item(count, content);
  lists.push(temp);
  count++;
}

function updateItem(id, content) {
  lists.forEach((item, index) => {
    if(item.id == id) {
      item.content = content;
      break;
    }
  });
}

app.get('/index', function (req, res) {
  res.sendFile(__dirname + "/pages/todolist.html");
})

app.get('/list', function (req, res) {
  toJSON();
  res.send(JSONlists);
})

app.get('/add', function (req, res) {
  addItem(req.body.content);
  toJSON();
  res.send(JSONlists);
})

app.get('/update', function (req, res) {
  var tempBody = req.body;
  updateItem(tempBody.id, tempBody.content);
  toJSON();
  res.send(JSONlists);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})