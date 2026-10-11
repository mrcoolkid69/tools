"use strict"

const keyboardCharacters = [
    // 0 - 25: Row 1 (Numbers, Symbols, and Shifts)
    ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',

    // 26 - 51: Row 2 (Top Row Letters & Brackets - Lowercase/Uppercase)
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',

    // 52 - 73: Row 3 (Home Row Letters & Punctuation - Lowercase/Uppercase)
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"',

    // 74 - 94: Row 4 & Space (Bottom Row Letters, Punctuation & Space)
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '`'
];

const scrambledCharacters = [
    'K', 'k', ';', "'", 'i', 'q', '1', 'G', '@', 'l', '^', '0', 'a', '"', '|',
    'B', '{', 'E', 'c', 't', 'f', 'z', 'U', 'u', 'n', 'F', 'M', '8', ']', '/',
    'b', 'O', 'Y', 'R', '?', '}', ' ', '=', '[', ')', 'Q', 'W', '%', 'A', ':',
    'g', '7', 'o', 'v', 'I', '2', '#', '\\', 'D', '(', 'j', '_', '5', '6', '*',
    'P', 'V', '9', 'H', 'T', '.', '&', '<', 'h', 'N', 's', 'X', '+', 'L',
    'm', 'S', 'r', 'w', 'Z', '>', '4', 'd', 'x', '-', 'J', 'C', '~', '$', 'e',
    'y', 'p', '3', '!', ',', "`"
];


function getData(type) {
    const text = document.getElementById("text").value;
    const arrayText = [...text];
    let keyboardTranslate = [];
    if (type === "encode") {
        for (let i = 0; i < arrayText.length; i++) {
            let index = 0;
            while (arrayText[i] != keyboardCharacters[index]) {
                index++;
                if (index > 95) {
                    break;
                }
            }
            keyboardTranslate.push(index);
        }
    } else if (type === "decode") {
        for (let i = 0; i < arrayText.length; i++) {
            let index = 0;
            while (arrayText[i] != scrambledCharacters[index]) {
                index++;
                if (index > 95) {
                    break;
                }
            }
            keyboardTranslate.push(index);
        }
    }
    // console.log(arrayText, keyboardTranslate);
    return keyboardTranslate;
}
function encodeData(data, start, increment) {
    console.log("Data", start, increment);
    let encodeDataArray = [];
    let encodeDataString = "";
    let index = start;
    for (let i = 0; i < data.length; i++) {
        let textCode = data[i];
        encodeDataArray.push(scrambledCharacters[loop(textCode + index)]);
        index += increment;
        console.log(index);
    }
    console.log(encodeDataArray);
    encodeDataString = encodeDataArray.join("");
    return encodeDataString;
}

function decodeData(data, start, increment) {
    let decodedDataArray = [];
    let decodedDataString = "";
    let index = start;
    console.log("Data", start, increment);
    for (let i = 0; i < data.length; i++) {
        let textCode = data[i];
        decodedDataArray.push(keyboardCharacters[loop(textCode - index)]);
        index += increment;
        console.log(index);
    }
    decodedDataString = decodedDataArray.join("");
    console.log(decodedDataArray);
    return decodedDataString;
}

function getCode() {
    let code = document.getElementById("code").value;
    let startingPoint = loop(code);
    let increment = 1;
    while (code > 94) {
        increment++;
        code -= 95;
    }
    return [startingPoint, parseFloat(increment)];
}

function loop(num) { 
    let numMath = parseFloat(num);
    if (num > 0 ) {
        while (numMath > 94) {
            numMath -= 95;
        }
    } else if (num < 0) {
        while (numMath < 0) {
            numMath += 95;
        }
    } 
    return numMath;
}

function runEncryption() {
    let type = document.getElementById("type").value;
    let [startingPoint, increment] = getCode();
    console.log(startingPoint, increment);
    if (type === "encode") {
        console.log("Data: ", startingPoint, increment);
        let uncodedData = getData(type);
        let codedData = encodeData(uncodedData, startingPoint, increment);
        document.getElementById("output").innerHTML = codedData;
    } else if (type === "decode") {
        let codedData = getData(type);
        let decodedData = decodeData(codedData, startingPoint, increment);
        document.getElementById("output").innerHTML = decodedData;
    }
}