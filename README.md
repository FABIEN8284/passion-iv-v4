# PASSION IV — version statique riche

Site vitrine 100 % statique destiné à GitHub Pages.

## Structure
- `index.html` : page principale.
- `assets/css/styles.css` : styles.
- `assets/js/site.js` : menu, WhatsApp, sorties, galerie/lightbox, animations.
- `assets/data/sorties.js` : prochaines navigations confirmées uniquement.
- `assets/images/` : photographies WebP sélectionnées, favicon et image de partage.
- `404.html` : page 404 dédiée.
- `mentions-legales.html`, `confidentialite.html` : pages de travail à finaliser.
- `CONTENU-A-COMPLETER.md` : informations attendues de Chantal.
- `docs/` : inventaire de l'ancien site et compte rendu.

## Contact WhatsApp
Une seule variable pilote tous les boutons :

```js
const WHATSAPP = "33XXXXXXXXX";
```

Tant que cette valeur n'est pas remplacée par un numéro valide, tous les boutons et la section Contact restent masqués.

## Sorties
Modifier `window.PASSION_SORTIES` dans `assets/data/sorties.js`. Ne renseigner que des dates réellement confirmées. Le site génère ensuite les cartes, le message WhatsApp pré-rempli et le fichier `.ics` côté navigateur.

## Fonctionnement local
Le site peut être ouvert directement via `index.html`. Aucun build, serveur, framework ou installation n'est nécessaire.

## Publication
Ne pas publier, fusionner dans `main`, changer la visibilité du dépôt ou activer GitHub Pages sans validation explicite.
