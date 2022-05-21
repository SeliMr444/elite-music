module.exports = {
    name: 'save',
    aliases: ['kaydet'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}**, Şu anda çalan bir müzik yok.**`);

        message.author.send(`**Kaydedilen parça: \`${queue.current.title}\` | Yayınlayan: ${queue.current.author}, Kaydedilen sunucu: ${message.guild.name}**`).then(() => {
            message.channel.send(`**Özel mesajla gönderdim.**`);
        }).catch(error => {
            message.channel.send(`${message.author}**, Size özel mesaj gönderilemiyor.**`);
        });
    },
};