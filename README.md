# TP4_NODE FOURNY Nathan

## Présentation

Ce bot permet de gérer des parties de Jeu de Rôle Donjons et dragons 5e éditions.  
Listes des API utilisés:  
* D&D5 API
* OpenAI API

## Initialisation du Bot.

Pour que le Bot **démarre correctement** il vous faudra d'abord remplir le **conf.json** avec les informations envoyés ultérieurement.  
Chaque variable vous est expliqué et les tokens nécessaires à son fonctionnement vous sont envoyés.  

Pour remplir les rôles de le fichier conf.json, il vous faut tout d'abord **lancer une première fois le bot** après avoir entrez les informations suivantes :
* clientId
* guildId
* token

Pour lancer le bot ouvrez deux terminaux à partir du dossier root du projet.  
Dans le premier terminal effectuez les commandes suivantes :  

```bash
cd src
node deploy-commande.js
```

Dans le second terminal effectuez la commande suivante :  

```bash
npm run dev
```

Normalement les différents rôles seront **automatiquement crée** à son lancement. Ensuite, **récupérez les ID** des différents rôles crées et **ajoutez les** dans les variables
du conf.json correspondantes.  
Une fois le conf.json entièrement remplis, le bot est désormais **opérationnel**.

Lorsque le Bot démarre, il va créer automatiquement tous les rôles nécessaires si ces derniers ne sont pas déjà présents.  

## Comment utiliser ?

### Commencer une partie

> Démarrer une nouvelle campagne ?

Pour démarrer une nouvelle campagne, entrez la commande : /campagne

> Sélectionner les rôles ?

Pour Visualiser et sélectionnez les rôles, entrez la commande : /role  
Cette dernière renvoie des boutons, il suffit de cliquer dessus pour récupérer le rôle.  
**Remarque: Sélectionner un nouveau rôle supprimera automatiquement l'ancien**

### Commande du Maître du jeu

> Générer une salle ?

Pour générer une nouvelle salle, il suffit d'entrer la commande : /random_room  
Un nouveau salon textuel sera crée. Ce dernier se supprimera automatiquement après 5 à 10 minutes d'inactivité.  
**Remarque: Seul un membre avec le rôle "Maître du jeu" pourra effectuer cette commande**

> Générer une rencontre avec un monstre ?

Pour générer une rencontre avec un monstre, entrez la commande : /random_encounter  
**Remarque: Seul un membre avec le rôle "Maître du jeu pourra effectuer cette commande**  
**Remarque: La rencontre est sauvegarder. Pour changer de rencontre effectuez une nouvelle fois la commande**

### Commande de jeu

> Lancer un dé 20 ?

Pour lancer un dé 20, effectuez la commande : /dice20

> Lancer un dé 8 (dé de dégât) ?

Pour lancer un dé 8, effectuez la commande : /dice8

> Visualiser les points de vie du monstre

Pour visualiser les points de vie du monstre, entrez la commande : /pv

### Tour de jeu

Pour que la partie se déroule convenablement, désignez un **Maître du jeu** (Ce dernier peut-être également un joueur).  

Démarrez une **campagne** et répartissez les **rôles** entre joueurs.  

Le maître du jeu peut : **Générer une salle** ou **Générer une rencontre**.  

Si le maître du jeu génère une rencontre alors les joueurs peuvent attaquer le monstre en lançant un **dé 20**.  
Si le dé 20 dépasse la statistique de **CA** (Classe d'Armure) du monstre, alors une attaque est **possible**.  
Pour lancer une attaque le joueur doit lancer un **dé 8**.  
Si le joueur lance un dé 8 sans avoir réussi un jet de dé20, la commande sera **refusé**.  

L'**objectif** des joueurs est de mettre les points de vie à **0**.  
Lorsqu'un monstre est **éliminé**, le maître du jeu peut soit **générer une salle** soit **redémarrer une nouvelle rencontre**.