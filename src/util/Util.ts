import Resource from '../structures/Resource';
import Root from '../structures/Root';
import { ResourceIdentifierObject } from '../types/TypeDefs';

/**
 * Resolves a full resource object from the identifier and root object
 * @param data The identifier object to be converted to the full resource
 * @param root The root JSON:API object
 * @returns The full resource object
 */
export function resolveResource(
    data: ResourceIdentifierObject,
    root: Root | undefined
): Resource {
    if (!root?.included || root.included?.length === 0) return new Resource(data);

    return root.included.find(r => r.id === data.id && r.type === data.type) ?? new Resource(data);
}
