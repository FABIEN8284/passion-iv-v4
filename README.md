# PASSION IV — Cannes / Port Canto / Îles de Lérins

Site de présentation et d'inscription aux navigations de **Passion IV**, Hanse 315 basé à Port Canto (Cannes).

## Référence technique

- Dépôt officiel : `FABIEN8284/passion-iv-v4`
- Version historique V2 publiée : `c8c1c6f975c603e863a7d00542f73efc6478674f`
- Hébergement actuel : ChatGPT Sites
- URL actuelle : `https://passion-iv-cannes.g20-fabien.chatgpt.site/`
- Administration : `/admin`
- `main` = version stable de référence
- `TEST` = développement et validation avant toute publication

Le dépôt GitHub est la **référence du code**. Google Drive conserve les originaux, sources, documents, sauvegardes et archives. Aucune publication ne doit être effectuée directement depuis une modification non testée.

## Fonctions principales

- présentation de Passion IV, Cannes, Port Canto et des Îles de Lérins ;
- fiches pédagogiques pour débutants ;
- prochaines navigations ;
- inscription simple sans paiement ;
- espace administrateur protégé ;
- création / modification / annulation des navigations ;
- gestion des inscriptions ;
- export JSON de sauvegarde.

Les données privées des participants ne doivent jamais être exposées publiquement.

## Stack

Application React / Next / Vinext déployée sous forme de Worker, avec base compatible Cloudflare D1 / SQLite. La version actuelle dépend de l'authentification fournie par l'environnement Sites ; une migration hors Sites nécessite donc d'adapter l'authentification et le déploiement, pas de réécrire le métier.

## Reprendre le projet

Lire dans cet ordre :

1. `docs/ETAT-ACTUEL.md`
2. `docs/REPRISE.md`
3. `docs/DEPLOIEMENT.md`
4. `docs/MIGRATION-CLOUDFLARE.md`
5. `docs/SOURCES-V2.md`
6. `docs/RETOUR-V1.md`

## Installation locale

Node >= 22.13 et pnpm défini dans `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
node --test tests/core.test.mjs
node --test tests/http-v2.test.mjs
pnpm run build
```

Les fichiers `.env*`, `node_modules`, `.next`, `.vinext`, `dist`, `.wrangler`, `.sites-runtime` et `*.tsbuildinfo` ne doivent pas être versionnés.

## Règle de publication

Toute évolution passe d'abord par `TEST`. Une publication vers la production nécessite une validation explicite, puis un contrôle réel de l'URL publique sur ordinateur et mobile.
