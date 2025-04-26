
const STTags3_prototypeFactoryNewString = (() => {
    const cache = []
    for (let i = 0; i < 256; i++) { cache.push(null) }
    return function(pf, size) {
        const typeName = `string[${size}]`
        if (pf.hasOwnProperty(typeName)) return
        if (cache[size] != null) {
            pf[typeName] = cache[size]
            return
        }
        if (pf.hasOwnProperty(typeName)) return
        pf[typeName] = {
            size: size,
            type: typeName,
            typeDisplay: typeName,
            value: "",
        }
        cache[size] = pf[typeName]
    }
})();

function STTags3_prototypes_factory() {
    const rtn = {
        bool: {
            type: 'bool',
            typeDisplay: 'bool',
            value: false,
        },
        time: {
            type: 'time',
            typeDisplay: 'time',
            value: 1000,
        },
        real: {
            type: 'real',
            typeDisplay: 'real',
            value: 0.0,
        },
        "string[255]": {
            size: 255,
            type: 'string[255]',
            typeDisplay: 'string[255]',
            value: "",
        },
        string: {
            size: 255,
            type: 'string[255]',
            typeDisplay: 'string',
            value: "",
        },
    }
    for (const intType of ["int", "sint", "dint", "uint", "usint", "udint"]) {
        rtn[intType] = {
            type: intType,
            typeDisplay: intType,
            value: 0,
        }
    }

    return rtn
}

