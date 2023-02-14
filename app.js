const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once('ready', () => {
  console.log('*************')
  console.log('The time now is..  ' + (datenow + ' (' + week[daynow] + ') ') + timenow)
  console.log('Channel ID that I´m gonna send is..  ' + chanID1)
	console.log('Ready.');
  console.log('*************')
});

client.login(process.env.TOKEN);

const chanID1 = '1072225548023107625'
const chanID2 = '1073648403319357491'

///////////////  시간 관련 변수

var moment = require('moment');

require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");

var datenow = moment().format('YYYY-MM-DD');
var timenow = moment().format('HHmmss');
var daynow = moment().day();
var week = new Array('일', '월', '화', '수', '목', '금', '토');


// console.log(datenow);
// console.log(timenow);
// console.log(daynow);
// console.log(week[daynow]);


///////////////  카운터 관련 변수
const ccount = new Array('0', '2', '3', '1');

var taskslist;
var taskcount;
var taskcount_new;

///////////////  카운터(read_count로 실행)

const fs = require('fs');

//function read_count() {
//  fs.readFile('tmp/WeeklyTasksCount.txt', 'utf8', function(err, data) {
//    taskcount = data
//    console.log('check: 카운터 작동- 첫번째 값:' + data);

//  });
//  setTimeout(count_tasks, 1000);
//  console.log('counting...');

//}

function count_tasks() {
  taskcount =  fs.readFileSync('tmp/WeeklyTasksCount.txt', {encoding:'utf8', flag:'r'});
  console.log('check: count -- original value..  ' + taskcount);
  taskcount_new = ccount[taskcount]
//  taskcount_new = parseInt(taskcount) + 1
  console.log('check: counting complete. -- ' + taskcount_new);

  console.log('Update count file...');
  update_count()

}

function update_count() {
  if (taskcount_new) {
    fs.writeFile('tmp/WeeklyTasksCount.txt', taskcount_new.toString(), 'utf8', function(err){
      if (err) throw err;
      else {
        console.log('Update successed.');
      }
    });
  }
}


///////////////  10분 단위 맞추기

var repeat;
var ontime_toggle;

async function ontime() {
    if (typeof ontime_toggle == 'undefined') {
      let ml = (10 - (parseInt(moment().format('mm')) % 10));
      console.log('**ontime call..')
      await ontime_switch(ml);
    }
    else if (ontime_toggle === 1) {
      await ontime_check(checkdate, 600000);
      //await ontime_check(event_Siege_checkdate, 10000);
    }
}

function ontime_switch(t) {

  var msl = ((t * 60) * 1000);
  var ontime_check = setTimeout(checkdate, msl);
  console.log('**ontime called(' + t + ' min(s) later).')
  ontime_toggle = 1
  console.log('**toggle is switched to ' + ontime_toggle)
}

function ontime_check(fn, t) {
  if (ontime_toggle === 1) {
    console.log('**ontime toggle has been toggled on.')
    var repeat = setInterval(eval(fn), t);
    console.log('**' + 'fnname' + ' function will be operated every ' + (t / 1000) + ' secs.')
    ontime_toggle = 'n'
  }
//  else if (ontime_toggle === 'n')
}

///////////////

client.on('ready', message => {
  var init_check = setTimeout(checkdate, 0);    // 최초 1회 실행
  console.log('**Init_check start')
});


