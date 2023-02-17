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
    const guild = await client.guilds.cache.get(interaction.guild_id);
    const user = await client.users.cache.get(interaction.member.user.id);
    user.send(`${interaction.user}, invalid Access.`).then(console.log('<<admin.js>> ' + timestamp + ` Invalid attempting to access by ${interaction.user}`)).catch(console.error);
  },
};
