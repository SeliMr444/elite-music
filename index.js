const { Player } = require('discord-player');
const { Client, Intents, Channel, PartialTextBasedChannel } = require('discord.js');

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

global.client.config = require('./config');

global.player = new Player(global.client, global.client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

client.on("ready", () => {
    const { joinVoiceChannel } = require('@discordjs/voice');
 let guild = client.guilds.cache.get(global.client.config.rguild)
 const connection = joinVoiceChannel({
     channelId: global.client.config.rchannel,
     guildId: guild.id,
     adapterCreator: guild.voiceAdapterCreator,
 });
 })

if(global.client.config.token){
global.client.login(global.client.config.token).catch(e => {
console.log("Token hatalı!")
})
} else {
console.log("Token hatalı!")
}