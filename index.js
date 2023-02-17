const Discord = require('discord.js');
const { Client, Collection, Intents, GatewayIntentBits } = require("discord.js");
const { token } = require("app/config.json");
const fs = require("fs");

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once('ready', () => {
	console.log('Ready.');
});

client.login(process.env.TOKEN);

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));


const autoappFiles = fs
  .readdirSync("./applications")
  .filter((file) => file.endsWith("_autorun.js"));



client.on("ready", async () => {
  {
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      await client.commands.set(command.data.name, command);
    }
  }
  {
    for (const file of autoappFiles) {
      const autorun = await require(`./applications/${file}`);
    }
  }

});
