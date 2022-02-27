"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Lexer {
            lexer() {
                console.group('lexer start');
                while (parse.data.dataStr.length > 0) {
                    if (this.getKeyword2()) { }
                    else if (this.getOp()) { }
                    else if (this.getSymbol()) { }
                    else if (this.getCmd()) { }
                    else if (this.getId()) { }
                    else if (this.getLineBreak()) { }
                    else if (this.getNumber()) { }
                    else {
                        console.group('found unknown character');
                        console.log(parse.data.dataStr.slice(0, 10));
                        console.log(parse.data.dataStr.charCodeAt(0));
                        console.log(parse.data.dataStr.charAt(0));
                        console.groupEnd();
                        // throw Error('');
                    }
                }
                console.groupEnd();
                // console.log(data.token);
            }
            getOp() {
                for (let i = 0; i < parse.data.op.length; i++) {
                    let kata = parse.data.op[i];
                    if (parse.data.dataStr.slice(0, kata.length) == kata) {
                        parse.data.token.push({
                            // token: kata,
                            value: kata,
                            type: parse.Kons.TY_OP
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            //TODO: dihapus
            getCmd() {
                for (let i = 0; i < parse.data.cmd.length; i++) {
                    let kata = parse.data.cmd[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_KATA
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getNumber() {
                let id = /^[0-9][0-9.]*/;
                let hsl = (parse.data.dataStr.match(id));
                if (hsl) {
                    parse.data.dataStr = parse.data.dataStr.slice(hsl[0].length);
                    // console.debug('no: ' + hsl);
                    // this.sisa(str);
                    // parse.kataAr.push(hsl + '');
                    parse.data.token.push({
                        // token: hsl + '',
                        value: hsl + '',
                        type: parse.Kons.TY_ANGKA
                    });
                    return true;
                }
                return false;
            }
            getComment() {
                if (parse.data.dataStr.slice(0, 2) == '//') {
                    parse.data.dataStr = '';
                    return true;
                }
                return false;
            }
            getKeyword2() {
                for (let i = 0; i < parse.data.kataKunci2.length; i++) {
                    let kata = parse.data.kataKunci2[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        // console.debug('keyword: ' + kata);
                        // parse.kataAr.push(kata);
                        parse.data.token.push({
                            // token: kata,
                            value: kata,
                            type: parse.Kons.TY_RES_WORD
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getSymbol() {
                for (let i = 0; i < parse.data.symbol.length; i++) {
                    let kata = parse.data.symbol[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                        // console.debug('keyword: ' + kata);
                        // parse.kataAr.push(kata);
                        parse.data.token.push({
                            // token: kata,
                            value: kata,
                            type: parse.Kons.TY_SYMBOL
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getId() {
                let id = /^[a-zA-Z_][a-zA-Z0-9_$%#]*/;
                let hsl = (parse.data.dataStr.match(id));
                let value = '';
                if (hsl) {
                    parse.data.dataStr = parse.data.dataStr.slice(hsl[0].length);
                    // console.debug('kata: ' + hsl);
                    // parse.kataAr.push(hsl + '')
                    value = hsl + '';
                    if (value.charAt(value.length - 1) == "#") {
                        value = value.slice(0, value.length - 1);
                    }
                    parse.data.token.push({
                        // token: hsl + '',
                        value: value,
                        type: parse.Kons.TY_KATA
                    });
                    return true;
                }
                return false;
            }
            getLineBreak() {
                // if (data.dataStr.charAt(0) == ';') {
                //     // console.log('ln');
                //     data.dataStr = data.dataStr.slice(1, data.dataStr.length);
                //     // parse.kataAr.push(";");
                //     data.token.push({
                //         // token: ';',
                //         value: '',
                //         type: Kons.TY_BARIS
                //     })
                //     return true;
                // }
                if (parse.data.dataStr.charCodeAt(0) == 13) {
                    // console.log('ln');
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.data.token.push({
                        // token: ';',
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.data.dataStr.charCodeAt(0) == 10) {
                    // console.log('ln');
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.data.token.push({
                        // token: ';', 
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.data.dataStr.charCodeAt(0) == 9) {
                    // console.log('ln');
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    // parse.kataAr.push(";");
                    parse.data.token.push({
                        // token: ';',
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                return false;
            }
        }
        parse.lexer = new Lexer();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
