const client = require("../index.js");
const { SlashCommandBuilder, Events } = require("discord.js");

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

async function compareid(v) {
  const fs = await require('fs');
  const readline = await require('readline');
  const rl = await readline.createInterface({
       input: fs.createReadStream('./tmp/adminid.txt')
  });
  rl.on('line', function (line) {
    if (line === v) { return v; }
    else { return; }
  })
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("auth")
    .setDescription("Access to the bot as authorized admin."),
//    async execute(interaction) {
//      await interaction.reply({ content: `Invalid Access.`, ephemeral: true });
//  	},
//    let guild = client.guilds.cache.get(interaction.guild_id);
//    let user = client.users.cache.get(interaction.user.id);
//    await user.send(`${interaction.user.username}, invalid Access.`).then(console.log('<<admin.js>> ' + timestamp + ` Invalid attempting to access by ${interaction.user.username}`)).catch(console.error);
};

/////////////////////////////////
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'auth') {
    const timestamp = await moment().format('HH:mm:ss');
    const userid = await `'${interaction.user.tag}'`
    compareid(userid).then(console.log,console.err)
//    else if () {
//      await interaction.reply({ content: `${interaction.user.tag}, Invalid Access.`, ephemeral: true });
//      console.log(`\n<<auth.js>> ` + timestamp + ` An invalid access attempt was made by ${interaction.user.tag}\n`)
//    }

	}
});
