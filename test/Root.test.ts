import { Root } from '../src/index';
import base from './payload.json';
import expected from './Root.expected.json';
import circular from './Root.circular.json';
import { test, expect } from '@jest/globals';

const root = new Root(base);

test('Root#serializeData()', () => {
    const serialized = root.serializeData();
    expect(serialized).toEqual(expected);
});

test('Root#serializeData() circular', () => {
    const root = new Root(circular);
    expect(() => root.serializeData()).not.toThrow();
});

test('Root#hasErrors()', () => {
    expect(root.hasErrors()).toBe(false);
    const errored = new Root({ errors: [{ code: '123' }] });
    expect(errored.hasErrors()).toBe(true);
});
