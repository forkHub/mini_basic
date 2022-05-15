namespace ha.parse {
    class Stmt {

        Baru(): boolean {
            return false;
        }

        //stmt biasa
        //TODO: dihapus
        stmt(): boolean {
            //STMT [T2]
            function check(t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                let t1Ar: number[] = [
                    Kons.TY_MOD_ISI,
                    Kons.TY_IF_THEN,
                    Kons.TY_ELSE_THEN_STMT,
                    Kons.TY_ELSEIF_STMT_THEN
                ]

                //TODO: hapus
                t1Ar;

                return false; //TODO: hapus
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

                    ha.comp.log.log("dim assign");
                    ha.comp.log.log(tokenBaru);

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
                    if (t4.type != Kons.TY_KATA) {
                        return false;
                    }
                }

                //scenario belum jelas
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

                    ha.comp.log.log("dim assign");
                    ha.comp.log.log(tokenBaru);
                    ha.comp.log.log(t5);

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

                // ha.comp.log.group('for');
                if (check(t1, t2, t3)) {
                    let tokenBaru: IToken = {
                        token: [
                            t1,
                            t2,
                            t3
                        ],
                        type: Kons.TY_DIM_DEC
                    };

                    ha.comp.log.log('dim dec: ');
                    ha.comp.log.log(parse.tokenToAr(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }

            }

            return ada;
        }

        forPendek(): boolean {
            let ada: boolean = false;

            //FOR ANY TO EXP
            //1   2   3  4  
            function check(t1: IToken, t2: IToken, t3: IToken, t4: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;
                if (!t4) return false;

                if ("for" != t1.valueLowerCase) return false;


                if ("to" != t3.valueLowerCase) return false;

                if (Kons.TY_EXP != t4.type) return false;

                return true;
            }

            for (let i: number = 0; i <= data.barisObj.token.length; i++) {

                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);//[i + 0];
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);//[i + 1];
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);//[i + 2];
                let token4: IToken = parse.getToken(i + 3, data.barisObj.token);//[i + 3];

                if (check(token1, token2, token3, token4)) {
                    let tokenBaru: IToken = {
                        token: [
                            token1,
                            token2,
                            token3,
                            token4,
                        ],
                        type: Kons.TY_FOR_STMT
                    };

                    ha.comp.log.log('for: ');
                    ha.comp.log.log(parse.tokenToAr(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;

                    // i--;
                }

                // ha.comp.log.groupEnd();

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

                if (Kons.TY_FOR_STMT != t1.type) return false;

                if ("step" != t2.valueLowerCase) return false;

                if (Kons.TY_EXP != t3.type) return false;

                return true;
            }

            for (let i: number = 0; i <= data.barisObj.token.length; i++) {

                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);
                // let token4: Itoken = parse.getToken(i + 3, data.barisObj.token);

                // ha.comp.log.group('for');
                if (check(token1, token2, token3)) {
                    let tokenBaru: IToken = {
                        token: [
                            token1,
                            token2,
                            token3,
                        ],
                        type: Kons.TY_FOR_STEP_STMT
                    };

                    ha.comp.log.log('for step: ');
                    ha.comp.log.log(parse.tokenToAr(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        funcDec(): boolean {

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
                    if (t2.type != Kons.TY_KATA_DOT) { //TODO: kata dot dihapus
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

                    ha.comp.log.log('func dec: ');
                    ha.comp.log.log(tokenBaru);

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

                    ha.comp.log.log("modifier");
                    ha.comp.log.log(tokenBaru);

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

                    ha.comp.log.log("mod isi");
                    ha.comp.log.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) { }

            return ada;
        }

        returnExp(): boolean {

            //return exp
            function check(t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_RETURN) return false;
                if (t2.type != Kons.TY_EXP) {
                    if (t2.type != Kons.TY_KATA) {
                        return false;
                    }
                }

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

                    ha.comp.log.log("return exp");
                    ha.comp.log.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

    }

    export var stmt: Stmt = new Stmt();
}