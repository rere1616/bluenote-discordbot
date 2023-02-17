const path = require("path");
const { EmbedBuilder } = require('discord.js');


///////////////  채널 ID

const { chanID2 } = require("./config.json");

/////////////// 최초 실행
function initapprun() {
  var init_check = setTimeout(event_Siege_checkdate, 0)
  console.log('**[' + path.basename(__filename) + '] start')
}

module.exports = initapprun();

///////////////  시간 관련 변수

var moment = require('moment');

require('moment-timezone');

moment.tz.setDefault("Asia/Seoul");

const week = new Array('일', '월', '화', '수', '목', '금', '토');


///////////////  10분 단위 맞추기

var repeat;
var ontime_toggle;

async function ontime() {
    if (typeof ontime_toggle == 'undefined') {
      let ml = (10 - (parseInt(moment().format('mm')) % 10));
      console.log(path.basename(__filename) + '>> ontime call..')
      await ontime_switch(ml);
    }
    else if (ontime_toggle === 1) {
      await ontime_check(event_Siege_checkdate, 600000);
    }
}

function ontime_switch(t) {

  var msl = ((t * 60) * 1000);
  var ontime_check = setTimeout(event_Siege_checkdate, msl);
  console.log(path.basename(__filename) + '>> ontime called(' + t + ' min(s) later).')
  ontime_toggle = 1
  console.log(path.basename(__filename) + '>> toggle is switched to ' + ontime_toggle)
}

function ontime_check(fn, t) {
  if (ontime_toggle === 1) {
    var repeat = setInterval(eval(fn), t);
    console.log('**' + path.basename(__filename, '.js') + ' function will be operated every ' + (t / 1000) + ' secs.')
    ontime_toggle = 'n'
  }
//  else if (ontime_toggle === 'n')
}


///////////////  점령전 이벤트 알람


async function event_Siege_checkdate() {

  ontime();

  var datenow = moment().format('YYYY-MM-DD');
  var daynow = moment().day();
  var siege_hh = moment().format('HH');
  var siege_m = parseInt(moment().format('mm'));
  var siege_chanmsg;
  var timerdelmsg;
//  var msgid;

  if ((daynow == 6) || (daynow == 0)) {
    const hours = '12, 16, 18, 19, 22, 23';
    if (hours.includes(siege_hh) == true) {
      if ((siege_m > 29) && (siege_m <= 32)) {
        console.log('└event_Siege_checkdate>> siege_m meets conditions.: ');
//        let t = fs.readFileSync('tmp/siege_phrases.txt', {encoding:'utf8', flag:'r'});
//        siege_chanmsg = t.replace('time', (siege_hh + ':' + siege_m));
        let channel = client.channels.cache.get(chanID2);

        const siege_chanmsg = new EmbedBuilder()
        .setColor(0x004c9a)
        .setTitle(' ')
        //	.setURL('https://discord.js.org/')
        .setAuthor({ name: '점령 이벤트 알림', iconURL: 'https://cdn-lostark.game.onstove.com/uploadfiles/notice/f9a83e3dcea640118b47ae6e8d8a1370.png', url: 'https://lostark.game.onstove.com/GameGuide/Pages/%EA%B1%B0%EC%A0%90%20%EC%A0%90%EB%A0%B9%EC%A0%84#h5-5' })
        .setDescription(datenow + ' (' + week[daynow] + ')')
        .setThumbnail('https://ark.bynn.kr/assets/lostark/adventure_island3.png')
        .addFields(
          { name: '메데이아', value: ' ' },
//          { name: '\u200B', value: '\u200B' },
          { name: '슬라임 아일랜드', value: ' ', inline: true },
        )
        .setTimestamp()
        .setFooter({ text: '이 메세지는 3분 후 자동으로 삭제됩니다.' });

        await channel.send({ embeds: [siege_chanmsg] }).then(message => {
//          var msgid = message.id
          var timerdelmsg = setTimeout(() => {
            channel.messages.fetch(message.id).then(message => message.delete())
          }, 180000)
        });
        console.log('output messages...');
        console.log('└the message will be deleted in 3 mins.')

      }
      else {
        console.log('└event_Siege_checkdate>> Condition does not match.: siege_m');
      }
      //client.channels.cache.get(chanID2).send(siege_chanmsg);
    }
    else {
      console.log('└event_Siege_checkdate>> Condition does not match.: siege_hh');
    }
  }
  else {
    console.log('└event_Siege_checkdate>> Condition does not match.: daynow');
  }
//  console.log('[value] daynow == ' + daynow + ', siege_hh == ' + siege_hh + ', siege_m == ' + siege_m);
//  else {
//    console.log('【event_Siege_checkdate】Conditions do not match: daynow')
//  }
}




///////////////
