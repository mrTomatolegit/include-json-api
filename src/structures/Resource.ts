import Relationship from './Relationship';
import Root from './Root';
import { AttributesObject, LinksObject, MetaObject, ResourceObject } from '../types/TypeDefs';
import { SerializedResourceObject } from '../types/SerializedTypeDefs';
import { resolveResource } from '../util/Util';
import { DEFAULT_MAX_DEPTH } from '../constants';

export default class Resource implements ResourceObject {
    type: string;
    id: string;
    attributes?: AttributesObject;
    relationships?: { [x: string]: Relationship };
    links?: LinksObject;
    meta?: MetaObject;
    constructor(data: ResourceObject) {
        this.type = data.type;
        this.id = data.id;

        if ('attributes' in data) this.attributes = data.attributes;
        if (data.relationships) {
            this.relationships = {};
            for (const key in data.relationships) {
                this.relationships[key] = new Relationship(data.relationships[key]);
            }
        }

        if ('links' in data) this.links = data.links;
        if ('meta' in data) this.meta = data.meta;
    }

    getRelationship(root: Root, key: string) {
        const data = this.relationships?.[key]?.data;
        if (Array.isArray(data)) return data.map(d => resolveResource(d, root));
        else if (data) return resolveResource(data, root);
    }

    serialize(root: Root, maxDepth = DEFAULT_MAX_DEPTH, depth = 0): SerializedResourceObject {
        const obj: ResourceObject = {
            type: this.type,
            id: this.id
        };
        if (depth >= maxDepth) return obj;
        if (this.attributes !== undefined) {
            obj.attributes = structuredClone(this.attributes);
        }
        if (this.relationships && Object.keys(this.relationships).length > 0) {
            obj.relationships = {};
            for (const key in this.relationships) {
                obj.relationships[key] = this.relationships[key].serialize(
                    root,
                    maxDepth,
                    depth + 1
                );
            }
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
