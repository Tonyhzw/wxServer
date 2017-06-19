var express = require('express');
var app = express();
var query = require('./server/dbConn.js');
var mysql = require("mysql");
var multer = require('multer')
var upload = multer();
var moment = require('moment');
app.use(express.static('uploads'));

//登陆鉴权
app.get('/checkAuth', function(req, res) {
    var nickname = req.query.nickname;
    //查询数据库，然后返回userId,type
    var sql = "select userId,type from user where nickname = " + mysql.escape(nickname) + ";";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({
              success:false
          });
        }else{
          if (vals.length == 0) {
              return res.json({
                  success:true,
                  type: -1,
                  userId: -1
              });
          } else {
              return res.json({success:true,type:vals[0].type,userId:vals[0].userId});
          }
        }
    });
})
//输入邀请码，登陆
app.get('/login', function(req, res) {
    var username = req.query.nickname,
        code = req.query.code;
    sql = "call login(" + mysql.escape(username) + "," + mysql.escape(code) + ",@type,@userId);select @type,@userId;";
    query(sql, function(err, vals, fields) {
        /*
        [okPacket{},[RowDataPacket{}]]
        */
        if(err){
          return res.json({
            success:false
          })
        }else{
          var results = vals[1][0];
          return res.json({
              success:true,
              userId: results["@userId"],
              type: results["@type"]
          });
        }
    })
})

