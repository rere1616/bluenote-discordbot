const client = require("../index.js");
const { SlashCommandBuilder } = require('discord.js');

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Access to this bot as authorized admin."),
  async execute(interaction) {
    var timestamp = moment().format('HH:mm:ss');
    const guild = await client.guilds.cache.get(interaction.guild_id);
    const user = await client.users.cache.get(interaction.member.user.id);
    user.send(`${interaction.user}, invalid Access.`).then(console.log('<<admin.js>> ' + timestamp + ` Invalid attempting to access by ${interaction.user}`)).catch(console.error);
  },
};
