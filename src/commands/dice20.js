const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice20')
        .setDescription('Lance un dé 20 pour attaquer le monstre.'),
    async execute(interaction) {
        if (!global.lastEncounter) {
            await interaction.reply('Aucune rencontre en cours. Lancez d\'abord une rencontre !');
            return;
        }

        const roll = Math.floor(Math.random() * 20) + 1;
        if (roll >= global.lastEncounter.armorClass) {
            global.lastEncounter.attackSuccess = true;
            await interaction.reply(`Vous avez roulé un ${roll} et touché le monstre ! Utilisez maintenant /dice8 pour les dégâts.`);
        } else {
            await interaction.reply(`Vous avez roulé un ${roll}. C'est un échec.`);
            global.lastEncounter.attackSuccess = false;
        }
    },
};