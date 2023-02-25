const client = require("../index.js");
const { SlashCommandBuilder, Events } = require("discord.js");

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

function compareid(v) {
  const fs = require('fs');
  const readline = require('readline');
  const rl = readline.createInterface({
       input: fs.createReadStream('./tmp/adminid.txt')
  });
  return new Promise((resolve, reject) => {
    rl.on('line', function (line) {
      if (line === v) { resolve(line); }
      else { return; }
    })
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
    const userid = await `'${interaction.user.tag}'`;

    let getverified = await compareid(userid);
    if (!getverified) {
      await interaction.reply({ content: `${interaction.user.tag}, Invalid Access.`, ephemeral: true });
      console.log(`\n<<auth.js>> ` + timestamp + ` An invalid access attempt was made by ${interaction.user.tag}\n`)
//      client.user.fetch('343282328858132484').send(`An invalid access attempt was made by ${interaction.user.tag}`)
    }
    else if(getverified) {
      await interaction.reply({ content: `${interaction.user.tag}, Logged on.`, ephemeral: true });
      console.log(`\n<<auth.js>> ` + timestamp + ` ${interaction.user.id} ${interaction.user.tag} has just logged on.\n`)
//      client.user.fetch('343282328858132484').send(`An invalid access attempt was made by ${interaction.user.tag}`)
    }
    else console.err
	}
});
