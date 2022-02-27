"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Terjemah {
            terjemah(token) {
                console.log("terjemah");
                console.log(token);
                // let b: boolean = false;
                if (false) {
                    return '';
                }
                else if (token.type == parse.Kons.Ty_VAR_ASSIGNMENT) {
                    return this.varAssign(token);
                }
                else if (token.type == parse.Kons.TY_ANGKA) {
                    return token.value;
                }
                else if (token.type == parse.Kons.TY_ARGUMENT) {
                    return this.terjemah(token.token[0]) + ',' + this.terjemah(token.token[2]);
                }
                else if (token.type == parse.Kons.TY_RES_WORD) {
                    if (token.value.toLowerCase() == "wend") {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == "next") {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == 'end function') {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == "endif") {
                        return "}";
                    }
                    else if (token.value.toLowerCase() == "else") {
                        return "} else {";
                    }
                    else if (token.value.toLowerCase() == "function") {
                        return "function ";
                    }
                    else if (token.value.toLowerCase() == "return") {
                        return "return ";
                    }
                    else if (token.value.toLowerCase() == "mod") {
                        return " % ";
                    }
                    else {
                        return token.value;
                    }
                }
                else if (token.type == parse.Kons.TY_BINOP) {
                    if (token.token.length == 2) {
                        return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    }
                    else if (token.token.length == 3) {
                        return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " " + this.terjemah(token.token[2]);
                    }
                    else {
                        throw new Error();
                    }
                }
                else if (token.type == parse.Kons.TY_TEKS) {
                    return this.string(token.token);
                }
                else if (token.type == parse.Kons.TY_BARIS) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_FOR) {
                    //for kata = exp to exp2 => for (let kata = exp; kata <= exp2; kata++) {
                    //0   1    2 3   4  5
                    let hasil = '';
                    hasil += 'for (let ' + this.terjemah(token.token[1]) + " = " + this.terjemah(token.token[3]) + ";";
                    hasil += ' ' + this.terjemah(token.token[1]) + " <= " + this.terjemah(token.token[5]) + ";";
                    hasil += ' ' + this.terjemah(token.token[1]) + '++) {';
                    return hasil;
                }
                else if (token.type == parse.Kons.TY_IF) {
                    //if binop then => if binop {
                    return 'if (' + this.terjemah(token.token[1]) + ") {";
                }
                else if (token.type == parse.Kons.TY_IFP) {
                    //if perintah
                    //0  1
                    return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " }";
                }
                else if (token.type == parse.Kons.TY_KATA) {
                    if (token.token && token.token.length == 2) {
                        return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    }
                    else if (token.value) {
                        return token.value;
                    }
                    else {
                        throw Error('');
                    }
                }
                else if (token.type == parse.Kons.TY_KATA_DOT) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_KURUNG_ISI) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
                }
                else if (token.type == parse.Kons.TY_KURUNG_KOSONG) {
                    return "()";
                }
                else if (token.type == parse.Kons.TY_MIN) {
                    return token.token[0].value + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_OP) {
                    if (token.value == "<>") {
                        return "!=";
                    }
                    else if (token.value.toLowerCase() == "mod") {
                        return " % ";
                    }
                    return token.value;
                }
                else if (token.type == parse.Kons.TY_PANGGIL_FUNGSI) {
                    let hsl = '';
                    hsl = this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    if (parse.data.config.awaitFl) {
                        hsl = hsl.trim();
                        hsl = 'await ' + hsl;
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_PERINTAH) {
                    let hsl = '';
                    if (token.token.length == 2) {
                        hsl = this.terjemah(token.token[0]) + "(" + this.terjemah(token.token[1]) + ")";
                    }
                    else if (token.token.length == 1) {
                        if (token.value && token.value.toLowerCase() == 'wend') {
                            return "}";
                        }
                        else {
                            hsl = this.terjemah(token.token[0]) + "()";
                        }
                    }
                    else {
                        throw Error("");
                    }
                    if (parse.data.config.awaitFl) {
                        hsl = hsl.trim();
                        if (hsl.slice(0, 6) == 'return') {
                        }
                        else {
                            hsl = 'await ' + hsl;
                        }
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_WEND) {
                    return this.wend(token);
                }
                else if (token.type == parse.Kons.TY_SYMBOL) {
                    if (token.value == ".")
                        return token.value;
                    return token.value + " ";
                }
                else if (token.type == parse.Kons.TY_ELSEIF) {
                    return "} else if " + " (" + this.terjemah(token.token[1]) + ") " + " { ";
                }
                else if (token.type == parse.Kons.TY_FUNC) {
                    let hsl = '';
                    let st = parse.data.config.awaitFl;
                    parse.data.config.awaitFl = false;
                    hsl = token.token[0].value.toLowerCase() + " " + this.terjemah(token.token[1]) + " {";
                    parse.data.config.awaitFl = st;
                    if (parse.data.config.awaitFl) {
                        hsl = 'async ' + hsl;
                    }
                    return hsl;
                }
                else {
                    throw Error();
                }
            }
            string(token) {
                let hasil = '';
                token.forEach((item) => {
                    hasil += item.value;
                });
                return " " + hasil;
            }
            wend(token) {
                let hasil = '';
                hasil += token.token[0].value.toLowerCase();
                hasil += " (" + this.terjemah(token.token[1]) + ") {";
                return hasil;
            }
            varAssign(token) {
                // let hasil: string = '';
                if (token.token.length == 2) {
                    let token1 = token.token[0].value.toLowerCase();
                    let token2 = this.terjemah(token.token[1]);
                    if (token1 == "global") {
                        return "window." + token2;
                    }
                    else if (token1 == "const") {
                        return "const " + token2;
                    }
                    else {
                        console.log('token 1 ' + token1);
                        console.log('token 2 ' + token2);
                        throw Error("");
                    }
                }
                else if (token.token.length == 3) {
                    return this.terjemah(token.token[0]) + "=" + this.terjemah(token.token[2]);
                }
                else {
                    throw Error('');
                }
            }
        }
        parse.terj = new Terjemah();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
