
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

function deleteItem(data){
  console.log(data);
  for(var i=0;i<lists.length;i++) {
    if(lists[i].id == data) {
      lists.splice(data,1);
    }
    break
  }
}

function updateItem(id, content) {
  lists.forEach((item, index) => {
    if(item.id == id) {
      item.content = content;
      break;
    }
  });
}

function search(sear_id){
  var res_lists = [];
  var count = 0;
  for(var i =0; i<lists.length; i++){
    if(lists[i].id == sear_id){
      res_lists[count] = lists[i];
      count++;
    }
  }
  return res_lists;
} 

app.get('/index', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.get('/list', function (req, res) {
  toJSON();
  res.send(JSONlists);
})

app.get('/add', function (req, res) {
  addItem(req.query.content);
  toJSON();
  res.send(JSONlists);
})

app.get('/delete', function (req, res) {
  deleteItem(req.query.id);
  toJSON();
  res.send(JSONlists);
})

app.get('/update', function (req, res) {
  var tempBody = req.query;
  updateItem(tempBody.id, tempBody.content);
  toJSON();
  res.send(JSONlists);
})

app.get('/search', function(req, res) {
  var search_id = req.query.id;
  var res_lists = search(search_id);
  toJSON(res_lists);
  res.send(JSONlists);
})

app.listen(9999, function () {
  console.log('Example app listening on port 3000!')
})
