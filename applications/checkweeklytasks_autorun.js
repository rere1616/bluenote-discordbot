const client = require("../index.js");
const { EmbedBuilder } = require('discord.js');
const path = require("path");


///////////////  채널 ID

const { chanID1 } = require("../config.json");

/////////////// 최초 실행
function initapprun() {
  var init_check = setTimeout(Weekly_checkdate, 0)
  console.log('**[' + path.basename(__filename) + '] start')
};

module.exports = initapprun();

///////////////  시간 관련 변수

var moment = require('moment');

require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");

var timestamp;

var datenow = moment().format('YYYY-MM-DD');
var timenow = moment().format('HHmmss');
var daynow = moment().day();
const week = new Array('일', '월', '화', '수', '목', '금', '토');


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
  console.log('-------------')
  taskcount =  fs.readFileSync('tmp/WeeklyTasksCount.txt', {encoding:'utf8', flag:'r'});
  console.log('└Weekly_checkdate>> count_tasks>> check: original value..  ' + taskcount);
  taskcount_new = ccount[taskcount]
//  taskcount_new = parseInt(taskcount) + 1
  console.log('└Weekly_checkdate>> count_tasks>> check: counting complete. -- ' + taskcount_new);

  console.log('└Weekly_checkdate>> count_tasks>> Start updating count file...');
  update_count();

}

function update_count() {
  if (taskcount_new) {
    fs.writeFile('tmp/WeeklyTasksCount.txt', taskcount_new.toString(), 'utf8', function(err){
      if (err) throw err;
      else {
        console.log('└Weekly_checkdate>> update_count>> Update successed.');
      }
    });
    console.log('-------------');
  }
}


///////////////  10분 단위 맞추기

var repeat;
var ontime_toggle;

async function ontime() {
  var timestamp = moment().format('HH:mm:ss');

    if (typeof ontime_toggle == 'undefined') {
      let ml = (10 - (parseInt(moment().format('mm')) % 10));
      console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> ontime call..');
      await ontime_switch(ml);
    }
    else if (ontime_toggle === 1) {
      await ontime_check(Weekly_checkdate, 600000);
    }
}

function ontime_switch(t) {
  var timestamp = moment().format('HH:mm:ss');

  var msl = ((t * 60) * 1000);
  var ontime_check = setTimeout(Weekly_checkdate, msl);
  console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> ontime called(' + t + ' min(s) later).');
  ontime_toggle = 1
  console.log('└' + path.basename(__filename) + '>> toggle is switched to ' + ontime_toggle);
}

function ontime_check(fn, t) {
  if (ontime_toggle === 1) {
    var repeat = setInterval(eval(fn), t);
    console.log('**' + path.basename(__filename, '.js') + ' function will be operated every ' + (t / 1000) + ' secs.');
    ontime_toggle = `n`;
  }
//  else if (ontime_toggle === 'n')
}

///////////////  채널 출력 메세지 생성
/*
function loadmsn(t, n) {
  const readline = require('readline');
  const rl = readline.createInterface({
       input: fs.createReadStream(t)
  });
  return new Promise((resolve, reject) => {
    rl.on('line', function (line) {
      let taskcount = fs.readFileSync(n, {encoding:'utf8', flag:'r'})
      let s = line.split(':');
      var mission = s[taskcount];

      resolve(mission);
    })
  })
};
*/
const tlist = `:큐브, 고고학, 주화:큐브, 주화, 위험해역:큐브, 위험해역, 고고학`

///////////////  채널 출력 메세지 생성
function createmsg(t, d, m) {
  return new EmbedBuilder()
  .setColor(0x004c9a)
  .setTitle(' ')
  .setAuthor({ name: '길드 주간 목표 알림', iconURL: 'https://ark.bynn.kr/assets/lostark/quest_guild.png' })
  .setDescription(t + ' (' + d + ')')
  .addFields(
    { name: m, value: ' ' },
  )
  .setTimestamp();
}


