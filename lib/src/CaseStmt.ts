namespace ha.parse {
    class CaseStmt {

        caseDec(): boolean {
            let ada: boolean = false;

            //CASE EXP
            function check(t1: IToken, t2: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_CASE) return false;
                if (t2.type != Kons.TY_EXP) return false;

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, grammar.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_CASE_DEC,
                        token: [t1, t2]
                    }

                    console.log("case dec:");
                    // console.log(tokenBaru);
                    console.log(parse.tokenToValue(tokenBaru, true));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) { }

            return ada;
        }

        selectDec(): boolean {
            let ada: boolean = false;

            //SELECT EXP
            function check(t1: IToken, t2: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_SELECT) return false;
                if (t2.type != Kons.TY_EXP) return false;

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, grammar.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, grammar.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_SELECT_DEC,
                        token: [t1, t2]
                    }

                    console.log("select dec:");
                    console.log(parse.tokenToValue(tokenBaru, true));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) { }

            return ada;
        }

    }

    export var caseStmt: CaseStmt = new CaseStmt();
}