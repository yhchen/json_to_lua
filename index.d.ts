#!/usr/bin/env node
/**
 * @description Convert js object to lua string (data only. no functional)
 * @param obj js object
 * @returns string in lua format
 */
export declare function jsObjectToLua(obj: any): string;
/**
 * @description Convert json string to lua string
 * @param s json string
 * @returns string in lua format
 */
export declare function jsonToLua(s: string): string;
/**
 * @description Convert js object to lua string (data only. no functional)
 * @param obj js object
 * @param maxPrettyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
export declare function jsObjectToLuaPretty(obj: any, maxPrettyExpandDepth?: number): string;
/**
 * @description Convert json string to lua string
 * @param s json string
 * @param maxPrettyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
export declare function jsonToLuaPretty(s: string, maxPrettyExpandDepth?: number): string;
export declare function makeLuaKey(s: string): string;
