const Discord = require('discord.js');
const { Client, Collection, Intents, GatewayIntentBits, REST, Routes, Events } = require("discord.js");
const { clientId, guildId } = require('./config.json');
const fs = require("fs");

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once('ready', () => {

  const moment = require('moment');
  require('moment-timezone');
  moment.tz.setDefault("Asia/Seoul");

  const timestamp = moment().format('HH:mm:ss');
  const datenow = moment().format('YYYY-MM-DD');
  const daynow = moment().day();
  const week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

  console.log('\n')
  console.log('*************')
  console.log('The time now is..  ' + (datenow + ' (' + week[daynow] + ') ') + timestamp)
	console.log('Client Ready.');
  console.log('*************')
  console.log('\n')
});

module.exports = client;

client.login(process.env.TOKEN);

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));


const autoappFiles = fs
  .readdirSync("./applications")
  .filter((file) => file.endsWith("_autorun.js"));



  client.on("ready", async () => {

    {
      for (const file of autoappFiles) {
        const autoapp = await require(`./applications/${file}`);
      }
    }

  });
