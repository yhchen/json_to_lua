#!/usr/bin/env node
/**
 * @description Convert js object to lua string (data only. no functional)
 * @param obj js object
 * @param maxPreetyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
export declare function jsObjectToLuaString(obj: any, maxPreetyExpandDepth?: number): string;
/**
 * @description Convert json string to lua string
 * @param s json string
 * @param maxPreetyExpandDepth max pretty expand depth(level). default is 65536
 * @returns string in lua format
 */
export declare function jsonToLuaString(s: string, maxPreetyExpandDepth?: number): string;
