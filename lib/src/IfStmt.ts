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

                if (t1.valueLowerCase != "if") return false;

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
                this.ifExpP();
                this.ifThen();
            }

            return ada;
        }

        ifExpP(): boolean {
            let ada: boolean = false;

            //TY_IF_EXP P
            function check(t1: IToken, t2: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_IF_EXP) return false;
                if (ifStmt.isPerintah(t2.type) == false) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_IF_EXP_P,
                        token: [t1, t2]
                    }

                    console.log("if EXP p:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.ifExpP2();
                this.ifElseThenP();
            }

            return ada;
        }

        ifExpP2(): boolean {
            let ada: boolean = false;

            //TY_IF_EXP_P : P
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_IF_EXP) return false;
                if (t2.valueLowerCase != ":") return false;
                if (ifStmt.isPerintah(t3.type)) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_EXP_P2,
                        token: [t1, t2, t3]
                    }

                    console.log("if EXP p2:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.ifExpP2();
                this.ifElseThenP();
                this.ifElseThenP2();
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
                this.ifThenP();
            }

            return ada;
        }

        ifThenP(): boolean {

            let ada: boolean = false;

            //[IF_THEN] [STMT]
            //[IF_THEN] [EXP]
            function check(t1: IToken, t2: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;

                if (t1.type != Kons.TY_IF_THEN) return false;
                if (!ifStmt.isPerintah(t2.type)) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_IF_THEN_P,
                        token: [t1, t2]
                    }

                    console.log("if perintah:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.ifThenP2();
                this.ifElseThenP();
            }

            return ada;
        }

        ifThenP2(): boolean {

            let ada: boolean = false;

            //[TY_IF_THEN_P] : [STMT]
            //[TY_IF_THEN_P] : [EXP]
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_IF_THEN_P) return false;
                if (t2.valueLowerCase != ':') return false;
                if (ifStmt.isPerintah(t3.type) == false) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_THEN_P2,
                        token: [t1, t2, t3]
                    }

                    console.log("if perintah2:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.ifThenP2();
            }

            return ada;
        }

        ifElseThenP(): boolean {
            let ada: boolean = false;

            //[IF_DEC_P] else [PERINTAH]
            //[IF_DEC_P] else [VAR_ASSIGN]
            //[IF_DEC_P] else [EXP]
            //[IF_DEC_P2] else [PERINTAH]
            //[IF_DEC_P2] else [VAR_ASSIGN]
            //[IF_DEC_P2] else [EXP]
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                let t1Ar: number[] = [
                    Kons.TY_IF_THEN_P,
                    Kons.TY_IF_THEN_P2
                ];
                if (t1Ar.indexOf(t1.type) < 0) return false;


                if (t2.valueLowerCase != 'else') return false;

                // let t3Ar: number[] = [
                //     Kons.TY_VAR_ASSIGNMENT,
                //     Kons.TY_EXP,
                //     Kons.TY_PERINTAH,
                //     Kons.TY_RETURN,
                //     Kons.TY_RETURN_EXP
                // ]
                // if (t3Ar.indexOf(t3.type) < 0) return false;

                if (ifStmt.isPerintah(t3.type) == false) return false

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_ELSE_THEN_P,
                        token: [t1, t2, t3]
                    }

                    console.log("if else:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.ifElseThenP2();
            }

            return ada;
        }

        ifElseThenP2(): boolean {
            let ada: boolean = false;

            //[IF_ELSE_P] : [PERINTAH]
            //[IF_ELSE_P] : [VAR_ASSIGN]
            //[IF_ELSE_P] : [EXP]
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_IF_ELSE_THEN_P) return false;

                if (t2.valueLowerCase != ':') return false;

                // let t3Ar: number[] = [
                //     Kons.TY_VAR_ASSIGNMENT,
                //     Kons.TY_EXP,
                //     Kons.TY_PERINTAH,
                //     Kons.TY_RETURN,
                //     Kons.TY_RETURN_EXP
                // ]
                // if (t3Ar.indexOf(t3.type) < 0) return false;

                if (ifStmt.isPerintah(t3.type) == false) return false;

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t1, t2, t3)) {
                    tokenBaru = {
                        type: Kons.TY_IF_ELSE_THEN_P2,
                        token: [t1, t2, t3]
                    }

                    console.log("if else P 2:");
                    console.log(tokenBaru);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.ifElseThenP2();
            }

            return ada;
        }

        //else if exp
        //TODO:

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

        //else if exp then p
        //TODO:

        //else if exp then p:p
        //TODO:

    }

    export var ifStmt = new IfStmt();
}
