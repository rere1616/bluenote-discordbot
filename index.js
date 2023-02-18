const Discord = require('discord.js');
const { Client, Collection, Intents, GatewayIntentBits, REST, Routes } = require("discord.js");
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

  var timestamp = moment().format('HH:mm:ss');
  var datenow = moment().format('YYYY-MM-DD');
  var daynow = moment().day();
  const week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

  console.log('\n')
  console.log('*************')
  console.log('The time now is..  ' + (datenow + ' (' + week[daynow] + ') ') + timestamp)
	console.log('Ready.');
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
    for (const file of commandFiles) {
      console.log('Setting commands..  ‘' + file + '’')
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );
    }
    for (const file of autoappFiles) {
      console.log('Running apps..  ‘' + file + '’')
      const autorun = await require(`./applications/${file}`);
    }

});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
