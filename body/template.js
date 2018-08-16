module.exports = {
  infos: function(){
    return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
         #head{
           text-align: center;
           margin-top: 25px;
         }
         #contour{
           display: grid;
           grid-template-columns: 1fr 4fr;
           grid-template-rows: 1fr 1fr 1fr 1fr;
         }
      </style>
    <title></title>
    </head>
    <body>
      <h1 id="head"> 기초 정보 입력 및 실험 조건 선택 </h1>
        <div id="contour">
        <p></p>
        <form id="informs" action="/info_process" method="post">
          <div>이름: <div><input type="text" name="P_name"></div></div>
          <br/>
          <div>성별: <div>남자<input type="radio" name="sex" value="male" checked> &nbsp; 여자<input type="radio" name="sex" value="female"> </div></div>
          <br/>
          <div>생년월일: <div><input type="text" name="year" style="width:80px;"> 년 <input type="text" name="month" style="width:40px;"> 월 <input type="text" name="day" style="width:40px;"> 일</div></div>
          <br/>
          <div>지연기간: <br/>한달<input type="radio" name="period" value="oneMonth" checked> &nbsp; 일년<input type="radio" name="period" value ="oneYear"> </div>
          <p></p>
          <div>기준금액: <br/>1만원<input type="radio" name="money" value="M_one" checked> &nbsp; 10만원<input type="radio" name="money" value="M_ten"> &nbsp;
            100만원<input type="radio" name="money" value="M_hundred"> &nbsp; 1000만원<input type="radio" name="money" value="M_Thousand"></div>
          <p></p>
          <input type="submit" value="submit">
        </form>
    </body>
    </html>
    `;
  },
  inquiring: function(std_loc,std_money, c1_delay, c1_percent, c1_money, c_Dbc, c_Dsc, c2_delay, c2_percent, c2_money, c_Pbc, c_Psc, current_link_id,c1_moneyImg1,c1_moneyImg2,c1_moneyImg3,c1_moneyImg4,c1_moneyImg5,c1_moneyImg6,c1_moneyImg7,c1_moneyImg8,c1_moneyImg9,c1_moneyImg10,c2_moneyImg1,c2_moneyImg2,c2_moneyImg3,c2_moneyImg4,c2_moneyImg5,c2_moneyImg6,c2_moneyImg7,c2_moneyImg8,c2_moneyImg9,c2_moneyImg10){
    return `<html>
    <head>
    <script src="/jquery"></script>
      <meta charset ="utf-8">
      <style>
        #headline{
          padding: 50px;
          text-align:center;
          border-bottom: 3px solid black;
        }
        #contour{
          display: grid;
          grid-template-columns: 5fr 1fr 1fr 5fr;
          grid-template-rows: 1fr;
          margin-left: 310px;
          margin-right: 310px;
          margin-top: 40px;
        }
        .c1{
          border: 0px solid black;
          padding: 20px;
          grid-template-columns: 1fr;
          grid-template-rows: 3fr 2fr;
        }
        .line1{
          border-right: 1.5px solid black;
        }
        .line2{
          border-left: 1.5px solid black;
        }
        .c2{
          border: 0px solid black;
          padding: 20px;
          grid-template-columns: 1fr;
          grid-template-rows: 3fr 2fr;
        }

        #c1_period{
          font-size: 20px;
          border: 1px solid ${c_Dbc};
          color: ${c_Dsc};
          text-align: center;
        }
        #c2_period{

          font-size: 20px;
          border: 1px solid ${c_Dbc};
          color: ${c_Dsc};
          text-align: center;
        }
        #c1_percent{

          font-size: 20px;
          border: 1px solid ${c_Pbc};
          color: ${c_Psc};
          text-align: center;
        }
        #c2_percent{

          font-size: 20px;
          border: 1px solid ${c_Pbc};
          color: ${c_Psc};
          text-align: center;
        }
        #c1_money{

          font-size: 20px;
          border: 1px solid black;
          color: black;
          text-align: center;
        }
        #c2_money{

          font-size: 20px;
          border: 1px solid black;
          color: black;
          text-align: center;
        }
        .moneyImg1, .moneyImg2{
          display: grid;
          border: 1px solid black;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
          background-image:url("/BG_image");
          margin: 50px;
          margin-left: 80px;
          width: 310px;
          height: 310px;
        }
        .c1_child, .c2_child{
          margin:10px;
        }
        .background_c1, .background_c2{
          width:478px;
          height:308px;
          border: 1px solid black;

        }
      </style>
      <title></title>
    </head>
    <body style="background-color:#fffaf0">
      <h1 id ="headline">둘 중 하나의 조건을 선택해주십시오.</h1>
      <div id = "contour">
        <div class ="c1">
          <div class="background_c1">
            <div style="border:1px solid black; margin:40px; padding:20px;">
              <div><input class ="c1_child" id ="c1_period" type="text" value="${c1_delay}" readonly></div>
              <div><input class ="c1_child" id ="c1_percent" type="text" value="${c1_percent}" readonly>확률로</div>
              <div><input class ="c1_child" id ="c1_money" type="text" value="${c1_money}" readonly>원(₩)을</div>
              <div><input class ="c1_child" id ="c1_blank" type="text" readonly style="border: 0px; font-size: 20px; background-color:#fffaf0;">얻습니다.</div>
            </div>
          </div>
          <br/>
         <div>
          <form class ="moneyImg1" action="/inquire_process/?id=${current_link_id}" method ="post">
             <input type="hidden" name="choose" value="1">
             <div class ="moneyImg1_child" id="MI1_spot1"><input type="image" src="${c1_moneyImg1}" onerror="this.style.display='none'" id="MIB1_1"></div>
             <div class ="moneyImg1_child" id="MI1_spot2"><input type="image" src="${c1_moneyImg2}" onerror="this.style.display='none'" id="MIB1_2"></div>

             <div class ="moneyImg1_child" id="MI1_spot3"><input type="image" src="${c1_moneyImg3}" onerror="this.style.display='none'" id="MIB1_3"></div>
             <div class ="moneyImg1_child" id="MI1_spot4"><input type="image" src="${c1_moneyImg4}" onerror="this.style.display='none'" id="MIB1_4"></div>

             <div class ="moneyImg1_child" id="MI1_spot5"><input type="image" src="${c1_moneyImg5}" onerror="this.style.display='none'" id="MIB1_5"></div>
             <div class ="moneyImg1_child" id="MI1_spot6"><input type="image" src="${c1_moneyImg6}" onerror="this.style.display='none'" id="MIB1_6"></div>

             <div class ="moneyImg1_child" id="MI1_spot7"><input type="image" src="${c1_moneyImg7}" onerror="this.style.display='none'" id="MIB1_7"></div>
             <div class ="moneyImg1_child" id="MI1_spot8"><input type="image" src="${c1_moneyImg8}" onerror="this.style.display='none'" id="MIB1_8"></div>

             <div class ="moneyImg1_child" id="MI1_spot9"><input type="image" src="${c1_moneyImg9}" onerror="this.style.display='none'" id="MIB1_9"></div>
             <div class ="moneyImg1_child" id="MI1_spot10"><input type="image" src="${c1_moneyImg10}" onerror="this.style.display='none'" id="MIB1_10"></div>
           </form>
         </div>
        </div>
        <div class="line1"></div>
        <div class="line2"></div>
        <div class ="c2">
          <div class="background_c2">
            <div style="border:1px solid black; margin:40px; padding:20px;">
              <div><input class ="c2_child" id ="c2_period" type="text" value="${c2_delay}" readonly></div>
              <div><input class ="c2_child" id ="c2_percent" type="text" value="${c2_percent}"readonly>확률로</div>
              <div><input class ="c2_child" id ="c2_money" type="text" value="${c2_money}" readonly>원(₩)을</div>
              <div><input class ="c2_child" id ="c2_blank" type="text" readonly style="border: 0px; font-size: 20px; background-color:#fffaf0;">얻습니다.</div>
            </div>
          </div>
          <br/>
          <div>
          <form class ="moneyImg2" action="/inquire_process/?id=${current_link_id}" method ="post">
              <input type="hidden" name="choose" value="2">
              <div class ="moneyImg2_child" id="MI2_spot1"><input type="image" src="${c2_moneyImg1}" onerror="this.style.display='none'" id="MIB2_1"></div>
              <div class ="moneyImg2_child" id="MI2_spot2"><input type="image" src="${c2_moneyImg2}" onerror="this.style.display='none'" id="MIB2_2"></div>

              <div class ="moneyImg2_child" id="MI2_spot3"><input type="image" src="${c2_moneyImg3}" onerror="this.style.display='none'" id="MIB2_3"></div>
              <div class ="moneyImg2_child" id="MI2_spot4"><input type="image" src="${c2_moneyImg4}" onerror="this.style.display='none'" id="MIB2_4"></div>

              <div class ="moneyImg2_child" id="MI2_spot5"><input type="image" src="${c2_moneyImg5}" onerror="this.style.display='none'" id="MIB2_5"></div>
              <div class ="moneyImg2_child" id="MI2_spot6"><input type="image" src="${c2_moneyImg6}" onerror="this.style.display='none'" id="MIB2_6"></div>

              <div class ="moneyImg2_child" id="MI2_spot7"><input type="image" src="${c2_moneyImg7}" onerror="this.style.display='none'" id="MIB2_7"></div>
              <div class ="moneyImg2_child" id="MI2_spot8"><input type="image" src="${c2_moneyImg8}" onerror="this.style.display='none'" id="MIB2_8"></div>

              <div class ="moneyImg2_child" id="MI2_spot9"><input type="image" src="${c2_moneyImg9}" onerror="this.style.display='none'" id="MIB2_9"></div>
              <div class ="moneyImg2_child" id="MI2_spot10"><input type="image" src="${c2_moneyImg10}" onerror="this.style.display='none'" id="MIB2_10"></div>
          </form>;
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  
}
