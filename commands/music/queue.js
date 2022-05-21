const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q','liste','kuyruk', 'sıra'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}**, Şu anda çalan bir müzik yok.**`);

        if (!queue.tracks[0]) return message.channel.send(`${message.author}**, Sırada müzik yok.**`);

        const embed = new MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor('00ff6b');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Sunucu Müzik Listesi - ${message.guild.name}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1} - ${track.title} | ${track.author}** **(Müziği açan: <@${track.requestedBy.id}>)**`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `**ve ${songs - 5} diğer şarkı...**` : `**Listede ${songs} şarkı var.**`;

        embed.setDescription(`**Şu anda çalan: \`${queue.current.title}\`**\n\n**${tracks.slice(0, 5).join('\n')}**\n\n**${nextSongs}**`);

        embed.setTimestamp();
        embed.setFooter('Selam ver aşkların en asil denk gelişine! Berkay 💖 Selim', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};