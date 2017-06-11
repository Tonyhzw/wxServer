function Express(){
    var AppKey = '26879714-71cc-44a9-8de9-c62146f59adf', EBusinessID = '1289795';

    this.isExist= function(RequestData){
      var dataBody ='RequestData='+encodeURIComponent(JSON.stringify(RequestData))+'&RequestType=2002&DataType=2&EBusinessID=1289795',
      dataBody = this.formData(RequestData,dataBody);
      var superagent = require('superagent');
      return new Promise(function(resolve,reject){
        superagent.post('http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx')
        .send(dataBody)
        .end(function(err, responese){
            var status = responese.status,data = JSON.parse(responese.text);
            if(status=="200"){
              var Success = data.Success,Shippers = data.Shippers;
              if(Success){
                if(Shippers.length>0) resolve(Shippers[0]);
                else reject();
              }else {
                reject();
              }
            }
            else 	reject();
        })
      });
    }
    this.trace = function(RequestData){
      var dataBody = 'RequestData='+encodeURIComponent(JSON.stringify(RequestData))+'&RequestType=1002&DataType=2&EBusinessID=1289795',
      dataBody = this.formData(RequestData,dataBody);
      var superagent = require('superagent');
      return new Promise(function(resolve,reject){
        superagent.post('http://api.kdniao.cc/api/dist')
        .send(dataBody)
        .end(function(err,responese){
          var status = responese.status,data = JSON.parse(responese.text);
          if(status=="200"){
            var Success = data.Success,state = data.State,trace=data.Traces;
            //物流状态: 0-无轨迹 2-在途中，3-签收,4-问题件
            if(Success){
              resolve({sucess:true,state:state,trace:trace});
            }
          }
          else 	reject({success:false});
        });
      })
    }
    this.encode = function(RequestData){
      var crypto = require('crypto');
      var md5 = crypto.createHash('md5');
      var md5Str = md5.update(JSON.stringify(RequestData)).update(AppKey).digest('hex');
      var b = new Buffer(md5Str);
      var base64 = encodeURIComponent(b.toString('base64'));
      return base64;
    }

    this.formData = function(RequestData,str){
      return str+'&DataSign='+this.encode(RequestData);
    }
}
module.exports = Express;
