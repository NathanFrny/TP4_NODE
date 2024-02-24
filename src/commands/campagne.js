const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('campagne')
        .setDescription("Permet de lancer une nouvelle campagne (créer un salon dédié) dans l'univers de donjon et dragon."),
    async execute(interaction) {
        const guild = interaction.guild;
        const channelNamePrefix = "Aventure_";
        const channels = guild.channels.cache.filter(channel => channel.name.startsWith(channelNamePrefix));
        const nextChannelNumber = channels.size + 1;
        const channelName = `${channelNamePrefix}${nextChannelNumber.toString().padStart(2, '0')}`;

        try {
            const channel = await guild.channels.create({
                name: channelName,
                type: 0,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            });

            await interaction.reply(`Salon "${channelName}" créé avec succès !`);

            let lastActivity = Date.now();

            const collector = channel.createMessageCollector({ time: 300000 });

            collector.on('collect', m => {
                console.log(`Message reçu dans ${channelName}: ${m.content}`);
                lastActivity = Date.now();
            });

            collector.on('end', collected => {
                if (Date.now() - lastActivity >= 300000) { 
                    channel.delete()
                        .then(deletedChannel => console.log(`Salon "${deletedChannel.name}" supprimé en raison de l'inactivité.`))
                        .catch(console.error);
                }
            });

        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de la tentative de créer une campagne.');
        }
    },
};
