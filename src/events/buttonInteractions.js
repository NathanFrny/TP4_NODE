const { Events, InteractionType } = require('discord.js');
const { paladin, voleur, barde, magicien, druide, mj, barbare } = require('../conf.json');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.type !== InteractionType.MessageComponent || !interaction.isButton()) return;
        // Définir une carte des customId de boutons aux identifiants de rôle
        const roleMap = {
            paladin: paladin,
            voleur: voleur,
            barde: barde,
            magicien: magicien,
            barbare: barbare,
            druide: druide,
            mj: mj,
        };

        // ID du rôle "Maître du jeu" pour l'exclure de la suppression
        const mjRoleId = mj;

        // Vérifier si le customId correspond à un rôle dans la carte
        const roleId = roleMap[interaction.customId];
        if (!roleId) return;

        try {
            // Récupérer le membre à partir de l'interaction
            const member = await interaction.guild.members.fetch(interaction.user.id);

            // Supprimer tous les rôles existants qui correspondent à la carte des rôles, sauf le rôle "Maître du jeu"
            const rolesToRemove = member.roles.cache.filter(role => Object.values(roleMap).includes(role.id) && role.id !== mjRoleId);
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
