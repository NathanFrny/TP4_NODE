const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice8')
        .setDescription('Lance un dé 8 pour les dégâts sur le monstre.'),
    async execute(interaction) {
        if (!global.lastEncounter || !global.lastEncounter.attackSuccess) {
            await interaction.reply('Vous n\'avez pas réussi votre attaque ou aucune attaque n\'a été lancée. Utilisez /dice pour attaquer.');
            return;
        }

        const damage = Math.floor(Math.random() * 8) + 1;
        global.lastEncounter.hitPoints -= damage;
        global.lastEncounter.attackSuccess = false;

        if (global.lastEncounter.hitPoints <= 0) {
            await interaction.reply(`Vous avez infligé ${damage} points de dégâts et vaincu le monstre !`);
            global.lastEncounter = null; // Réinitialise la rencontre
        } else {
            await interaction.reply(`Vous avez infligé ${damage} points de dégâts. PV restants du monstre : ${global.lastEncounter.hitPoints}.`);
        }
    },
};
