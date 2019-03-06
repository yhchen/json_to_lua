#!/usr/bin/env node

import * as lodash from 'lodash';

let MaxPreetyExpandDepth = 0;
const INIFINIT = 65536;

/**
 * @description Convert js object to lua string (data only. no functional)
 * @param obj js object
 * @param maxPreetyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
export function jsObjectToLuaString(obj: any, maxPreetyExpandDepth: number = INIFINIT): string {
	MaxPreetyExpandDepth = maxPreetyExpandDepth
	return toLua(obj, 0);
}

/**
 * @description Convert json string to lua string
 * @param s json string
 * @param maxPreetyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
export function jsonToLuaString(s: string, maxPreetyExpandDepth: number = INIFINIT): string {
	MaxPreetyExpandDepth = maxPreetyExpandDepth
	const obj = JSON.parse(s);
	return toLua(obj, 0);
}

/**
 * Digital character set
 */
const NumberCharSet = new Set<string>(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

/**
 * The first valid character set for a word
 */
const WordFirstValidCharSet = new Set<string>(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
											,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
											,'_']);



/**
 * 
 * @description Check 's' is a vaild word
 * @param s input string
 * @returns true if 's' is a Valid word
 */
function isValidWord(s: string): boolean {
	for (let i = 0; i < s.length; ++i) {
		const c = s[i];
		if (i == 0) {
			if (!WordFirstValidCharSet.has(c))
				return false;
		} else {
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
function toLua(obj: any, currDepth: number, CurrEntry?: string): string {
	const preety = MaxPreetyExpandDepth > currDepth;
	const NextDepth = currDepth + 1;
	CurrEntry = (CurrEntry != undefined && preety) ? CurrEntry + '\t' : '';
	const ObjectEntry = (CurrEntry != undefined && preety) ? CurrEntry + '\t' : '';
	const EndLine = preety ? '\n' : '';
	const WriteSpace = preety ? ' ' : '';
    if (obj === null || obj === undefined) {
        return 'nil';
    }
    if (!lodash.isObject(obj)) {
        if (typeof obj === 'string') {
            return '"' + obj + '"';
        }
        return obj.toString();
	}
    let result = `{` + EndLine,
        isArray = obj instanceof Array,
        len = lodash.size(obj),
		i = 0;
	lodash.forEach(obj, function (v, k) {
		let objStr = '';
        if (isArray) {
            objStr = toLua(v, NextDepth, CurrEntry);
        } else {
			const isword = isValidWord(k);
			if (parseInt(k).toString() == k) {
				objStr = '[' + k + `]${WriteSpace}=${WriteSpace}` + toLua(v, NextDepth, CurrEntry);
			} else if (isword) {
				objStr = k + `${WriteSpace}=${WriteSpace}` + toLua(v, NextDepth, CurrEntry);
			} else {
				objStr = '["' + k + `"]${WriteSpace}=${WriteSpace}` + toLua(v, NextDepth, CurrEntry);
			}
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
