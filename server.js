var express = require('express');
var app = express();
var query = require('./server/dbConn.js');
var mysql=require("mysql");

//登陆鉴权
app.get('/checkAuth',function(req,res){
  var nickname =  req.query.nickname;
  //查询数据库，然后返回userId,type
  var sql = "select userId,type from user where nickname = "+ mysql.escape(nickname)+";";
  query(sql,function(err,vals,fields) {
    if(vals.length==0){
      res.send({type:-1,userId:-1});
    }else{
      res.send(vals);
    }
  });
})
//输入邀请码，登陆
app.get('/login',function(req,res){
  var nickname = req.query.nickname,code = req.query.code;
  //查询数据库，然后返回userId,type
  var sql = "select * from invite where code = "+ mysql.escape(code)+";";
  query(sql,function(err,vals,fields) {
    if(vals.length==0){
      res.send({type:-1,userId:-1});
    }else{
      var type = 2;
      sql = "delete from invite where code = "+mysql.escape(code)+";"+
      "insert into user(username,type) values("+mysql.escape(username)+","+mysql.escape(type)+");"+
      "select userId,type from user where username = "+mysql.escape(username)+";";
      query(sql,function(err,vals,fields){
        res.send(vals);
      })
    }
  });
})

app.get('/bookSearch',function(req,res){
  var userId = req.query.userId,bookName = req.query.bookName,searchType=req.query.searchType,sql = "";
  if(searchType == "all"){
    sql = "select * from book where bookName = "+mysql.escape(bookName)+" and userId != "+mysql.escape(userId)+" and state = 2;";
  }else{
    //own
    sql = "select * from book where bookName = "+mysql.escape(bookName)+" and userId = "+mysql.escape(userId)+";";
  }
  query(sql,function(err,vals,fields){
    res.send({success:true,bookList:vals});
  })
})
app.get('/addCart',function(req,res){
  var userId = req.query.userId,bookId = req.query.bookId,sql = "";
  sql = "insert into bookCart(userId,bookId) values("+mysql.escape(userId)+","+mysql.escape(bookId)+");"
  query(sql,function(err,vals,fields){
    res.send({success:true})
  })
})
app.get('/borrowBooks',function(req,res){
  var userId = req.query.userId, searchType = req.query.searchType,sql = "";
  if(searchType == "in"){
    //借入
    sql = "select * from orderTable where userId = "+mysql.escape(userId)+" order by time desc;";
    var results=[];
    query(sql,function(err,vals,fields){
      var temp = {};
      vals.forEach(function(val){
        temp.id = val.orderId;
        temp.time = val.time;
        sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where orderId = "+val.orderId+" and bookOrder.bookId = book.bookId and orderState = 1;";
        query(sql,function(err,vals,fields){
          temp.bookList = vals;
          results.push(temp);
        })
      })
      res.send({orderList:results});
    })
  }else{
    //借出
    sql = "select * from orderTable order by time desc;";
    var results=[];
    query(sql,function(err,vals,fields){
      var temp = {};
      vals.forEach(function(val){
        var time = val.time,orderId = val.orderId;
        sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.orderId = "+orderId+" and bookOrder.bookId = book.bookId and book.userId = "+mysql.escape(userId)+" and orderState = 1;";
        query(sql,function(err,vals,fields){
          results.push({id:orderId,time:time,bookList:vals});
        })
      })
      res.send({orderList:results});
    })
  }
})
app.get('/returnBooks',function(req,res){
  var userId = req.query.userId, searchType = req.query.searchType,sql = "";
  if(searchType == "in"){
    //归还借入
    sql = "select * from orderTable where userId = "+mysql.escape(userId)+" order by time desc;";
    var results=[];
    query(sql,function(err,vals,fields){
      vals.forEach(function(val){
        var time = val.time;
        sql = "select mailNumberReturn from bookOrder where orderId = "+val.orderId+" and orderState = 2;";
        query(sql,function(err,vals,fields){
          vals.forEach(function(val){
            var temp = {};
            temp.time = time;
            temp.id = val.mailNumberReturn;
            sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.mailNumberReturn="+val.mailNumberReturn+
            " and bookOrder.bookId = book.bookId;";
            query(sql,function(err,vals,fields){
              temp.bookList = vals;
              results.push(temp);
            })
          })
        })
      })
      res.send({orderList:results});
    })
  }else{
    //归还借出
    sql = "select * from orderTable order by time desc;";
    var results=[];
    query(sql,function(err,vals,fields){
      vals.forEach(function(val){
        var time = val.time;
        sql = "select mailNumberReturn from bookOrder where orderId = "+val.orderId+" and orderState = 2;";
        query(sql,function(err,vals,fields){
          vals.forEach(function(val){
            var temp = {};
            temp.time = time;
            temp.id = val.mailNumberReturn;
            sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.mailNumberReturn="+val.mailNumberReturn+
            " and book.userId = "+mysql.escape(userId)+" and bookOrder.bookId = book.bookId;";
            query(sql,function(err,vals,fields){
              temp.bookList = vals;
              results.push(temp);
            })
          })
        })
      })
      res.send({orderList:results});
    })
  }
})
app.get('/historyBooks',function(req,res){
  var userId = req.query.userId, searchType = req.query.searchType,sql = "";
  if(searchType == "in"){
    //借入的历史记录
    sql = "select * from orderTable where userId = "+mysql.escape(userId)+" order by time desc;";
    var results=[];
    query(sql,function(err,vals,fields){
      var temp = {};
      vals.forEach(function(val){
        temp.id = val.orderId;
        temp.time = val.time;
        sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where orderId = "+val.orderId+" and bookOrder.bookId = book.bookId and orderState = 3;";
        query(sql,function(err,vals,fields){
          temp.bookList = vals;
          results.push(temp);
        })
      })
      res.send({orderList:results});
    })
  }else{
    //借出的历史记录
    sql = "select * from orderTable order by time desc;";
    var results=[];
    query(sql,function(err,vals,fields){
      var temp = {};
      vals.forEach(function(val){
        var time = val.time,orderId = val.orderId;
        sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.orderId = "+orderId+
        " and bookOrder.bookId = book.bookId and book.userId = "+mysql.escape(userId)+
        " and orderState = 2;";
        query(sql,function(err,vals,fields){
          results.push({id:orderId,time:time,bookList:vals});
        })
      })
      res.send({orderList:results});
    })
  }
})
app.get('/getOrderAddress',function(req,res){
  var bookOrderId = req.query.bookOrderId, type = req.query.insertType,sql = "";
  if(type="寄回"){
    //返回书籍所有者的地址
    sql = "select address.* from address,book,bookOrder where bookOrder.bookOrderId = "+mysql.escape(bookOrderId)+
    " bookOrder.bookId = book.bookId and book.userId = address.userId and address.default = 1;"
    query(sql,function(err,vals,fields){
      results.push({success:true,info:vals});
    })
  }else{
    //返回书籍借阅者的地址
    sql = "select address.* from address,bookOrder,orderTable where bookOrder.bookOrderId = "+mysql.escape(bookOrderId)+
    " bookOrder.orderId = orderTable.orderId and orderTable.addressId = address.addressId;"
    query(sql,function(err,vals,fields){
      results.push({success:true,info:vals});
    })
  }
})
app.get('/isExist',function(req,res){
  var mailNumber = req.query.mailNumber,bookOrderId = req.query.bookOrderId,
  type = req.query.insertType;
  var ExpressSearch = require('./server/express.js');
  var search = new ExpressSearch();
  var promise = search.isExist({"LogisticCode":mailNumber});
  promise.then(function(response){
     //获取ShipperCode，ShipperName,存在时直接提交
     var shipper = response,sql = "";
     if(type="寄回"){
       // 插入对应bookId和userId 的位置
       sql = "update bookOrder set mailNumberReturn = "+mysql.escape(mailNumber)+",shipperCodeReturn = "+
       shipper.ShipperCode+",orderState = 2 where bookOrderId = "+mysql.escape(bookOrderId)+";";
       query(sql,function(err,vals,fields){
         res.send({isExist:true,Shipper:response})
       })
     }else{
       //借出
       sql = "update bookOrder set mailNumber = "+mysql.escape(mailNumber)+",shipperCode = "+
       shipper.ShipperCode+",orderState = 1 where bookOrderId = "+mysql.escape(bookOrderId)+";";
       query(sql,function(err,vals,fields){
         res.send({isExist:true,Shipper:response})
       })
     }
  }).catch(function(){
     res.send({isExist:false});
  });
})
app.get('/getExpress',function(req,res){
  var mailNumber = req.query.mailNumber,shipperCode = req.query.shipperCode;
  var ExpressSearch = require('./server/express.js');
  var search = new ExpressSearch();
  var promise = search.trace({"LogisticCode":mailNumber,"OrderCode": "","ShipperCode": shipperCode});
  promise.then(function(data){
     res.send(data);
  }).catch(function(data){
     res.send(data);
  });
})
app.get('/getOrderDetail',function(req,res){
  //先按orderId查到所有关联的书籍，然后将书籍按照运单号分类
  var orderId = req.query.orderId,sql = "",orderStateList = ['待借出','借出','寄回','已完成'];
  sql = "select orderState,mailNumber from bookOrder where orderId = "+mysql.escape(orderId)+";";
  query(sql,function(err,vals,fields){
    var datalist = vals,results = [];
    mailNumberList.forEach(function(val){
      var mailNumber = val.mailNumber, orderState = val.orderState;
      sql = "select book.* from bookOrder,book where bookOrder.mailNumber = "+mailNumber+
      " and bookOrder.bookId = book.bookId;";
      query(sql,function(err,vals,fields){
        results.push({mailNumber:mailNumber,status:orderStateList[orderState],book:vals});
      })
    })
    res.send({success:true,bookList:results});
  })
})
app.get('/getMailDetail',function(req,res){
  //直接按照运单号查询，返回对应信息
  var mailNumber = req.query.mailNumber,results=[];
  sql = "select book.* from bookOrder,book where bookOrder.mailNumberReturn = "+
  mysql.escape(mailNumber)+" and bookOrder.bookId = book.bookId;";
  query(sql,function(err,vals,fields){
    res.send({success:true,bookList:results});
  })
})
app.get('/getHistoryDetail',function(req,res){
  var bookOrderId = req.query.bookOrderId;
  sql = "select book.* from bookOrder,book where bookOrder.bookOrderId = "+
  mysql.escape(bookOrderId)+" and bookOrder.bookId = book.bookId;";
  query(sql,function(err,vals,fields){
    res.send({success:true,bookList:results});
  })
})
app.get('getCart',function(req,res){
  var userId = req.query.userId,sql = "";
  sql = "select book.*, user.nickname from bookCart,book,user where bookCart.userId = "+mysql.escape(userId)+" and book.bookId = bookCart.bookId and book.userId = userId;";
  query(sql,function(err,vals,fields){
    res.send({success:true,books:vals});
  })
})
app.get('/getDefaultAddress',function(req,res){
  var userId = req.query.userId;
  sql = "select * from address where userId = "+mysql.escape(userId)+" and default = 1;";
  query(sql,function(err,vals,fields){
    res.send({success:true,address:vals})
  })
})
app.get('/submitOrders',function(req,res){
  var userId = req.query.userId, bookIdList = req.query.bookIdList, addressId = req.query.addressId, sql = "";
  var factory = require('./server/uuid.js');
  var currentTime = moment().local().format("YYYY-MM-DD HH:mm:ss");
	for(let i = 0; i < bookIdList.length; i++){
		let uid = factory.uuid(9,10);
    sql += "insert into orderTable(orderId,userId,time,addressId) values("+uid+","+mysql.escape(userId)+","+currentTime+","+addressId+");";
    sql += "insert into bookOrder(bookId,orderId,orderState) values("+mysql.escape(bookIdList[i])+","+uid+","+"0"+");";
    sql += "update book set state = 0  where bookId = "+mysql.escape(bookIdList[i])+";";
    sql += "delete from bookCart where userId = "+mysql.escape(userId)+" and bookId = "+mysql.escape(bookIdList[i])+";";
  }
  query(sql,function(err,vals,fields){
      res.send({success:true});
  });
})
app.get('/deleteBooks',function(req,res){
  var userId = req.query.userId, bookId = req.query.bookId,sql = "";
  sql = "delete from book where bookId = "+ mysql.escape(bookId)+" and userId = "+ mysql.escape(userId) +";";
  query(sql,function(err,vals,fields){
    res.send({success:true});
  })
})
app.get('/getOwnBooks',function(req,res){
  var userId = req.query.userId,sql = "";
  sql = "select * from book where userId = "+ mysql.escape(userId) +";";
  query(sql,function(err,vals,fields){
    res.send({success:true,bookList:vals});
  })
})
app.get('/getOwnAddress',function(req,res){
  var userId = req.query.userId,sql = "";
  sql = "select * from address where userId = "+ mysql.escape(userId) +";";
  query(sql,function(err,vals,fields){
    res.send({success:true,address:vals});
  })
})
app.get('/changeDefaultAddress',function(req,res){
  var userId = req.query.userId, prevId = req.query.prevIndex,curId = req.query.curIndex,sql = "";
  sql = "update address set default = 0  where addressId = "+mysql.escape(prevId)+";";
  sql += "update address set default = 1 where addressId = "+mysql.escape(curId)+";";
  query(sql,function(err,vals,fields){
    res.send({success:true});
  })
})
app.get('/deleteOwnAddress',function(req,res){
  var userId = req.query.userId, addressId = req.query.addressId,sql = "";
  sql = "delete from address where userId = "+mysql.escape(userId)+" and addressId = "+mysql.escape(addressId)+";";
  query(sql,function(err,vals,fields){
    res.send({success:true});
  })
})
app.get('/addAddress',function(req,res){
  var userId = req.query.userId, newAddress = JSON.parse(req.query.newAddress), sql = "";
  var factory = require('./server/uuid.js');
  var uid = factory.uuid(9,10);
  var username = newAddress.userName, provinceName = newAddress.provinceName,
  postalCode = newAddress.postalCode, cityName = newAddress.cityName, countyName = newAddress.countyName,
  detailInfo = newAddress.detailInfo, nationalCode = newAddress.nationalCode, telNumber = newAddress.telNumber,isDefault = newAddress.isDefault;
  sql = "insert into address(addressId,userId,username,provinceName,postalCode,cityName,countyName,detailInfo,nationalCode,telNumber,isDefault) values("+
  mysql.escape(uid)+","+mysql.escape(userId)+","+mysql.escape(username)+","+mysql.escape(provinceName)+","+mysql.escape(postalCode)+","+mysql.escape(cityName)+
  ","+mysql.escape(countyName)+","+mysql.escape(detailInfo)+","+mysql.escape(nationalCode)+","+mysql.escape(telNumber)+","+mysql.escape(isDefault)+");"
  query(sql,function(err,vals,fields){
    res.send({success:true,addressId:uid});
  })
})
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
app.listen(3000);
