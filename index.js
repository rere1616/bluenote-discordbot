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
    for (const file of commandFiles) {
      console.log(`Setting commands..  '` + file + `'`)
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      )
      .then(console.log('**[' + file + '] Successfully deployed.'))
      .catch(console.error);
    }
    for (const file of autoappFiles) {
      console.log(`Running apps..  '` + file + `'`)
      try {
        const autorun = await require(`./applications/${file}`);
      } catch (error) {
        console.error(error);
      }
    }

});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'auth') {
    const moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");
    const timestamp = moment().format('HH:mm:ss');
    await interaction.reply({ content: `${interaction.user.tag}, Invalid Access.`, ephemeral: true });
    console.log(`\n<<auth.js>> ` + timestamp + ` An invalid access attempt was made by ${interaction.user.tag}\n`)
	}
});
