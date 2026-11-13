import { describe, expect, it } from 'vitest';
import { dicts } from './i18n.ts';

const holes = (text: string) => (text.match(/\{\w+\}/g) ?? []).toSorted().join(' ');
const shape = (dict: Record<string, string>) => Object.entries(dict).map(([key, text]) => `${key} ${holes(text)}`).toSorted();

describe.each(Object.entries(dicts))('%s game text', (_, dict) => {
  it('has the {placeholders} of English in each line', () => {
    expect(shape(dict)).toEqual(shape(dicts.en));
  });

  it('has no empty line', () => {
    expect(Object.keys(dict).filter((key) => !dict[key as keyof typeof dict].trim())).toEqual([]);
  });
});