///////////////  길드 주간 목표 알람
async function Weekly_checkdate() {

  ontime();

  var timestamp = moment().format('HH:mm:ss');
  var datenow = moment().format('YYYY-MM-DD');
  var timenow = moment().format('HHmmss');
  var daynow = moment().day();

//  const fileroute = 'tmp/taskslist.txt';
//  const readline = require('readline');
//  const rl = readline.createInterface({
//    input: fs.createReadStream('tmp/taskslist.txt')
//  });
//  var mission;

//  WeeklyTasksCount.txt 파일 읽기



  if (daynow == 3) {

    if((timenow >= 000000) && (timenow < 221000)) {
      let datenxt = moment().add(1, 'day')
//      let mission = await loadmsn('./tmp/taskslist.txt', './tmp/WeeklyTasksCount.txt');

      let tc = fs.readFileSync('./tmp/WeeklyTasksCount.txt', {encoding:'utf8', flag:'r'})
      let mission = tlist.split(':')[parseInt(tc)];

      let weekly_chanmsg = createmsg(datenxt.format('YYYY-MM-DD'), week[(daynow + 1)], mission);
      const channel = await client.channels.fetch(chanID1);
      channel.send({ embeds: [weekly_chanmsg] })
      .then(console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> Weekly_checkdate>> Outputting messages...'))
      .catch(console.error);


/*      rl.on('line', function (line) {
        s = line.split(':');
        //var mission = ('회랑, ' + s[taskcount]);
        console.log('└Weekly_checkdate>> [value] taskcount == ' + taskcount);
        console.log('└Weekly_checkdate>> finding txt...  ' + mission);

        var t = fs.readFileSync('tmp/phrases.txt', {encoding:'utf8', flag:'r'})
        t = t.replace('today', (datenxt.format('YYYY-MM-DD') + ' (' + week[(daynow + 1)] + ')'));
        chanmsg = t.replace('assignment', mission);

        client.channels.cache.get(chanID1).send(chanmsg);

        console.log('└Weekly_checkdate>> output messages...');
         // 채널에 메세지 출력
      });     */
    }
    else {
      console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> Weekly_checkdate>> Conditions do not match.: timenow');
    }
  }
  else if (daynow == 4) {

    if ((timenow >= 100000) && (timenow < 101000)) {
//      let mission = await loadmsn('./tmp/taskslist.txt', './tmp/WeeklyTasksCount.txt');

      let tc = fs.readFileSync('./tmp/WeeklyTasksCount.txt', {encoding:'utf8', flag:'r'})
      let mission = tlist.split(':')[parseInt(tc)];

      let weekly_chanmsg = await createmsg(datenow, week[daynow], mission);
      const channel = await client.channels.fetch(chanID1);
      channel.send({ embeds: [weekly_chanmsg] })
      .then(console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> Weekly_checkdate>> Outputting messages...'))
      .catch(console.error);


/*      rl.on('line', function (line) {
        s = line.split(':');
        var mission = ('회랑, ' + s[taskcount]);
        console.log('└Weekly_checkdate>> [value] taskcount == ' + taskcount);
        console.log('└Weekly_checkdate>> finding txt...  ' + mission);

        var t = fs.readFileSync('tmp/phrases.txt', {encoding:'utf8', flag:'r'})
        t = t.replace('today', (datenow + ' (' + week[daynow] + ')'));
        chanmsg = t.replace('assignment', mission);

        client.channels.cache.get(chanID1).send(chanmsg);
        console.log('└Weekly_checkdate>> output messages...  ' + chanmsg);
         // 채널에 메세지 출력
      });     */

      count_tasks();
      console.log('└Weekly_checkdate>> operate counter...');
      // 카운터 작동
    }
    else {
      console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> Weekly_checkdate>> Conditions do not match.: timenow');
    }
  }
  else {
    console.log('[' + timestamp + '] ' + path.basename(__filename) + '>> Weekly_checkdate>> Conditions do not match.: daynow');
  }
  console.log('------');
}

///////////////
