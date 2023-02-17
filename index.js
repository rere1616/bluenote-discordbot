const Discord = require('discord.js');
const { Client, Collection, Intents, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var timestamp = moment().format('HH:mm:ss');
var datenow = moment().format('YYYY-MM-DD');
var daynow = moment().day();
const week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

client.once('ready', () => {
  console.log('*************')
  console.log('The time now is..  ' + (datenow + ' (' + week[daynow] + ') ') + timestamp)
	console.log('Ready.');
  console.log('*************')
  console.log(\n)
});

client.login(process.env.TOKEN);

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));


const autoappFiles = fs
  .readdirSync("./applications")
  .filter((file) => file.endsWith("_autorun.js"));



client.on("ready", async () => {
  {
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      await client.commands.set(command.data.name, command);
    }
  }
  {
    for (const file of autoappFiles) {
      const autorun = await require(`./applications/${file}`);
    }
  }

});
