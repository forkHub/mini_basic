"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Exp {
            // private _ar: Arr = new Arr();
            isExp(token) {
                if (!token)
                    return false;
                if (token.type == parse.Kons.TY_ANGKA)
                    return true;
                if (token.type == parse.Kons.TY_MIN)
                    return true;
                if (token.type == parse.Kons.TY_TEKS)
                    return true;
                if (token.type == parse.Kons.TY_BINOP)
                    return true;
                if (token.type == parse.Kons.TY_KATA)
                    return true;
                if (token.type == parse.Kons.TY_PANGGIL_FUNGSI)
                    return true;
                if (token.type == parse.Kons.TY_KATA_DOT)
                    return true;
                if (token.type == parse.Kons.TY_KURUNG_ISI)
                    return true;
                if (token.value && token.value.toLowerCase() == "true")
                    return true;
                if (token.value && token.value.toLowerCase() == "false")
                    return true;
                return false;
            }
            isOp(token) {
                // if (token.token == "=") return true;
                if (token.value == "+")
                    return true;
                if (token.value == "-")
                    return true;
                if (token.value == "*")
                    return true;
                if (token.value == "/")
                    return true;
                if (token.value == "%")
                    return true;
                if (token.value && token.value.toLowerCase() == "mod")
                    return true;
                if (token.type == parse.Kons.TY_OP)
                    return true;
                return false;
            }
            kataDot() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA) {
                        if (token2.value == '.') {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KATA_DOT
                            };
                            console.log("kata dot:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kataDotChain() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA_DOT) {
                        if (token2.type == parse.Kons.TY_KATA_DOT) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KATA_DOT
                            };
                            console.log("kata dot chain:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kataDotFinal() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA_DOT) {
                        if (token2.type == parse.Kons.TY_KATA) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KATA
                            };
                            console.log("kata dot final:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            //2
            kurungKosong() {
                // console.group('kurung kosong');
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.value == "(") {
                        if (token2.value == ")") {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KURUNG_KOSONG
                            };
                            console.log("kurung kosong:");
                            console.log(tokenBaru);
                            // console.log('sebelum:')
                            // console.log(this._barisObj.token);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            // console.log('sesudah:');
                            // console.log(this._barisObj.token);
                            // console.groupEnd();
                            return true;
                        }
                        // else {
                        //     console.log('gagal: ' + token2.token.toString());
                        // }
                    }
                    // else {
                    //     console.log("gagal: " + token1.token.toString());
                    // }
                }
                // console.groupEnd();
                return false;
            }
            kurungIsi() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 3; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    if (token1.value == "(") {
                        if (token2.type == parse.Kons.TY_ARGUMENT || this.isExp(token2)) {
                            if (token3.value == ")") {
                                let tokenBaru = {
                                    token: [token1, token2, token3],
                                    type: parse.Kons.TY_KURUNG_ISI
                                };
                                console.log("kurung isi:");
                                console.log(tokenBaru);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            binop() {
                let ada = false;
                // console.group('binop:');
                // console.log(this.grammar.barisObj.token);
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 3; i++) {
                    // console.group('iterate ' + i);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    let tokenBaru;
                    // console.log(token1);
                    // console.log(token2);
                    // console.log(token3);
                    if (this.isExp(token1)) {
                        if (this.isOp(token2)) {
                            if (this.isExp(token3)) {
                                tokenBaru = {
                                    type: parse.Kons.TY_BINOP,
                                    token: []
                                };
                                let tokenIsi = tokenBaru.token;
                                tokenIsi.push(token1);
                                tokenIsi.push(token2);
                                tokenIsi.push(token3);
                                // console.log('binop, token baru:');
                                // console.log(tokenBaru);
                                // console.log('asal:');
                                // console.log(this.grammar.barisObj.token);
                                console.log("binop:");
                                console.log(tokenBaru);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                // console.log('setelah:');
                                // console.log(this.grammar.barisObj.token);
                                ada = true;
                            }
                        }
                    }
                    // console.groupEnd();
                }
                // console.groupEnd();
                return ada;
            }
            // binopMin(): boolean {
            //     for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {
            //         let token1: Itoken = grammar.barisObj.token[i];
            //         let token2: Itoken = grammar.barisObj.token[i + 1];
            //         let tokenBaru: Itoken;
            //         if (this.isExp(token1)) {
            //             if (token2.type == Kons.TY_MIN) {
            //                 tokenBaru = {
            //                     type: Kons.TY_BINOP,
            //                     token: [token1, token2]
            //                 }
            //                 console.log("binop Min:");
            //                 console.log(tokenBaru);
            //                 grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);
            //                 return true;
            //             }
            //         }
            //     }
            //     return false;
            // }
            min() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.grammar.barisObj.token);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let tokenBaru;
                    let ok = true;
                    if ((token1.value != '-') && (token1.value != '+')) {
                        ok = false;
                    }
                    if ((token2.type == parse.Kons.TY_ANGKA) == false) {
                        ok = false;
                    }
                    if (token0 && this.isExp(token0))
                        ok = false;
                    if (token0 && token0.value == ')')
                        ok = false;
                    if (token0 && token0.type == parse.Kons.TY_KURUNG_ISI)
                        ok = false;
                    if (ok) {
                        tokenBaru = {
                            type: parse.Kons.TY_MIN,
                            token: []
                        };
                        let tokenIsi = tokenBaru.token;
                        tokenIsi.push(token1);
                        tokenIsi.push(token2);
                        console.log("min:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                        return true;
                    }
                }
                return false;
            }
            // argument(): boolean {
            //     for (let i: number = 0; i <= grammar.barisObj.token.length - 3; i++) {
            //         let token1: Itoken = grammar.barisObj.token[i];
            //         let token2: Itoken = grammar.barisObj.token[i + 1];
            //         let token3: Itoken = grammar.barisObj.token[i + 2];
            //         if (exp.isExp(token1)) {
            //             if (token2.token.toString() == ",") {
            //                 if (exp.isExp(token3)) {
            //                     let tokenBaru: Itoken = {
            //                         token: [token1, token2, token3],
            //                         type: Kons.TY_ARGUMENT
            //                     }
            //                     console.log("arg:");
            //                     console.log(tokenBaru);
            //                     grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);
            //                     return true;
            //                 }
            //             }
            //         }
            //     }
            //     return false;
            // }
            checkArgument(tokenAr) {
                if (!tokenAr[1])
                    return false;
                if (!tokenAr[2])
                    return false;
                if (!tokenAr[3])
                    return false;
                if (this.isExp(tokenAr[1]) == false) {
                    if (tokenAr[1].type != parse.Kons.TY_ARGUMENT) {
                        return false;
                    }
                }
                if (!(tokenAr[2].value == ','))
                    return false;
                if (this.isExp(tokenAr[3]) == false)
                    return false;
                if (tokenAr[4] && tokenAr[4].value == "(")
                    return false;
                return true;
            }
            argument(token) {
                for (let i = 0; i < token.length; i++) {
                    // console.log("argument " + i);
                    if (this.checkArgument([
                        parse.parse.getToken(i - 1, token),
                        parse.parse.getToken(i + 0, token),
                        parse.parse.getToken(i + 1, token),
                        parse.parse.getToken(i + 2, token),
                        parse.parse.getToken(i + 3, token),
                    ])) {
                        let tokenBaru = {
                            token: [
                                parse.parse.getToken(i, token),
                                parse.parse.getToken(i + 1, token),
                                parse.parse.getToken(i + 2, token)
                            ],
                            type: parse.Kons.TY_ARGUMENT
                        };
                        console.log("arg2:");
                        console.log(tokenBaru);
                        parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                        return true;
                    }
                    ;
                }
                return false;
            }
            // argument2(token: Itoken[]): boolean {
            // }
            //2
            panggilfungsi() {
                // console.group('panggil fungsi');
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA) {
                        if (token2.type == parse.Kons.TY_KURUNG_KOSONG || token2.type == parse.Kons.TY_KURUNG_ISI) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_PANGGIL_FUNGSI
                            };
                            //convert ke wend
                            //check kata dot
                            if (token1.value && token1.value.toLowerCase() == 'while') {
                                tokenBaru.type = parse.Kons.TY_WEND;
                            }
                            console.log('panggil fungsi:');
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            // console.log('sesudah:');
                            // console.log(this._barisObj.token);
                            // console.groupEnd();
                            return true;
                        }
                        // else {
                        //     console.log('gagal: ' + token2.token.toString());
                        // }
                    }
                    // else {
                    //     console.log("gagal: " + token1.token.toString());
                    // }
                }
                // console.groupEnd();
                return false;
            }
            getQuote2(idx) {
                // console.group('get quote');
                for (let i = idx; i < parse.grammar.barisObj.token.length; i++) {
                    let item = parse.grammar.barisObj.token[i];
                    // console.log('token as string: ' + (item.token as string) + '/' + item.token.toString());
                    if (item.value == "\"") {
                        if (i == idx) {
                            // console.groupEnd();
                            return i;
                        }
                        else {
                            let itemSebelum = parse.grammar.barisObj.token[i - 1];
                            if (itemSebelum.value.toString() != "\\") {
                                // console.groupEnd();
                                return i;
                            }
                        }
                    }
                }
                // console.groupEnd();
                return -1;
            }
            teks() {
                let idx = 0;
                let idx2 = 0;
                let l = 0;
                // console.group('teks:');
                // console.log(this.grammar.barisObj.token);
                idx = this.getQuote2(0);
                if (idx == -1) {
                    // console.groupEnd();
                    return false;
                }
                idx2 = this.getQuote2(idx + 1);
                if (idx2 == -1) {
                    // console.groupEnd();
                    return false;
                }
                l = idx2 - idx;
                l;
                // console.log('idx1: ' + idx);
                // console.log('idx2: ' + idx2);
                //package
                let tokenBaru = {
                    token: [],
                    type: parse.Kons.TY_TEKS
                };
                tokenBaru.token = parse.ar.ambilTengah(parse.grammar.barisObj.token, idx, idx2);
                console.log("teks:");
                console.log(tokenBaru);
                // console.log('teks baru:');
                // parse.baris.renderLines(tokenBaru.token);
                // console.log('sebelum:');
                // console.log(this.grammar.barisObj.token);
                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, idx, idx2, tokenBaru);
                // console.log('setelah:');
                // console.log(this.grammar.barisObj.token);
                // console.groupEnd();
                return true;
            }
        }
        parse.exp = new Exp();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
