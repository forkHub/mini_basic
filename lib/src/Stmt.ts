namespace ha.parse {
    class Stmt {

        Baru(): boolean {
            return false;
        }

        dimAssign(): boolean {
            //kata (single) = exp
            //kata (arg2)   = exp
            //1    2        3 4
            function check(t1: Itoken, t2: Itoken, t3: Itoken, t4: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;
                if (!t4) return false;

                //t1 kata
                if (t1.type != Kons.TY_KATA) return false;

                //t2 kurung single, kurung arg2
                let ar: number[] = [Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_ARG2];
                if (ar.indexOf(t2.type) < 0) return false;

                //t3 =
                if (t3.valueLowerCase != '=') return false;

                //t4 exp
                if (t4.type != Kons.TY_EXP) return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let t1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let t3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);
                let t4: Itoken = parse.getToken(i + 3, grammar.barisObj.token);


                if (check(t1, t2, t3, t4)) {
                    let tokenBaru: Itoken;

                    tokenBaru = {
                        type: Kons.TY_DIM_ASSINMENT,
                        token: [t1, t2, t3, t4]
                    }

                    console.log("dim assign");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //masukin var assign
        // dimDecVarMod(): boolean {
        //     //mod dim
        //     function check(t0: Itoken, t1: Itoken, t2: Itoken): boolean {
        //         if (!t1) return false;
        //         if (!t2) return false;

        //         if (t1.type != Kons.TY_MOD) return false;
        //         if (t2.type != Kons.TY_DIM_DEC) return false;

        //         return true;
        //     }

        //     let ada: boolean = false;

        //     for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

        //         let t0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
        //         let t1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
        //         let t2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
        //         // let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);
        //         // let token4: Itoken = parse.getToken(i + 3, grammar.barisObj.token);

        //         if (check(t0, t1, t2)) {
        //             let tokenBaru: Itoken = {
        //                 token: [
        //                     t1,
        //                     t2,
        //                 ],
        //                 type: Kons.TY_DIM_DEC_VAR
        //             };

        //             console.log('dim dec: ');
        //             console.log(parse.tokenToAr(tokenBaru));

        //             grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

        //             ada = true;
        //         }

        //     }

        //     return ada;
        // }

        dimDec(): boolean {
            //dim kata (arg2)
            //dim kata (single)
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != 'dim') return false;

                if (t2.type != Kons.TY_KATA) return false;

                let ar: number[] = [Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_SINGLE];
                if (ar.indexOf(t3.type) < 0) return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let t1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let t3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);
                // let token4: Itoken = parse.getToken(i + 3, grammar.barisObj.token);

                // console.group('for');
                if (check(t1, t2, t3)) {
                    let tokenBaru: Itoken = {
                        token: [
                            t1,
                            t2,
                            t3
                        ],
                        type: Kons.TY_DIM_DEC
                    };

                    console.log('dim dec: ');
                    console.log(parse.tokenToAr(tokenBaru));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }

            }

            return ada;
        }

        forPendek(): boolean {
            let ada: boolean = false;

            //for var_assign to exp
            //1   2          3  4  
            function check(t1: Itoken, t2: Itoken, t3: Itoken, t4: Itoken): boolean {
                // console.debug('null check:');
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;
                if (!t4) return false;

                // if (!t5) return false;
                // if (!t6) return false;

                if ("for" != t1.valueLowerCase) return false;

                if (Kons.TY_VAR_ASSIGNMENT != t2.type) return false;

                if ("to" != t3.valueLowerCase) return false;

                if (Kons.TY_EXP != t4.type) return false;

                return true;
            }

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);//[i + 0];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);//[i + 1];
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);//[i + 2];
                let token4: Itoken = parse.getToken(i + 3, grammar.barisObj.token);//[i + 3];

                // let token5: Itoken = parse.getToken(i + 4, grammar.barisObj.token);//[i + 4];
                // let token6: Itoken = parse.getToken(i + 5, grammar.barisObj.token);//[i + 5];

                // if (token1.value && token1.value.toLowerCase() == "for") {
                //     if (token2.type == Kons.TY_KATA) {
                //         if (token3.value == "=") {
                //             if (exp.isExp(token4)) {
                //                 if (token5.value && token5.value.toLowerCase() == "to") {
                //                     if (exp.isExp(token6)) {

                // console.group('for');
                if (check(token1, token2, token3, token4)) {
                    let tokenBaru: Itoken = {
                        token: [
                            token1,
                            token2,
                            token3,
                            token4,
                        ],
                        type: Kons.TY_FOR
                    };

                    console.log('for: ');
                    console.log(parse.tokenToAr(tokenBaru));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;

                    // i--;
                }

                // console.groupEnd();

                //                 }
                //             }
                //         }
                //     }
                // }
            }

            return ada;
        }

        forStep(): boolean {
            let ada: boolean = false;

            //for step exp
            //1   2    3  
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (Kons.TY_FOR != t1.type) return false;

                if ("step" != t2.valueLowerCase) return false;

                if (Kons.TY_EXP != t3.type) return false;

                return true;
            }

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);
                // let token4: Itoken = parse.getToken(i + 3, grammar.barisObj.token);

                // console.group('for');
                if (check(token1, token2, token3)) {
                    let tokenBaru: Itoken = {
                        token: [
                            token1,
                            token2,
                            token3,
                        ],
                        type: Kons.TY_FOR
                    };

                    console.log('for step: ');
                    console.log(parse.tokenToAr(tokenBaru));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        funcDec(): boolean {

            //TODO:
            //function kata ()
            //function kata (arg)
            //function kata (arg2)
            //function kata (single)
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != 'function') return false;
                if (t2.type != Kons.TY_KATA) return false;

                let kurungAr: number[] = [
                    Kons.TY_KURUNG_ARG,
                    Kons.TY_KURUNG_ARG2,
                    Kons.TY_KURUNG_SINGLE,
                    Kons.TY_KURUNG_KOSONG
                ];

                if (kurungAr.indexOf(t3.type) < 0) return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                if (check(token1, token2, token3)) {
                    let tokenBaru: Itoken = {
                        token: [
                            token1,
                            token2,
                            token3
                        ],
                        type: Kons.TY_FUNC_DEC
                    };

                    console.log('func dec: ');
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        elseIfThen(): boolean {
            //elseif exp then

            function check(): boolean {
                return true;
            }

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                check();
                if (token1 && token1.value && token1.value.toLowerCase() == "elseif") {
                    if (exp.isExp(token2)) {
                        if (token3 && token3.value && token3.value.toLowerCase() == "then") {

                            let tokenBaru: Itoken = {
                                token: [
                                    token1,
                                    token2,
                                    token3
                                ],
                                type: Kons.TY_ELSEIF_DEC
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

        ifPerintah(): boolean {
            let ada: boolean = false;

            //if perintah
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                t3;

                if (t1.type != Kons.TY_IF_DEC) return false;

                if (t2.type != Kons.TY_PERINTAH) {  //bukan perintah
                    if (exp.isExp(t2) == false) {   //bukan exp
                        if (t2.valueLowerCase != "return") { //bukan return
                            return false;
                        }
                    }
                }

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_DEC_P,
                        token: [token1, token2]
                    }

                    console.log("if + perintah:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;
        }

        ifPerintah2(): boolean {
            let ada: boolean = false;

            //ifp : p
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_IF_DEC_P) return false;
                if (t2.valueLowerCase != ":") return false;
                if (t3.type != Kons.TY_PERINTAH) {
                    if (t3.valueLowerCase != "return") {
                        if (t3.type != Kons.TY_EXP) {
                            return false;
                        }
                    }
                }


                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_DEC_P,
                        token: [token1, token2, token3]
                    }

                    console.log("if perintah2:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;
        }

        ifPendek(): boolean {
            let ada: boolean = false;

            //if exp 
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                //check if
                if (!t1.value) return false;
                if (t1.value.toLowerCase() != "if") return false;

                if (t2.type != Kons.TY_EXP) return false;

                //gak boleh diikuti = , 
                //if a = => seharusnya sudah gak perlu, karena sudah dihandle di exp //TODO: test
                if (t3) {
                    if (t3.valueLowerCase == '=') return false;
                }

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_DEC,
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


        }

        //TODO:
        ifElseP(): boolean {
            let ada: boolean = false;

            //ifp else p
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_IF_DEC_P) return false;
                if (t2.valueLowerCase != "else") return false;
                if (t3.type != Kons.TY_PERINTAH) return false;

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_ELSEIF_DEC,
                        token: [token1, token2, token3]
                    }

                    console.log("else if dec");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }


        ifPendekThen(): boolean {
            let ada: boolean = false;

            //if then
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                // if (t3) return false;
                if (t1.type != Kons.TY_IF_DEC) return false;
                if (!t2.value) return false;

                if (t2.value.toLowerCase() != "then") return false;

                t3;

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);
                let tokenBaru: Itoken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_DEC,
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

        }

        modifier(): boolean {
            let ada: boolean = false;

            //const a
            //global a
            //local a
            function check(t1: Itoken, t2: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                let modAr: string[] = [
                    "const",
                    "global",
                    "local"
                ]

                if (modAr.indexOf(t1.valueLowerCase) < 0) return false;
                if (t2.type != Kons.TY_KATA) return false;

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                if (check(token1, token2)) {
                    let tokenBaru: Itoken;
                    tokenBaru = {
                        type: Kons.TY_MOD,
                        token: [token1, token2]
                    }

                    console.log("modifier");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
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

        perintah2(): boolean {

            //kata arg [kosong]
            //kata exp [kosong]            
            function check(t0: Itoken, t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (t3) return false;

                if (t1.type != Kons.TY_KATA) return false;

                //gak boleh dim
                if (t1.valueLowerCase == 'dim') return false;

                if (!exp.isExp(t2)) {
                    if (t2.type != Kons.TY_ARGUMENT) {
                        if (t2.type != Kons.TY_ARGUMENT2) {
                            return false;
                        }
                    }
                }

                //gak boleh didahului exp
                console.log('check t0 ' + t0);
                if (t0) {
                    console.log('check type ' + t0.type);
                    console.log('check value ' + t0.valueLowerCase);
                    if (t0.type == Kons.TY_EXP) {
                        return false;
                    }
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let t0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let t1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let t3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(t0, t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_PERINTAH,
                        token: [t1, t2]
                    }

                    console.log("perintah:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;
        }

        return2(): boolean {

            //RETURN
            //return exp [kosong]
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

        varAssign(): boolean {
            //kata = exp
            //kata = dim
            //mod = exp
            //mod = dim
            function check(t0: Itoken, t1: Itoken, t2: Itoken, t3: Itoken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                let ar: number[] = [
                    Kons.TY_MOD,
                    Kons.TY_KATA
                ]

                if (ar.indexOf(t1.type) < 0) return false;

                if (t2.valueLowerCase != '=') return false;

                let ar2: number[] = [
                    Kons.TY_EXP,
                    Kons.TY_DIM_DEC
                ]

                if (ar2.indexOf(t3.type) < 0) return false;

                if (t1.type == Kons.TY_KATA) {
                    if (t0 && t0.valueLowerCase == 'global') return false;
                    if (t0 && t0.valueLowerCase == 'const') return false;
                    if (t0 && t0.valueLowerCase == 'local') return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let t0: Itoken = grammar.barisObj.token[i - 1];
                let t1: Itoken = grammar.barisObj.token[i + 0];
                let t2: Itoken = grammar.barisObj.token[i + 1];
                let t3: Itoken = grammar.barisObj.token[i + 2];

                if (check(t0, t1, t2, t3)) {
                    let tokenBaru: Itoken = {
                        token: [
                            t1,
                            t2,
                            t3
                        ],
                        type: Kons.TY_VAR_ASSIGNMENT
                    };

                    console.log('var Assign:');
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
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

    }

    export var stmt: Stmt = new Stmt();
}