const express = require('express')
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./template.js');
var bodyParser =require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static('images'));

app.get('/', function(req,res){
  var info = template.infos();
  res.send(info);
});

app.post('/info_process', function(req,res){
    var post = req.body;
    var name = post.P_name;
    var birth = '';
    birth = birth + post.year + post.month + post.day;
    if (post.period === 'oneMonth'){
      var period = 30;
    } else if(post.period === 'oneYear'){
      var period = 365;
    }
    if (post.money === 'M_one'){
      var money = 10000;

    }
    else if(post.money === 'M_ten'){
      var money = 100000;

    }
    else if (post.money === 'M_hundred'){
      var money = 1000000;

    }
    else if (post.money === 'M_Thousand'){
      var money = 10000000;

    }
    if (post.sex === 'male'){
      sex = '1';
    } else if (post.sex === 'female'){
      sex = '2';
    }
    var suggest = {
      Participant: [name, birth, period, sex, money],
      instructor: 0,
      DD_max_upperlim: [money, money, money, money, money],
      DD_min_lowerlim: [0,0,0,0,0],
      DD_min_upperlim: [money, money, money, money, money],
      DD_max_lowerlim: [0,0,0,0,0],
      Pn_max_upperlim: [money, money, money, money, money],
      Pn_min_lowerlim: [0,0,0,0,0],
      Pn_min_upperlim: [money, money, money, money, money],
      Pn_max_lowerlim: [0,0,0,0,0],
      std_money: money,
      std_dd : period,
      isFin: [0,0,0,0,0],
      DD_isFin:[0,0,0,0,0],
      Pn_isFin:[0,0,0,0,0],
      past_which_condition: 0
    };
    suggest = JSON.stringify(suggest);

    var fileName = post.sex + birth + '_Day' + period + '_M' + money;
    fs.writeFile(`../data/${fileName}`+`.json`, suggest, function(err){
      if(err){throw err};
      res.writeHead(302, {Location: `/inquire/?id=${fileName}`});
      res.end();
    });
  });

