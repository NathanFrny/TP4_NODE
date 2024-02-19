const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Affiche des informations sur l\'utilisateur.'),
    async execute(interaction) {
        const userName = interaction.user.username;
        const joinDate = interaction.member.joinedAt;
        await interaction.reply(`Nom de l'utilisateur : ${userName}, Date d'arrivée sur le serveur : ${joinDate}`);
    },
};
