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
  design: {
    scale: [
      'Ein Besitzer, 11 Skills und die Dutzenden Repos einer GitHub-Organisation, die die Skills prüfen und ausliefern.',
      'Eine Regeldatei lädt bei jedem Zug jeder Sitzung, daher bleibt sie kurz, und Regeln für einzelne Aufgaben liegen in Skills.',
    ],
    data: [
      'Keine Datenbank. Skills sind Markdown-Ordner, und die Regeldatei ist eine Markdown-Datei, die der Installer in jeden Agenten kopiert.',
      'Jedes App-Repo listet seine Secrets in .github/secret-rotation.json: die Art, die Anbieterseite und was ein neuer Wert kostet.',
    ],
    interfaces: [
      'Das Audit-Skript liest die Workflow-Dateien und Secret-Listen aller Repos mit einem gh-GraphQL-Aufruf.',
      'Der Installer bindet die Regeldatei in einem markierten Block in die globalen Dateien von Claude Code und Codex ein, und Kimi Code liest dieselbe Zeile.',
      'Ein Gateway-Server steht für 5 MCP-Server, sodass ein Agent nur eine Werkzeugliste lädt.',
    ],
    reliability: [
      'Der Release-Workflow baut neben Checks. Ein Gate-Skript fragt Checks am Ende ab, daher bricht ein fehlgeschlagener Checks-Lauf den Build ab.',
      'Ein späterer Checks-Lauf startet den Publish-Job über workflow_run, sodass kein Job beim Warten einen Runner belegt.',
      'Läufe wechseln auf den PC des Besitzers, wenn die Cloud-Minuten knapp werden, und Jobs warten in der Schlange, solange er aus ist.',
    ],
    security: [
      'Das Rotationsskript liest einen neuen Wert aus einer verdeckten Eingabe oder Datei und speichert ihn mit gh secret set, sodass der Agent ihn nicht sieht.',
      'Jedes Token geht zuerst in den Tresor, dann zu GitHub.',
      'Das Repo ist privat, da es die Secret-Listen und Runner der Organisation nennt. Die allgemeinen Skills liegen im öffentlichen agent-skills.',
    ],
    performance: [
      'Nur die Regeln, die jeder Zug braucht, laden jedes Mal. Eine Aufgabenregel lädt aus ihrem Skill, wenn eine Anfrage passt.',
      'Der Release-Build legt seine Dateien unter der Run-ID im Cache ab, sodass der Publish-Job sie wiederverwendet und eine Minute lang einen leichten Runner belegt.',
    ],
    operations: [
      'check.yml und release.yml lesen ihren Runner aus Repo-Variablen, die ein Router zuerst auf Cloud-Runner und zuletzt auf den PC setzt.',
      'Releases bekommen einen Datums-Tag wie v2026.10.30.1 von Shell-Skripten, die die repo-ci-Vorlagen mit dem ci-Repo teilen.',
      'mise run test prüft die Skills, das Textbudget, die Installation in einem temporären Home, das Gateway und die Release-Skripte.',
    ],
    tradeoffs: [
      'Ein privates Repo neben dem öffentlichen, damit Runner und Secret-Listen der Organisation unveröffentlicht bleiben. Das kostet zwei Klone und zwei Installer.',
      'Aufgabenregeln in Skills statt einer langen Regeldatei, sodass ein ruhiger Zug weniger Tokens zahlt. Ein Skill mit schwacher Beschreibung wird übersprungen.',
      'Ein Manifest in jedem App-Repo statt einer zentralen Liste, sodass eine Workflow-Änderung und ihr Secret-Eintrag in einem PR landen. Ein Repo ohne Manifest bekommt keine Rotation.',
    ],
  },
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
