import { Root } from '../src/index';
import base from './payload.json';
import { test, expect } from '@jest/globals';

const root = new Root(base);

test('Resource#getRelationship()', () => {
    // Always true, just to satisfy TS
    if (Array.isArray(root.data)) {
        expect(root.data[0].getRelationship(root, 'author')).toEqual(
            root.included?.find(r => r.id === '9' && r.type === 'people')
        );
    }
});
