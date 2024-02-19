const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Affiche une image de chat aléatoire.'),
    async execute(interaction) {
        try {
            const catResult = await request('https://aws.random.cat/meow');
            const { file } = await catResult.body.json();
            await interaction.reply({ files: [file] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de la récupération de l\'image de chat.');
        }
    },
};
