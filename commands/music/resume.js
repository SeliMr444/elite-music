module.exports = {
    name: 'resume',
    aliases: ['devam'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`${message.author}**, Şu anda çalan bir müzik yok.**`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `**${queue.current.title}**, İsimli şarkı çalmaya devam ediyor.**` : `${message.author}**, Birşeyler ters gitti.**`);
    },
};