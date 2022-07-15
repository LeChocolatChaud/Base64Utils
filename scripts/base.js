"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
const base64 = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/",
];
function encodeBase64(input) {
    if (input === "")
        return "";
    let mod = input.length % 3;
    let source = "";
    for (let i = 0; i < input.length; i++) {
        let code = input.charCodeAt(i).toString(2);
        while (code.length < 8) {
            code = "0" + code;
        }
        source += code;
    }
    switch (mod) {
        case 1:
            source += "0000000000000000";
            break;
        case 2:
            source += "00000000";
            break;
    }
    let output = "";
    for (let i = 0; i < source.length; i += 6) {
        let index = parseInt(source.substring(i, i + 6), 2);
        output += base64[index];
    }
    switch (mod) {
        case 1:
            output = output.substring(0, output.length - 2) + "==";
            break;
        case 2:
            output = output.substring(0, output.length - 1) + "=";
            break;
    }
    return output;
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(input) {
    if (input === "")
        return "";
    let source = "";
    let equals = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "=") {
            source += "000000";
            equals++;
        }
        else {
            if (base64.indexOf(input[i]) === -1)
                throw new Error("Invalid base64 character: " + input[i]);
            let code = base64.indexOf(input[i]).toString(2);
            while (code.length < 6) {
                code = "0" + code;
            }
            source += code;
        }
    }
    for (let i = 0; i < equals; i++) {
        source = source.substring(0, source.length - 8);
    }
    let output = "";
    for (let i = 0; i < source.length; i += 8) {
        let index = parseInt(source.substring(i, i + 8), 2);
        output += String.fromCharCode(index);
    }
    output = output.replace(/\\s/g, "");
    return output;
}
exports.decodeBase64 = decodeBase64;
