const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Affiche des informations sur le serveur.'),
    async execute(interaction) {
        const serverName = interaction.guild.name;
        const memberCount = interaction.guild.memberCount;
        await interaction.reply(`Nom du serveur : ${serverName}, Nombre de membres : ${memberCount}`);
    },
};
