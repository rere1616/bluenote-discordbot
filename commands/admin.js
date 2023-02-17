const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Access to the bot as authorized admin."),
  async execute(interaction) {
    const guild = await client.guilds.cache.get(interaction.guild_id);
    const user = await client.users.cache.get(interaction.member.user.id);
    user.send(`${interaction.user}, invalid Access.`).catch(console.error);
  },
};
