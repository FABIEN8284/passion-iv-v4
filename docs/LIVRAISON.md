# PASSION IV — livraison V1 du 13 octobre 2026

## Résultat et état réel

La V1 comprend le site public dans son code, le positionnement des participants, une administration sécurisée et une base D1 persistante provisionnée au déploiement. La publication de revue reste privée. L'administration doit être activée par le propriétaire à l'aide du code privé fourni séparément. L'accès de Chantal n'a pas été connecté.

Le fonctionnement métier et les requêtes SQL ont été testés sur SQLite local. La compilation de production et le contrôle TypeScript ont réussi. **Une compilation réussie n'est pas un test de navigation dans un navigateur.** Le parcours complet hébergé avec un téléphone n'a pas été vérifié, faute de navigateur de test disponible. Il reste à valider avant l'ouverture aux participants.

## Sources et photographie

Le document MÉTHODE — CHAT → WORK → CLAUDE → DRIVE → CHAT a été lu. Aucun transfert vers Claude n'a été effectué et aucun audit indépendant n'est revendiqué. Cette construction ne nécessitait pas d'envoyer les photos à un autre service créatif. Aucune modification des originaux.

Photos originales examinées :

| Original | Usage |
|---|---|
| 1000041319.jpg | Hero, bateau sous voile ; vignette de partage |
| 1000041289.jpg | Paysage aérien des îles de Lérins |
| 1000041290.jpg | Vue drone de Passion IV |
| 1000041291.jpg | Voilier en navigation, exemple événement |
| 1000041295.jpg | Intérieur du bateau |

Références examinées : 1000089086.jpg, 1000089087.jpg, 1000089088.jpg. Elles servent à la hiérarchie image/texte, à la respiration et à la retenue du mouvement. Elles ne sont pas intégrées au site. Aucun texte, logo ou cliché de référence n'est repris.

Les photos disponibles mesurent de 864 à 1536 pixels selon leur orientation. Les fichiers portant le suffixe 1920 n'ont pas été agrandis au-delà de leur définition native ; le suffixe désigne la largeur maximale de traitement. Versions WebP, chargement différé sauf hero, suppression des métadonnées EXIF par réencodage. Hero mobile ~40 Ko pour la petite variante, ~92 Ko pour la moyenne. Toutes les ressources photographiques web représentent environ 2 Mo ; un écran ne les charge pas toutes à leur taille maximale.

Direction : ivoire, encre sombre, grandes capitales et serif éditoriale, images dominantes. La mer conserve ses couleurs originales ; pas de turquoise ajouté. Animation initiale subtile, aucun écran d'attente bloquant. Mouvement supprimé avec prefers-reduced-motion.

## Architecture retenue et comparaison

| Option | Coût | Simplicité | Portabilité | Maintenance et sécurité |
|---|---|---|---|---|
| Site statique seul | Potentiellement gratuit | Très simple | Excellente | Insuffisant pour stocker des inscriptions privées et gérer Chantal |
| Application + SQLite sur un serveur personnel | Hébergeur à chiffrer | Serveur à administrer | Très bonne | Sauvegardes, mises à jour, TLS et authentification à entretenir |
| Application Sites / Worker + D1 | Pas de nouvel abonnement souscrit ; tarification Sites à confirmer | Hébergement intégré ici | Code récupérable, SQL et export JSON ; identité à adapter hors Sites | Infrastructure et connexion gérées, autorisation appliquée côté serveur |

Choix : troisième option pour rendre une V1 consultable sans connecter un compte d'hébergement externe. React/Vinext, CSS sans bibliothèque d'animation, SQLite compatible D1, photos statiques locales. Pas de paiement, analytics, API WhatsApp, CRM, compte participant ou service IA.

Deux tables métier : navigations et participations. Deux tables techniques : administrateur unique et limitation temporaire des tentatives. La capacité facultative saisie est un plafond d'organisation ; aucune capacité réglementaire n'est affirmée. La borne technique 100 du formulaire est une protection de saisie, pas une capacité du bateau.

