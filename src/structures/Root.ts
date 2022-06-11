import Resource from './Resource';
import { MetaObject, RootObject, TopLevelLinksObject } from '../types/TypeDefs';
import { SerializedData } from '../types/SerializedTypeDefs';
import { DEFAULT_MAX_DEPTH } from '../constants';

export function parseJSONAPI(d: RootObject): Root {
    return new Root(d);
}

export default class Root implements RootObject {
    data?: Resource | Resource[] | null;
    errors?: any[];
    meta?: MetaObject;
    jsonapi?: any;
    links?: TopLevelLinksObject;
    included?: Resource[];
    constructor(root: RootObject) {
        if ('data' in root && root.data) {
            if (Array.isArray(root.data)) {
                this.data = root.data.map(d => new Resource(d));
            } else {
                this.data = new Resource(root.data);
            }
        }
        if ('errors' in root) this.errors = root.errors;
        if ('meta' in root) this.meta = root.meta;
        if ('jsonapi' in root) this.jsonapi = root.jsonapi;
        if ('links' in root) this.links = root.links;
        if ('included' in root) this.included = root.included?.map(r => new Resource(r));
    }

    hasErrors(): boolean {
        return this.errors !== undefined;
    }

    /**
     * Avoid calling this method.
     * This method moves the data from the included array to the appropriate place in the data's relationships.
     * @param maxDepth The maximum depth to serialize for (for circular references)
     * @returns The data object with relationship references replaced as the appropriate resource
     */
    serializeData(maxDepth = DEFAULT_MAX_DEPTH): SerializedData {
        if (Array.isArray(this.data)) {
            return this.data.map(d => d.serialize(this, maxDepth, 0));
        } else if (this.data) {
            return this.data.serialize(this, maxDepth, 0);
        } else return null;
    }
}
