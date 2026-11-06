# PASSION IV — Guide de reprise technique

## Objectif

Pouvoir reprendre le site sans réanalyser tout le projet et sans confondre code, photos originales, sauvegardes et production.

## Sources de vérité

1. **GitHub** : code, branches, commits et documentation technique.
2. **Google Drive PASSION IV** : originaux, sources, textes, archives et sauvegardes ZIP.
3. **Site public** : preuve du rendu réellement publié, jamais source du code.

## Avant toute modification

1. Lire `docs/ETAT-ACTUEL.md`.
2. Vérifier le HEAD réel de `main` et de `TEST`.
3. Identifier le dernier ZIP stable archivé dans Drive.
4. Vérifier que la modification demandée n'existe pas déjà.
5. Ne jamais travailler directement sur la production si une branche TEST suffit.

## Méthode normale

1. Créer ou actualiser `TEST` depuis `main`.
2. Modifier uniquement le périmètre demandé.
3. Exécuter les tests métier, tests HTTP, contrôle TypeScript et build.
4. Vérifier les routes et les médias.
5. Faire une prévisualisation réelle PC/mobile.
6. Conserver les résultats et limites dans la documentation.
7. Obtenir validation avant fusion vers `main` et avant publication.
8. Après publication, contrôler l'adresse publique réellement servie.
9. Créer un ZIP stable correspondant au commit publié et l'archiver dans Drive.

## Sauvegardes

Ne jamais mettre dans le ZIP stable :

- `.git/` ;
- `node_modules/` ;
- `.next/`, `.vinext/`, `dist/` ;
- `.wrangler/`, `.sites-runtime/` ;
- `.env*` ou secrets ;
- `*.tsbuildinfo` ;
- base de production ou export participant non anonymisé.

Conserver séparément les bundles Git historiques lorsqu'ils contiennent un historique antérieur impossible à reproduire autrement.

## Photographies

Les originaux restent dans Drive. Les fichiers optimisés nécessaires au site sont versionnés dans `public/photos`. Ne jamais remplacer un original par un dérivé WebP.

## Données personnelles

Les inscriptions contiennent des numéros de téléphone. Les exports de sauvegarde sont privés. Ne jamais les committer sur GitHub ni les mettre dans une archive publique.
