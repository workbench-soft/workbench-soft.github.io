import type { Engineering } from './types';

export default {
  title: 'Comment le code est construit',
  intro:
    'Chaque repo suit les mêmes règles pour le code, les tests, les specs et les docs. Des agents de code font l’essentiel de la saisie, et les règles gardent leur travail court, vérifié et documenté.',
  numbers: {
    title: 'Le code aujourd’hui',
    source: 'Compté sur {repos} repos GitHub le {date}. Le calcul se relance à chaque déploiement et chaque nuit.',
    languages: 'Lignes par langage',
    other: 'Autres',
    metrics: {
      lines: ['Lignes de code', 'Lignes de source non vides, sans code généré ni code tiers copié.'],
      files: ['Fichiers source', 'Chaque fichier dans un langage de programmation.'],
      functions: ['Fonctions', 'Fonctions et méthodes nommées, lues dans l’arbre syntaxique.'],
      types: ['Types', 'Classes, interfaces, structs, enums et traits.'],
      tests: ['Tests', 'Cas de test en Vitest, Rust, Kotlin, Swift et Python.'],
      modules: ['Modules', 'Paquets npm, crates Rust et modules Gradle.'],
      smallFiles: ['Fichiers sous 100 lignes', 'La part des fichiers source qui respectent la règle des 100 lignes.'],
      medianLines: ['Fichier médian', 'La moitié des fichiers source ont ce nombre de lignes ou moins.'],
      specs: ['Specs', 'Specs de fonctions dans le dossier specs de chaque repo.'],
      docs: ['Pages de doc', 'Les README et les pages de chaque dossier docs.'],
      commits: ['Commits en 30 jours', 'Commits sur la branche main de chaque repo.'],
      prs: ['PR fusionnées en 30 jours', 'Pull requests fusionnées dans toute l’organisation.'],
    },
  },
  topics: [
    {
      id: 'code',
      title: 'Un code court et simple',
      lead: 'Le code se lit bien dès la première fois, et chaque fichier a un seul rôle.',
      points: [
        ['Moins de 100 lignes', 'un fichier reste sous 100 lignes. Un fichier plus long se découpe par rôle.'],
        ['Réutiliser d’abord', 'tout nouveau code commence par une recherche dans le repo et les paquets partagés.'],
        ['Bibliothèque d’abord', 'une bibliothèque maintenue passe avant du code écrit à la main.'],
        ['Paquets partagés', 'le code dont 2 apps ont besoin va dans un seul paquet que les deux installent.'],
        ['Strict', 'TypeScript tourne en mode strict, et les linters échouent au moindre avertissement.'],
      ],
    },
    {
      id: 'tests',
      title: 'Testé à chaque étape',
      lead: 'Un changement passe les mêmes contrôles sur le PC, en CI et sur un vrai téléphone.',
      points: [
        ['Avant le push', 'un hook git lance le lint, le contrôle du format et le contrôle des types.'],
        [
          'CI à chaque push',
          'les contrôles et le build de release démarrent ensemble. Un contrôle en échec annule le build.',
        ],
        ['Tests unitaires', 'Vitest, cargo test et les tests Gradle tournent dans chaque repo avec mise run test.'],
        [
          'Vrais appareils',
          'le travail fusionné s’installe sur un vrai téléphone ou s’ouvre dans un navigateur, parcours par parcours.',
        ],
        ['Tests des catalogues', 'un test échoue quand une langue n’a pas un texte que l’anglais a.'],
      ],
    },
    {
      id: 'specs',
      title: 'Une spec par fonction',
      lead: 'Chaque fonction a une spec dans le repo, écrite avant le code.',
      points: [
        ['Premier commit', 'la spec ou sa nouvelle entrée arrive avant tout code.'],
        [
          'Résumé en tête',
          'un court résumé ouvre le texte, puis les parcours, les modules, les données et les limites.',
        ],
        ['Historique dessous', 'chaque changement ajoute une entrée datée avec la raison, les fichiers et les étapes.'],
        ['Conservée', 'les specs restent après la fusion, donc la raison du code reste aussi.'],
      ],
    },
    {
      id: 'docs',
      title: 'Les docs dans le même changement',
      lead: 'Un changement met à jour chaque doc qu’il rend périmée, dans le même commit.',
      points: [
        ['Chaque repo', 'un README, un changelog, une liste de tâches et les specs.'],
        ['Chaque app', 'l’architecture avec des schémas, les parcours utilisateur et les fonctions.'],
        ['Contrôlées', 'un script vérifie que chaque fonction des docs a sa spec et sa ligne sur ce site.'],
        [
          'Mots simples',
          'docs, commits et PR suivent un seul guide d’écriture : la réponse d’abord, des phrases courtes.',
        ],
        ['9 langues', 'chaque texte vu par une personne sort en 9 langues dans le même changement.'],
      ],
    },
    {
      id: 'agents',
      title: 'Des agents de code avec des règles',
      lead: 'Claude Code, Codex et Kimi Code lisent les mêmes règles et les mêmes skills.',
      points: [
        ['Règles en fichiers', 'chaque repo a son AGENTS.md, et un fichier commun fixe la stack et l’organisation.'],
        ['Skills', 'un skill par tâche : livrer, relire, tester, publier. Les publics sont dans agent-skills.'],
        [
          'Une tâche, un worktree',
          'chaque session réserve ses fichiers, travaille dans son propre worktree git et fusionne par une PR.',
        ],
        ['Archon', 'un lanceur sur le PC démarre une session par tâche et montre ce que fait chacune.'],
        [
          'Leçons',
          'une étape qui a coûté un nouvel essai à un agent devient une règle, et la session suivante l’évite.',
        ],
      ],
    },
    {
      id: 'tools',
      title: 'Un outil par tâche',
      lead: 'Chaque repo utilise les mêmes outils aux mêmes versions.',
      points: [
        ['Épinglé', 'mise épingle la version de chaque outil, et les lockfiles sont dans git.'],
        ['Dernière stable', 'un nouvel outil démarre à sa dernière version stable.'],
        ['Mise à jour commune', 'un changement majeur d’un outil partagé va dans chaque repo qui l’utilise.'],
        ['Gratuit', 'chaque outil et chaque service est gratuit, ou reste dans son offre gratuite.'],
      ],
    },
  ],
  stack: {
    title: 'La stack',
    head: ['Tâche', 'Choix'],
    rows: [
      ['Apps mobiles et web', 'Expo, React Native et react-native-web, un seul code'],
      ['Apps de bureau', 'Tauri 2, avec une interface Vite et React sur un cœur Rust'],
      [
        'Logique de chaque plateforme',
        'une crate Rust, compilée en wasm pour le web et reliée par FFI pour les téléphones',
      ],
      ['Backend', 'Rust sur Cloudflare Workers, avec D1 et R2'],
      ['Données partagées en direct', 'Firestore avec Firebase Auth'],
      ['Sites statiques', 'Astro sur GitHub Pages'],
      ['Code natif Android', 'Kotlin et Jetpack Compose'],
      ['Scripts', 'TypeScript sur Node'],
      ['Contrôles TypeScript', 'Vitest, oxlint, oxfmt, knip et tsc'],
      ['Contrôles Rust', 'clippy, rustfmt et cargo-shear'],
    ],
  },
} satisfies Engineering;
