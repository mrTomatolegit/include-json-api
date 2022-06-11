import { AttributesObject, LinksObject, MetaObject, RelationshipObject } from './TypeDefs';

export type SerializedData = SerializedResourceObject | SerializedResourceObject[] | null;

export type SerializedResourceObject = {
    type: string;
    id: string;
    attributes?: AttributesObject;
    relationships?: SerializedRelationshipsObject;
    links?: LinksObject;
    meta?: MetaObject;
};

export type SerializedRelationshipObject = RelationshipObject & {
    data?: null | SerializedResourceObject | SerializedResourceObject[];
};

export type SerializedRelationshipsObject = {
    [x: string]: SerializedRelationshipObject;
};
