const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h','yardım','y'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('00ff6b');
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const commands = client.commands.filter(x => x.showHelp !== false);
        embed.addField(`Toplam ${commands.size} komut var.`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter(`Selam ver aşkların en asil denk gelişine! Berkay 💖 Selim`, message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};