// Counts the functions, types and tests in a checkout with ast-grep, which parses each language's syntax tree.
import { execFile } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

export type Kind = 'functions' | 'types' | 'tests';

const any = (...kinds: string[]) => `rule:\n  any:\n${kinds.map((k) => `    - kind: ${k}`).join('\n')}`;

const ts = {
  functions: `rule:
  any:
    - kind: function_declaration
    - kind: method_definition
    - kind: arrow_function
      inside: { kind: variable_declarator, stopBy: neighbor }`,
  types: any(
    'class_declaration',
    'abstract_class_declaration',
    'interface_declaration',
    'type_alias_declaration',
    'enum_declaration',
  ),
  tests: `rule:
  kind: call_expression
  has: { field: function, regex: '^(it|test)(\\.(only|skip|concurrent|todo))?$' }`,
};

/** A rule per language and kind. Kotlin and Swift class declarations cover structs, enums and interfaces too. */
const rules: Record<string, Record<Kind, string>> = {
  TypeScript: ts,
  Tsx: ts,
  Rust: {
    functions: any('function_item'),
    types: any('struct_item', 'enum_item', 'trait_item', 'union_item'),
    tests: `rule: { kind: attribute_item, regex: '^#\\[(\\w+::)?test\\b' }`,
  },
  Kotlin: {
    functions: any('function_declaration'),
    types: any('class_declaration', 'object_declaration'),
    tests: `rule: { kind: annotation, regex: '^@Test$' }`,
  },
  Swift: {
    functions: any('function_declaration'),
    types: any('class_declaration', 'protocol_declaration'),
    tests: `rule: { kind: function_declaration, has: { field: name, regex: '^test' } }`,
  },
  Python: {
    functions: any('function_definition'),
    types: any('class_definition'),
    tests: `rule: { kind: function_definition, has: { field: name, regex: '^test_' } }`,
  },
};

const file = Object.entries(rules)
  .flatMap(([lang, kinds]) =>
    Object.entries(kinds).map(([kind, rule]) => `id: ${lang}-${kind}\nlanguage: ${lang}\n${rule}`),
  )
  .join('\n---\n');

const run = promisify(execFile);

/** Writes the rule file once into `tmp` and returns a counter for checkouts. */
export function structureCounter(tmp: string) {
  const ruleFile = join(tmp, 'rules.yml');
  writeFileSync(ruleFile, file);
  return async (dir: string) => {
    const counts: Record<Kind, number> = { functions: 0, types: 0, tests: 0 };
    const { stdout } = await run('ast-grep', ['scan', '--rule', ruleFile, '--json=stream', dir], { maxBuffer: 1e9 });
    for (const line of stdout.split('\n'))
      if (line) counts[(JSON.parse(line) as { ruleId: string }).ruleId.split('-')[1] as Kind]++;
    return counts;
  };
}
