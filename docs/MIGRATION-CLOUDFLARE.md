# PASSION IV — Plan de sortie de ChatGPT Sites

## Décision actuelle

Ne pas couper le site Sites tant qu'une alternative n'est pas fonctionnelle. La migration doit se faire en parallèle, avec retour arrière immédiat possible.

## Cible recommandée

**Cloudflare Workers + D1**, car le code actuel utilise déjà Wrangler, un Worker et un schéma D1/SQLite.

## Ce qui est réutilisable

- interface React ;
- routes publiques ;
- logique métier ;
- schéma SQL et migrations ;
- médias ;
- tests ;
- export JSON.

## Ce qui doit être remplacé ou contrôlé

1. `app/chatgpt-auth.ts` et toute dépendance aux en-têtes d'identité Sites ;
2. procédure d'attribution du rôle administrateur ;
3. configuration du binding D1 `DB` ;
4. secrets serveur (`RATE_SALT`, mécanisme de bootstrap admin si conservé) ;
5. politique CORS/origin et headers de sécurité ;
6. sauvegarde et restauration de la base ;
7. domaine et DNS ;
8. logs et politique de conservation des données.

## Procédure sûre

1. Créer un environnement Cloudflare de test distinct.
2. Créer une base D1 de test vide.
3. Appliquer les migrations.
4. Remplacer l'authentification Sites par une solution administrateur explicitement choisie.
5. Exécuter tous les tests automatisés.
6. Tester toutes les routes et l'administration avec données fictives.
7. Vérifier qu'aucune donnée participant n'est exposée par les API publiques.
8. Importer uniquement une sauvegarde contrôlée si nécessaire.
9. Configurer un sous-domaine ou domaine de test.
10. Comparer le site de test et le site Sites.
11. Basculer le domaine uniquement après validation explicite.
12. Conserver Sites pendant une période de retour arrière avant toute fermeture.

## GitHub Pages

GitHub Pages n'est pas une cible adaptée pour l'application complète : il peut héberger une partie statique, mais pas l'administration, les API privées et la base D1 sans services externes supplémentaires.