app.get('/bookSearch', function(req, res) {
    var userId = req.query.userId,
        bookName = req.query.bookName,
        searchType = req.query.searchType,
        sql = "";
    if (searchType == "all") {
        if (bookName == "") {
            sql = "select * from book where userId != " + mysql.escape(userId) + " and state = 2;";
        } else {
            sql = "select * from book where bookName like '%" + bookName + "%' and userId != " + mysql.escape(userId);
        }
    } else {
        //own
        if (bookName == "") {
            sql = "select * from book where userId = " + mysql.escape(userId) + ";";
        } else {
            sql = "select * from book where bookName like '%" + bookName + "%' and userId = " + mysql.escape(userId) + ";";
        }
    }
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({
            success:false
          });
        }else{
          return res.json({
              success: true,
              bookList: vals
          });
        }
    })
})
app.get('/addCart', function(req, res) {
    var userId = req.query.userId,
        bookId = req.query.bookId,
        sql = "";
    sql = "call addCart(" + mysql.escape(userId) + "," + mysql.escape(bookId) + ",@success);select @success;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: vals[1][0]["@success"]
          })
        }
    })
})
app.get('/borrowBooks', function(req, res) {
    var userId = req.query.userId,
        searchType = req.query.searchType,
        sql = "";
    if (searchType == "in") {
        //借入
        sql = "select * from orderTable where userId = " + mysql.escape(userId) + " order by time desc;";
        var results = [];
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              if(vals.length==0){
                return res.json({
                    success:true,
                    orderList: results
                })
              }else{
                var promiseArr=[];
                vals.forEach(function(val, index) {
                    var temp = {};
                    temp.orderId = val.orderId;
                    temp.time = moment(val.time).format("YYYY-MM-DD HH:mm:ss");
                    sql = "select bookOrder.bookOrderId,book.* from bookOrder, book where bookOrder.orderId = "+
                    mysql.escape(val.orderId) + " and bookOrder.bookId = book.bookId and (bookOrder.orderState = 0 or bookOrder.orderState = 1);";
                    promiseArr.push(new Promise(function(resolve,reject){
                      query(sql, function(err, vals2, fields) {
                          if(err){
                              reject();
                          }else{
                              temp.bookList = vals2;
                              if(vals2.length>0) resolve(temp);
                              else resolve();
                          }
                      })
                    }))
                })
                Promise.all(promiseArr).then(function(vals){
                    return res.json({
                      success:true,
                      orderList: vals
                    });
                  }).catch(function(){
                    return res.json({
                      success:false
                    });
                })
              }
            }
        })
    } else {
        //借出
        sql = "select * from orderTable where userId != " + mysql.escape(userId) + " order by time desc;";
        var results = [];
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false})
            }else{
              if(vals.length==0){
                return res.json({
                    success:true,
                    orderList: results
                });
              }else{
                var promiseArr =[];
                vals.forEach(function(val, index) {
                    var temp = {};
                    temp.time = moment(val.time).format("YYYY-MM-DD HH:mm:ss"), temp.orderId = val.orderId;
                    sql = "select bookOrder.bookOrderId,book.* from bookOrder, book where bookOrder.orderId = "+
                    mysql.escape(val.orderId) + " and bookOrder.bookId = book.bookId and book.userId = " + mysql.escape(userId)+
                    " and (bookOrder.orderState = 0 or bookOrder.orderState = 1);";
                    promiseArr.push(new Promise(function(resolve,reject){
                      query(sql, function(err, vals2, fields) {
                        if(err){
                          reject();
                        }else{
                          temp.bookList = vals2;
                          //若当前为空时
                          if (vals2.length>0) resolve(temp);
                          else resolve(temp);
                        }
                      })
                   }))
                })
                Promise.all(promiseArr).then(function(vals){
                  return res.json({
                      success:true,
                      orderList: vals
                  });
                }).catch(function(){
                  return res.json({
                      success:false
                  });
                });
              }
            }
        })
    }
})
app.get('/returnBooks', function(req, res) {
    var userId = req.query.userId,
        searchType = req.query.searchType,
        sql = "";
    if (searchType == "in") {
        //归还借入
        sql = "select * from orderTable where userId = " + mysql.escape(userId) + " order by time desc;";
        var results = [];
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              if (vals.length == 0) {
                  return res.json({
                      success:true,
                      orderList: results
                  });
              } else {
                  var promiseArr = [];
                  vals.forEach(function(val, index) {
                      var time = moment(val.time).format("YYYY-MM-DD HH:mm:ss");
                      sql = "select mailNumberReturn from bookOrder where orderId = " + mysql.escape(val.orderId) + " and orderState = 2;";
                      promiseArr.push(new Promise(function(resolve,reject){
                        query(sql, function(err, vals1, fields) {
                            if(err){
                              reject();
                            }else{
                              var promiseArr2 =[];
                              vals1.forEach(function(val, idx) {
                                  var temp = {};
                                  temp.time = time;
                                  temp.orderId = val.mailNumberReturn;
                                  sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.mailNumberReturn=" + mysql.escape(val.mailNumberReturn) +
                                      " and bookOrder.bookId = book.bookId;";
                                  promiseArr2.push(new Promise(function(resolve,reject){
                                      query(sql, function(err, vals2, fields) {
                                          if(err){
                                            reject();
                                          }else{
                                            temp.bookList = vals2;
                                            //若当前为空时
                                            if (vals2.length>0) resolve(temp);
                                            else resolve();
                                         }
                                      })
                                  }))
                              })
                              Promise.all(promiseArr2).then(function(vals){
                                resolve(vals);
                              }).catch(function(){
                                reject();
                              });
                            }
                        })
                      }))
                  })
                  Promise.all(promiseArr).then(function(vals){
                    return res.json({
                        success:true,
                        orderList: vals
                    });
                  }).catch(function(){
                    return res.json({
                        success:false
                    });
                  })
              }
            }
        })
    } else {
        //归还借出
        sql = "select * from orderTable order by time desc;";
        var results = [];
        query(sql, function(err, vals, fields) {
            if(err){
               return res.json({success:false});
            }else{
              if (vals.length == 0) {
                  return res.json({
                      success:true,
                      orderList: results
                  });
              } else {
                  var promiseArr=[];
                  vals.forEach(function(val, index) {
                      var time = moment(val.time).format("YYYY-MM-DD HH:mm:ss");
                      sql = "select mailNumberReturn from bookOrder where orderId = " + mysql.escape(val.orderId) + " and orderState = 2;";
                      promiseArr.push(new Promise(function(resolve,reject){
                        query(sql, function(err, vals1, fields) {
                            if(err){
                              reject();
                            }else{
                              var promiseArr2=[];
                              vals1.forEach(function(val, idx) {
                                  var temp = {};
                                  temp.time = time;
                                  temp.orderId = val.mailNumberReturn;
                                  sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.mailNumberReturn=" + mysql.escape(val.mailNumberReturn) +
                                      " and book.userId = " + mysql.escape(userId) + " and bookOrder.bookId = book.bookId;";
                                  promiseArr2.push(new Promise(function(resolve,reject){
                                    query(sql, function(err, vals2, fields) {
                                        if(err){
                                          reject();
                                        }else{
                                          temp.bookList = vals2;
                                          //若当前为空时
                                          if (vals2.length>0) resolve(temp);
                                          else resolve();
                                        }
                                    })
                                  }))
                              })
                              Promise.all(promiseArr2).then(function(vals){
                                resolve(vals);
                              }).catch(function(){
                                reject();
                              });
                            }
                        })
                      }))
                  })
                  Promise.all(promiseArr).then(function(vals){
                    return res.json({
                        success:true,
                        orderList: vals
                    });
                  }).catch(function(){
                    return res.json({
                        success:false
                    });
                  });
              }
            }
        })
    }
})
app.get('/successReturn', function(req, res) {
    var bookOrderId = req.query.bookOrderId,
        sql = "";
    sql = "call successReturn(" + mysql.escape(bookOrderId) + ",@success);select @success;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: vals[1][0]["@success"]
          });
        }
    })
})
app.get('/historyBooks', function(req, res) {
    var userId = req.query.userId,
        searchType = req.query.searchType,
        sql = "";
    if (searchType == "in") {
        //借入的历史记录
        sql = "select * from orderTable where userId = " + mysql.escape(userId) + " order by time desc;";
        var results = [];
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              var temp = {};
              if (vals.length == 0) {
                  return res.json({
                      success:true,
                      orderList: results
                  });
              } else {
                  var promiseArr=[];
                  vals.forEach(function(val, index) {
                      temp.orderId = val.orderId;
                      temp.time = moment(val.time).format("YYYY-MM-DD HH:mm:ss");
                      sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where orderId = " + val.orderId + " and bookOrder.bookId = book.bookId and orderState = 3;";
                      promiseArr.push(new Promise(function(resolve,reject){
                        query(sql, function(err, vals2, fields) {
                            if(err){
                              reject();
                            }else{
                              temp.bookList = vals;
                              //若当前为空时
                              if (vals2.length>0) resolve(temp);
                              else resolve();
                            }
                        })
                      }))
                  })
                  Promise.all(promiseArr).then(function(vals){
                    return res.json({
                        success:true,
                        orderList: vals
                    });
                  }).catch(function(){
                    return res.json({
                        success:false
                    });
                  });
              }
            }
        })
    } else {
        //借出的历史记录
        sql = "select * from orderTable order by time desc;";
        var results = [];
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              var temp = {};
              if (vals.length == 0) {
                  return res.json({
                      success:true,
                      orderList: results
                  });
              } else {
                  var promiseArr=[];
                  vals.forEach(function(val, index) {
                      temp.time = moment(val.time).format("YYYY-MM-DD HH:mm:ss"), temp.orderId = val.orderId;
                      sql = "select bookOrder.bookOrderId,book.* from bookOrder join book where bookOrder.orderId = " + val.orderId +
                          " and bookOrder.bookId = book.bookId and book.userId = " + mysql.escape(userId) +
                          " and orderState = 3;";
                      promiseArr.push(new Promise(function(resolve,reject){
                        query(sql, function(err, vals2, fields) {
                            if(err){
                              reject();
                            }else{
                              temp.bookList = vals2;
                              //若当前为空时
                              if (vals2.length>0) resolve(temp);
                              else resolve();
                            }
                        })
                      }))
                  })
                  Promise.all(promiseArr).then(function(vals){
                    return res.json({
                        success:true,
                        orderList: vals
                    });
                  }).catch(function(){
                    return res.json({
                        success:false
                    });
                  });
              }
            }
        })
    }
})
app.get('/getOrderAddress', function(req, res) {
    var bookOrderId = req.query.bookOrderId,
        type = req.query.insertType,
        sql = "";
    if (type == "寄回") {
        //返回书籍所有者的地址
        sql = "select address.* from address,book,bookOrder where bookOrder.bookOrderId = " + mysql.escape(bookOrderId) +
            " and bookOrder.bookId = book.bookId and book.userId = address.userId and address.isDefault = 1;"
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              return res.json({
                  success: true,
                  info: vals
              });
            }
        })
    } else {
        //返回书籍借阅者的地址
        sql = "select address.* from address,bookOrder,orderTable where bookOrder.bookOrderId = " + mysql.escape(bookOrderId) +
            " and bookOrder.orderId = orderTable.orderId and orderTable.addressId = address.addressId;"
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              return res.json({
                  success: true,
                  info: vals
              });
            }
        })
    }
})
app.get('/isExist', function(req, res) {
    var mailNumber = req.query.mailNumber,
        bookOrderId = req.query.bookOrderId,
        type = req.query.insertType;
    var ExpressSearch = require('./server/express.js');
    var search = new ExpressSearch();
    var promise = search.isExist({
        "LogisticCode": mailNumber
    });
    promise.then(function(response) {
        //获取ShipperCode，ShipperName,存在时直接提交
        var shipper = response,
            sql = "";
        if (type == "寄回") {
            // 插入对应bookId和userId 的位置
            sql = "call writeMailNumber(1," + mysql.escape(mailNumber) + "," + mysql.escape(bookOrderId) + "," + mysql.escape(shipper.ShipperCode) + ",@success);select @success;";
        } else {
            //借出
            sql = "call writeMailNumber(0," + mysql.escape(mailNumber) + "," + mysql.escape(bookOrderId) + "," + mysql.escape(shipper.ShipperCode) + ",@success);select @success;";
        }
        query(sql, function(err, vals, fields) {
            if(err){
              return res.json({success:false});
            }else{
              return res.json({
                  success: true,
                  isExist: vals[1][0]["@success"],
                  Shipper: response
              })
            }
        })
    }).catch(function() {
        return res.json({
            success:true,
            isExist: false
        });
    });
})
app.get('/getExpress', function(req, res) {
    var mailNumber = req.query.mailNumber,
        shipperCode = req.query.shipperCode;
    var ExpressSearch = require('./server/express.js');
    var search = new ExpressSearch();
    var promise = search.trace({
        "LogisticCode": mailNumber,
        "OrderCode": "",
        "ShipperCode": shipperCode
    });
    promise.then(function(data) {
        return res.json(data);
    }).catch(function(data) {
        return res.json(data);
    });
})
app.get('/getOrderDetail', function(req, res) {
    //先按orderId查到所有关联的书籍，然后将书籍按照运单号分类
    var orderId = req.query.orderId,
        sql = "",
        orderStateList = ['待借出', '借出', '寄回', '已完成'];
    sql = "select bookOrder.bookOrderId,bookOrder.orderState,bookOrder.mailNumber,bookOrder.shipperCode,orderTable.userId from bookOrder,orderTable where bookOrder.orderId = " + mysql.escape(orderId) + " and orderTable.orderId = " + mysql.escape(orderId) + ";";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          var datalist = vals,
              results = [];
          if (datalist.length == 0) {
              return res.send({
                  success: true,
                  bookList: results
              });
          } else {
              var promiseArr=[];
              datalist.forEach(function(val, index) {
                  var mailNumber = val.mailNumber,
                      bookOrderId = val.bookOrderId,
                      orderState = val.orderState,
                      shipperCode = val.shipperCode,
                      userId = val.userId;
                  sql = "select bookOrder.bookOrderId,book.* from bookOrder,book where bookOrder.bookOrderId = " + mysql.escape(bookOrderId) +
                      " and bookOrder.bookId = book.bookId;";
                  promiseArr.push(new Promise(function(resolve,reject){
                    query(sql, function(err, vals, fields) {
                        if(err){
                          reject();
                        }else{
                          resolve({
                              userId: userId,
                              mailNumber: mailNumber,
                              shipperCode: shipperCode,
                              status: orderStateList[orderState],
                              book: vals
                          });
                        }
                    })
                  }))
              })
              Promise.all(promiseArr).then(function(vals){
                return res.json({
                    success: true,
                    bookList: vals
                });
              }).catch(function(){
                return res.json({
                    success: false
                });
              });
          }
        }
    })
})
app.get('/getMailDetail', function(req, res) {
    //直接按照运单号查询，返回对应信息
    var mailNumber = req.query.mailNumber,
        results = [];
    sql = "select book.*,bookOrder.mailNumber,bookOrder.shipperCode,bookOrder.shipperCodeReturn from bookOrder,book where bookOrder.mailNumberReturn = " +
        mysql.escape(mailNumber) + " and bookOrder.bookId = book.bookId;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          var books = [];
          vals.forEach(function(val) {
              books.push({
                  bookId: val.bookId,
                  bookName: val.bookName,
                  brefInfo: val.brefInfo,
                  imgUrl: val.imgUrl,
                  state: val.state
              });
          })
          var results = [{
              mailNumber: vals.mailNumber,
              shipperCode: vals.shipperCode,
              shipperCodeReturn: vals.shipperCodeReturn,
              status: '寄回',
              book: books
          }];
          return res.json({
              success: true,
              bookList: results
          });
        }
    })
})
app.get('/getHistoryDetail', function(req, res) {
    var bookOrderId = req.query.bookOrderId;
    sql = "select book.*,bookOrder.mailNumber,bookOrder.shipperCode,bookOrder.mailNumberReturn,bookOrder.shipperCodeReturn from bookOrder,book where bookOrder.bookOrderId = " +
        mysql.escape(bookOrderId) + " and bookOrder.bookId = book.bookId;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          var books = [];
          vals.forEach(function(val) {
              books.push({
                  bookId: val.bookId,
                  bookName: val.bookName,
                  brefInfo: val.brefInfo,
                  imgUrl: val.imgUrl,
                  state: val.state
              });
          })
          var results = [{
              mailNumber: vals.mailNumber,
              shipperCodeReturn: vals.shipperCodeReturn,
              shipperCode: vals.shipperCode,
              status: '已完成',
              book: books
          }];
          return res.json({
              success: true,
              bookList: results
          });
        }
    })
})
app.get('/getCart', function(req, res) {
    var userId = req.query.userId,
        sql = "";
    sql = "select book.*, user.nickname from bookCart,book,user where bookCart.userId = " + mysql.escape(userId) + " and book.bookId = bookCart.bookId and book.userId = user.userId;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: true,
              books: vals
          });
        }
    })
})
app.get('/getDefaultAddress', function(req, res) {
    var userId = req.query.userId;
    sql = "select * from address where userId = " + mysql.escape(userId) + " and isDefault = 1;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: true,
              address: vals
          })
        }
    })
})
app.get('/submitOrders', function(req, res) {
    var userId = req.query.userId,
        bookIdList = JSON.parse(req.query.bookIdList),
        addressId = req.query.addressId,
        sql = "";
    var factory = require('./server/uuid.js');
    var currentTime = moment().local().format("YYYY-MM-DD HH:mm:ss"),
        count = 0,promiseArr=[];
    for (let i = 0; i < bookIdList.length; i++) {
        let uid = factory.uuid(9, 10);
        sql = "call submitOrder(" + mysql.escape(userId) + "," + mysql.escape(addressId) + "," + mysql.escape(currentTime) + "," + mysql.escape(bookIdList[i]) +
            "," + mysql.escape(uid) + ",@success);select @success;";
        promiseArr.push(new Promise(function(resolve,reject){
          query(sql, function(err, vals, fields) {
              if(err) reject();
              else resolve();
          });
        }))
    }
    Promise.all(promiseArr).then(function(){
      return res.json({
          success: true
      });
    }).catch(function(){
      return res.json({
          success: false
      });
    });
})
app.get('/deleteBooks', function(req, res) {
    var userId = req.query.userId,
        bookId = req.query.bookId,
        sql = "";
    sql = "delete from book where bookId = " + mysql.escape(bookId) + " and userId = " + mysql.escape(userId) + ";";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: true
          });
        }
    })
})
app.get('/getOwnBooks', function(req, res) {
    var userId = req.query.userId,
        sql = "";
    sql = "select * from book where userId = " + mysql.escape(userId) + ";";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else {
          return res.json({
              success: true,
              bookList: vals
          });
        }
    })
})
app.get('/getOwnAddress', function(req, res) {
    var userId = req.query.userId,
        sql = "";
    sql = "select * from address where userId = " + mysql.escape(userId) + ";";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({
            success:false
          })
        }else {
          return res.json({
              success: true,
              address: vals
          });
        }
    })
})
app.get('/changeDefaultAddress', function(req, res) {
    var userId = req.query.userId,
        prevId = req.query.prevIndex,
        curId = req.query.curIndex,
        sql = "";
    sql = "call changeDefaultAddress(" + mysql.escape(userId) + "," + mysql.escape(prevId) + "," + mysql.escape(curId) + ",@success);select @success;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: vals[1][0]["@success"]
          });
        }
    })
})
app.get('/deleteOwnAddress', function(req, res) {
    var userId = req.query.userId,
        newDefaultId = req.query.newDefaultId,
        addressId = req.query.addressId,
        sql = "";
    sql = "call deleteOwnAddress(" + mysql.escape(userId) + "," + mysql.escape(newDefaultId) + "," + mysql.escape(addressId) + ",@success);select @success;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: vals[1][0]["@success"]
          });
        }
    })
})
app.get('/addAddress', function(req, res) {
    var userId = req.query.userId,
        newAddress = JSON.parse(req.query.newAddress),
        sql = "";
    var factory = require('./server/uuid.js');
    var uid = factory.uuid(9, 10);
    var username = newAddress.userName,
        provinceName = newAddress.provinceName,
        postalCode = newAddress.postalCode,
        cityName = newAddress.cityName,
        countyName = newAddress.countyName,
        detailInfo = newAddress.detailInfo,
        nationalCode = newAddress.nationalCode,
        telNumber = newAddress.telNumber,
        isDefault = newAddress.isDefault;
    sql = "insert into address(addressId,userId,username,provinceName,postalCode,cityName,countyName,detailInfo,nationalCode,telNumber,isDefault) values(" +
        mysql.escape(uid) + "," + mysql.escape(userId) + "," + mysql.escape(username) + "," + mysql.escape(provinceName) + "," + mysql.escape(postalCode) + "," + mysql.escape(cityName) +
        "," + mysql.escape(countyName) + "," + mysql.escape(detailInfo) + "," + mysql.escape(nationalCode) + "," + mysql.escape(telNumber) + "," + mysql.escape(isDefault) + ");"
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else {
          return res.json({
              success: true,
              addressId: uid
          });
        }
    })
})

