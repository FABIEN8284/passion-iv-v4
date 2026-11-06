# PASSION IV — État actuel

Mise à jour : 6 novembre 2026.

## Version de référence

- Version historique publiée : V2.
- Commit historique V2 : `c8c1c6f975c603e863a7d00542f73efc6478674f`.
- Commit historique V1 : `4e018c6cdcacb70c9b96eba3715f435d19cc22b8`.
- Source historique V2 conservée séparément sous forme de bundle Git.
- Archive de déploiement V2 conservée séparément.

## Production

- Hébergement actuel : ChatGPT Sites.
- Projet historique : `appgprj_6ace7d08681c8191b997e6a5d73583cc`.
- URL : `https://passion-iv-cannes.g20-fabien.chatgpt.site/`.
- Administration : `https://passion-iv-cannes.g20-fabien.chatgpt.site/admin`.

Aucun changement d'hébergement ou de domaine ne doit être considéré comme effectué tant que la nouvelle adresse publique n'a pas été testée.

## GitHub

- Dépôt : `FABIEN8284/passion-iv-v4`.
- `main` doit contenir la dernière version stable validée.
- `TEST` doit recevoir les évolutions avant publication.
- Une branche d'archive conserve l'ancien état initial du dépôt créé avant restauration.

## Drive

Le Drive conserve les photos originales, sélections, illustrations, sources documentaires, textes, sauvegardes de code et documents de pilotage. GitHub, et non Drive, est la référence du code éditable.

## Hébergement futur

La sortie de ChatGPT Sites est possible. La cible recommandée, si elle devient utile, est Cloudflare Workers + D1 car l'application utilise déjà une architecture Worker / D1. La migration ne doit pas être lancée avant de remplacer proprement l'authentification Sites et de tester une base de test.
