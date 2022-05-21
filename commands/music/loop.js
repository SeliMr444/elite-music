const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'döngü'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}**, Şu anda çalan bir müzik yok.**`);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`${message.author}**, Mevcut müziğin döngü modunu devre dışı bırakmalısınız.** **(${client.config.px}loop)**`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `**Döngü Modu:** **${queue.repeatMode === 0 ? 'Aktif Değil' : 'Aktif'},** **Tüm sıra tekrarlanacak.**` : `${message.author}**, Birşeyler ters gitti.**`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`${message.author}**, Döngü modunda önce mevcut kuyruğu devre dışı bırakmalısınız.** **(${client.config.px}loop queue)**`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `**Döngü Modu:**  **${queue.repeatMode === 0 ? 'Aktif Değil' : 'Aktif'},** **Mevcut müzik tekrarlanacak.** **(Listedeki bütün müzikleri tekrarlatmak için \`${client.config.px}loop queue\` kullanınız.)**` : `${message.author}**, Birşeyler ters gitti.**`);
        };
    },
};