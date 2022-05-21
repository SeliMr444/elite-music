const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['ara'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`${message.author}**, Lütfen geçerli bir şarkı ismi yazın.**`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`${message.author}**, Arama sonucu bulunamadı.**`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('00ff6b');
        embed.setAuthor(`Aranan Müzik: ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**[${i + 1}] Müzik: ${track.title} Kanal: ${track.author}**`).join('\n')}\n\n**Arasından bir şarkı seçin. \`1\` ile \`${maxTracks.length}\` arasında seç veya seçimi iptal etmek için \`iptal\` yaz.**`);

        embed.setTimestamp();
        embed.setFooter('Selam ver aşkların en asil denk gelişine! Berkay 💖 Selim', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 30000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'iptal') return message.channel.send(`**Arama iptal edildi.**`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`**Hata: bir şarkı seçin. \`1\` ile \`${maxTracks.length}\` arasında seç veya seçimi iptal etmek için \`iptal\` yaz.**`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`${message.author}**, Ses kanalına katılamıyorum.**`);
            }

            await message.channel.send(`**Müzik aramanız yükleniyor.**`);

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`${message.author}**, Şarkı arama zaman aşımı doldu.**`);
        });
    },
};