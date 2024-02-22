const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Affiche une image aléatoire.'),
    async execute(interaction) {
        try {
            // Générer des valeurs aléatoires pour seed, h (hauteur), et w (largeur)
            const seed = Math.floor(Math.random() * 1000);
            const h = Math.floor(Math.random() * 500) + 100; // Hauteur entre 100 et 600
            const w = Math.floor(Math.random() * 500) + 100; // Largeur entre 100 et 600

            // Construire l'URL avec les valeurs aléatoires
            const imageUrl = `https://picsum.photos/seed/${seed}/${w}/${h}`;

            // Créer un embed et définir l'URL de l'image comme image de l'embed
            const imageEmbed = new EmbedBuilder()
                .setColor('#0099ff') // Vous pouvez personnaliser la couleur
                .setTitle('Image aléatoire') // Vous pouvez personnaliser le titre
                .setImage(imageUrl) // Définir l'image
                .setFooter({ text: 'Image fournie par Picsum Photos' }); // Pied de page personnalisable

            // Envoyer l'embed dans la réponse
            await interaction.reply({ embeds: [imageEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de la tentative d\'afficher une image aléatoire.');
        }
    },
};
