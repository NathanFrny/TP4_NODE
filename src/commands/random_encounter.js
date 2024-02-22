const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

global.lastEncounter = null;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('random_encounter')
        .setDescription("Permet de lancer une rencontre aléatoire dans l'univers de donjon et dragon."),
    async execute(interaction) {
        // URL de base de l'API D&D 5e - Changez cette URL selon l'API que vous utilisez
        const baseUrl = 'https://www.dnd5eapi.co/api/monsters/';
        
        try {
            // Récupère la liste des monstres
            const monsterListResponse = await request(`${baseUrl}`);
            const monsterList = await monsterListResponse.body.json();

            // Sélectionne un monstre aléatoire de la liste
            const randomIndex = Math.floor(Math.random() * monsterList.results.length);
            const randomMonsterName = monsterList.results[randomIndex].index;

            // Récupère les détails du monstre sélectionné
            const monsterResponse = await request(`${baseUrl}${randomMonsterName}`);
            const monsterDetails = await monsterResponse.body.json();

            let color = '#0099ff'; // Couleur par défaut
            switch (monsterDetails.alignment) {
                case 'lawful good':
                    color = '#00ff00'; // Vert
                    break;
                case 'neutral good':
                case 'chaotic good':
                    color = '#0077ff'; // Bleu clair
                    break;
                case 'lawful neutral':
                case 'true neutral':
                case 'chaotic neutral':
                    color = '#ffff00'; // Jaune
                    break;
                case 'lawful evil':
                case 'neutral evil':
                case 'chaotic evil':
                    color = '#ff0000'; // Rouge
                    break;
                default:
                    color = '#555555'; // Gris pour non spécifié ou inconnu
            }

            const encounterEmbed = new EmbedBuilder()
<<<<<<< Updated upstream
                .setColor('#0099ff')
                .setTitle(`Rencontre sauvage !`)
=======
                .setColor(color) // Définit la couleur de l'embed
                .setTitle(`Rencontre sauvage !`) // Définit le titre de l'embed
>>>>>>> Stashed changes
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
