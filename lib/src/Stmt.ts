namespace ha.parse {
    class Stmt {

        for2(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length - 6; i++) {

                let token1: Itoken = grammar.barisObj.token[i + 0];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let token3: Itoken = grammar.barisObj.token[i + 2];
                let token4: Itoken = grammar.barisObj.token[i + 3];
                let token5: Itoken = grammar.barisObj.token[i + 4];
                let token6: Itoken = grammar.barisObj.token[i + 5];

                if (token1.value && token1.value.toLowerCase() == "for") {
                    if (token2.type == Kons.TY_KATA) {
                        if (token3.value == "=") {
                            if (exp.isExp(token4)) {
                                if (token5.value && token5.value.toLowerCase() == "to") {
                                    if (exp.isExp(token6)) {

                                        let tokenBaru: Itoken = {
                                            token: [
                                                token1,
                                                token2,
                                                token3,
                                                token4,
                                                token5,
                                                token6
                                            ],
                                            type: Kons.TY_FOR
                                        };

                                        console.log('for: ');
                                        console.log(tokenBaru);

                                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 5, tokenBaru);

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

        //RETURN
        //return exp [kosong]
        return2(): boolean {

            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                // console.log('check t1');
                if (!t1) return false;

                // console.log('check t2');
                if (!t2) return false;

                // console.log('check t3');
                if (t3) return false;

                // console.log('t1 value');
                if (t1.valueLowerCase != "return") return false;

                // console.log('check t2 is exp')
                if (exp.isExp(t2) == false) return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_RETURN,
                        token: [token1, token2]
                    }

                    console.log("return 2");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;
        }

        //RETURN
        //return [kosong]
        return1(): boolean {

            function check(t1: Itoken, t2: Itoken): boolean {
                if (!t1) return false;
                if (t2) return false;

                if (t1.valueLowerCase != "return") return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2)) {
                    tokenBaru = {
                        type: Kons.TY_RETURN,
                        token: [token1]
                    }

                    console.log("return 1");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 0, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;
        }

        while2(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_WEND,
                        token: [token1, token2]
                    }

                    console.log("while:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;

            //while exp [kosong]
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (t3) return false;
                if (!t1.value) return false;

                if (t1.value.toLowerCase() != 'while') return false;

                if (exp.isExp(t2) == false) return false;

                return true;
            }
        }

        //if perintah [kosong]
        ifPendekPerintah(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF,
                        token: [token1, token2]
                    }

                    console.log("if pendek + perintah:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;

            //if perintah [kosong]
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (t3) return false;

                if (t1.type != Kons.TY_IF) return false;
                if (t2.type != Kons.TY_PERINTAH) {
                    if (exp.isExp(t2) == false) {
                        if (t2.value && (t2.value.toLowerCase()) != "return") {
                            return false;
                        }
                    }
                }

                return true;
            }
        }

        //if then
        ifPendekThen(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);
                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF,
                        token: [token1, token2]
                    }

                    console.log("if then:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;

            //if then
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                // if (t3) return false;
                if (t1.type != Kons.TY_IF) return false;
                if (!t2.value) return false;

                if (t2.value.toLowerCase() != "then") return false;

                t3;

                return true;
            }
        }

        //if pendek
        ifPendek(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF,
                        token: [token1, token2]
                    }

                    console.log("if pendek:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;

            //if exp
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t1.value) return false;
                if (t1.value.toLowerCase() != "if") return false;

                t3;

                if (!exp.isExp(t2)) {
                    if (t2.type != Kons.TY_KURUNG_ISI) {
                        return false;
                    }
                }

                return true;
            }
        }

        // if2(): boolean {
        //     for (let i: number = 0; i <= grammar.barisObj.token.length - 3; i++) {

        //         let token1: Itoken = grammar.barisObj.token[i];
        //         let token2: Itoken = grammar.barisObj.token[i + 1];
        //         let token3: Itoken = grammar.barisObj.token[i + 2];

        //         if (token1.value && token1.value.toLowerCase() == "if") {
        //             if (exp.isExp(token2)) {
        //                 if (token3.value && token3.value.toLowerCase() == "then") {

        //                     let tokenBaru: Itoken = {
        //                         token: [
        //                             token1,
        //                             token2,
        //                             token3
        //                         ],
        //                         type: Kons.TY_IF
        //                     };

        //                     console.log('IF: ');
        //                     console.log(tokenBaru);

        //                     // console.log('sebelum:');
        //                     // console.log(this._barisObj.token);

        //                     grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

        //                     // console.log('sesudah:');
        //                     // console.log(this._barisObj.token);

        //                     // console.groupEnd();
        //                     return true;
        //                 }
        //                 else {
        //                     // console.log('failed: 3 ' + this.isExp(token3));
        //                 }
        //             }
        //             else {
        //                 // console.log('failed: token 2 ' + token2.token.toString());
        //             }
        //         }
        //         else {
        //             // console.log('failed: token1 type: ' + token1.type);
        //         }

        //         // console.groupEnd();
        //     }

        //     // console.groupEnd();
        //     return false;
        // }

        funcDec(): boolean {
            //Function panggil-fungsi

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                if (token1 && token1.value && token1.value.toLowerCase() == "function") {
                    if (token2 && token2.type == Kons.TY_PANGGIL_FUNGSI) {

                        let tokenBaru: Itoken = {
                            token: [
                                token1,
                                token2
                            ],
                            type: Kons.TY_FUNC
                        };

                        console.log('func dec: ');
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

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

        elseIf(): boolean {
            //elseif exp then

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                if (token1 && token1.value && token1.value.toLowerCase() == "elseif") {
                    if (exp.isExp(token2)) {
                        if (token3 && token3.value && token3.value.toLowerCase() == "then") {

                            let tokenBaru: Itoken = {
                                token: [
                                    token1,
                                    token2,
                                    token3
                                ],
                                type: Kons.TY_ELSEIF
                            };

                            console.log('else IF: ');
                            console.log(tokenBaru);

                            // console.log('sebelum:');
                            // console.log(this._barisObj.token);

                            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

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

        // //if diikuti perintah
        // ifPerintah(): boolean {
        //     for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

        //         let token1: Itoken = grammar.barisObj.token[i + 0];
        //         let token2: Itoken = grammar.barisObj.token[i + 1];
        //         let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

        //         if (token1.type == Kons.TY_IF) {
        //             if (token2.type == Kons.TY_KATA ||
        //                 token2.type == Kons.Ty_VAR_ASSIGNMENT ||
        //                 token2.type == Kons.TY_PERINTAH ||
        //                 (token2.value && token2.value.toLowerCase() == 'return') ||
        //                 exp.isExp(token2)
        //             ) {
        //                 if (token3) {
        //                     //gagal, token 3 seharusnya null, gak boleh ada perintah tambahan
        //                 }
        //                 else {
        //                     let tokenBaru: Itoken = {
        //                         token: [
        //                             token1,
        //                             token2,
        //                         ],
        //                         type: Kons.TY_IFP
        //                     };

        //                     console.log('IF: ');
        //                     console.log(tokenBaru);

        //                     grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);
        //                     return true;
        //                 }

        //             }
        //         }

        //     }

        //     return false;
        // }

        //2

        Baru(): boolean {
            return false;
        }

        varAssign(): boolean {
            // console.group('var assign:');

            for (let i: number = 0; i <= grammar.barisObj.token.length - 3; i++) {
                // console.log('iterate ' + i);
                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let token3: Itoken = grammar.barisObj.token[i + 2];

                if (token1.type == Kons.TY_KATA || token1.type == Kons.TY_KATA_DOT) {
                    if (token2.value == '=') {
                        if (exp.isExp(token3) || token3.type == Kons.TY_PERINTAH) {

                            let tokenBaru: Itoken = {
                                token: [
                                    token1,
                                    token2,
                                    token3
                                ],
                                type: Kons.Ty_VAR_ASSIGNMENT
                            };

                            console.log('var Assign:');
                            console.log(tokenBaru);

                            // console.log('sebelum:');
                            // console.log(this._barisObj.token);

                            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

                            // console.log('sesudah:');
                            // console.log(this._barisObj.token);

                            // console.groupEnd();
                            return true;
                        }
                        else {
                            console.log('failed: 3 ' + exp.isExp(token3));
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

        new2(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];

                if (token1.value && token1.value.toLowerCase() == "new") {
                    if (token2.type == Kons.TY_KATA || (token2.type == Kons.TY_PANGGIL_FUNGSI)) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_PERINTAH
                        }
                        console.log("new:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                    }
                }

            }

            // console.groupEnd();
            return false;
        }

        modifier(): boolean {
            // console.group('modifier');
            // console.log('l ' + this._barisObj.token.length);

            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {
                // console.log('iterate ' + i);

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let nama: string = token1.value;

                if (nama == "Global" || (nama == "Const")) {
                    if (token2.type == Kons.Ty_VAR_ASSIGNMENT) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.Ty_VAR_ASSIGNMENT
                        }

                        // console.log('sebelum:')
                        // console.log(this._barisObj.token);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

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

        //kata kata [kosong]
        //kata arg [kosong]
        //kata exp [kosong]
        perintah2(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_PERINTAH,
                        token: [token1, token2]
                    }

                    console.log("perintah:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;

            //kata arg [kosong]
            //kata exp [kosong]            
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (t3) return false;

                if (t1.type != Kons.TY_KATA) return false;

                if (!exp.isExp(t2)) {
                    if (t2.type != Kons.TY_ARGUMENT) {
                        return false;
                    }
                }

                return true;
            }
        }

        /*
        perintah(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                if (token1) {
                    if (token2) {
                        if ((token1.type == Kons.TY_KATA || (token1.type == Kons.TY_RES_WORD))) {
                            if ((exp.isExp(token2) || token2.type == Kons.TY_ARGUMENT || token2.type == Kons.TY_KURUNG_ISI)) {
                                if (token1.value && token1.value.toLowerCase() == 'if') {
                                    //cancel
                                }
                                else {
                                    let tokenBaru: Itoken = {
                                        token: [token1, token2],
                                        type: Kons.TY_PERINTAH
                                    }

                                    //ubah ke wend
                                    if (token1.value && token1.value.toLowerCase() == 'while') {
                                        tokenBaru.type = Kons.TY_WEND;
                                    }

                                    console.log("perintah:");
                                    console.log(tokenBaru);

                                    // console.log('sebelum:')
                                    // console.log(this._barisObj.token);

                                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                                    // console.log('sesudah:');
                                    // console.log(this._barisObj.token);

                                    // console.groupEnd();
                                    return true;
                                }
                            }
                            else {
                                // console.log('gagal, token 2 type:  ' + token2.type);
                            }
                        }
                        else {
                            // console.log('gagal: ' + token1.type);
                        }
                    }
                    else {
                        //satu token
                        //dikerjakan nanti
                    }
                }
            }

            // console.groupEnd();
            return false;
        }
        */

        // perintah2(): boolean {
        //     for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

        //         let token1: Itoken = grammar.barisObj.token[i];
        //         let token2: Itoken = grammar.barisObj.token[i + 1];

        //         if (token1.type == Kons.TY_KATA) {
        //             if (exp.isExp(token2) || token2.type == Kons.TY_ARGUMENT) {

        //                 let tokenBaru: Itoken = {
        //                     token: [token1, token2],
        //                     type: Kons.TY_PERINTAH
        //                 }
        //                 console.log("perintah2:");
        //                 console.log(tokenBaru);

        //                 grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

        //                 return true;
        //             }
        //         }

        //     }

        //     return false;
        // }

    }

    export var stmt: Stmt = new Stmt();
}