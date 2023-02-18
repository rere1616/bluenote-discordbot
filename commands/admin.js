const client = require("../index.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var timestamp = moment().format('HH:mm:ss');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Access to the bot as authorized admin."),
    async execute(interaction) {
      await interaction.reply({ content: 'invalid Access.', ephemeral: true });
  	},
//    let guild = client.guilds.cache.get(interaction.guild_id);
//    let user = client.users.cache.get(interaction.user.id);
//    await user.send(`${interaction.user.username}, invalid Access.`).then(console.log('<<admin.js>> ' + timestamp + ` Invalid attempting to access by ${interaction.user.username}`)).catch(console.error);
};
