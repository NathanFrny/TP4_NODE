const { Events, Colors } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.guilds.cache.forEach(async (guild) => {
            console.log(`Initialisation des rôles sur le serveur : ${guild.name}`);

            const roles = [
                { name: 'Paladin', color: Colors.Yellow },
                { name: 'Druide', color: Colors.Green },
                { name: 'Voleur', color: Colors.DarkGrey },
                { name: 'Magicien', color: Colors.Purple },
                { name: 'Barbare', color: Colors.Red },
                { name: 'Barde', color: Colors.Fuchsia },
                { name: 'Maître du jeu', color: Colors.Teal}
            ];

            for (const role of roles) {
                try {
                    const existingRole = guild.roles.cache.find(r => r.name === role.name);
                    if (!existingRole) {
                        await guild.roles.create({
                            name: role.name,
                            color: role.color,
                            reason: 'Rôle ajouté automatiquement par le bot',
                        });
                        console.log(`Rôle ${role.name} créé avec succès sur ${guild.name}.`);
                    } else {
                        console.log(`Le rôle ${role.name} existe déjà sur ${guild.name}.`);
                    }
                } catch (error) {
                    console.error(`Erreur lors de la création du rôle ${role.name} sur ${guild.name} :`, error);
                }
            }
        });
    },
};