///////////////  길드 주간 목표 알람
function checkdate() {

  ontime();

  console.log('---');
  console.log('Initializing...');

  var datenow = moment().format('YYYY-MM-DD');
  var timenow = moment().format('HHmmss');
  var daynow = moment().day();

  console.log('check started.    ' + datenow + ' ' + timenow);


const fileroute = 'tmp/taskslist.txt';
const readline = require('readline');
const rl = readline.createInterface({
     input: fs.createReadStream('tmp/taskslist.txt')
});
var mission;
var chanmsg;     // 최종적으로 채널에 출력하는 메세지

var taskcount =  fs.readFileSync('tmp/WeeklyTasksCount.txt', {encoding:'utf8', flag:'r'})
// WeeklyTasksCount.txt 파일 읽기

  if (daynow == 2){

    console.log('[value] daynow == ' + daynow + ', timenow == ' + timenow);

    if((timenow >= 220000) && (timenow < 221000)) {
      var datenxt = moment().add(1, 'day')

      rl.on('line', function (line) {
        s = line.split(':');
        var mission = ('회랑, ' + s[taskcount]);
        console.log('[value] taskcount == ' + taskcount);
        console.log('【WeeklyTasks】finding txt...  ' + mission);

        var t = fs.readFileSync('tmp/phrases.txt', {encoding:'utf8', flag:'r'})
        t = t.replace('today', (datenxt.format('YYYY-MM-DD') + ' (' + week[(daynow + 1)] + ')'));
        chanmsg = t.replace('assignment', mission);

        client.channels.cache.get(chanID1).send(chanmsg);
        console.log('【WeeklyTasks】output messages...  ' + chanmsg);
         // 채널에 메세지 출력
      });
    }
  }
  else if (daynow == 3) {
    console.log('[value] daynow == ' + daynow + ', timenow == ' + timenow)

    if((timenow >= 100000) && (timenow < 101000)) {

      rl.on('line', function (line) {
        s = line.split(':');
        var mission = ('회랑, ' + s[taskcount]);
        console.log('[value] taskcount == ' + taskcount);
        console.log('【WeeklyTasks】finding txt...  ' + mission);

        var t = fs.readFileSync('tmp/phrases.txt', {encoding:'utf8', flag:'r'})
        t = t.replace('today', (datenow + ' (' + week[daynow] + ')'));
        chanmsg = t.replace('assignment', mission);

        client.channels.cache.get(chanID1).send(chanmsg);
        console.log('【WeeklyTasks】output messages...  ' + chanmsg);
         // 채널에 메세지 출력
      });
      console.log('【WeeklyTasks】operate counter...');
      count_tasks()
      // 카운터 작동
    }
  }
  else {
    console.log('【WeeklyTasks】Conditions do not match.')
    console.log('[value] daynow == ' + daynow + ', timenow == ' + timenow)
  }
  console.log('---');
  event_Siege_checkdate();

}

///////////////


///////////////  점령전 이벤트 알람


function event_Siege_checkdate() {
  var daynow = moment().day();
  var siege_hh = moment().format('HH');
  var siege_m = parseInt(moment().format('mm'));
  var siege_chanmsg;
  var timerdelmsg;
  var msgid;

  if ((daynow == 6) || (daynow == 0)) {
    const hours = '12, 16, 18, 19, 22, 23';
    if (hours.includes(siege_hh) == true) {
      if ((siege_m > 29) && (siege_m <= 32)) {
        console.log('【event_Siege_checkdate】siege_m meets conditions.: ');
        let t = fs.readFileSync('tmp/siege_phrases.txt', {encoding:'utf8', flag:'r'});
        siege_chanmsg = t.replace('time', (siege_hh + ':' + siege_m));
        let channel = client.channels.cache.get(chanID2);
        channel.send(siege_chanmsg).then(message => {
//          var msgid = message.id
          var timerdelmsg = setTimeout(() => {
            channel.messages.fetch(message.id).then(message => message.delete())
          }, 180000)
        });
        console.log('output messages...  ' + siege_chanmsg);
        console.log('└the message will be deleted in 3 mins.')

      }
      else {
        console.log('【event_Siege_checkdate】Condition does not match.: siege_m');
      }
      //client.channels.cache.get(chanID2).send(siege_chanmsg);
    }
    else {
      console.log('【event_Siege_checkdate】Condition does not match.: siege_hh');
    }
  }
  else {
    console.log('【event_Siege_checkdate】Condition does not match.: daynow');
  }
  console.log('[value] daynow == ' + daynow + ', siege_hh == ' + siege_hh + ', siege_m == ' + siege_m);
//  else {
//    console.log('【event_Siege_checkdate】Conditions do not match: daynow')
//  }
}




///////////////
