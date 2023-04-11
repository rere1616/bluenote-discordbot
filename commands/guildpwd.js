const client = require("../index.js");
const { SlashCommandBuilder, Events } = require("discord.js");

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

///////////////  채널 ID

const { guildpwd } = require("../config.json");

/////////////// 최초 실행

module.exports = {
  data: new SlashCommandBuilder()
    .setName("길드가입")
    .setDescription("길드에 즉시 가입 가능한 비밀번호 받기"),
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

	if (interaction.commandName === '길드가입') {
    const userid = await `'${interaction.user.id}'`

    interaction.reply({ content: `${interaction.user.tag}, 길드 즉시가입 암호는 ` + guildpwd + ` 입니다.`, ephemeral: true });

	}
});
