# Déploiement, activation et reprise

## Déploiement Sites — base historique V2

Identité à conserver : `appgprj_6ace7d08681c8191b997e6a5d73583cc` dans `.openai/hosting.json`.
Ne pas créer un autre Site lors d'une reprise. Base logique : `DB` ; aucune liaison R2.

1. Récupérer le dépôt source via Sites et son accès Git temporaire. Ne jamais coller le jeton dans les sources.
2. Installer les dépendances avec le script Sites `install-dependencies.mjs`, en préservant le lockfile. Hors environnement géré, utiliser le profil portable documenté par Sites.
3. Exécuter `node --test tests/core.test.mjs` et `pnpm exec tsc --noEmit`.
4. Si le schéma a changé, `pnpm run db:generate`, inspecter le nouveau SQL et les métadonnées. Ne jamais réécrire une migration appliquée.
5. Utiliser `build-site.mjs` pour produire le Worker et son manifeste. Le plugin de compilation Sites est conservé dans `vite.config.ts`.
6. Configurer les variables serveur secrètes `ADMIN_SETUP_TOKEN` (code aléatoire d'au moins 24 octets) et `RATE_SALT` (sel indépendant). Elles existaient dans le déploiement historique ; vérifier leur état réel avant toute nouvelle publication. Ne pas recréer le code à chaque publication.
7. Avec `site-workflow.mjs --project-id <id>`, transmettre les credentials via stdin et les commandes restantes. Le helper vérifie, commit, pousse et crée l'archive de déploiement.
8. Déployer avec Sites `save_version_and_deploy_private`, en utilisant exactement le commit poussé et l'archive. Sites applique les migrations D1 avant de charger le Worker.
9. Attendre le statut `succeeded`. Les modifications de variables d'environnement nécessitent aussi un déploiement pour prendre effet.
10. Ouvrir le site puis `/admin` connecté en tant que propriétaire. Saisir le code initial remis dans la conversation. La ligne `admins.slot=1` lie l'administration à cette identité ; toute autre identité reste refusée.
11. Faire la recette navigateur décrite dans LIVRAISON.md. Une compilation seule ne suffit pas.

## Passage à Chantal et ouverture publique

Ces opérations ne sont pas réalisées par cette livraison.

1. Valider la direction artistique et le parcours mobile avec Fabien.
2. Définir l'identité de Chantal et le mode de partage pris en charge par Sites. Ne jamais demander son mot de passe. Son identifiant Sites est spécifique au site et doit être obtenu par sa propre connexion.
3. Autoriser son identité côté serveur par une mise à jour contrôlée de la ligne d'administration, après accord du propriétaire. En V1 il n'y a qu'un administrateur : conserver une sauvegarde technique avant transfert. Ne jamais remplacer cette règle par « tout utilisateur connecté ».
4. Supprimer la variable `ADMIN_SETUP_TOKEN` après activation réussie, puis redéployer. Conserver `RATE_SALT`. Même avant cette suppression, une seconde activation est déjà bloquée par la contrainte de clé primaire.
5. Remplacer/annuler les sorties de démonstration, définir le contact et la conservation des données, vérifier les photos et les capacités réelles.
6. Obtenir l'accord explicite de Fabien pour l'ouverture publique, puis changer l'audience avec Sites. Le code public n'exige pas de compte participant ; seule l'administration le fait.
7. Tester sans connexion l'inscription et la non-exposition des participants ; tester l'admin avec une autre identité ; vérifier la vignette d'un lien WhatsApp.

## Sauvegarde et restauration

Chantal utilise « Télécharger une sauvegarde JSON ». Le fichier contient les téléphones : le conserver dans un emplacement privé. Faire une sauvegarde avant un transfert d'administration ou une modification structurelle.

Le fichier comprend `format`, `exportedAt`, `navigations`, `participants`. Les champs `positioned` sont calculés, à ignorer lors d'un import ; les dates de création doivent être conservées. Restaurer les navigations avant les participations, avec leurs identifiants d'origine, dans une base de test avant tout remplacement réel. L'identité administrateur et les compteurs antispam ne sont volontairement pas exportés par ce bouton.

La sauvegarde SQL intégrale D1 et sa restauration relèvent d'un accès technique à la base. Si migration vers un compte Cloudflare propre : employer l'export D1 officiel puis réimporter après contrôle. Cette V1 ne connecte pas de compte Cloudflare personnel.

## Migration vers un hébergement différent

Le code source complet et les images optimisées sont versionnés dans GitHub et sauvegardés dans Drive. Il faut adapter l'authentification, la liaison `DB` et le pipeline de déploiement ; les instructions SQL métier et le CSS restent réutilisables. Il ne suffit pas de téléverser les fichiers sur un hébergeur statique : il faut un serveur pour les données et les droits.

Ne pas considérer les quotas gratuits Cloudflare comme les conditions tarifaires automatiques de Sites. Aucun nouvel abonnement nécessaire n'est souscrit par cette livraison.
