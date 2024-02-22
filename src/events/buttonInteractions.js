const { Events, InteractionType } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.type !== InteractionType.MessageComponent || !interaction.isButton()) return;

        // Définir une carte des customId de boutons aux identifiants de rôle
        const roleMap = {
            paladin: '1209130698581999667',
            voleur: '1209130702008750111',
            barde: '1209130705246752829',
            magicien: '1209130703292203138',
            barbare: '1209130704034865215',
            druide: '1209130700385554432',
        };

        // Vérifier si le customId correspond à un rôle dans la carte
        const roleId = roleMap[interaction.customId];
        if (!roleId) return;

        try {
            // Récupérer le membre à partir de l'interaction
            const member = await interaction.guild.members.fetch(interaction.user.id);

            // Supprimer tous les rôles existants qui correspondent à la carte des rôles
            const rolesToRemove = member.roles.cache.filter(role => Object.values(roleMap).includes(role.id));
            await member.roles.remove(rolesToRemove);

            // Ajouter le nouveau rôle
            await member.roles.add(roleId);
            await interaction.reply({ content: `Vous avez choisi le rôle ${interaction.customId}!`, ephemeral: true });
        } catch (error) {
            console.error(`Erreur lors de la gestion du bouton ${interaction.customId}: ${error}`);
            await interaction.reply({ content: 'Erreur lors de la sélection du rôle.', ephemeral: true });
        }
    },
};
