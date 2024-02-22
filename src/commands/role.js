const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription("Permet de choisir son rôle"),
    async execute(interaction) {
        // Première ligne de boutons
        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('paladin')
                    .setLabel('Paladin')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('voleur')
                    .setLabel('Voleur')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('barde')
                    .setLabel('Barde')
                    .setStyle(ButtonStyle.Primary)
            );

        // Deuxième ligne de boutons
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('magicien')
                    .setLabel('Magicien')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('barbare')
                    .setLabel('Barbare')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('druide')
                    .setLabel('Druide')
                    .setStyle(ButtonStyle.Success)
            );

        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('mj')
                    .setLabel('Maître du jeu')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ content: "Choisissez votre rôle :", components: [row1, row2, row3] });
    },
};
