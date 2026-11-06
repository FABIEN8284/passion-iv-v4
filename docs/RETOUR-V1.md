# Retour à la V1

Site existant : `appgprj_6ace7d08681c8191b997e6a5d73583cc`.

Commit V1 : `4e018c6cdcacb70c9b96eba3715f435d19cc22b8`.

Version Sites V1 archivée : `appgprj_6ace7d08681c8191b997e6a5d73583cc~appgver_abfb050e23048191b77c46806061498e`.

## Hébergement

Pour revenir au contenu V1, utiliser Sites `deploy_site_version` avec ce même `project_id` et ce `version_id`. Le site est public ; préserver cette audience. Vérifier la réponse puis le statut de déploiement si non terminal. Aucun second site à créer, aucun nouvel enregistrement de V1 nécessaire. Cette action n'a pas été exécutée pendant la V2.

## Code

Le tag local `passion-iv-v1` pointe vers le commit original. Un bundle Git indépendant `PASSION-IV-V1-source.bundle` a été conservé dans les livrables de la mission. Vérifier les éventuelles modifications locales avant de changer de référence ; ne pas utiliser de reset destructeur pour écraser des travaux.

## Données

Restaurer une version de site ne restaure pas la base applicative. La V2 ne modifie ni le schéma, ni les migrations, ni les tables existantes, ni les identités administrateur, ni les secrets de production. Les tests d'écriture se déroulent exclusivement dans la base locale avec des données fictives. Aucune sauvegarde SQL complète de production n'a été créée par cette mission. L'export JSON existant permet de sauvegarder navigations et participations, mais pas l'identité administrateur ni les compteurs techniques.
