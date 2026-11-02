# User flows

## A visitor reads the page in their language

1. A search result or a link opens the page in one of the 9 languages.
2. The visitor presses the globe button in the header.
3. The menu lists each language in its own name, such as Deutsch or 日本語.
4. A pick opens the same page in that language, at `/` for English or `/<code>/` for the rest.

```mermaid
flowchart LR
  search["Search result or link"] --> page["Page in one language"]
  page --> globe["Globe button"] --> menu["Language menu"]
  menu --> pick["Pick a language"] --> other["Same page at /code/"]
  menu --> away["Click outside or Esc"] --> page
```

## A client looks for a studio

1. The client opens <https://workbench-soft.com> and reads the hero.
2. The client opens Services and picks the kind of work they need.
3. A project chip on the card jumps to a project that shows that work.
4. The client reads the features, then presses Start a project or Write an email.
5. The mail app opens with the subject filled in.

```mermaid
flowchart LR
  hero["Hero"] --> services["Services"]
  services --> chip["Project chip"] --> panel["Project panel"]
  hero --> work["See the work"] --> panel
  panel --> contact["Contact"] --> mail["Mail app with the subject"]
  hero --> start["Start a project"] --> mail
```

## A visitor sends feedback

1. The visitor presses Feedback in the corner, the footer link, or opens a `#feedback` link.
2. The dialog opens with the cursor in the message box.
3. The visitor types the message and, for a reply, an email.
4. Send, or `Ctrl+Enter`, posts it. The dialog says it reached the studio, or gives the email address on a failure.

```mermaid
flowchart LR
  any["Any point of any page"] --> button["Feedback button"] --> dialog["Feedback dialog"]
  footer["Footer link"] --> dialog
  link["#feedback link"] --> dialog
  dialog --> send["Send"]
  send -->|ok| thanks["Thanks line"]
  send -->|failed| mail["Email address to write to"]
```

## A visitor finds a feature

1. The visitor presses `Ctrl+K` or `/`.
2. The visitor types a word, such as "voice".
3. The list shows the projects and features that hold the word.
4. Enter or a click closes the search and scrolls to the item, which lights up.

```mermaid
flowchart LR
  key["Ctrl+K or /"] --> type["Type a word"] --> list["Matching projects and features"]
  list --> pick["Enter or click"] --> scroll["Page scrolls to it, the item lights up"]
  list --> none["No match"] --> type
```

## A visitor opens a game

1. The visitor presses Games in the header.
2. The list shows all games, each game, and About the games.
3. A game opens on games.workbench-soft.com. About the games scrolls to the Workbench Games panel.

```mermaid
flowchart LR
  games["Games in the header"] --> list["Games list"]
  list -->|a game| play["Game page on games.workbench-soft.com"]
  list -->|About the games| panel["Workbench Games panel"]
```

## A visitor reads more features

1. A project shows its first 6 features, one line each.
2. Show all opens the rest. Show fewer folds them again.

```mermaid
flowchart LR
  panel["Project panel"] --> six["First 6 features"] --> more["Show all"] --> all["Every feature"] --> less["Show fewer"] --> six
```

## A visitor filters the projects

1. The visitor opens Projects.
2. A chip picks Apps, Developer tools or Archive.
3. The index and the panels keep only that kind. All brings the rest back.

```mermaid
flowchart LR
  projects["Projects"] --> chip{"Chip"}
  chip -->|Apps| apps["App panels"]
  chip -->|Developer tools| tools["Tool panels"]
  chip -->|Archive| archive["Archived panels"]
  chip -->|All| all["Every panel"]
```