app.post('/addBooks', upload.single('file'), function(req, res) {
    console.log(req.body, req.file);
    var bookName = req.body.bookName,
        brefInfo = req.body.brefInfo,
        name = req.body.name,
        userId = req.body.userId,
        sql = "";
    /** When using the "single"
       data come in "req.file" regardless of the attribute "name". **/
    //var tmp_path = req.file.path;
    var fs = require('fs');
    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var imgPath = moment().format('x') + req.file.originalname;
    var target_path = 'uploads/' + imgPath,
        imgUrl = 'https://wxapp.feblog.top/' + imgPath;
    var path = require('path');
    fs.writeFile(path.resolve(target_path), req.file.buffer, function(err) {
        if (err) {
            return res.json({
                success: false
            });
        } else {
            var factory = require('./server/uuid.js');
            var uid = factory.uuid(9, 10);
            sql = "insert into book(bookId,bookName,brefInfo,imgUrl,userId,state) values(" + mysql.escape(uid) + "," +
                mysql.escape(bookName) + "," + mysql.escape(brefInfo) + "," + mysql.escape(imgUrl) + "," + mysql.escape(userId) + ",2);";
            query(sql, function(err, vals, fields) {
                if(err){
                  return res.json({success:false});
                }else{
                  return res.json({
                      success: true
                  })
                }
            })
        }
    })
})
app.get('/getCode', function(req, res) {
    var userId = req.query.userId,
        type = req.query.type,
        key = req.query.key,
        insertType = -1,
        sql = "";
    if (key == 4) insertType = 2;
    else if (key == 5) insertType = 1;
    var factory = require('./server/uuid.js');
    var code = factory.uuid(6, 16),
        uuid = factory.uuid(9, 10);
    sql = "call getCode(" + mysql.escape(uuid) + "," + mysql.escape(userId) + "," + mysql.escape(code) + "," + mysql.escape(insertType) + ",@success);select @success;";
    query(sql, function(err, vals, fields) {
        if(err){
          return res.json({success:false});
        }else{
          return res.json({
              success: vals[1][0]["@success"],
              code: code
          });
        }
    })
})
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});
app.listen(3000);