**Portabilité réelle :** les images, styles et logique métier sont récupérables. D1 repose sur SQL compatible SQLite. En dehors de Sites, il faudra remplacer `app/chatgpt-auth.ts`, les en-têtes d'identité Sites et la liaison à la base. Ce n'est pas un transfert d'authentification automatique chez un autre hébergeur.

## Sécurité réalisée

- Tous les accès aux participations exigent une identité administrateur vérifiée côté serveur, pas un simple écran masqué.
- Le premier administrateur est enregistré avec un code aléatoire secret, à usage unique pour l'attribution de rôle. Son identifiant est lié au Site. La publication reste privée pendant cette activation.
- Les visiteurs ne reçoivent que les détails des navigations et le nombre total de personnes. Noms, messages et téléphones ne figurent pas dans la réponse publique.
- Inscriptions via POST JSON, origine identique obligatoire, champs bornés et validés, requêtes SQL paramétrées. React échappe les textes affichés.
- Attribution des places conditionnelle dans une seule instruction SQL ; évite un dépassement par concurrence.
- Identifiant d'envoi pour réessais et unicité du téléphone normalisé par navigation. Les variantes internationales d'un même numéro ne sont pas toutes rapprochées.
- Champ leurre antispam et limite de 20 tentatives par heure / empreinte IP salée. Les empreintes expirent au bout d'une heure et sont purgées lors des requêtes suivantes. Aucun IP brut enregistré par l'application. Les journaux d'infrastructure relèvent de l'hébergeur.
- Pas de secret dans le code client ; variables secrètes côté serveur. Réponses API sans cache.
- Suppression individuelle et export JSON uniquement dans l'administration.

## Tests effectués

21 tests automatisés passent, exécutant les fonctions de production et leurs instructions SQL contre une base SQLite en mémoire :

1. prénom requis ; 2. téléphone invalide ; 3. nombre entier positif ; 4. normalisation du téléphone ; 5. rejet du champ antispam ; 6. date/heure/catégorie/photo ; 7. création et modification d'une navigation ; 8. inscription enregistrée et lisible par la requête d'administration ; 9. absence de coordonnées dans la projection publique ; 10. capacité et état complet ; 11. deux demandes concurrentes ; 12. navigation annulée ; 13. complet manuel ; 14. réessai et doublon ; 15. correction, suppression et libération des places ; 16. refus de correction dépassant la capacité ; 17. refus de capacité réduite sous le total ; 18. identité non autorisée ; 19. activation unique ; 20. limitation de tentatives ; 21. données de démonstration et inscription.

Autres contrôles : TypeScript sans erreur ; build de production réussi ; inspection des tailles d'images ; inspection du code des formulaires, des labels, du dialog natif, des focus et des règles responsive/reduced-motion. Ces derniers sont des contrôles de code, pas des tests visuels.

## Tests non effectués et protocole de recette

Le navigateur de contrôle requis n'est pas disponible dans cet environnement. Aucun navigateur alternatif n'a été installé. Pas de score Lighthouse inventé, pas de capture présentée comme une validation.

| Test obligatoire | État |
|---|---|
| Ouverture réelle de la page dans un navigateur | À faire |
| Mobile 360, 390 et 430 px / desktop 1440 px | Règles CSS présentes ; rendu à vérifier |
| Scroll, animation, lien Prochaines navigations | Implémentés ; interaction à vérifier |
| Ouverture du panneau et focus / fermeture clavier | Dialog natif ; à vérifier en navigateur |
| Formulaire et erreurs | Validation serveur testée ; saisie tactile à vérifier |
| Inscription visible dans l'interface Chantal | Lecture SQL testée ; parcours hébergé à vérifier |
| Création/modification/annulation navigation | Métier testé ; interface à vérifier |
| Correction/suppression inscription | Métier testé ; interface à vérifier |
| Navigation complète | Blocage et total testés ; affichage à vérifier |
| Protection de l'administration | Contrôle de rôle testé ; connexion hébergée à vérifier |
| Téléphones non publics | Projection SQL testée ; audit HTTP hébergé à faire |
| Image manquante | Repli textuel implémenté ; événement de chargement à vérifier |
| Performances réseau mobile | Poids inspectés ; temps réel/Lighthouse non mesurés |
| Vignette WhatsApp | Open Graph préparé ; aperçu externe non testé, site encore privé |

