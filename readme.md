# JSONC
JSON with comments polyfill


```javascript
import * as JSON from "@frm/jsonc";

var str = `
{
    //test
    /*test*/
    "test":"test"
}
`;
var test = JSON.parse(str) // => { test: "test" }
```


```javascript
import { polyfill, noConflict } from "@frm/jsonc";
polyfill();

var str = `
{
    //test
    /*test*/
    "test":"test"
}
`;
var test = JSON.parse(str) // => { test: "test" }

noConflict();
JSON.parse(str);  // throw Error
```