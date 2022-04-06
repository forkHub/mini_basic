namespace ha.parse {
    class TypeStmt {

        typeNew(): boolean {
            let ada: boolean = false;

            //KATA_DOT = new KATA
            function check(t1: IToken, t2: IToken, t3: IToken, t4: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;
                if (!t4) return false;

                if (t1.type != Kons.TY_KATA_DOT) return false;
                if (t2.valueLowerCase != "=") return false;
                if (t3.valueLowerCase != "new") return false;
                if (t4.type != Kons.TY_KATA) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
                let t4: IToken = parse.getToken(i + 3, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3, t4)) {
                    tokenBaru = {
                        type: Kons.TY_TYPE_NEW_DEC,
                        token: [t1, t2, t3, t4]
                    }

                    console.log("type dec");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        typeDef(): boolean {
            let ada: boolean = false;

            //type kata
            function check(t1: IToken, t2: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.valueLowerCase != "type") return false;
                if (t2.type != Kons.TY_KATA) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_TYPE_DEF,
                        token: [t1, t2]
                    }

                    console.log("type def");
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //TODO:
        //field arg_kata

        fieldDef(): boolean {
            let ada: boolean = false;

            //field kata
            function check(t1: IToken, t2: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.valueLowerCase != "field") return false;
                if (t2.type != Kons.TY_KATA) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_FIELD_DEF,
                        token: [t1, t2]
                    }

                    console.log("field def");
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        fieldDefM(): boolean {
            let ada: boolean = false;

            //[FIELD DEF] [KOMA] kata
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_TYPE_DEF) return false;
                if (t2.valueLowerCase != ",") return false;
                if (t2.type != Kons.TY_KATA) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_FIELD_DEF,
                        token: [t1, t2]
                    }

                    console.log("field def");
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        typeAkses(): boolean {
            let ada: boolean = false;

            //KATA \ KATA
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_KATA) return false;
                if (t2.valueLowerCase != '\\') return false;
                if (t3.type != Kons.TY_KATA) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_TYPE_ACCESS,
                        token: [t1, t2, t3]
                    }

                    console.log("type access");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                exp.exp();
            }

            return ada;
        }

    }

    export var typeStmt: TypeStmt = new TypeStmt();
}