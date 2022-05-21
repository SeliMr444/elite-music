module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`**Pong!**\n**${client.ws.ping}ms**`);
    },
};