
function STTags3_createNDArray(lengths, proto) {
    if (lengths.length === 0) {
        return STTags3_copyProto(proto);
    }

    const length = lengths[0];
    const rest = lengths.slice(1);
    
    const arr = new Array(length);
    
    for (let i = 0; i < length; i++) {
        arr[i] = STTags3_createNDArray(rest, proto);
    }

    return arr;
}

function STTags3_copyNDArray(arr) {
    const rtn = []

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            rtn.push(STTags3_copyNDArray(arr[i]));
        } else {
            rtn.push(STTags3_copyProto(arr[i]));
        }
    }
    return rtn
}

function STTags3_recopyNDArray(arr, rtn) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            STTags3_recopyNDArray(arr[i], rtn[i]);
        } else {
            STTags3_recopyProto(arr[i], rtn[i]);
        }
    }
}

function STTags3_destroyNDArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            STTags3_destroyNDArray(arr[i]);
        } else {
            STTags3_destroyProto(arr[i]);
        }
    }
}
