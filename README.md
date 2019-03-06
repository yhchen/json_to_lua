# json_to_lua
convert json string to lua table

## Using npm:
```shell
$ npm i json_to_lua
```
`Note: add --save if you are using npm < 5.0.0`

## Sample :
```ts

var jsObj = {a:"123", b:345, c:[1, 2, 3]};

// convert js object to lua string
var luaObj = jsObjectToLua(jsObj);
console.log(luaObj);
//# result : {a="123",b=345,c={1,2,3}}

// convert json string to lua string
var luaObj1 = jsonToLua(JSON.stringify(jsObj));
console.log(luaObj1);
//# result : {a="123",b=345,c={1,2,3}}

// convert js object to lua pretty
var luaObjPretty = jsObjectToLuaPretty(jsObj, 1/*pretty mode depth*/);
console.log(luaObjPretty);
//# result :
//{
//	a = "123",
//	b = 345,
//	c = {1,2,3}
//}


// convert json string to lua pretty
var luaObjPretty = jsonToLuaPretty(JSON.stringify(jsObj), 1/*pretty mode depth*/);
console.log(luaObjPretty);
//# result :
//{
//	a = "123",
//	b = 345,
//	c = {1,2,3}
//}

```
