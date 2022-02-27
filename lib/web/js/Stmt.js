"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Stmt {
            for2() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 6; i++) {
                    let token1 = parse.grammar.barisObj.token[i + 0];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    let token4 = parse.grammar.barisObj.token[i + 3];
                    let token5 = parse.grammar.barisObj.token[i + 4];
                    let token6 = parse.grammar.barisObj.token[i + 5];
                    if (token1.value && token1.value.toLowerCase() == "for") {
                        if (token2.type == parse.Kons.TY_KATA) {
                            if (token3.value == "=") {
                                if (parse.exp.isExp(token4)) {
                                    if (token5.value && token5.value.toLowerCase() == "to") {
                                        if (parse.exp.isExp(token6)) {
                                            let tokenBaru = {
                                                token: [
                                                    token1,
                                                    token2,
                                                    token3,
                                                    token4,
                                                    token5,
                                                    token6
                                                ],
                                                type: parse.Kons.TY_FOR
                                            };
                                            console.log('for: ');
                                            console.log(tokenBaru);
                                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 5, tokenBaru);
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            }
            if2() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 3; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    if (token1.value && token1.value.toLowerCase() == "if") {
                        if (parse.exp.isExp(token2)) {
                            if (token3.value && token3.value.toLowerCase() == "then") {
                                let tokenBaru = {
                                    token: [
                                        token1,
                                        token2,
                                        token3
                                    ],
                                    type: parse.Kons.TY_IF
                                };
                                console.log('IF: ');
                                console.log(tokenBaru);
                                // console.log('sebelum:');
                                // console.log(this._barisObj.token);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                // console.log('sesudah:');
                                // console.log(this._barisObj.token);
                                // console.groupEnd();
                                return true;
                            }
                            else {
                                // console.log('failed: 3 ' + this.isExp(token3));
                            }
                        }
                        else {
                            // console.log('failed: token 2 ' + token2.token.toString());
                        }
                    }
                    else {
                        // console.log('failed: token1 type: ' + token1.type);
                    }
                    // console.groupEnd();
                }
                // console.groupEnd();
                return false;
            }
            funcDec() {
                //Function panggil-fungsi
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    if (token1 && token1.value && token1.value.toLowerCase() == "function") {
                        if (token2 && token2.type == parse.Kons.TY_PANGGIL_FUNGSI) {
                            let tokenBaru = {
                                token: [
                                    token1,
                                    token2
                                ],
                                type: parse.Kons.TY_FUNC
                            };
                            console.log('func dec: ');
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                        else {
                            // console.log('failed: token 2 ' + token2.token.toString());
                        }
                    }
                    else {
                        // console.log('failed: token1 type: ' + token1.type);
                    }
                    // console.groupEnd();
                }
                // console.groupEnd();
                return false;
            }
            elseIf() {
                //elseif exp then
                for (let i = 0; i <= parse.grammar.barisObj.token.length; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.parse.getToken(i + 1, parse.grammar.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.grammar.barisObj.token);
                    if (token1 && token1.value && token1.value.toLowerCase() == "elseif") {
                        if (parse.exp.isExp(token2)) {
                            if (token3 && token3.value && token3.value.toLowerCase() == "then") {
                                let tokenBaru = {
                                    token: [
                                        token1,
                                        token2,
                                        token3
                                    ],
                                    type: parse.Kons.TY_ELSEIF
                                };
                                console.log('else IF: ');
                                console.log(tokenBaru);
                                // console.log('sebelum:');
                                // console.log(this._barisObj.token);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                // console.log('sesudah:');
                                // console.log(this._barisObj.token);
                                // console.groupEnd();
                                return true;
                            }
                            else {
                                // console.log('failed: 3 ' + this.isExp(token3));
                            }
                        }
                        else {
                            // console.log('failed: token 2 ' + token2.token.toString());
                        }
                    }
                    else {
                        // console.log('failed: token1 type: ' + token1.type);
                    }
                    // console.groupEnd();
                }
                // console.groupEnd();
                return false;
            }
            //if diikuti perintah
            ifPerintah() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i + 0];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_IF) {
                        if (token2.type == parse.Kons.TY_KATA ||
                            token2.type == parse.Kons.Ty_VAR_ASSIGNMENT ||
                            token2.type == parse.Kons.TY_PERINTAH ||
                            parse.exp.isExp(token2)) {
                            let tokenBaru = {
                                token: [
                                    token1,
                                    token2,
                                ],
                                type: parse.Kons.TY_IFP
                            };
                            console.log('IF: ');
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            //2
            Baru() {
                return false;
            }
            varAssign() {
                // console.group('var assign:');
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 3; i++) {
                    // console.log('iterate ' + i);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let token3 = parse.grammar.barisObj.token[i + 2];
                    if (token1.type == parse.Kons.TY_KATA || token1.type == parse.Kons.TY_KATA_DOT) {
                        if (token2.value == '=') {
                            if (parse.exp.isExp(token3) || token3.type == parse.Kons.TY_PERINTAH) {
                                let tokenBaru = {
                                    token: [
                                        token1,
                                        token2,
                                        token3
                                    ],
                                    type: parse.Kons.Ty_VAR_ASSIGNMENT
                                };
                                console.log('var Assign:');
                                console.log(tokenBaru);
                                // console.log('sebelum:');
                                // console.log(this._barisObj.token);
                                parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 2, tokenBaru);
                                // console.log('sesudah:');
                                // console.log(this._barisObj.token);
                                // console.groupEnd();
                                return true;
                            }
                            else {
                                // console.log('failed: 3 ' + this.isExp(token3));
                            }
                        }
                        else {
                            // console.log('failed: token 2 ' + token2.token.toString());
                        }
                    }
                    else {
                        // console.log('failed: token1 type: ' + token1.type);
                    }
                    // console.groupEnd();
                }
                // console.groupEnd();
                return false;
            }
            new2() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.value && token1.value.toLowerCase() == "new") {
                        if (token2.type == parse.Kons.TY_KATA || (token2.type == parse.Kons.TY_PANGGIL_FUNGSI)) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_PERINTAH
                            };
                            console.log("new:");
                            console.log(tokenBaru);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                // console.groupEnd();
                return false;
            }
            modifier() {
                // console.group('modifier');
                // console.log('l ' + this._barisObj.token.length);
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    let nama = token1.value;
                    if (nama == "Global" || (nama == "Const")) {
                        if (token2.type == parse.Kons.Ty_VAR_ASSIGNMENT) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.Ty_VAR_ASSIGNMENT
                            };
                            // console.log('sebelum:')
                            // console.log(this._barisObj.token);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            // console.log('sesudah:');
                            // console.log(this._barisObj.token);
                            // console.groupEnd();
                            return true;
                        }
                        // else {
                        //     console.log('gagal: ' + token2.type);
                        // }
                    }
                    // else {
                    //     console.log('gagal: ' + token1.token.toString() + '/' + nama);
                    // }
                }
                // console.groupEnd();
                return false;
            }
            perintah() {
                for (let i = 0; i <= parse.grammar.barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    // let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                    let token1 = parse.grammar.barisObj.token[i];
                    let token2 = parse.grammar.barisObj.token[i + 1];
                    if (token1.type == parse.Kons.TY_KATA || (token1.type == parse.Kons.TY_RES_WORD)) {
                        if (parse.exp.isExp(token2) || token2.type == parse.Kons.TY_ARGUMENT || token2.type == parse.Kons.TY_KURUNG_ISI) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_PERINTAH
                            };
                            //ubah ke wend
                            if (token1.value.toLowerCase() == 'while') {
                                tokenBaru.type = parse.Kons.TY_WEND;
                            }
                            console.log("perintah:");
                            console.log(tokenBaru);
                            // console.log('sebelum:')
                            // console.log(this._barisObj.token);
                            parse.grammar.barisObj.token = parse.ar.ganti(parse.grammar.barisObj.token, i, i + 1, tokenBaru);
                            // console.log('sesudah:');
                            // console.log(this._barisObj.token);
                            // console.groupEnd();
                            return true;
                        }
                        else {
                            // console.log('gagal, token 2 type:  ' + token2.type);
                        }
                    }
                    else {
                        // console.log('gagal: ' + token1.type);
                    }
                }
                // console.groupEnd();
                return false;
            }
        }
        parse.stmt = new Stmt();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
