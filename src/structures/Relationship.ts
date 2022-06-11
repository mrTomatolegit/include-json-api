import Root from './Root';
import {
    LinksObject,
    MetaObject,
    RelationshipObject,
    ResourceLinkageObject
} from '../types/TypeDefs';
import { SerializedRelationshipObject } from '../types/SerializedTypeDefs';
import { resolveResource as utilResolveResource } from '../util/Util';
import Resource from './Resource';
import { DEFAULT_MAX_DEPTH } from '../constants';

export default class Relationship implements RelationshipObject {
    links?: LinksObject;
    data?: ResourceLinkageObject;
    meta?: MetaObject;
    constructor(relationship: RelationshipObject) {
        if ('links' in relationship) this.links = relationship.links;
        if ('data' in relationship) this.data = relationship.data;
        if ('meta' in relationship) this.meta = relationship.meta;
    }

    resolveResource(root: Root): Resource | Resource[] | undefined {
        if (this.data) {
            if (Array.isArray(this.data)) {
                return this.data.map(d => utilResolveResource(d, root));
            } else {
                return utilResolveResource(this.data, root);
            }
        }
    }

    serialize(root: Root, maxDepth = DEFAULT_MAX_DEPTH, depth = 0): SerializedRelationshipObject {
        const obj: RelationshipObject = {};

        const resolved = this.resolveResource(root);
        if (Array.isArray(resolved)) {
            obj.data = resolved.map(r => r.serialize(root, maxDepth, depth));
        } else if (resolved) {
            obj.data = resolved.serialize(root, maxDepth, depth);
        }

        if (this.links !== undefined) {
            obj.links = structuredClone(this.links);
        }
        if (this.meta !== undefined) {
            obj.meta = structuredClone(this.meta);
        }
        return obj;
    }
}
