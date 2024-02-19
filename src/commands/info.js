const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Affiche des informations sur l\'utilisateur ou le serveur.')
        .addSubcommand(subcommand =>
            subcommand.setName('user')
                .setDescription('Affiche des informations sur l\'utilisateur.')
                .addUserOption(option =>
                    option.setName('utilisateur')
                        .setDescription('L\'utilisateur à rechercher.')))
        .addSubcommand(subcommand =>
            subcommand.setName('server')
                .setDescription('Affiche des informations sur le serveur.')),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'user') {
            const user = interaction.options.getUser('utilisateur') || interaction.user;
            const joinDate = interaction.guild.members.cache.get(user.id).joinedAt;
            await interaction.reply(`Nom de l'utilisateur : ${user.username}, Date d'arrivée sur le serveur : ${joinDate}`);
        } else if (subcommand === 'server') {
            const serverName = interaction.guild.name;
            const memberCount = interaction.guild.memberCount;
            await interaction.reply(`Nom du serveur : ${serverName}, Nombre de membres : ${memberCount}`);
        }
    },
};
