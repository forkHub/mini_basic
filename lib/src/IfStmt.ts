namespace ha.parse {
    class IfStmt {

        isPerintah(type: number): boolean {
            if (Kons.TY_PERINTAH == type) return true;
            if (Kons.TY_RETURN == type) return true;
            if (Kons.TY_RETURN_EXP == type) return true;
            // if (Kons.TY_BINOP_EQ == type) return true;
            if (Kons.TY_EXP == type) return true;

            return false;
        }

        ifExp(): boolean {
            let ada: boolean = false;

            //if exp 
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.valueLowerCase != "if") {
                    if (t1.type != Kons.TY_ELSE_IF) {
                        return false;
                    }
                }

                if (t2.type != Kons.TY_EXP) {
                    if (t2.type != Kons.TY_DIM_ASSINMENT) {
                        // if (t2.type != Kons.TY_BINOP_EQ) {
                        return false;
                        // }
                    }
                }

                if (t3) {
                    if (t3.type == Kons.TY_OP) return false;
                    // if (t3.type == Kons.TY_OP2) return false;
                    if (t3.valueLowerCase == "=") return false;
                }

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_EXP,
                        token: [t1, t2]
                    }

                    console.log("if pendek:");
                    console.log(tokenBaru);
                    console.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                // this.ifExpP();
                this.ifThen();
            }

            return ada;
        }

        ifThen(): boolean {

            let ada: boolean = false;

            //[IF_DEC] then
            function check(t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_IF_EXP) return false;
                if (t2.valueLowerCase != 'then') return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_IF_THEN,
                        token: [t1, t2]
                    }

                    console.log("if then:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                // this.ifThenP();
            }

            return ada;
        }

        //elseif exp then
        elseIfThen(): boolean {
            let ada: boolean = false;

            //elseif [EXP] then
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != "elseif") return false;

                if (t2.type != Kons.TY_EXP) return false;

                if (t3.valueLowerCase != "then") return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_ELSE_THEN,
                        token: [t1, t2, t3]
                    }

                    console.log("else if then");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

    }

    export var ifStmt = new IfStmt();
}
