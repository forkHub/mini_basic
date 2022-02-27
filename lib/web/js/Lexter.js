"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Lexer {
            lexer() {
                while (parse.parse.dataStr.length > 0) {
                    if (this.getKeyword2()) { }
                    else if (this.getOp()) { }
                    else if (this.getKeyword()) { }
                    else if (this.getId()) { }
                    else if (this.getLineNumb()) { }
                    else if (this.getNumber()) { }
                    else {
                        console.group('found unknown character');
                        console.log(parse.parse.dataStr.slice(0, 10));
                        console.log(parse.parse.dataStr.charCodeAt(0));
                        console.log(parse.parse.dataStr.charAt(0));
                        console.groupEnd();
                        // throw Error('');
                    }
                }
                console.log("ok");
                // console.log(parse.token);
            }
            getOp() {
                for (let i = 0; i < parse.parse.op.length; i++) {
                    let kata = parse.parse.op[i];
                    if (parse.parse.dataStr.slice(0, kata.length) == kata) {
                        parse.parse.token.push({
                            token: kata,
                            type: parse.Kons.TY_OP
                        });
                        parse.parse.dataStr = parse.parse.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getNumber() {
                let id = /^[0-9][0-9.]*/;
                let hsl = (parse.parse.dataStr.match(id));
                if (hsl) {
                    parse.parse.dataStr = parse.parse.dataStr.slice(hsl[0].length);
                    // console.debug('no: ' + hsl);
                    // this.sisa(str);
                    // parse.kataAr.push(hsl + '');
                    parse.parse.token.push({
                        token: hsl + '',
                        type: parse.Kons.TY_ANGKA
                    });
                    return true;
                }
                return false;
            }
            getKeyword2() {
                for (let i = 0; i < parse.parse.kataKunci2.length; i++) {
                    let kata = parse.parse.kataKunci2[i];
                    if (parse.parse.dataStr.slice(0, kata.length) == kata) {
                        // console.debug('keyword: ' + kata);
                        // parse.kataAr.push(kata);
                        parse.parse.token.push({
                            token: kata,
                            type: parse.Kons.Ty_RES_WORD
                        });
                        parse.parse.dataStr = parse.parse.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getKeyword() {
                for (let i = 0; i < parse.parse.kataKunci.length; i++) {
                    let kata = parse.parse.kataKunci[i];
                    if (parse.parse.dataStr.slice(0, kata.length) == kata) {
                        // console.debug('keyword: ' + kata);
                        // parse.kataAr.push(kata);
                        parse.parse.token.push({
                            token: kata,
                            type: parse.Kons.Ty_RES_WORD
                        });
                        parse.parse.dataStr = parse.parse.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getId() {
                let id = /^[a-zA-Z_][a-zA-Z0-9_$%#]*/;
                let hsl = (parse.parse.dataStr.match(id));
                if (hsl) {
                    parse.parse.dataStr = parse.parse.dataStr.slice(hsl[0].length);
                    // console.debug('kata: ' + hsl);
                    // parse.kataAr.push(hsl + '')
                    parse.parse.token.push({
                        token: hsl + '',
                        type: parse.Kons.TY_KATA
                    });
                    return true;
                }
                return false;
            }
            getLineNumb() {
                if (parse.parse.dataStr.charAt(0) == ';') {
                    // console.log('ln');
                    parse.parse.dataStr = parse.parse.dataStr.slice(1, parse.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.parse.token.push({
                        token: ';',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.parse.dataStr.charCodeAt(0) == 13) {
                    // console.log('ln');
                    parse.parse.dataStr = parse.parse.dataStr.slice(1, parse.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.parse.token.push({
                        token: ';',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.parse.dataStr.charCodeAt(0) == 10) {
                    // console.log('ln');
                    parse.parse.dataStr = parse.parse.dataStr.slice(1, parse.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.parse.token.push({
                        token: ';',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.parse.dataStr.charCodeAt(0) == 9) {
                    // console.log('ln');
                    parse.parse.dataStr = parse.parse.dataStr.slice(1, parse.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.parse.token.push({
                        token: ';',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                return false;
            }
        }
        parse.Lexer = Lexer;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