Recette : ouvrir avec le compte propriétaire ; activer `/admin` ; utiliser une sortie DÉMONSTRATION ; saisir « Essai Fictif », un téléphone de test et 2 personnes ; vérifier l'entrée côté Chantal ; corriger à 1 ; supprimer après accord ; créer une navigation d'essai limitée à 1 ; remplir puis constater le blocage ; passer à ANNULÉ et constater le refus ; essayer l'administration sans authentification et avec un autre compte après configuration d'accès adéquate. Ne pas partager le code d'activation dans un groupe WhatsApp.

## Coûts et limites

Aucun abonnement, domaine ou achat effectué. Aucune API payante ajoutée. **Le tarif et les quotas de Sites pour ce compte ne sont pas documentés par les outils consultés : ne pas affirmer une gratuité perpétuelle.** Les limites suivantes concernent Cloudflare en direct, en cas de migration vers son offre gratuite ; elles ne prouvent pas les conditions commerciales de Sites.

Sources officielles consultées le 13/10/2026 :
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/d1/platform/pricing/

Workers Free : 100 000 requêtes/jour ; CPU par requête limité. D1 Free : 5 millions de lignes lues/jour, 100 000 lignes écrites/jour, 5 Go au total. Les index et opérations annexes consomment aussi des lignes. Au plafond gratuit D1, les requêtes échouent jusqu'à réinitialisation ou changement d'offre. Ces limites sont largement supérieures à quelques dizaines d'utilisateurs en usage normal, mais ce constat ne constitue pas une mesure de consommation du site livré. Un domaine, un plan payant ou un autre service nécessiterait un accord distinct.

## Informations à obtenir de Chantal

- Son accès administrateur choisi et l'identité à autoriser ; pas de partage de mot de passe personnel.
- Les véritables dates, horaires, descriptions et catégories à publier.
- Le plafond éventuel de participants par navigation, validé par elle.
- Les modalités exactes de participation aux frais et de pique-nique, sans montant inventé.
- Le contact à afficher pour demander une correction/suppression, le responsable et la durée de conservation des coordonnées.
- Confirmation des droits d'utilisation des photos avant diffusion publique.
- Qui conserve les sauvegardes et qui gère le site ensuite.

## Limites connues

- Privé pour revue : le parcours WhatsApp anonyme n'est pas encore ouvert. La vignette Open Graph ne sera pas récupérable par WhatsApp tant que l'accès est privé.
- Un seul administrateur en V1. Le premier accès sera celui de Fabien s'il active le site. Le passage à Chantal se fait par une opération contrôlée sur l'identité autorisée, pas en donnant le code déjà consommé.
- Choix photo parmi les cinq originaux fournis ; pas d'import de nouvelles photos dans l'interface. Ajouter une photo passe par le code et un redéploiement.
- Aucun SMS/mail automatique, conformément au périmètre. Le téléphone est cliquable côté Chantal.
- Les démos ne sont pas des sorties proposées réellement ; les essais sont réellement stockés et doivent être supprimés après recette si souhaité.
- Le JSON exporte les navigations et inscriptions ; l'import est une opération technique, pas un bouton UI. Pas de sauvegarde externe automatique configurée.
- Pas de suppression automatique selon une durée de conservation, à définir avant collecte réelle.
- Pas de validation de possession du numéro de téléphone. Le site signale un intérêt, pas une identité vérifiée ni une réservation commerciale.
- Les sorties passées ne sont pas archivées automatiquement.
- Les règles de sécurité applicatives ne remplacent pas une recette du déploiement et de la configuration d'accès.

## Améliorations possibles, non développées

Après retour réel : import de photos pour Chantal, politique de conservation automatique, export CSV si nécessaire, archivage des sorties passées. Ne rien ajouter avant d'avoir testé cette version simple.
