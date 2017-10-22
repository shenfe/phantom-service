export const evaluate = str => {
    return (new Function(str))();
};

export const ObjectParse = str => {
    if (typeof str !== 'string') return str;

    let obj;
    try {
        obj = evaluate(`return ${str}`);
    } catch (e) {
        console.error(e);
    }
    return obj;
};

export const ObjectStringify = obj => {
    switch (Object.prototype.toString.call(obj)) {
    case '[object Object]':
        let s = '{';
        let p = [];

        for (let i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] === 'function') {
                p.push([i, obj[i].toString()]);
            } else {
                p.push([i, JSON.stringify(obj[i])]);
            }
        }

        s += p.map(v => JSON.stringify(v[0]) + ':' + v[1]).join(',');

        s += '}';
        return s;

    case '[object Array]':
        return '[' + obj.map(ObjectStringify).join(',') + ']';

    default:
        return JSON.stringify(obj);
    }
};