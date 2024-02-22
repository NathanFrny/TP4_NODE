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
            // Créer un nouveau salon textuel
            const channel = await guild.channels.create({
                name: channelName,
                type: 0, // 0 correspond à un salon textuel
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            });

            // Informer l'utilisateur de la création du salon
            await interaction.reply(`Salon "${channelName}" créé avec succès !`);

            // Initialiser l'heure de la dernière activité
            let lastActivity = Date.now();

            // Surveiller les messages dans le salon
            const collector = channel.createMessageCollector({ time: 300000 }); // 5 minutes en millisecondes

            collector.on('collect', m => {
                console.log(`Message reçu dans ${channelName}: ${m.content}`);
                lastActivity = Date.now(); // Mise à jour de l'heure de la dernière activité à chaque message
            });

            collector.on('end', collected => {
                // Vérifier si le salon doit être supprimé (pas de messages pendant 5 minutes)
                if (Date.now() - lastActivity >= 300000) { // 5 minutes sans activité
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