app.get('/mi_500won', function(req,res){
  fs.readFile('./images/500won.jpg', function(err,data) {
    res.send(data);
  });
});
app. get('/mi_1000won', function(req,res){
  fs.readFile('./images/1000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/mi_5000won', function(req,res){
  fs.readFile('./images/5000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/mi_10000won', function(req,res){
  fs.readFile('./images/10000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/mi_50000won', function(req,res){
  fs.readFile('./images/50000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/mi_100000won', function(req,res){
  fs.readFile('./images/100000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/mi_500000won', function(req,res){
  fs.readFile('./images/500000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/mi_1000000won', function(req,res){
  fs.readFile('./images/1000000won.jpg', function(err,data){
    res.send(data);
  });
});
app. get('/BG_image', function(req,res){
  fs.readFile('./images/woodenboard1.png', function(err,data){
    res.send(data);
  });
});
app. get('/jquery', function(req,res){
  fs.readFile("../node_modules/jquery/dist/jquery.js", function(err,data){
    res.send(data);
  });
});

app.get('/inquire', function(req,res){
  var _url = req.url;
  var queryStr = url.parse(_url,true).query;
  var d;
  fs.readFile(`../data/${queryStr.id}.json`, 'utf8', function(err, desc){
    if(err) throw err;
    d = JSON.parse(desc);
    var instructor = d.instructor;
    var partici = d.Participant;
    var ddmaxul = d.DD_max_upperlim;
    var ddminul = d.DD_min_upperlim;
    var ddmaxll = d.DD_max_lowerlim;
    var ddminll = d.DD_min_lowerlim;
    var pnmaxul = d.Pn_max_upperlim;
    var pnminul = d.Pn_min_upperlim;
    var pnmaxll = d.Pn_max_lowerlim;
    var pnminll = d.Pn_min_lowerlim;

    var std_money = d.std_money * 0.05;
    var std_dd = d.std_dd;
    var isFin = d.isFin;
    var dd_isFin = d.DD_isFin;
    var pn_isFin = d.Pn_isFin;

    var past_which_condition = d.past_which_condition;


    if(std_dd === 30){
      var dd = ['지금 즉시', '2일 후', '일주일 후', '이주일 후', '한달 후'];
    } else if(std_dd === 365) {
      var dd = ['지금 즉시','2일 후','1개월 후','6개월 후','1년 후'];
    }
    var pn = ['25%', '50%', '75%', '90%', '100%'];

    var variable_amount = 0;
    var choice = 0;
    var c_delay = ['', ''];
    var c_delay_boundary_color = '';
    var c_delay_string_color = '';
    var c_percent = ['', ''];
    var c_percent_boundary_color = '';
    var c_percent_string_color = '';
    var c_money = ['', ''];
    var isDummy = 0;

    var c1_money_image_links = new Array();
    var c2_money_image_links = new Array();

    var prominent_color = 'red';
    var fade_color = '#d3d3d3';
    var std_location = 1 + Math.round(Math.random()); // 1-> 기준이 좌측 2->기준이 우측
    trial_condition = 1 + Math.round(Math.random());  // 1-> delay / 2-> prob
    var which_condition = 0;

    var ddtemp = new Array();
    var pntemp = new Array();

    for(var i=0; i<5; i++){
      if(trial_condition === 1){
        if(dd_isFin[i] == 0){
          ddtemp.push(i);
        }
      } else if(trial_condition === 2){
        if(pn_isFin[i] == 0){
          pntemp.push(i);
        }
      }
    }

    if(trial_condition === 1){
      if(ddtemp.length != 1){
        for (var q = ddtemp.length - 1; q > 0; q--) {
          var s = Math.floor(Math.random() * (q + 1));
          var temp2 = ddtemp[q];
          ddtemp[q] = ddtemp[s];
          ddtemp[s] = temp2;
        }
        loop_0:
        for(var j=0; j<ddtemp.length; j++){
          if(ddtemp[j] !== past_which_condition){
            which_condition = ddtemp[j];
            break loop_0;
          }
        }
      } else if(ddtemp.length == 1){
        which_condition = ddtemp[0];
      }
    } else if(trial_condition === 2){
        if(pntemp.length != 1){
        for (var q = pntemp.length - 1; q > 0; q--) {
          var s = Math.floor(Math.random() * (q + 1));
          var temp2 = pntemp[q];
          pntemp[q] = pntemp[s];
          pntemp[s] = temp2;
        }
      loop_1:
      for(var j=0; j<pntemp.length; j++){
        if(pntemp[j] !== past_which_condition){
            which_condition = pntemp[j];
            break loop_1;
        }
      }
    } else if(pntemp.length == 1){
      which_condition = pntemp[0];
    }
    }

    past_which_condition = which_condition;

    if(ddtemp == "undefined"){
      trial_condition = 2;
    }
    if(pntemp == "undefined"){
      trial_condition = 1;
    }

    if (trial_condition === 1){
      variable_amount = ddmaxll[which_condition] + std_money * (Math.round(Math.random() * (((ddmaxul[which_condition] - ddmaxll[which_condition])/std_money) ) + 0.5));
    } else if (trial_condition === 2){
      variable_amount = pnmaxll[which_condition] + std_money * (Math.round(Math.random() * (((pnmaxul[which_condition] - pnmaxll[which_condition])/std_money) ) + 0.5));
    }

    if(isFin[0]===0 || isFin[1]===0 || isFin[2]===0 || isFin[3]===0 || isFin[4]===0){

      if(instructor <= 70){
        if(std_location === 1){
          if(trial_condition === 1){
              c_delay=[dd[which_condition],dd[0]];
              c_delay_boundary_color = 'black';
              c_delay_string_color = prominent_color;
              c_percent = [pn[4], pn[4]];
              c_percent_boundary_color = fade_color;
              c_percent_string_color = fade_color;
              c_money = [d.std_money, variable_amount];

          } else if (trial_condition === 2){
              c_delay=[dd[0],dd[0]];
              c_delay_boundary_color = fade_color;
              c_delay_string_color = fade_color;
              c_percent = [pn[which_condition], pn[4]];
              c_percent_boundary_color = 'black';
              c_percent_string_color = prominent_color;
              c_money = [d.std_money, variable_amount];

            }
        } else if (std_location === 2){
          if(trial_condition === 1){
              c_delay=[dd[0],dd[which_condition]];
              c_delay_boundary_color = 'black';
              c_delay_string_color = prominent_color;
              c_percent = [pn[4], pn[4]];
              c_percent_boundary_color = fade_color;
              c_percent_string_color = fade_color;
              c_money = [variable_amount, d.std_money];

          } else if (trial_condition === 2){
              c_delay=[dd[0],dd[0]];
              c_delay_boundary_color = fade_color;
              c_delay_string_color = fade_color;
              c_percent = [pn[4], pn[which_condition]];
              c_percent_boundary_color = 'black';
              c_percent_string_color = prominent_color;
              c_money = [variable_amount, d.std_money];

            }
          }
        } else if(instructor > 70) {
        isDummy = Math.round(Math.random()); // 1-> dummy 0-> not dummy
        if(isDummy === 1){
          if(std_location === 1){
            if(trial_condition === 1){
                which_condition = Math.round(Math.random()*5 - 0.5);
                c_delay=[dd[which_condition],dd[0]];
                c_delay_boundary_color = 'black';
                c_delay_string_color = prominent_color;
                c_percent = [pn[4], pn[4]];
                c_percent_boundary_color = fade_color;
                c_percent_string_color = fade_color;
                c_money = [d.std_money, Math.round(1+Math.random()*18)*std_money];
            } else if (trial_condition === 2){
                c_delay=[dd[0],dd[0]];
                c_delay_boundary_color = fade_color;
                c_delay_string_color = fade_color;
                c_percent = [pn[which_condition], pn[4]];
                c_percent_boundary_color = 'black';
                c_percent_string_color = prominent_color;
                c_money = [d.std_money, Math.round(1+Math.random()*18)*std_money];
            }
          }
          else if (std_location === 2){
            if(trial_condition === 1){
                c_delay=[dd[0],dd[which_condition]];
                c_delay_boundary_color = 'black';
                c_delay_string_color = prominent_color;
                c_percent = [pn[4], pn[4]];
                c_percent_boundary_color = fade_color;
                c_percent_string_color = fade_color;
                c_money = [Math.round(1+Math.random()*18)*std_money, d.std_money];
              } else if (trial_condition === 2){
                c_delay=[dd[0],dd[0]];
                c_delay_boundary_color = fade_color;
                c_delay_string_color = fade_color;
                c_percent = [pn[4], pn[which_condition]];
                c_percent_boundary_color = 'black';
                c_percent_string_color = prominent_color;
                c_money = [Math.round(1+Math.random()*18)*std_money, d.std_money];
              }
          }
        } else if(isDummy === 0){
          if(std_location === 1){
            if(trial_condition === 1){
                c_delay=[dd[which_condition],dd[0]];
                c_delay_boundary_color = 'black';
                c_delay_string_color = prominent_color;
                c_percent = [pn[4], pn[4]];
                c_percent_boundary_color = fade_color;
                c_percent_string_color = fade_color;
                c_money = [d.std_money, variable_amount];

            } else if (trial_condition === 2){
                c_delay=[dd[0],dd[0]];
                c_delay_boundary_color = fade_color;
                c_delay_string_color = fade_color;
                c_percent = [pn[which_condition], pn[4]];
                c_percent_boundary_color = 'black';
                c_percent_string_color = prominent_color;
                c_money = [d.std_money, variable_amount];

            }
          }
          else if (std_location === 2){
            if(trial_condition === 1){
                c_delay=[dd[0],dd[which_condition]];
                c_delay_boundary_color = 'black';
                c_delay_string_color = prominent_color;
                c_percent = [pn[4], pn[4]];
                c_percent_boundary_color = fade_color;
                c_percent_string_color = fade_color;
                c_money = [variable_amount, d.std_money];

            } else if (trial_condition === 2){
                c_delay=[dd[0],dd[0]];
                c_delay_boundary_color = fade_color;
                c_delay_string_color = fade_color;
                c_percent = [pn[4], pn[which_condition]];
                c_percent_boundary_color = 'black';
                c_percent_string_color = prominent_color;
                c_money = [variable_amount, d.std_money];

            }
          }
        }
      }
      for(var k = 0; k < 5 ; k++){
        if(ddmaxul[k] - ddmaxll[k] == std_money){
          dd_isFin[k] = 1;
        }
        if(pnmaxul[k] - pnmaxll[k] == std_money){
          pn_isFin[k] = 1;
        }
      }

      var key;
      for(key = 0; key < 5; key ++){
        if(dd_isFin[key] == 1 && pn_isFin[key] == 1){
          isFin[key] = 1;
        }
      }

      var c1_moneyImg = new Array();
      var c2_moneyImg = new Array();
      var c1_temp = 0;
      var c2_temp = 0;
      var min_money = d.std_money*0.05;
      if(std_location === 1){
          c1_temp = c_money[0];
          c2_temp = c_money[1];
      } else if(std_location === 2){
          c1_temp = c_money[0];
          c2_temp = c_money[1];
      }

      for(i= 0; i <10; i++){
        if(c1_temp >= min_money * 2){
          c1_moneyImg.push("/mi_" + min_money*2 + "won");
          c1_temp = c1_temp - min_money*2;
        } else if(c1_temp === min_money){
          c1_moneyImg.push("/mi_" + min_money + "won");
          c1_temp = c1_temp - min_money;
        } else{
          c1_moneyImg.push(" ");
        }

        if(c2_temp >= min_money * 2){
          c2_moneyImg.push("/mi_" + min_money*2 + "won");
          c2_temp = c2_temp - min_money*2;
        } else if(c2_temp === min_money){
          c2_moneyImg.push("/mi_" + min_money + "won");
          c2_temp = c2_temp - min_money;
        } else{
          c2_moneyImg.push(" ");
        }
      }

        var obj_data = {
          partinfo: partici,
          obj_instructor : instructor + 1,
          obj_past_which_condition : past_which_condition,
          obj_which_condition: which_condition,
          obj_trial_condition: trial_condition,
          obj_isFin: isFin,
          obj_ddisfin: dd_isFin,
          obj_pnisfin: pn_isFin,
          obj_VA: variable_amount,

          obj_ddmaxul : ddmaxul,
          obj_ddminul : ddminul,
          obj_ddmaxll : ddmaxll,
          obj_ddminll : ddminll,

          obj_pnmaxul : pnmaxul,
          obj_pnminul : pnminul,
          obj_pnmaxll : pnmaxll,
          obj_pnminll : pnminll,

          current_link_id : queryStr.id,

          std_loc : std_location,
          std_money : d.std_money,
          obj_std_dd : std_dd,
          obj_isDummy : isDummy
        };

        t_std_loc = std_location;
        t_std_money =d.std_money;
        t_c1_delay =c_delay[0];
        t_c1_percent =c_percent[0];
        t_c1_money =c_money[0];
        t_c_Dbc =c_delay_boundary_color;
        t_c_Dsc =c_delay_string_color;
        t_c2_delay =c_delay[1];
        t_c2_percent =c_percent[1];
        t_c2_money =c_money[1];
        t_c_Pbc =c_percent_boundary_color;
        t_c_Psc = c_percent_string_color;
        t_current_link_id =queryStr.id;

      obj_data = JSON.stringify(obj_data);
        fs.writeFile(`../data/${queryStr.id}` + `_temp.json`, obj_data, function(err){
          if(err){throw err};
          res.writeHead(200);
          res.end(template.inquiring(t_std_loc,t_std_money, t_c1_delay, t_c1_percent, t_c1_money, t_c_Dbc, t_c_Dsc, t_c2_delay, t_c2_percent, t_c2_money, t_c_Pbc, t_c_Psc, t_current_link_id,c1_moneyImg[0],c1_moneyImg[1],c1_moneyImg[2],c1_moneyImg[3],c1_moneyImg[4],c1_moneyImg[5],c1_moneyImg[6],c1_moneyImg[7],c1_moneyImg[8],c1_moneyImg[9],c2_moneyImg[0],c2_moneyImg[1],c2_moneyImg[2],c2_moneyImg[3],c2_moneyImg[4],c2_moneyImg[5],c2_moneyImg[6],c2_moneyImg[7],c2_moneyImg[8],c2_moneyImg[9]));
          });
    } else {
      res.writeHead(302, {Location: `/end_page/?id=${queryStr.id}`});
      res.end();
    }
  });
  //res.send();
});

app.post(`/inquire_process/`, function(req,res){
  var inq_post = req.body;
  var _url = req.url;
  var queryStr = url.parse(_url,true).query;
  fs.readFile(`../data/${queryStr.id}` + `_temp.json`, 'utf-8', function(err, desc){
      des = JSON.parse(desc);
      if(err) throw err;
      var partinfo= des.partinfo;
      var obj_instructor = des.obj_instructor;
      var obj_past_which_condition = des.obj_past_which_condition;
      var obj_which_condition= des.obj_which_condition;
      var obj_trial_condition= des.obj_trial_condition;
      var obj_isFin= des.obj_isFin;
      var obj_ddisfin= des.obj_ddisfin;
      var obj_pnisfin= des.obj_pnisfin;
      var obj_VA= des.obj_VA;

      var obj_ddmaxul = des.obj_ddmaxul;
      var obj_ddminul = des.obj_ddminul;
      var obj_ddmaxll = des.obj_ddmaxll;
      var obj_ddminll = des.obj_ddminll;

      var obj_pnmaxul = des.obj_pnmaxul;
      var obj_pnminul = des.obj_pnminul;
      var obj_pnmaxll = des.obj_pnmaxll;
      var obj_pnminll = des.obj_pnminll;

      var current_link_id = des.current_link_id;

      var std_loc = des.std_loc;
      var obj_std_money = des.std_money;
      var obj_std_dd = des.obj_std_dd;
      var choice = inq_post.choose;

      var c_isdummy = des.obj_isDummy;

  if(obj_trial_condition === 1){ // delayed day cond.
    if(std_loc == choice){ // 참가자가 기준 조건 선택 시
      if(obj_VA > obj_ddminll[obj_which_condition]){
        obj_ddmaxll[obj_which_condition] = obj_ddminll[obj_which_condition];
        obj_ddminll[obj_which_condition] = obj_VA;
      } else if(obj_VA < obj_ddminll[obj_which_condition]){
        obj_ddmaxll[obj_which_condition] = obj_VA;
      } else if(obj_VA > obj_ddminul[obj_which_condition]){
        obj_ddminul[obj_which_condition] = obj_VA;
        obj_ddmaxul[obj_which_condition] = obj_std_money;
      }
    } else {
      if(obj_VA < obj_ddminul[obj_which_condition]){ // 참가자가 variable abount cond. 선택 시
        obj_ddmaxul[obj_which_condition] = obj_ddminul[obj_which_condition];
        obj_ddminul[obj_which_condition] = obj_VA;
      } else if(obj_VA > obj_ddminul[obj_which_condition]){
        obj_ddmaxul[obj_which_condition] = obj_VA;
      } else if(obj_VA < obj_ddminll[obj_which_condition]){
        obj_ddminll[obj_which_condition] = obj_VA;
        obj_ddmaxll[obj_which_condition] = 0;
      }
    }
  } else if(obj_trial_condition === 2){ // percent cond.
    if(std_loc == choice){ // 참가자가 기준 조건 선택 시
      if(obj_VA > obj_pnminll[obj_which_condition]){
        obj_pnmaxll[obj_which_condition] = obj_pnminll[obj_which_condition];
        obj_pnminll[obj_which_condition] = obj_VA;
      } else if(obj_VA < obj_pnminll[obj_which_condition]){
        obj_pnmaxll[obj_which_condition] = obj_VA;
      } else if(obj_VA > obj_pnminul[obj_which_condition]){
        obj_pnminul[obj_which_condition] = obj_VA;
        obj_pnmaxul[obj_which_condition] = obj_std_money;
      }
    } else {
      if(obj_VA < obj_pnminul[obj_which_condition]){ // 참가자가 variable abount cond. 선택 시
        obj_pnmaxul[obj_which_condition] = obj_pnminul[obj_which_condition];
        obj_pnminul[obj_which_condition] = obj_VA;
      } else if(obj_VA > obj_pnminul[obj_which_condition]){
        obj_pnmaxul[obj_which_condition] = obj_VA;
      } else if(obj_VA < obj_pnminll[obj_which_condition]){
        obj_pnminll[obj_which_condition] = obj_VA;
        obj_pnmaxll[obj_which_condition] = 0;
      }
    }
  }

  if(c_isdummy === 0){
    var suggest = {
      Participant: partinfo,
      instructor: obj_instructor,
      DD_max_upperlim: obj_ddmaxul,
      DD_min_lowerlim: obj_ddminll,
      DD_min_upperlim: obj_ddminul,
      DD_max_lowerlim: obj_ddmaxll,
      Pn_max_upperlim: obj_pnmaxul,
      Pn_min_lowerlim: obj_pnminll,
      Pn_min_upperlim: obj_pnminul,
      Pn_max_lowerlim: obj_pnmaxll,
      std_money: obj_std_money,
      std_dd : obj_std_dd,
      isFin: obj_isFin,
      DD_isFin:obj_ddisfin,
      Pn_isFin:obj_pnisfin,
      past_which_condition: obj_past_which_condition
    };

    console.log(suggest)


    suggest = JSON.stringify(suggest);

    fs.writeFile(`../data/${queryStr.id}`+`.json`, suggest, function(err){
      if(err){throw err};
      res.writeHead(302, {Location: `/inquire/?id=${queryStr.id}`});
      res.end();
    });
  } else {
    res.writeHead(302, {Location: `/inquire/?id=${queryStr.id}`});
    res.end();
  }
});
});

app.get(`/end_page`,function(req,res){
  var exp_fin = `
    <h1 style="text-align:center; margin-top:490px; font-size:100px;">실험이 모두 끝났습니다.<br/>수고하셨습니다. </h1>
  `;
  var url_endpage = req.url;
  var queryId = url.parse(url_endpage,true).query.id;

  fs.unlink(`../data/${queryId}_temp.json`, function(err){
    if(err){res.writeHead(404); res.end('Not found');}
    res.send(exp_fin);
  })
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server on. port: ' + port));
