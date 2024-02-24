const { Events, InteractionType } = require('discord.js');
const { paladin, voleur, barde, magicien, druide, mj, barbare } = require('../conf.json');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.type !== InteractionType.MessageComponent || !interaction.isButton()) return;
        const roleMap = {
            paladin: paladin,
            voleur: voleur,
            barde: barde,
            magicien: magicien,
            barbare: barbare,
            druide: druide,
            mj: mj,
        };

        const mjRoleId = mj;

        const roleId = roleMap[interaction.customId];
        if (!roleId) return;

        try {
            const member = await interaction.guild.members.fetch(interaction.user.id);

            const rolesToRemove = member.roles.cache.filter(role => Object.values(roleMap).includes(role.id) && role.id !== mjRoleId);
            await member.roles.remove(rolesToRemove);

            await member.roles.add(roleId);
            await interaction.reply({ content: `Vous avez choisi le rôle ${interaction.customId}!`, ephemeral: true });
        } catch (error) {
            console.error(`Erreur lors de la gestion du bouton ${interaction.customId}: ${error}`);
            await interaction.reply({ content: 'Erreur lors de la sélection du rôle.', ephemeral: true });
        }
    },
};
