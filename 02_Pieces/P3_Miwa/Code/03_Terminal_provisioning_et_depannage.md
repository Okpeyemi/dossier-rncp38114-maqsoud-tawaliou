# Miwa Terminal : provisioning sur site et dépannage (extrait)
Source : https://github.com/MiwaHQ/miwa-platform/blob/main/apps/terminal/README.md · relu le 26/11/2026

Le terminal est une PWA : il conserve sa session localement, envoie les pointages à l'API et affiche l'état de la connexion.

## Créer le code depuis le dashboard
1. Dans le dashboard, ouvrir Terminaux (/terminaux).
2. Cliquer sur Ajouter un terminal, renseigner son nom et son point d'accès, puis le créer.
3. Afficher le code d'activation à usage court et le saisir sur l'écran « Code d'activation » de la tablette, puis cliquer sur « Activer le terminal ».
4. Contrôler le nom de l'établissement, du terminal et du point d'accès affichés, puis attendre l'écran « BADGEZ ICI ».

## Vérification de mise en service
- L'indicateur en bas d'écran doit afficher « Connecté » (heartbeat périodique vers l'API).
- Si le réseau tombe, l'écran indique une connexion perdue et annonce la synchronisation automatique des pointages en attente.
- Présenter un QR de test et tester « Saisir mon matricule » (parcours de secours).
- Appui long de deux secondes dans le coin : Réglages protégés par un PIN ; « Désactiver le terminal » efface la session locale et impose un nouveau code.

## Mode hors ligne (extrait)
L'installation PWA ajoute une coquille hors ligne pour l'interface et les actifs statiques ; elle ne rend pas l'API disponible sans réseau. Les pointages peuvent être mis en file localement lorsque la connexion tombe, puis synchronisés au retour du réseau.

## Dépannage
- « API injoignable » : réseau, serveur, HTTPS, CORS ou URL de build ; vérifier le Wi-Fi, l'URL affichée par le diagnostic et l'absence de contenu mixte.
- « Jeton du terminal refusé » : terminal désactivé, jeton révoqué ou mauvais environnement ; désactiver le terminal, générer un nouveau code depuis le dashboard, réactiver la tablette.
- Scan ou installation non proposés : vérifier HTTPS, permissions caméra et navigateur ; utiliser la saisie manuelle du matricule.
