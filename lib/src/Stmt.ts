namespace ha.parse {
    class Stmt {

        Baru(): boolean {
            return false;
        }


        stmtMul(): boolean {

            //STMT_COL STMT
            function check(t0: IToken, t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_STMT_COLON) return false;

                let t2Ar: number[] = [
                    Kons.TY_STMT,
                    Kons.TY_PERINTAH
                ]

                if (t2Ar.indexOf(t2.type) < 0) return false;

                if (t0) {
                    if (t0.type == Kons.TY_COLON) return false;
                }



                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                if (check(t0, t1, t2)) {
                    let tokenBaru: IToken;

                    tokenBaru = {
                        type: Kons.TY_STMT_M,
                        token: [t1, t2]
                    }

                    console.log("stmt mul");
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //stmt colon2
        stmtColon2(): boolean {
            function check(t0: IToken, t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_STMT_M) return false;
                if (t2.type != Kons.TY_COLON) return false;

                if (t0) {
                    if (t0.type == Kons.TY_COLON) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                if (check(t0, t1, t2)) {
                    let tokenBaru: IToken;

                    tokenBaru = {
                        type: Kons.TY_STMT_COLON,
                        token: [t1, t2]
                    }

                    console.log("stmt colon");
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //stmt colon
        stmtColon(): boolean {
            //STMT COLON
            //STMT [T2]
            function check(t0: IToken, t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                //TODO: ditambahin
                let t1Ar: number[] = [
                    Kons.TY_PERINTAH
                ]

                if (t1Ar.indexOf(t1.type) < 0) return false;
                if (t2.type != Kons.TY_COLON) return false;

                if (t0) {
                    if (t0.type == Kons.TY_COLON) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                if (check(t0, t1, t2)) {
                    let tokenBaru: IToken;

                    tokenBaru = {
                        type: Kons.TY_STMT_COLON,
                        token: [t1, t2]
                    }

                    console.log("stmt colon");
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //stmt biasa
        stmt(): boolean {
            //STMT [T2]
            function check(t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                let t1Ar: number[] = [
                    Kons.TY_MOD_ISI,
                    Kons.TY_IF_THEN,
                    Kons.TY_ELSE_THEN,
                    Kons.TY_ELSEIF_THEN
                ]

                //TODO:
                t1Ar;

                return false; //TODO:
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                // let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
                // let t4: IToken = parse.getToken(i + 3, data.barisObj.token);


                if (check(t1, t2)) {
                    let tokenBaru: IToken;

                    tokenBaru = {
                        type: Kons.TY_STMT,
                        token: [t1, t2]
                    }

                    console.log("dim assign");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        dimAssign(): boolean {
            //kata (single) = exp
            //kata (arg2)   = exp
            //1    2        3 4
            function check(t1: IToken, t2: IToken, t3: IToken, t4: IToken, t5: IToken): boolean {
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
                if (t4.type != Kons.TY_EXP) {
                    if (t4.type != Kons.TY_NEW_INST) {
                        return false;
                    }
                }

                if (t5) {
                    if (t5.type == Kons.TY_KATA) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
                let t4: IToken = parse.getToken(i + 3, data.barisObj.token);
                let t5: IToken = parse.getToken(i + 4, data.barisObj.token);

                if (check(t1, t2, t3, t4, t5)) {
                    let tokenBaru: IToken;

                    tokenBaru = {
                        type: Kons.TY_DIM_ASSINMENT,
                        token: [t1, t2, t3, t4]
                    }

                    console.log("dim assign");
                    console.log(tokenBaru);
                    console.log(t5);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        dimDec(): boolean {
            //dim kata (arg2)
            //dim kata (single)
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
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

            for (let i: number = 0; i <= data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
                // let token4: Itoken = parse.getToken(i + 3, data.barisObj.token);

                // console.group('for');
                if (check(t1, t2, t3)) {
                    let tokenBaru: IToken = {
                        token: [
                            t1,
                            t2,
                            t3
                        ],
                        type: Kons.TY_DIM_DEC
                    };

                    console.log('dim dec: ');
                    console.log(parse.tokenToAr(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }

            }

            return ada;
        }

        forPendek(): boolean {
            let ada: boolean = false;

            //for var_assign to exp
            //1   2          3  4  
            function check(t1: IToken, t2: IToken, t3: IToken, t4: IToken): boolean {
                // console.debug('null check:');
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;
                if (!t4) return false;

                // if (!t5) return false;
                // if (!t6) return false;

                if ("for" != t1.valueLowerCase) return false;

                // if (Kons.TY_BINOP_EQ != t2.type) return false;

                if ("to" != t3.valueLowerCase) return false;

                if (Kons.TY_EXP != t4.type) return false;

                return true;
            }

            for (let i: number = 0; i <= data.barisObj.token.length; i++) {

                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);//[i + 0];
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);//[i + 1];
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);//[i + 2];
                let token4: IToken = parse.getToken(i + 3, data.barisObj.token);//[i + 3];

                // let token5: Itoken = parse.getToken(i + 4, data.barisObj.token);//[i + 4];
                // let token6: Itoken = parse.getToken(i + 5, data.barisObj.token);//[i + 5];

                // if (token1.value && token1.value.toLowerCase() == "for") {
                //     if (token2.type == Kons.TY_KATA) {
                //         if (token3.value == "=") {
                //             if (exp.isExp(token4)) {
                //                 if (token5.value && token5.value.toLowerCase() == "to") {
                //                     if (exp.isExp(token6)) {

                // console.group('for');
                if (check(token1, token2, token3, token4)) {
                    let tokenBaru: IToken = {
                        token: [
                            token1,
                            token2,
                            token3,
                            token4,
                        ],
                        type: Kons.TY_FOR_DEC
                    };

                    console.log('for: ');
                    console.log(parse.tokenToAr(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

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
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (Kons.TY_FOR_DEC != t1.type) return false;

                if ("step" != t2.valueLowerCase) return false;

                if (Kons.TY_EXP != t3.type) return false;

                return true;
            }

            for (let i: number = 0; i <= data.barisObj.token.length; i++) {

                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);
                // let token4: Itoken = parse.getToken(i + 3, data.barisObj.token);

                // console.group('for');
                if (check(token1, token2, token3)) {
                    let tokenBaru: IToken = {
                        token: [
                            token1,
                            token2,
                            token3,
                        ],
                        type: Kons.TY_FOR_STEP
                    };

                    console.log('for step: ');
                    console.log(parse.tokenToAr(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

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
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != 'function') return false;
                if (t2.type != Kons.TY_KATA) {
                    if (t2.type != Kons.TY_KATA_DOT) {
                        return false;
                    }
                }

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

            for (let i: number = 0; i <= data.barisObj.token.length; i++) {

                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                if (check(token1, token2, token3)) {
                    let tokenBaru: IToken = {
                        token: [
                            token1,
                            token2,
                            token3
                        ],
                        type: Kons.TY_FUNC_DEC
                    };

                    console.log('func dec: ');
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        modifier(): boolean {
            let ada: boolean = false;

            //MOD KATA [t3]
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                let modAr: string[] = [
                    "const",
                    "global",
                    "local"
                ]

                if (modAr.indexOf(t1.valueLowerCase) < 0) return false;
                if (t2.type != Kons.TY_KATA) return false;

                if (t3) {
                    // if (t3.type == Kons.TY_EQ) return false;
                }

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                if (check(t1, t2, t3)) {
                    let tokenBaru: IToken;
                    tokenBaru = {
                        type: Kons.TY_MOD_DEC,
                        token: [t1, t2]
                    }

                    console.log("modifier");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.modIsi();
            }

            return ada;
        }

        //mod assign
        modIsi(): boolean {
            let ada: boolean = false;

            //mod = exp
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_MOD_DEC) return false;
                if (t2.valueLowerCase != '=') return false;
                if (t3.type != Kons.TY_EXP) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_MOD_ISI,
                        token: [t1, t2, t3]
                    }

                    console.log("mod isi");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) { }

            return ada;
        }

        //TODO: dihapus karena new sudah ada
        /*
        new2(): boolean {
            for (let i: number = 0; i <= data.barisObj.token.length - 2; i++) {
 
                let token1: IToken = data.barisObj.token[i];
                let token2: IToken = data.barisObj.token[i + 1];
 
                if (token1.value && token1.value.toLowerCase() == "new") {
                    if (token2.type == Kons.TY_KATA || (token2.type == Kons.TY_PANGGIL_FUNGSI)) {
 
                        let tokenBaru: IToken = {
                            token: [token1, token2],
                            type: Kons.TY_PERINTAH
                        }
                        console.log("new:");
                        console.log(tokenBaru);
 
                        data.barisObj.token = ar.ganti(data.barisObj.token, i, i + 1, tokenBaru);
 
                        return true;
                    }
                }
 
            }
 
            // console.groupEnd();
            return false;
        }
        */

        //TODO: dipindah ke grammar 2
        /*
        perintah(): boolean {
 
            //kata arg 
            //kata exp             
            function check(t0: IToken, t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
 
                if (t1.type != Kons.TY_KATA) return false;
                if (t1.valueLowerCase == 'dim') return false;
 
                let t2Ar: Number[] = [
                    Kons.TY_EXP,
                    Kons.TY_ARG,
                    Kons.TY_ARG2,
                    Kons.TY_ARG_KATA,
                    Kons.TY_ARG_KATA_M
                ]
 
                if (t2Ar.indexOf(t2.type) < 0) {
                    return false;
                }
 
                // if (!exp.isExp(t2)) {
                //     if (t2.type != Kons.TY_ARG) {
                //         if (t2.type != Kons.TY_ARG2) {
                //             return false;
                //         }
                //     }
                // }
 
                //gak boleh didahului exp => contoh belum ada
                if (t0) {
                    //     if (t0.type == Kons.TY_EXP) {
                    //         return false;
                    //     }
                }
 
                if (t3) {
                    if (t3.valueLowerCase == '=') return false;
                    if (t3.type == Kons.TY_OP) return false;
                    // if (t3.type == Kons.TY_OP2) return false;
                    if (t3.type == Kons.TY_KOMA) return false;
                }
 
                return true;
            }
 
            let ada: boolean = false;
 
            for (let i: number = 0; i < data.barisObj.token.length; i++) {
 
                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
 
                let tokenBaru: IToken;
 
                if (check(t0, t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_PERINTAH,
                        token: [t1, t2]
                    }
 
                    console.log("perintah:");
                    console.log(parse.tokenToValue(tokenBaru));
 
                    // console.log(data.barisObj.token);
                    // console.log('token baru l: ' + (tokenBaru.token.length - 1));
                    // console.log('index ' + i);
 
                    // console.log('token l-1: ' + data.barisObj.token.length);
 
                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
 
                    // console.log('token l-2: ' + data.barisObj.token.length);
 
                    ada = true;
                }
            }
 
            return ada;
        }
        */

        returnExp(): boolean {

            //return exp
            function check(t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_RETURN) return false;
                if (t2.type != Kons.TY_EXP) return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_RETURN_EXP,
                        token: [t1, t2]
                    }

                    console.log("return exp");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        while2(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_WEND,
                        token: [token1, token2]
                    }

                    console.log("while:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                    i--;
                }
            }

            return ada;

            //while exp [kosong]
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
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