import { Root } from '../src/index';
import base from './payload.json';
import { test, expect } from '@jest/globals';

const root = new Root(base);

test('Relationship#resolveResource()', () => {
    // Always true, just to satisfy TS
    if (Array.isArray(root.data) && root.data[0].relationships) {
        expect(root.data[0].relationships.author.resolveResource(root)).toEqual(
            root.included?.find(i => i.id === '9' && i.type === 'people')
        );
    }
});
