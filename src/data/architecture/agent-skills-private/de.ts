import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Markdown-Skills und eine Regeldatei, die ein Shell-Installer in Claude Code, Codex und Kimi Code einbindet. Hilfsskripte prüfen die CI, speichern Secrets und richten das MCP-Gateway ein.',
  parts: [
    {
      name: 'Markdown-Skills',
      role: 'die Schritte für je eine Aufgabe, geladen, wenn eine Anfrage diese Aufgabe nennt.',
    },
    { name: 'Regeldatei', role: 'die Arbeitsregeln, die in jedem Zug jeder Sitzung laden.' },
    {
      name: 'Shell-Installer',
      role: 'verlinkt die Skills in jeden Agenten und bindet die Regeldatei in seine Konfiguration ein.',
    },
    {
      name: 'GitHub-Actions-Vorlagen',
      role: 'die Workflows Checks und Release und das Release-Gate, die repo-ci in ein Repo kopiert.',
    },
    { name: 'gh und GraphQL', role: 'lesen Workflows und Secret-Listen jedes Repos der Organisation in einem Aufruf.' },
    { name: 'PowerShell-Skript', role: 'speichert ein neues Secret in GitHub, ohne dass der Agent es sieht.' },
    { name: 'mcpproxy', role: 'ein Gateway-Server, der für 5 MCP-Server steht.' },
    {
      name: 'Prüfungen in Python und TypeScript',
      role: 'prüfen die Skills auf Frontmatter, Links, Schlüsselwörter und Länge.',
    },
  ],
  flow: [
    'Der Installer verlinkt die Skills und kopiert die Regeldatei in jeden Agenten.',
    'Eine Sitzung lädt die Regeldatei in jedem Zug.',
    'Eine Anfrage, die zur Beschreibung eines Skills passt, lädt diesen Skill.',
    'Der Skill arbeitet mit gh, Skripten und MCP-Werkzeugen gegen GitHub und die Konsolen.',
    'Der Agent liefert die Änderung aus und beendet den Zug mit einer Statusmarke.',
  ],
  links: [
    {
      to: 'agent-skills',
      text: 'Die öffentlichen Skills kommen zuerst, und diese Skills laden daraus die Schreibregeln.',
    },
    { to: 'local-ci', text: 'Die repo-ci-Vorlagen bauen auf den Runnern, die local-ci zuteilt.' },
    { to: 'ci', text: 'Seine Release-Skripte entsprechen den repo-ci-Vorlagen.' },
    { to: 'Bitwarden', text: 'Jedes Token kommt zuerst in den Tresor, dann über das Rotationsskript zu GitHub.' },
    { to: 'GitHub', text: 'Die Skills verschieben Repos, fügen Workflows hinzu und speichern Secrets über gh.' },
  ],
  features: {
    'Move a repo':
      'Der Skill move-repo lässt den Agenten mit gh jeden Link auf die alte Adresse finden. Dann überträgt er das Repo, macht es privat und zieht die CI auf den eigenen Runner um.',
    'CI and releases for every repo':
      'Ein Shell-Skript liest die Workflows jedes Repos der Organisation in einem GraphQL-Aufruf. Der Skill repo-ci ergänzt dann fehlende Checks und Releases aus seinen Vorlagen.',
    'Rotate secrets':
      'Ein PowerShell-Skript liest die Secret-Liste in jedem Repo und speichert jeden neuen Wert mit gh. Den Wert kopiert die Person, also sieht der Agent ihn nicht.',
    'Workflow rules':
      'Eine Markdown-Regeldatei lädt in jedem Zug von Claude Code, Codex und Kimi Code. Sie nennt den Skill, den jede Aufgabe lädt.',
    'MCP gateway':
      'mcpproxy betreibt die 5 Server hinter einem stdio-Server, und jede Sitzung bekommt einen eigenen Datenordner. Der Agent sucht ein Werkzeug und ruft es dann auf.',
    Releases:
      'Ein Release-Workflow startet, sobald der Workflow check auf main besteht. Zwei Shell-Skripte wählen das Datums-Tag und schreiben die Notizen.',
    'Feature queue':
      'Jede Sitzung legt eine Claim-Datei auf ein Board im Home-Ordner dieses PCs. Eine Sitzung mit überlappenden Dateien wartet und prüft erneut.',
  },
};

export default arch;
