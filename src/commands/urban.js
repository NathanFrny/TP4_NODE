const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Recherche un terme sur Urban Dictionary.')
        .addStringOption(option =>
            option.setName('terme')
                .setDescription('Le terme à rechercher.')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const term = interaction.options.getString('terme');
            // Utilisation de l'importation dynamique pour charger le module 'node-fetch'
            import('node-fetch').then(async fetchModule => {
                const fetch = fetchModule.default;
                const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${term}`);
                const data = await response.json();
                if (data.list && data.list.length > 0) {
                    const result = data.list[0];
                    const definition = result.definition;
                    await interaction.reply(`**${term}** : ${definition}`);
                } else {
                    await interaction.reply(`Aucune définition trouvée pour ${term}.`);
                }
            }).catch(error => {
                console.error(error);
                interaction.reply('Une erreur s\'est produite lors de la recherche sur Urban Dictionary.');
            });
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de la recherche sur Urban Dictionary.');
        }
    },
};
