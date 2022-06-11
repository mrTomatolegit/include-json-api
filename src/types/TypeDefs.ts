// Specification: https://jsonapi.org/format/

export type RootObject = {
    data?:
        | ResourceObject
        | ResourceIdentifierObject
        | null
        | ResourceObject[]
        | ResourceIdentifierObject[];
    errors?: ErrorObject[];
    meta?: MetaObject;
    jsonapi?: JSONAPIObject;
    links?: TopLevelLinksObject;
    included?: ResourceObject[];
};

export type MetaObject = { [x: string]: any };

export type LinkObject =
    | string
    | {
          href: string;
          meta?: MetaObject;
      };

export type LinksObject = {
    self?: LinkObject;
    related?: LinkObject;
};

export type JSONAPIObject = {
    version: string;
    meta: MetaObject;
}

export type ErrorObject = {
    id?: string;
    links?: {
        about: string
    };
    status?: string;
    code?: string;
    title?: string;
    detail?: string;
    source?: {
        pointer?: string;
        parameter?: string;
    };
    meta?: MetaObject;
}

export type TopLevelLinksObject = LinksObject & {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
};

export type ResourceLinkageObject = null | ResourceIdentifierObject | ResourceIdentifierObject[];

export type ResourceObject = {
    type: string;
    id: string;
    attributes?: AttributesObject;
    relationships?: RelationshipsObject;
    links?: LinksObject;
    meta?: MetaObject;
};

export type AttributesObject = {
    [x: string]: any;
};

export type ResourceIdentifierObject = {
    type: string;
    id: string;
    meta?: MetaObject;
};

export type RelationshipObject = {
    links?: LinksObject;
    data?: ResourceLinkageObject;
    meta?: MetaObject;
};

export type RelationshipsObject = {
    [x: string]: RelationshipObject;
};
