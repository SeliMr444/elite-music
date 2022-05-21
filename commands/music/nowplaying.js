const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np','çalan'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}**, Şu anda çalan bir müzik yok.**`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('00ff6b');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Sonsuza' ? 'Sonsuz (Canlı Yayın)' : track.duration;

        embed.setDescription(`**Ses: ${queue.volume}%**\n**Süre: ${trackDuration}**\n**Döngü Modu ${methods[queue.repeatMode]}**\n**Müziği açan: ${track.requestedBy}**`);

        embed.setTimestamp();
        embed.setFooter('Selam ver aşkların en asil denk gelişine! Berkay 💖 Selim', message.author.avatarURL({ dynamic: true }));

        const saveButton = new MessageButton();

        saveButton.setLabel('Şarkıyı Kaydet');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};