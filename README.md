# PASSION IV — V1

Expérience photographique et inscriptions simples aux navigations. Cannes / Port Canto / Îles de Lérins. Livré le 13 octobre 2026.

## Accès

- Site : https://passion-iv-cannes.g20-fabien.chatgpt.site
- Administration : https://passion-iv-cannes.g20-fabien.chatgpt.site/admin
- Cette livraison est **privée, réservée au propriétaire**. Elle n'est pas encore un lien public sans connexion pour WhatsApp.
- Les trois navigations initiales sont des **démonstrations**. Utiliser des coordonnées fictives pour les essais.
- Première activation : ouvrir `/admin`, rester connecté avec le compte propriétaire, saisir le code privé remis dans la conversation. Ce code n'est pas dans les sources. L'identité devient l'administrateur unique ; le code ne peut plus attribuer de nouveau compte.

## Ce qui est construit

Grand hero sous voile, récit Lérins, catégories, liste filtrable des navigations, formulaire en panneau mobile, confirmation, espace Chantal, création/modification/annulation, correction/suppression des participations, export JSON. Aucune liste de noms ou de téléphones côté public.

Voir [docs/LIVRAISON.md](docs/LIVRAISON.md) pour le périmètre, les coûts, les contrôles et les limites.
Voir [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md) pour la publication, la sauvegarde et la reprise.

## Développement

Node >=22.13 ; Node 24 recommandé pour les tests `node:sqlite`. Utiliser le gestionnaire indiqué par `packageManager` dans package.json et pnpm-lock.yaml :

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
node --test tests/core.test.mjs
pnpm run build
```

Pour un checkout récupéré sur un poste personnel : configurer le profil portable avec l'outil Sites `configure-execution-profile.mjs` avant la prévisualisation, puis `pnpm run dev`. Le profil portable simule la connexion ChatGPT **uniquement en local**. Il n'est pas l'authentification de production. Sur l'environnement Work géré, utiliser exclusivement la prévisualisation Sites autorisée ; ne pas changer de profil pour contourner une limitation.

La base SQL est définie dans `db/schema.ts`. Les migrations sont dans `drizzle/`. Le métier est dans `lib/core.mjs`, les contrôles HTTP dans `lib/server.ts`, les API dans `app/api/`.

Les scripts d'installation/build Sites d'origine sont conservés. Aucun secret, aucune base de données de production et aucune coordonnée réelle ne sont inclus dans le code source.
