// Dans un nouveau fichier de commande pour /pv
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pv')
        .setDescription('Affiche les points de vie actuels du monstre.'),
    async execute(interaction) {
        if (!global.lastEncounter || global.lastEncounter.hitPoints <= 0) {
            await interaction.reply('Aucun monstre en cours ou le monstre a été vaincu.');
        } else {
            await interaction.reply(`PV actuels du monstre : ${global.lastEncounter.hitPoints}.`);
        }
    },
};
