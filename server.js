var express = require('express');
var app = express();

app.get('/getExpress',function(req,res){
  //var mailNumber = req.requery.mailNumber;
  //API测试地址：http://testapi.kdniao.cc:8081/Ebusiness/EbusinessOrderHandle.aspx
  //API正式地址：http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx
  // var ExpressSearch = require('./server/express.js');
  // var search = new ExpressSearch();
  // var promise = search.isExist({"LogisticCode":"1000745320654"});
  // promise.then(function(){
  //    res.send("ok");
  // }).catch(function(){
  //    res.send("bad");
  //});
  var ExpressSearch = require('./server/express.js');
  var search = new ExpressSearch();
  var promise = search.trace({"LogisticCode":"1000745320654","OrderCode": "","ShipperCode": "YD",});
  promise.then(function(data){
     res.send(data);
  }).catch(function(){
     res.send("bad");
  });
})
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
app.listen(3000);
