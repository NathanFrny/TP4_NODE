const { SlashCommandBuilder } = require('discord.js');
const { gptToken } = require('../conf.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random_room')
        .setDescription("Permet de générer une salle aléatoire dans l'univers de donjon et dragon."),
    async execute(interaction) {
        // Envoyer un accusé de réception de l'interaction
        await interaction.deferReply(); // Cette fois, la réponse n'est pas éphémère car nous voulons que tout le salon voie le message

        // Importation dynamique de node-fetch à l'intérieur de la fonction asynchrone
        const fetch = (await import('node-fetch')).default;

        const prompt = `Génére moi un exemple de description de salle avec une description pour les éléments suivants :

        Globale :
        Lorsqu'on fouille :
        Perception:
        Perception Critique:
        `;

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${gptToken}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: prompt,
                    max_tokens: 1024,
                    temperature: 0.7,
                })
            });
            const data = await response.json();
            console.log(data.choices[0].text);
            if (data.choices && data.choices.length > 0) {
                await interaction.editReply(data.choices[0].text);
            } else {
                await interaction.editReply("Désolé, je n'ai pas pu générer une description de salle.");
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply("Une erreur s'est produite lors de la génération de la description.");
        }        
    },
};
