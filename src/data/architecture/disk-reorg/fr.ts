import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un outil en ligne de commande en TypeScript que Node lance sous Windows sans bundle. Chaque commande bâtit un plan de déplacements depuis une config privée, et un seul module applique chaque plan.',
  parts: [
    { name: 'Node', role: 'lance les fichiers TypeScript tels quels.' },
    { name: 'zod', role: 'vérifie le fichier de config des dossiers et des règles avant un passage.' },
    {
      name: 'Parcours des fichiers',
      role: 'liste les fichiers avec taille et date, 64 à la fois, et compte chaque chemin une fois.',
    },
    {
      name: 'Modules de règles',
      role: 'font de la config des déplacements pour les copies, les fichiers à jeter, le tri par thème et la boîte mensuelle.',
    },
    {
      name: 'Contrôles du plan',
      role: 'arrêtent un plan avec un conflit, un chemin répété ou une copie gardée avant le premier déplacement.',
    },
    {
      name: 'Déplaceur',
      role: 'crée les dossiers, renomme en cas de conflit et journalise chaque déplacement avant le suivant.',
    },
    { name: 'Fichiers CSV', role: 'le plan et le journal, avec un BOM pour qu’Excel lise les noms en cyrillique.' },
  ],
  flow: [
    'La personne lance une commande par mise, souvent d’abord à blanc.',
    'L’outil lit et vérifie la config privée.',
    'Il parcourt les dossiers et bâtit une liste de déplacements.',
    'Le plan va dans un CSV que la personne peut modifier.',
    'Le déplaceur applique le plan et journalise chaque déplacement pour l’annulation.',
  ],
  links: [{ to: 'GitHub', text: 'Lance les contrôles à chaque push sur main et publie une version avec des notes.' }],
  design: {
    scale: [
      "Le PC d'un développeur et ses partages réseau, et chaque exécution couvre les dossiers d'une config.",
      "Un gros partage a façonné la conception. Le hachage se fait par étapes, et une ligne de progression avec le temps restant s'affiche toutes les 5 secondes.",
    ],
    data: [
      'Une config JSON hors de git contient les dossiers et les règles. Le dépôt fournit config.example.json avec des chemins inventés.',
      'Chaque exécution écrit un CSV de plan avec From, To et une colonne Keep facultative, et un journal des déplacements avec From, To et Time.',
      'La commande inventory écrit un rapport Markdown des nombres, tailles, années, types de fichiers et copies probables.',
    ],
    interfaces: [
      'Une ligne de commande avec inventory, move, undo, dupes, candidates, sort et inbox, lue avec node:util parseArgs.',
      "Le CSV de plan est le contrat entre les commandes et le déplaceur, si bien qu'une personne peut le modifier et l'appliquer avec move.",
      "Chaque CSV commence par une marque d'ordre des octets UTF-8, pour qu'Excel et PowerShell 5.1 lisent bien les noms cyrilliques.",
    ],
    reliability: [
      "Une exécution s'arrête si son journal ne peut pas s'écrire, de sorte que chaque déplacement reste annulable. La ligne entre dans le journal avant le déplacement suivant.",
      "Entre lecteurs, un déplacement copie d'abord et supprime ensuite, donc une copie ratée laisse la source intacte.",
      "Un doublon dont la copie gardée a disparu reste en place, et l'exécution se termine par 1 si une copie gardée manque ensuite.",
    ],
    security: [
      "L'outil ne supprime aucun fichier. Une suppression le déplace sous la quarantaine avec son lecteur et son chemin conservés.",
      'inventory, candidates, sort et inbox ne lisent que noms, tailles et dates. dupes ne lit le contenu que pour le hacher.',
      "Il lit la config locale et les fichiers, n'appelle aucun réseau et ne stocke aucun jeton. Les vrais chemins restent hors de git.",
    ],
    performance: [
      'dupes groupe par taille, hache le premier 1 Mo, et ne lit en entier que les fichiers qui concordent encore.',
      'Le parcours lit les infos de fichiers 64 à la fois et compte chaque chemin une fois, donc des racines qui se recouvrent coûtent peu.',
      'Le hachage lit 4 fichiers à la fois et indique fichiers, gigaoctets, pourcentage et temps restant.',
    ],
    operations: [
      'Node 24 exécute les fichiers TypeScript tels quels, sans bundle, et mise lance chaque commande et chaque tâche.',
      'Les contrôles tournent à chaque push sur main, puis Release publie une version GitHub une fois les contrôles passés. Les exécutions sur pull request sont coupées.',
      'Un hook husky avant le push lance le lint et les tests. Les tests créent des dossiers temporaires et laissent les vrais tranquilles.',
    ],
    tradeoffs: [
      "Une quarantaine plutôt que la suppression ou la corbeille, pour qu'une règle fausse ne coûte qu'un déplacement en arrière, au prix d'un espace libéré seulement quand la personne vide la quarantaine.",
      "Un seul module de plan pour toutes les commandes plutôt que des contrôles dans chacune, pour qu'une copie gardée ou un déplacement en conflit arrête l'exécution à un seul endroit.",
      "Une config privée hors de git plutôt que des règles dans le dépôt, pour que les noms de dossiers restent sur le PC, au prix d'une copie manuelle vers un nouveau PC.",
      'TypeScript sur Node plutôt que les premiers scripts PowerShell, pour avoir des tests et des chemins dans la config.',
    ],
  },
  features: {
    'Folder report':
      'Le parcours lit les noms, tailles et dates des dossiers listés. L’outil écrit les comptes, années, types et copies probables dans un fichier Markdown.',
    'Duplicates to quarantine':
      'Les fichiers de même taille reçoivent un hash de leur premier 1 Mo, puis un SHA-256 complet. Des règles de chemin classent chaque copie, et la mieux classée reste.',
    'Files safe to drop':
      'Chaque règle teste un nom, un chemin ou un âge et nomme une catégorie de quarantaine. Un motif à garder l’emporte sur chaque règle.',
    'Sort into topic folders':
      'Une tâche de tri porte des règles pour dossiers et fichiers avec une cible pour chacune. Les entrées sans règle vont dans un dossier de repli, par exemple un par année.',
    'Monthly inbox':
      'L’outil lit les dates des entrées du dossier d’arrivée. Celles de plus de 30 jours vont dans un dossier au nom de leur mois.',
    'Plans, moves and undo':
      'Chaque passage écrit un CSV de plan et un journal. Le déplaceur vérifie le plan avant le premier déplacement, et l’annulation lit le journal pour remettre les fichiers en partant de la fin.',
  },
};

export default arch;
