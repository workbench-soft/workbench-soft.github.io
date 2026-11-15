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
  design: {
    scale: [
      'Un propriétaire et les dizaines de dépôts d’apps d’une organisation GitHub, chacun appelant les mêmes quelques étapes depuis ses workflows.',
      'Un correctif ici atteint chaque appelant à son prochain lancement, donc un mauvais merge peut tous les casser.',
    ],
    data: [
      'Pas de base de données. L’état est un tag daté, un format de sujet de commit et le mise.toml qui fixe chaque outil.',
      'Le tag est v<yyyy.mm.dd>.<n>, et les notes trient les commits feat, fix et perf d’après des sujets de la forme type(scope)!: text.',
    ],
    interfaces: [
      'L’étape de mise en place est une action composite qu’un appelant lance avec uses, et qui tourne dans la tâche de l’appelant.',
      'La fusion Dependabot et la construction du simulateur iOS sont des workflows réutilisables qui reçoivent la liste des workflows à lancer sur main.',
      'La fusion automatique part de pull_request_target, et le contrôle iOS est un script Node dont le résultat est réussi ou échoué.',
    ],
    reliability: [
      'La tâche de fusion ne tourne que si dependabot[bot] a ouvert la PR et déclenché l’événement, et elle s’arrête sur une PR déjà fusionnée ou fermée.',
      'Sur les runners du PC, pnpm copie les paquets depuis un store partagé, car un lien physique supprimé faisait échouer d’autres lectures avec EBUSY.',
      'Chaque tâche a son propre dossier de shims mise, donc un processus en cours qui tient l’uvx.exe partagé ne bloque pas la mise à jour d’un outil.',
    ],
    security: [
      'Le dépôt est privé, et son accès Actions est réglé sur l’organisation pour que les appelants chargent les workflows.',
      'pull_request_target tourne depuis main avec un jeton d’écriture, donc seules les PR de Dependabot lui-même fusionnent, et une mise à jour majeure attend une personne.',
    ],
    performance: [
      'Les installations d’outils restent partagées entre les tâches d’un runner, et seul le petit dossier de shims est refait pour chaque tâche.',
      'pnpm installe depuis le lockfile sans étape de résolution, et le contrôle iOS passe d’abord, donc un mauvais plan échoue avant que les minutes Mac ne démarrent.',
    ],
    operations: [
      'Lint tourne à chaque push sur main. Le workflow de release démarre sur workflow_run après un Lint réussi et pose un tag daté sur le commit.',
      'Un push de Markdown seul saute Lint, donc il n’a pas de release.',
      'mise run test construit un dépôt git jetable et vérifie les deux scripts de release, et Vitest couvre ios-check.',
    ],
    tradeoffs: [
      'Les appelants utilisent @main plutôt qu’un tag fixe, donc un correctif arrive partout. Un dépôt qui doit rester en arrière fixe un tag de release.',
      'Une action composite plutôt qu’un workflow réutilisable pour la mise en place, pour que les contrôles de l’appelant suivent dans la même tâche.',
      'Fusionner à l’ouverture et contrôler sur main plutôt qu’attendre les contrôles de PR, car les dépôts de l’organisation n’en lancent pas. Une mauvaise mise à jour atteint main d’abord.',
      'Un runner macOS pour la construction iPhone, car les runners du PC sont sous Windows. Une minute macOS compte pour 10, donc les appelants la lancent à la main ou à la release.',
    ],
  },
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
