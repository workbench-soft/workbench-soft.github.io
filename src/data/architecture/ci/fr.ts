import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "Un dépôt GitHub privé d'étapes partagées que chaque dépôt de l'organisation appelle depuis ses propres workflows. Une action composite installe les outils, et des workflows réutilisables fusionnent les PR de Dependabot et compilent pour le simulateur iPhone.",
  parts: [
    {
      name: 'Action composite',
      role: "l'étape d'installation qui tourne dans le job de l'appelant et pose les outils et paquets épinglés.",
    },
    { name: 'mise', role: 'installe chaque outil dans la version que le dépôt épingle.' },
    {
      name: 'pnpm',
      role: 'installe les paquets depuis le lockfile et les copie sous Windows au lieu de liens physiques.',
    },
    {
      name: 'Workflows réutilisables',
      role: "la fusion Dependabot et le build pour le simulateur iOS qu'appelle chaque dépôt d'app.",
    },
    { name: 'Script Node', role: "liste les pièces Android seulement d'une app qui n'ont pas de plan iOS." },
    {
      name: 'Runner macOS et Maestro',
      role: "compilent l'app pour le simulateur iPhone et jouent ses parcours de test.",
    },
    {
      name: 'Scripts de release',
      role: 'des scripts shell qui choisissent le tag daté et écrivent les notes à partir des commits.',
    },
  ],
  flow: [
    "Un workflow d'un dépôt d'app appelle une étape d'ici sur main.",
    "GitHub charge l'étape depuis ce dépôt pour ce run.",
    "L'étape d'installation pose les outils épinglés, puis les paquets.",
    "Les propres checks de l'appelant suivent dans le même job.",
    'Un correctif fusionné ici atteint chaque dépôt à son prochain run.',
  ],
  links: [
    { to: 'GitHub Actions', text: "Chaque dépôt de l'organisation appelle ces étapes depuis ses propres workflows." },
    {
      to: 'local-ci',
      text: "Sur les runners du PC, l'étape d'installation copie les paquets du magasin partagé pour éviter les verrous de fichiers.",
    },
    { to: 'agent-skills-private', text: 'Les scripts de release suivent les modèles CI de son skill repo-ci.' },
    {
      to: 'Dependabot',
      text: 'Ses PR fusionnent par le workflow partagé, et une mise à jour majeure attend une personne.',
    },
  ],
  features: {
    'Setup step':
      "Une action composite lance mise pour les outils épinglés, puis pnpm installe depuis le lockfile. Elle tourne dans le job de l'appelant, donc ses checks suivent.",
    'Dependabot details':
      "L'action de métadonnées de Dependabot lit le type de mise à jour de chaque PR. Le job de fusion s'en sert pour laisser une mise à jour majeure à une personne.",
    'Dependabot auto merge':
      'Un workflow réutilisable fusionne en squash une PR de Dependabot dès son ouverture, puis lance les checks sur main. Seule une PR ouverte et poussée par Dependabot fusionne ainsi.',
    Releases:
      'Un workflow de release démarre une fois Lint passé sur un push vers main. Deux scripts shell choisissent le tag daté et écrivent les notes depuis le dernier tag.',
    'iOS check and simulator build':
      'Un script Node cherche les pièces Android seulement dans les paquets, modules natifs et fichiers Gradle. Un workflow réutilisable compile ensuite sur un runner macOS de GitHub, et Maestro prend les captures.',
  },
};

export default arch;
