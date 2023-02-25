const client = require("../index.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("auth")
    .setDescription("Access to the bot as authorized admin."),
    async execute(interaction) {
      await interaction.reply({ content: `Invalid Access.`, ephemeral: true });
  	},
//    let guild = client.guilds.cache.get(interaction.guild_id);
//    let user = client.users.cache.get(interaction.user.id);
//    await user.send(`${interaction.user.username}, invalid Access.`).then(console.log('<<admin.js>> ' + timestamp + ` Invalid attempting to access by ${interaction.user.username}`)).catch(console.error);
};

/////////////////////////////////
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
