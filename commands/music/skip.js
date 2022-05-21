module.exports = {
    name: 'skip',
    aliases: ['s', 'geç', 'atla'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}**, Şu anda çalan bir müzik yok.**`);

        const success = queue.skip();

        return message.channel.send(success ? `**${queue.current.title}, İsimli şarkı atlandı.**` : `${message.author}**, Birşeyler ters gitti.**`);
    },
};