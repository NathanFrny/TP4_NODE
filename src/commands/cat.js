const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Affiche une image aléatoire.'),
    async execute(interaction) {
        try {
            const seed = Math.floor(Math.random() * 1000);
            const h = Math.floor(Math.random() * 500) + 100; 
            const w = Math.floor(Math.random() * 500) + 100; 

            const imageUrl = `https://picsum.photos/seed/${seed}/${w}/${h}`;

            const imageEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Image aléatoire') 
                .setImage(imageUrl) 
                .setFooter({ text: 'Image fournie par Picsum Photos' });

            await interaction.reply({ embeds: [imageEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de la tentative d\'afficher une image aléatoire.');
        }
    },
};
