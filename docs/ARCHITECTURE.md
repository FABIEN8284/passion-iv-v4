# PASSION IV — Architecture

## Frontend

React / Next compatible Vinext, styles CSS et médias statiques locaux.

## Backend

Routes serveur pour les navigations, inscriptions et administration. La logique métier est isolée dans `lib/core.mjs` et `lib/server.ts`.

## Données

Schéma Drizzle compatible SQLite / Cloudflare D1. Les migrations sont dans `drizzle/`.

## Administration

L'administration est protégée côté serveur. L'implémentation historique utilise l'identité ChatGPT Sites. Une migration hors Sites doit remplacer cette couche sans rendre les routes admin publiques.

## Portabilité

Le métier, les données SQL et l'interface sont portables. Les éléments spécifiques à Sites sont principalement l'authentification, le binding d'environnement et le pipeline de déploiement.
