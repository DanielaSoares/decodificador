function processText() {
    const inputText = document.getElementById('input-text').value;
    const operationMethod = document.getElementById('operation-method').value;
    const method = document.getElementById('encode-decode-method').value;
    let outputText;

    try {
        if (operationMethod === 'encode') {
            outputText = encodeText(inputText, method);
        } else if (operationMethod === 'decode') {
            outputText = decodeText(inputText, method);
        } else {
            outputText = 'Método de operação não suportado.';
        }
    } catch (error) {
        outputText = 'Erro na operação: ' + error.message;
    }

    document.getElementById('output-text').value = outputText;
}

function encodeText(text, method) {
    switch (method) {
        case 'base64':
            return btoa(text);
        case 'url':
            return encodeURIComponent(text);
        case 'hex':
            return stringToHex(text);
        case 'rot13':
            return rot13(text);  // ROT13 é simétrico, então encode e decode são a mesma função
        default:
            throw new Error('Método de codificação não suportado.');
    }
}

function decodeText(text, method) {
    switch (method) {
        case 'base64':
            return atob(text);
        case 'url':
            return decodeURIComponent(text);
        case 'hex':
            return hexToString(text);
        case 'rot13':
            return rot13(text);  // ROT13 é simétrico, então encode e decode são a mesma função
        default:
            throw new Error('Método de decodificação não suportado.');
    }
}

function stringToHex(str) {
    return str.split('')
              .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
              .join('');
}

function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

function rot13(str) {
    return str.replace(/[a-zA-Z]/g, c =>
        String.fromCharCode(
            (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13)
                ? c
                : c - 26
        )
    );
}