// To parse this data:
//
//   import { Convert } from "./file";
//
//   const mySQLPersonResponse = Convert.toMySQLPersonResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface MySQLPersonResponse {
    person_id?:           number;
    curp?:                string;
    nombre?:              string;
    primer_apellido?:     string;
    segundo_apellido?:    string;
    direccion?:           string;
    telefono?:            string;
    email?:               string;
    genero?:              string;
    fecha_de_nacimiento?: Date;
    _buf?:                Buf;
    _clientEncoding?:     Encoding;
    _catalogLength?:      number;
    _catalogStart?:       number;
    _schemaLength?:       number;
    _schemaStart?:        number;
    _tableLength?:        number;
    _tableStart?:         number;
    _orgTableLength?:     number;
    _orgTableStart?:      number;
    _orgNameLength?:      number;
    _orgNameStart?:       number;
    characterSet?:        number;
    encoding?:            Encoding;
    name?:                string;
    columnLength?:        number;
    columnType?:          number;
    flags?:               number;
    decimals?:            number;
}

export interface Buf {
    type: Type;
    data: number[];
}

export enum Type {
    Buffer = "Buffer",
}

export enum Encoding {
    Binary = "binary",
    Utf8 = "utf8",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toMySQLPersonResponse(json: string): Array<MySQLPersonResponse[]> {
        return cast(JSON.parse(json), a(a(r("MySQLPersonResponse"))));
    }

    public static mySQLPersonResponseToJson(value: Array<MySQLPersonResponse[]>): string {
        return JSON.stringify(uncast(value, a(a(r("MySQLPersonResponse")))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "MySQLPersonResponse": o([
        { json: "person_id", js: "person_id", typ: u(undefined, 0) },
        { json: "curp", js: "curp", typ: u(undefined, "") },
        { json: "nombre", js: "nombre", typ: u(undefined, "") },
        { json: "primer_apellido", js: "primer_apellido", typ: u(undefined, "") },
        { json: "segundo_apellido", js: "segundo_apellido", typ: u(undefined, "") },
        { json: "direccion", js: "direccion", typ: u(undefined, "") },
        { json: "telefono", js: "telefono", typ: u(undefined, "") },
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "genero", js: "genero", typ: u(undefined, "") },
        { json: "fecha_de_nacimiento", js: "fecha_de_nacimiento", typ: u(undefined, Date) },
        { json: "_buf", js: "_buf", typ: u(undefined, r("Buf")) },
        { json: "_clientEncoding", js: "_clientEncoding", typ: u(undefined, r("Encoding")) },
        { json: "_catalogLength", js: "_catalogLength", typ: u(undefined, 0) },
        { json: "_catalogStart", js: "_catalogStart", typ: u(undefined, 0) },
        { json: "_schemaLength", js: "_schemaLength", typ: u(undefined, 0) },
        { json: "_schemaStart", js: "_schemaStart", typ: u(undefined, 0) },
        { json: "_tableLength", js: "_tableLength", typ: u(undefined, 0) },
        { json: "_tableStart", js: "_tableStart", typ: u(undefined, 0) },
        { json: "_orgTableLength", js: "_orgTableLength", typ: u(undefined, 0) },
        { json: "_orgTableStart", js: "_orgTableStart", typ: u(undefined, 0) },
        { json: "_orgNameLength", js: "_orgNameLength", typ: u(undefined, 0) },
        { json: "_orgNameStart", js: "_orgNameStart", typ: u(undefined, 0) },
        { json: "characterSet", js: "characterSet", typ: u(undefined, 0) },
        { json: "encoding", js: "encoding", typ: u(undefined, r("Encoding")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "columnLength", js: "columnLength", typ: u(undefined, 0) },
        { json: "columnType", js: "columnType", typ: u(undefined, 0) },
        { json: "flags", js: "flags", typ: u(undefined, 0) },
        { json: "decimals", js: "decimals", typ: u(undefined, 0) },
    ], false),
    "Buf": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "data", js: "data", typ: a(0) },
    ], false),
    "Type": [
        "Buffer",
    ],
    "Encoding": [
        "binary",
        "utf8",
    ],
};
