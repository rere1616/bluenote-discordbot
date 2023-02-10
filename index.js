const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once('ready', () => {
	console.log('Ready.');
});

client.login(process.env.TOKEN);
