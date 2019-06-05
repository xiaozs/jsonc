let annotationReg = /\/\/[^\r\n]*/;
let multipleLinesAnnotationReg = /\/\*(?:.|\s)*?\*\//;
let stringReg = /"(?:\\\\|\\"|[^"\r\n])*"/;

let regText = [stringReg, multipleLinesAnnotationReg, annotationReg].map(it => "(" + it.source + ")").join("|");
let reg = new RegExp(regText, "g");

function clearAnnotation(text: string) {
    return text.replace(reg, ($$, $1) => $1 || "");
}

let parseTemp = JSON.parse;

/**
  * Converts a JavaScript Object Notation (JSON) string into an object.
  * @param text A valid JSON string.
  * @param reviver A function that transforms the results. This function is called for each member of the object.
  * If a member contains nested objects, the nested objects are transformed before the parent object is.
  */
export function parse(text: string, reviver?: (this: any, key: string, value: any) => any): any {
    text = clearAnnotation(text);
    return parseTemp(text, reviver);
}

/**
  * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  * @param value A JavaScript value, usually an object or array, to be converted.
  * @param replacer A function that transforms the results.
  * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
  */
export function stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
/**
  * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  * @param value A JavaScript value, usually an object or array, to be converted.
  * @param replacer An array of strings and numbers that acts as a approved list for selecting the object properties that will be stringified.
  * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
  */
export function stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
export function stringify(): string {
    //@ts-ignore
    return JSON.stringify.apply(JSON, arguments);
}

export function polyfill() {
    JSON.parse = parse;
}

export function noConflict() {
    JSON.parse = parseTemp;
}