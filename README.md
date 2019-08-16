# json_to_lua

convert json string to lua table

## Using npm

```shell
>$ npm i json_to_lua
```

`Note: add --save if you are using npm < 5.0.0`

## Sample

```js

var jsonToLua = require("json_to_lua")

var jsObj = {a:"123", b:345, c:[1, 2, 3]};

// convert js object to lua string
var luaObj = jsonToLua.jsObjectToLua(jsObj);
console.log(luaObj);
//# result : {a="123",b=345,c={1,2,3}}

// convert json string to lua string
var luaObj1 = jsonToLua.jsonToLua(JSON.stringify(jsObj));
console.log(luaObj1);
//# result : {a="123",b=345,c={1,2,3}}

// convert js object to lua pretty
var luaObjPretty = jsonToLua.jsObjectToLuaPretty(jsObj, 1/*pretty mode depth*/);
console.log(luaObjPretty);
//# result :
//{
//	a = "123",
//	b = 345,
//	c = {1,2,3}
//}

// convert json string to lua pretty
var luaObjPretty = jsonToLua.jsonToLuaPretty(JSON.stringify(jsObj), 1/*pretty mode depth*/);
console.log(luaObjPretty);
//# result :
//{
//	a = "123",
//	b = 345,
//	c = {1,2,3}
//}

// convert string to lua table key style
var luaKey1 = jsonToLua.makeLuaKey(10001);
var luaKey2 = jsonToLua.makeLuaKey(1ABC);
var luaKey3 = jsonToLua.makeLuaKey(ABC);
//# result :
//{
//	luaKey1 = [10001]
//	luaKey2 = ["1ABC"]
//	luaKey3 = ABC
//}

```
