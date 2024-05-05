var ACCESS_TOKEN = 'e2RIvKwUTVo3ROzFJs7rr7RnIt/+bnn2NWm5sof1/wFfHGwYu/ebl29ayyLMC8a2VWz61euexul3DDBljAq+A9BqDRcMbSbiWnLgmYFvFcROj6aoTDx3qg45CiKfrmwOl+OoXAh1H361UlIcN5vvHAdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  //Webhookで受信する応答トークン
  var replyToken = event.replyToken;
  //ユーザーからのメッセージ
  var userMessage = event.message.text;
  //応答メッセージ用のAPI_URL
  var url = 'https://api.line.me/v2/bot/message/reply';
  //応答するメッセージに関する変数
  //メッセージの中身
  var sendMessage = "";
  var sendMessage_contents = [];
  var sendMessage_overlapping = [];
  var sendMessage_addstate = "";
  var sendMessage_date = "";
  //予定のタイトル
  var sendMessage_title = [];
  //開始日時
  var sendMessage_startYear = [];
  var sendMessage_startMonth = [];
  var sendMessage_startDate = [];
  var sendMessage_startDay = [];
  var sendMessage_startHour = [];
  var sendMessage_startMin = [];
  //終了日時
  var sendMessage_finishYear = [];
  var sendMessage_finishMonth = [];
  var sendMessage_finishDate = [];
  var sendMessage_finishDay = [];
  var sendMessage_finishHour = [];
  var sendMessage_finishMin = [];
  //終了-開始の日数
  var sendMessage_betweenDays = [];
  //曜日の格納配列
  const dayArray = ["日","月","火","水","木","金","土"];
  //取得するすべての予定を格納する変数
  var myEvent = [];
  //参照する日付
  let afterday = 0;
  let sendMessage_state = "";
  //送信する予定の検索
  const sendEvent_list = ["バイト","病院","歯医者","ごはん","登校日"];
  let sendEvent = [];


  //メッセージを受け取ったとき
  //afterday日後の予定
  if (userMessage == "今日の予定" || userMessage == "0日後の予定") {
    afterday = 0
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(0)
  }
  else if (userMessage == "明日の予定" || userMessage == "1日後の予定"){
    afterday = 1
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(1)
  }
  else if (userMessage == "明後日の予定" || userMessage == "2日後の予定"){
    afterday = 2
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(2)
  }
  else if (userMessage == "3日後の予定"){
    afterday = 3
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(3)
  }
  else if (userMessage == "4日後の予定"){
    afterday = 4
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(4)
  }
  else if (userMessage == "5日後の予定"){
    afterday = 5
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(5)
  }
  else if (userMessage == "6日後の予定"){
    afterday = 6
    sendMessage_state = "oneday";
    myEvent[0] = getCalenderEvent(6)
  }
  else if (userMessage == "今週の予定") {
    afterday = 0
    sendMessage_state = "week";
    for (let week = 0 ; week < 7 ; week++){
      myEvent[week] = getCalenderEvent(week)
    }
  }
  else if (userMessage == "ヘルプ"){
    afterday = 0
    sendMessage_state = "help"
  }
  else{
    afterday = 0
    sendMessage_state = "error";
  }
  
  //送信する年月日の取得(afterday日加算する)
  let serch_start = new Date();
  serch_start.setDate(serch_start.getDate() + afterday);
  let serch_startYear = serch_start.getFullYear();
  let serch_startMonth = serch_start.getMonth()+1;
  let serch_startDate = serch_start.getDate();
  let serch_startDay = serch_start.getDay();
  //6日後の年月日の取得
  let serch_finish = new Date();
  serch_finish.setDate(serch_finish.getDate() + 6);
  let serch_finishYear = serch_finish.getFullYear();
  let serch_finishMonth = serch_finish.getMonth()+1;
  let serch_finishDate = serch_finish.getDate();
  let serch_finishDay = serch_finish.getDay();

  //送信する予定を検索(タイトルでの検索)
  //格納している日数に対してループ
  for (let day_num = 0 ; day_num < myEvent.length ; day_num++){
    //任意の日の予定の数に対してループ
    for (let myEvent_num = 0 ; myEvent_num < myEvent[day_num].length ; myEvent_num++){
      //送信する予定リストの数に対してループ
      for (let sendEvent_num = 0 ; sendEvent_num < sendEvent_list.length ; sendEvent_num++){
        //送信する予定が見つかったら
        if (myEvent[day_num][myEvent_num][0] == sendEvent_list[sendEvent_num]){
          //リスト番号を追加
          //リストmyEvent[*][*][]のday_num日目のmyEvent_num個目に送信する予定がある
          sendEvent.push([day_num,myEvent_num]);
        }
      }
    }
  }

  //送信するメッセージの処理
  //1日の予定を送信するとき
  if (sendMessage_state == "oneday"){
    for (let n = 0 ; n < sendEvent.length ; n++){
      //改行の処理
      if (n != 0){
        sendMessage += "\n"
      }
      else{
        ;
      }
      //タイトル日時日数を代入
      sendMessage_title[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [0];
      sendMessage_startYear[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [1];
      sendMessage_startMonth[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [2];
      sendMessage_startDate[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [3];
      sendMessage_startDay[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [4];
      sendMessage_startHour[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [5];
      sendMessage_startMin[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [6];
      sendMessage_finishYear = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [7];
      sendMessage_finishMonth[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [8];
      sendMessage_finishDate[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [9];
      sendMessage_finishDay[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [10];
      sendMessage_finishHour[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [11];
      sendMessage_finishMin[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [12];
      sendMessage_betweenDays[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [13];
      //メッセージを変数に格納
      //検索する日にちの送信
      sendMessage_date = serch_startYear + "年" + serch_startMonth + "月" + serch_startDate + "日(" + dayArray[serch_startDay] + ")の予定";
      //内容の送信
      //日にちを跨がないとき(当日中に完結するとき)
      if (sendMessage_betweenDays[n] == 0){
        sendMessage_contents[n] = sendMessage_startDate[n] + "日(" + dayArray[sendMessage_startDay[n]] + ")" + sendMessage_startHour[n] + "時" + sendMessage_startMin[n] + "分～" + sendMessage_finishHour[n] + "時" + sendMessage_finishMin[n] + "分 : \n" + "　　　　 " + sendMessage_title[n];
      }
      //日にちを跨ぐとき(予定が翌日以降にわたるとき)
      else {
        sendMessage_contents[n] = sendMessage_startDate[n] + "日(" + dayArray[sendMessage_startDay[n]] + ")" + sendMessage_startHour[n] + "時" + sendMessage_startMin[n] + "分～\n" + "　　" + sendMessage_finishDate[n] + "日(" + dayArray[sendMessage_finishDay[n]] + ")" + sendMessage_finishHour[n] + "時" + sendMessage_finishMin[n] + "分 : " + sendMessage_title[n];
      }
      sendMessage += sendMessage_contents[n]
    }
  }

  //1週間の予定を送信するとき
  else if (sendMessage_state == "week"){
    for (let n = 0 ; n < sendEvent.length ; n++){
      //改行の処理はコンテンツの追加のときにする
      //タイトル日時日数を代入
      sendMessage_title[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [0];
      sendMessage_startYear[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [1];
      sendMessage_startMonth[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [2];
      sendMessage_startDate[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [3];
      sendMessage_startDay[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [4];
      sendMessage_startHour[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [5];
      sendMessage_startMin[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [6];
      sendMessage_finishYear = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [7];
      sendMessage_finishMonth[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [8];
      sendMessage_finishDate[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [9];
      sendMessage_finishDay[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [10];
      sendMessage_finishHour[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [11];
      sendMessage_finishMin[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [12];
      sendMessage_betweenDays[n] = myEvent[sendEvent[n][0]] [sendEvent[n][1]] [13];
      //メッセージを変数に格納
      //検索する日にちの送信
      sendMessage_date = serch_startYear + "年" + serch_startMonth + "月" + serch_startDate + "日(" + dayArray[serch_startDay] + ")\n" + "　～" + serch_finishYear + "年" + serch_finishMonth + "月" + serch_finishDate + "日(" + dayArray[serch_finishDay] + ")の予定" ;
      //内容の送信
      //日にちを跨がないとき(当日中に完結するとき)
      if (sendMessage_betweenDays[n] == 0){
        sendMessage_contents[n] = sendMessage_startDate[n] + "日(" + dayArray[sendMessage_startDay[n]] + ") " + sendMessage_startHour[n] + "時" + sendMessage_startMin[n] + "分～" + sendMessage_finishHour[n] + "時" + sendMessage_finishMin[n] + "分 : \n" + "　　　　 " + sendMessage_title[n];
      }
      //日にちを跨ぐとき(予定が翌日以降にわたるとき)
      else{
        sendMessage_contents[n] = sendMessage_startDate[n] + "日(" + dayArray[sendMessage_startDay[n]] + ")" + sendMessage_startHour[n] + "時" + sendMessage_startMin[n] + "分～\n" + "　　" + sendMessage_finishDate[n] + "日(" + dayArray[sendMessage_finishDay[n]] + ")" + sendMessage_finishHour[n] + "時" + sendMessage_finishMin[n] + "分 : " + sendMessage_title[n];
      }
      //重複して送信する場合メッセージに追加しないようにする処理
      for (let nn = 0 ; nn < n ; nn++){
        //重複しないときは走査を続ける
        if (sendMessage_contents[n] != sendMessage_contents[nn]){
          sendMessage_addstate = "addition"
        }
        //重複したらstatusを変更してループ脱出
        else{
          sendMessage_addstate = "omission"
          break
        }
      }
      //重複していないorループ1回目なら追加
      if (sendMessage_addstate == "addition" || n == 0){
        //n=0のときは改行なし，stateが空だから念のためadditionを代入
        if (n == 0){
          sendMessage_addstate = "addition"
          sendMessage += sendMessage_contents[n];
        }
        //n>=1のときは改行が必要
        else{
          sendMessage = sendMessage + "\n" + sendMessage_contents[n];
        }
      }
    }
  }

  //ヘルプの処理
  else if (sendMessage_state == "help"){
    sendMessage_date = "ヘルプ"
    sendMessage = "メニューから選ぶか\n「n(半角)日後の予定」\nと送ってください\n最大6日後まで参照できます"
  }
  //エラーの処理
  else{
    sendMessage_date = "エラーです"
    sendMessage = "メニューから選ぶか\n「n(半角)日後の予定」\nと送ってください\n最大6日後まで参照できます"
  }

  //予定がないときの処理
  if (sendMessage == ""){
    sendMessage_date = "予定 なし"
    sendMessage = "予定がありません"
  }
  else{
    ;
  }
  
  //送信の処理
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      //送信する内容
      'messages': [
      {
        'type': 'text',
        'text': sendMessage_date,
      },
      {
        'type': 'text',
        'text': sendMessage,
      }
      ]
      //↑ここまで編集
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


//plusday日後の予定をGoogleカレンダーで取得，arrayでreturn
function getCalenderEvent(plusday) {
  let myCalendar = CalendarApp.getCalendarById('taka20011221@gmail.com');
  //取得する予定日の設定
  var date = new Date();
  date.setDate(date.getDate() + plusday);
  //返り値
  var myEvent_array = [];
  //取得した予定のタイトル開始終了時刻格納変数
  var get_myEvent_array = [];
  //日を跨ぐか判別するか使用する変数
  var startday = "";
  var endday = "";
  var betweenDays = 0;

  //開始日～終了日に存在するGoogleカレンダーのイベントを取得
  let myEvent = myCalendar.getEventsForDay(date);
  //予定の検索
  for(let event_num = 0 ; event_num < myEvent.length ; event_num++){
    //予定の([0]タイトル)(開始[1]年[2]月[3]日[4]曜日[5]時間[6]分-終了[7]年[8]月[9]日[10]曜日[11]時間[12]分)を代入
    get_myEvent_array[0] = myEvent[event_num].getTitle();
    //開始の日時取得
    get_myEvent_array[1] = myEvent[event_num].getStartTime().getFullYear();
    get_myEvent_array[2] = myEvent[event_num].getStartTime().getMonth() + 1;
    get_myEvent_array[3] = myEvent[event_num].getStartTime().getDate();
    get_myEvent_array[4] = myEvent[event_num].getStartTime().getDay();
    get_myEvent_array[5] = myEvent[event_num].getStartTime().getHours();
    get_myEvent_array[6] = myEvent[event_num].getStartTime().getMinutes();
    startday = new Date(get_myEvent_array[1] + '/' + get_myEvent_array[2] + '/' + get_myEvent_array[3]);
    //終了の日時取得
    get_myEvent_array[7] = myEvent[event_num].getEndTime().getFullYear();
    get_myEvent_array[8] = myEvent[event_num].getEndTime().getMonth() + 1;
    get_myEvent_array[9] = myEvent[event_num].getEndTime().getDate();
    get_myEvent_array[10] = myEvent[event_num].getEndTime().getDay();
    get_myEvent_array[11] = myEvent[event_num].getEndTime().getHours();
    get_myEvent_array[12] = myEvent[event_num].getEndTime().getMinutes();
    endday = new Date(get_myEvent_array[7] + '/' + get_myEvent_array[8] + '/' + get_myEvent_array[9])
    //日にちを跨ぐか判別する変数
    betweenDays = (endday.getDate() - startday.getDate());
    //返り値の設定
    //[[eventnum1],[event_num2]...]の二次元配列
    //[13]終了-開始日数
    myEvent_array[event_num] = [get_myEvent_array[0], get_myEvent_array[1], get_myEvent_array[2], get_myEvent_array[3], get_myEvent_array[4],get_myEvent_array[5], get_myEvent_array[6], get_myEvent_array[7], get_myEvent_array[8], get_myEvent_array[9], get_myEvent_array[10], get_myEvent_array[11], get_myEvent_array[12], betweenDays];
  }
  //予定の2次元配列をreturn
  return myEvent_array
}

