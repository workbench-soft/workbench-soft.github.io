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
