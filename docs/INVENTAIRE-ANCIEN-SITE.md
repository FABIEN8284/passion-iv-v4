# Inventaire de l'ancien site PASSION IV

Date : 6 novembre 2026.

## Sources de vérification
- Page en ligne `L'esprit à bord` lue directement dans le navigateur connecté.
- Autres pages et comportements vérifiés dans l'archive GitHub du site avant simplification, commit `6d3d61b041ea956aed0951c65be9080212770520`.
- La recherche Web publique n'a pas pu charger directement l'ensemble du domaine ChatGPT Sites ; les éléments non observés en direct sont donc qualifiés comme provenant de l'archive de code.

| Fonctionnalité / contenu | Ce qui existait | Bon point graphique / ergonomique | Réutilisable en statique | Décision / adaptation |
|---|---|---|---|---|
| Hero éditorial | PASSION IV, Cannes/Lérins, slogan « Naviguer, apprendre & partager » | Forte identité, grande photo, serif éditoriale | Oui | Repris, simplifié, aligné à gauche |
| Parcours Cannes → Port Canto → baie → Lérins | Ruban et séquences de destination | Donne un fil narratif clair | Oui | Repris dans l'expérience et le menu |
| Galerie | Plusieurs photos personnelles et quelques vues de destination | Beaucoup plus riche que la première vitrine statique | Oui | Reprise avec 9 photos et lightbox accessible |
| Liste des navigations | Liste dynamique filtrable par catégories | Donne immédiatement une raison de revenir sur le site | Oui | Recréée avec fichier statique de données, sans fausses dates |
| Catégories de sorties | Journée, Sunset, Régate, Événement, Autre | Filtres simples | Partiellement | Catégories non affichées comme offres tant que Chantal ne les confirme pas |
| Inscription / positionnement | Formulaire prénom, nom, téléphone, nombre de personnes, message | Parcours clair depuis une sortie | Non tel quel | Remplacé par WhatsApp pré-rempli, sans stockage serveur |
| Confirmation d'inscription | Écran de confirmation après enregistrement | Rassurant | Non nécessaire | Abandonné, WhatsApp sert de confirmation conversationnelle |
| Administration Chantal | Gestion des sorties et participations | Utile dans une application dynamique | Non | Abandonnée pour rester 100 % statique |
| Tarifs | Aucun tarif validé trouvé dans l'archive | — | Non tant que non confirmé | Aucun prix affiché |
| Paiement | Aucun paiement dans le parcours observé | Évite la complexité | Oui, par absence | Aucun paiement ajouté |
| Niveaux requis | Différents niveaux accueillis, participation selon conditions et équipage | Rassure les débutants | Oui | Repris dans Chantal, FAQ et pédagogie |
| Journée type | Se retrouver → repères → naviguer → profiter | Très lisible | Oui | Reprise sous forme de timeline |
| Chantal | Parcours depuis l'enfance, dériveurs, voiliers habitables, équipière/propriétaire/chef de bord | Humanise le site | Oui | Repris sans inventer de portrait |
| Fiche bateau | Hanse 315, dimensions, réservoirs, motorisation, foc autovireur, équipements déclarés | Contenu concret et documenté | Oui | Repris avec un seul bandeau de précision |
| Pédagogie / glossaire | 10 fiches : repères, vocabulaire, gilet, cordages, virement, cabestan, port, homme à la mer, mouillage, Lérins | Un des meilleurs éléments de l'ancien site | Oui | Les 10 fiches sont réintégrées en accordéons |
| FAQ | Niveau, tenue, affaires, arrivée, manœuvres, vocabulaire | Répond aux objections avant contact | Oui | Reprise intégralement, sans réponses inventées |
| Enfants / mal de mer / assurance | Aucune réponse vérifiée trouvée | — | Oui après validation | Ajouté à `CONTENU-A-COMPLETER.md` uniquement |
| Infos Port Canto | Base, rendez-vous, parking, météo | Très utile avant venue | Oui | Repris avec liens Ville de Cannes |
| Vidéos | Aucun lecteur vidéo intégré trouvé dans l'archive vérifiée | — | Oui | Nouvelle façade vers la chaîne YouTube, sans vidéo précise inventée |
| Témoignages | Aucun témoignage vérifié trouvé | — | Non | Aucun faux avis ajouté |
| Crédits / sources | Hanse, Ville de Cannes, sources pédagogiques, crédits photo | Très bon niveau de traçabilité | Oui | Conservé sous forme de liens et notes de source |
| Couleurs | Papier chaud, marine/vert sombre, sable | Plus éditorial que le bleu « template » | Oui | Palette marine + sable + laiton |
| Typographie | Georgia / serif + Arial | Sobre et lisible | Oui | Pile serif système + sans-serif système, sans dépendance externe |
| Animations | Apparitions au scroll, léger zoom photo, transitions | Sobres | Oui | Reprises avec `prefers-reduced-motion` |
| Mobile | Mise en page dédiée et CTA fixe | Bonne priorité mobile | Oui | Menu latéral/plein écran et barre WhatsApp conditionnelle |
| Ton | Tutoiement, direct, chaleureux | Cohérent avec un bateau personnel | Oui | Tutoiement uniformisé |
