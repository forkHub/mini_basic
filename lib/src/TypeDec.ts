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

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, grammar.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, grammar.barisObj.token);
                let t4: IToken = parse.getToken(i + 3, grammar.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3, t4)) {
                    tokenBaru = {
                        type: Kons.TY_TYPE_DEC,
                        token: [t1, t2, t3, t4]
                    }

                    console.log("type dec");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);

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

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, grammar.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_TYPE_ACCESS,
                        token: [t1, t2, t3]
                    }

                    console.log("type access");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

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