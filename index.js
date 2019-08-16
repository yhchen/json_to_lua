#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = __importStar(require("lodash"));
let MaxPrettyExpandDepth = 0;
const INIFINIT = 65536;
/**
 * @description Convert js object to lua string (data only. no functional)
 * @param obj js object
 * @returns string in lua format
 */
function jsObjectToLua(obj) {
    MaxPrettyExpandDepth = 0;
    return toLua(obj, 0);
}
exports.jsObjectToLua = jsObjectToLua;
/**
 * @description Convert json string to lua string
 * @param s json string
 * @returns string in lua format
 */
function jsonToLua(s) {
    MaxPrettyExpandDepth = 0;
    const obj = JSON.parse(s);
    return toLua(obj, 0);
}
exports.jsonToLua = jsonToLua;
/**
 * @description Convert js object to lua string (data only. no functional)
 * @param obj js object
 * @param maxPrettyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
function jsObjectToLuaPretty(obj, maxPrettyExpandDepth = INIFINIT) {
    MaxPrettyExpandDepth = maxPrettyExpandDepth;
    return toLua(obj, 0);
}
exports.jsObjectToLuaPretty = jsObjectToLuaPretty;
/**
 * @description Convert json string to lua string
 * @param s json string
 * @param maxPrettyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
function jsonToLuaPretty(s, maxPrettyExpandDepth = INIFINIT) {
    MaxPrettyExpandDepth = maxPrettyExpandDepth;
    const obj = JSON.parse(s);
    return toLua(obj, 0);
}
exports.jsonToLuaPretty = jsonToLuaPretty;
function makeLuaKey(s) {
    const isword = isValidWord(s);
    if (parseInt(s).toString() == s) {
        return `[${s}]`;
    }
    else if (isword) {
        return s;
    }
    return `["${s}"]`;
}
exports.makeLuaKey = makeLuaKey;
/**
 * Digital character set
 */
const NumberCharSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
/**
 * The first valid character set for a word
 */
const WordFirstValidCharSet = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '_']);
/**
 *
 * @description Check 's' is a vaild word
 * @param s input string
 * @returns true if 's' is a Valid word
 */
function isValidWord(s) {
    for (let i = 0; i < s.length; ++i) {
        const c = s[i];
        if (i == 0) {
            if (!WordFirstValidCharSet.has(c))
                return false;
        }
        else {
            if (!WordFirstValidCharSet.has(c) && !NumberCharSet.has(c))
                return false;
        }
    }
    return true;
}
/**
 *
 * @description convert json object to lua string
 * @param obj js object
 * @param currDepth Recursion depth
 * @param CurrEntry Current line grammar indentation format
 * @return string in lua format
 */
function toLua(obj, currDepth, CurrEntry) {
    const pretty = MaxPrettyExpandDepth > currDepth;
    const NextDepth = currDepth + 1;
    CurrEntry = (CurrEntry != undefined && pretty) ? CurrEntry + '\t' : '';
    const ObjectEntry = (CurrEntry != undefined && pretty) ? CurrEntry + '\t' : '';
    const EndLine = pretty ? '\n' : '';
    const WriteSpace = pretty ? ' ' : '';
    if (obj === null || obj === undefined) {
        return 'nil';
    }
    if (!lodash.isObject(obj)) {
        if (typeof obj === 'string') {
            return '"' + obj + '"';
        }
        return obj.toString();
    }
    let result = `{` + EndLine, isArray = obj instanceof Array, len = lodash.size(obj), i = 0;
    lodash.forEach(obj, function (v, k) {
        let objStr = '';
        if (isArray) {
            objStr = toLua(v, NextDepth, CurrEntry);
        }
        else {
            objStr = `${makeLuaKey(k)}${WriteSpace}=${WriteSpace}${toLua(v, NextDepth, CurrEntry)}`;
        }
        if (i < len - 1) {
            objStr += ',';
        }
        i += 1;
        result += ObjectEntry + objStr + EndLine;
    });
    result += CurrEntry + '}';
    return result;
}
//# sourceMappingURL=index.js.map