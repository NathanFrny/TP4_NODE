const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

global.lastEncounter = null;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('random_encounter')
        .setDescription("Permet de lancer une rencontre aléatoire dans l'univers de donjon et dragon."),
    async execute(interaction) {
        const masterRole = interaction.member.roles.cache.some(role => role.name === 'Maître du jeu');

        if (!masterRole) {
            await interaction.reply({ content: "Vous n'avez pas les permissions nécessaires pour utiliser cette commande.", ephemeral: true });
            return;
        }
        const baseUrl = 'https://www.dnd5eapi.co/api/monsters/';
        
        try {
            const monsterListResponse = await request(`${baseUrl}`);
            const monsterList = await monsterListResponse.body.json();

            const randomIndex = Math.floor(Math.random() * monsterList.results.length);
            const randomMonsterName = monsterList.results[randomIndex].index;

            const monsterResponse = await request(`${baseUrl}${randomMonsterName}`);
            const monsterDetails = await monsterResponse.body.json();

            let color = '#0099ff';
            switch (monsterDetails.alignment) {
                case 'lawful good':
                    color = '#00ff00';
                    break;
                case 'neutral good':
                case 'chaotic good':
                    color = '#0077ff';
                    break;
                case 'lawful neutral':
                case 'true neutral':
                case 'chaotic neutral':
                    color = '#ffff00'; 
                    break;
                case 'lawful evil':
                case 'neutral evil':
                case 'chaotic evil':
                    color = '#ff0000'; 
                    break;
                default:
                    color = '#555555';
            }

            const encounterEmbed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`Rencontre sauvage !`)
                .addFields(
                    { name: 'Nom', value: monsterDetails.name },
                    { name: 'Type', value: monsterDetails.type, inline: true },
                    { name: 'Alignement', value: monsterDetails.alignment, inline: true },
                    { name: 'Points de Vie (PV)', value: String(monsterDetails.hit_points), inline: true },
                    { name: 'Classe d\'Armure (CA)', value: String(monsterDetails.armor_class[0].value), inline: true }
                )
                .setFooter({ text: 'Soyez prudents, aventuriers !' });

            await interaction.reply({ embeds: [encounterEmbed] });

            global.lastEncounter = {
                attackSuccess: false,
                name: monsterDetails.name,
                armorClass: monsterDetails.armor_class[0].value,
                hitPoints: monsterDetails.hit_points,
                maxHitPoints: monsterDetails.hit_points,
            };
            
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de la tentative de lancer une rencontre aléatoire.');
        }
    },
};
