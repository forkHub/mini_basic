namespace ha.parse {
    class Exp {

        hapusComment(): boolean {
            let tokenAr = data.barisObj.token;

            let idx: number = -1;
            for (let i: number = 0; i < tokenAr.length; i++) {
                if (tokenAr[i].valueLowerCase == ";") {
                    idx = i;
                    break;
                }
            }

            if (idx > 0) {
                tokenAr = tokenAr.slice(0, idx);
            }
            else if (idx == 0) {
                tokenAr = [];
            }

            if (!tokenAr) tokenAr = [];

            data.barisObj.token = tokenAr;

            return false;
        }

        isExpBinopLogic(type: number): boolean {
            if (type == Kons.TY_EXP) return true;
            // if (type == Kons.TY_BINOP_EQ) return true;
            if (type == Kons.TY_BINOP) return true;
            if (type == Kons.TY_DIM_ASSINMENT) return true;

            return false;
        }

        //TODO: dihapus
        isExp(token: IToken): boolean {
            if (!token) return false;
            if (token.type == Kons.TY_EXP) return true;
            if (token.type == Kons.TY_ANGKA) return true;
            if (token.type == Kons.TY_MIN) return true;
            if (token.type == Kons.TY_TEKS) return true;
            if (token.type == Kons.TY_BINOP) return true;
            if (token.type == Kons.TY_KATA) return true;
            if (token.type == Kons.TY_PANGGIL_FUNGSI) return true;
            if (token.type == Kons.TY_KATA_DOT) return true;
            // if (token.type == Kons.TY_KURUNG_ISI) return true;  //tidak valid
            // if (token.type == Kons.TY_ARRAY) return true;
            if (token.value && token.value.toLowerCase() == "true") return true;
            if (token.value && token.value.toLowerCase() == "false") return true;

            return false;
        }

        expKata(): boolean {
            function check(t0: IToken, t1: IToken, t2: IToken): boolean {
                if (!t1) return false;

                if (t1.type != Kons.TY_KATA) {
                    if (t1.type != Kons.TY_KATA_DOT) {
                        return false;
                    }
                }

                //gak boleh return
                if ("return" == t1.valueLowerCase) return false;

                //gak boleh diikuti kata/string/number  
                let ar2: number[] = [
                    Kons.TY_KATA,
                    Kons.TY_TEKS,
                    Kons.TY_EXP,
                    Kons.TY_ARG,
                    Kons.TY_ARG2,
                    Kons.TY_ANGKA,
                    Kons.TY_PANGGIL_FUNGSI,
                    Kons.TY_BINOP,
                    Kons.TY_NEW
                ]

                if (t2) {
                    if (ar2.indexOf(t2.type) >= 0) return false;

                    if (t2.valueLowerCase == '=') return false;

                    if (t2.valueLowerCase == "\\") return false;
                    if (t2.valueLowerCase == ".") return false;
                    if (t2.valueLowerCase == ",") return false;

                    if (t2.valueLowerCase == '(') {
                        return false;
                    }

                    if (t2.type == Kons.TY_KURUNG_ARG) return false;
                    if (t2.type == Kons.TY_KURUNG_ARG2) return false;
                    if (t2.type == Kons.TY_KURUNG_KOSONG) return false;
                    if (t2.type == Kons.TY_KURUNG_SINGLE) return false;
                }

                //gak boleh didahlui modifier
                if (t0) {
                    if (t0.valueLowerCase == 'global') return false;
                    if (t0.valueLowerCase == 'local') return false;
                    if (t0.valueLowerCase == 'const') return false;

                    //gak boleh didahului new
                    if (t0.valueLowerCase == 'new') return false;

                    //gak boleh didahului dot
                    if (t0.valueLowerCase == '.') return false;

                    if (t0.valueLowerCase == "\\") return false;

                    if (t0.valueLowerCase == "type") return false;
                    if (t0.valueLowerCase == "field") return false;
                    if (t0.valueLowerCase == ",") return false;
                    if (t0.type == Kons.TY_EACH) return false;
                    if (t0.type == Kons.TY_DELETE) return false;
                    if (t0.type == Kons.TY_BEFORE) return false;
                    if (t0.type == Kons.TY_LAST) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let token0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                // let token3: Itoken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(token0, token1, token2)) {
                    tokenBaru = {
                        type: Kons.TY_EXP,
                        token: [token1]
                    }

                    ha.comp.log.log("exp");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.exp();
                this.binop();
                this.panggilfungsi();
                this.kurungSingle();
                this.arg2();
            }

            return ada;
        }

        expKurungSingle(): boolean {
            function check(t0: IToken, t1: IToken): boolean {
                if (!t1) return false;

                if (t1.type != Kons.TY_KURUNG_SINGLE) return false;

                if (t0) {
                    if (t0.type == Kons.TY_KATA) return false;
                    if (t0.type == Kons.TY_KATA_DOT) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let token0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let tokenBaru: IToken;

                if (check(token0, token1)) {
                    tokenBaru = {
                        type: Kons.TY_EXP,
                        token: [token1]
                    }

                    ha.comp.log.log("exp kurung single");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.exp();
                this.expKurungSingle();
                this.expKata();
                this.binop();
                this.panggilfungsi();
                this.kurungSingle();
                this.arg2();
            }

            return ada;
        }

        exp(): boolean {
            function check(t0: IToken, t1: IToken): boolean {
                if (!t1) return false;

                let ar: number[] = [
                    Kons.TY_ANGKA,
                    Kons.TY_BINOP,
                    Kons.TY_TEKS,
                    Kons.TY_MIN,
                    Kons.TY_PANGGIL_FUNGSI,
                    // Kons.TY_TYPE_ACCESS,
                    Kons.TY_FALSE,
                    Kons.TY_TRUE,
                    Kons.TY_NULL,
                    // Kons.TY_TYPE_ACCESS_DIM,
                    Kons.TY_DIM_ASSINMENT
                ];

                if (ar.indexOf(t1.type) < 0) return false;

                //gak boleh didahlui modifier
                if (t0) {
                    if (t0.valueLowerCase == 'global') return false;
                    if (t0.valueLowerCase == 'local') return false;
                    if (t0.valueLowerCase == 'const') return false;

                    //gak boleh didahului new
                    if (t0.valueLowerCase == 'new') return false;

                    //gak boleh didahului dot
                    if (t0.valueLowerCase == '.') return false;

                    if (t0.valueLowerCase == "\\") return false;
                    if (t0.type == Kons.TY_EACH) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                // let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                // let token3: Itoken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t0, t1)) {
                    tokenBaru = {
                        type: Kons.TY_EXP,
                        token: [t1]
                    }

                    ha.comp.log.log("exp");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));
                    // ha.comp.log.log('seb ' + t0.type);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            if (ada) {
                this.exp();
                this.expKurungSingle();
                this.expKata();
                this.binop();
                this.panggilfungsi();
                this.kurungSingle();
                this.arg2();
            }

            return ada;
        }

        //( var_assign )
        exp3(): boolean {
            return true;
        }

        isOp(token: IToken): boolean {
            // if (token.token == "=") return true;
            if (token.valueLowerCase == "+") return true;
            if (token.valueLowerCase == "-") return true;
            if (token.valueLowerCase == "*") return true;
            if (token.valueLowerCase == "/") return true;
            if (token.valueLowerCase == "%") return true;
            if (token.valueLowerCase && token.value.toLowerCase() == "mod") return true;
            if (token.type == Kons.TY_OP) return true;
            return false;
        }

        kataDot(): boolean {
            let ada: boolean = false;

            //kata dot kata
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_KATA) return false;
                if (t2.valueLowerCase != ".") return false;
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
                        type: Kons.TY_KATA_DOT,
                        token: [t1, t2, t3]
                    }

                    ha.comp.log.log("kata dot:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));
                    // parse.debugToken(data.barisObj.token);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //2
        kurungKosong(): boolean {
            // ha.comp.log.group('kurung kosong');

            for (let i: number = 0; i <= data.barisObj.token.length - 2; i++) {
                // ha.comp.log.log('iterate ' + i);

                let token1: IToken = data.barisObj.token[i];
                let token2: IToken = data.barisObj.token[i + 1];

                if (token1.value == "(") {
                    if (token2.value == ")") {

                        let tokenBaru: IToken = {
                            token: [token1, token2],
                            type: Kons.TY_KURUNG_KOSONG
                        }
                        ha.comp.log.log("kurung kosong:");
                        ha.comp.log.log(parse.tokenToValue(tokenBaru));

                        // ha.comp.log.log('sebelum:')
                        // ha.comp.log.log(this._barisObj.token);

                        data.barisObj.token = ar.ganti(data.barisObj.token, i, i + 1, tokenBaru);

                        // ha.comp.log.log('sesudah:');
                        // ha.comp.log.log(this._barisObj.token);

                        // ha.comp.log.groupEnd();
                        return true;
                    }
                    // else {
                    //     ha.comp.log.log('gagal: ' + token2.token.toString());
                    // }

                }
                // else {
                //     ha.comp.log.log("gagal: " + token1.token.toString());
                // }
            }

            // ha.comp.log.groupEnd();
            return false;
        }

        //v2
        kurungSingle(): boolean {
            let ada: boolean = false;

            //( exp )
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                //strict
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != '(') return false;
                if (t3.valueLowerCase != ')') return false;
                if (t2.type != Kons.TY_EXP) {
                    // if (t2.type != Kons.TY_BINOP_EQ) {
                    return false;
                    // }
                }

                //optional

                //ok

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {
                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                if (check(token1, token2, token3)) {
                    ada = true;

                    let tokenBaru: IToken = {
                        token: [token1, token2, token3],
                        type: Kons.TY_KURUNG_SINGLE
                    }
                    ha.comp.log.log("kurung single:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                    i--;
                }
            }

            return ada;
        }

        kurungArg2(): boolean {
            let ada: boolean = false;

            //( exp )
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                //strict
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != '(') return false;
                if (t3.valueLowerCase != ')') return false;
                if (t2.type != Kons.TY_ARG2) {
                    return false;
                }

                //optional

                //ok

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {
                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                if (check(token1, token2, token3)) {
                    ada = true;

                    let tokenBaru: IToken = {
                        token: [token1, token2, token3],
                        type: Kons.TY_KURUNG_ARG2
                    }
                    ha.comp.log.log("kurung arg 2:");
                    ha.comp.log.log(parse.tokenToAr(tokenBaru));
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                    i--;
                }
            }

            return ada;
        }

        kurungArg(): boolean {
            let ada: boolean = false;

            //( arg )
            function check(t1: IToken, t2: IToken, t3: IToken): boolean {
                //strict
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != '(') return false;
                if (t3.valueLowerCase != ')') return false;
                if (t2.type != Kons.TY_ARG) {
                    // if (t2.type != Kons.TY_ARG_KATA_M) {
                    return false;
                    // }
                }
                //optional

                //ok

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {
                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                if (check(token1, token2, token3)) {
                    ada = true;

                    let tokenBaru: IToken = {
                        token: [token1, token2, token3],
                        type: Kons.TY_KURUNG_ARG
                    }
                    ha.comp.log.log("kurung arg:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                    i--;
                }
            }

            return ada;
        }

        //TODO: diganti yang lebih generic, include kata, refactor ke grammar2
        binop(): boolean {
            let ada: boolean = false;

            //TODO: binop dibuat dari kiri ke kanan
            function check(t1: IToken, t2: IToken, t3: IToken) {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_EXP) return false;
                if (t2.type != Kons.TY_OP) return false;
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
                        type: Kons.TY_BINOP,
                        token: [t1, t2, t3]
                    }

                    ha.comp.log.log("binop");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }

            }

            if (ada) {
                this.binop()
                this.exp();
            }

            return ada;
        }

        min(): boolean {

            let ada: boolean = false;

            function check(t0: IToken, t1: IToken, t2: IToken): boolean {

                if (!t1) return false;
                if (!t2) return false;

                if (t1.valueLowerCase != "+") {
                    if (t1.valueLowerCase != "-") {
                        return false;
                    }
                }

                if (t2.type != Kons.TY_EXP) {
                    if (t2.type != Kons.TY_KATA) {
                        return false;
                    }
                }

                if (t0) {
                    if (t0.type == Kons.TY_EXP) return false;
                    if (t0.type == Kons.TY_KURUNG_ARG) return false;
                    if (t0.type == Kons.TY_KURUNG_ARG2) return false;
                    if (t0.type == Kons.TY_KURUNG_KOSONG) return false;
                    if (t0.type == Kons.TY_KURUNG_SINGLE) return false;
                    if (t0.type == Kons.TY_KATA) return false;
                    if (t0.type == Kons.TY_MIN) return false;

                    if (t0.valueLowerCase == ")") return false;
                }

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                // let t3: IToken = parse.getToken(i + 2, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t0, t1, t2)) {
                    tokenBaru = {
                        type: Kons.TY_MIN,
                        token: [t1, t2]
                    }

                    ha.comp.log.log("min:");
                    ha.comp.log.log(tokenBaru);
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));
                    // if (t0) {
                    //     ha.comp.log.log('to');
                    //     ha.comp.log.log(t0);
                    // }

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }

            }

            if (ada) {
                this.exp();
            }

            return ada;
        }

        //TODO: refactor dipindah ke grammar2
        arg2(): boolean {
            //EXP , EXP
            function check(t0: IToken, t1: IToken, t2: IToken, t3: IToken, t4: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_EXP) {
                    // if (t1.type != Kons.TY_BINOP_EQ) {
                    return false;
                    // }
                }

                if (t2.valueLowerCase != ',') return false;

                if (t3.type != Kons.TY_EXP) {
                    // if (t3.type != Kons.TY_BINOP_EQ) {
                    return false;
                    // }
                }

                if (t0) {
                    if (t0.valueLowerCase == ",") return false;
                    if (t0.valueLowerCase == "-") return false;
                    if (t0.valueLowerCase == "+") return false;
                    if (t0.type == Kons.TY_OP) return false;
                    // if (t0.type == Kons.TY_EQ) return false;
                }

                if (t4) {
                    if (t4.valueLowerCase == '+') return false;
                    if (t4.type == Kons.TY_OP) return false;
                    // if (t4.type == Kons.TY_OP2) return false;
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
                let t4: IToken = parse.getToken(i + 3, data.barisObj.token);

                let tokenBaru: IToken;

                if (check(t0, t1, t2, t3, t4)) {
                    tokenBaru = {
                        type: Kons.TY_ARG2,
                        token: [t1, t2, t3]
                    }

                    ha.comp.log.log("argument2:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        //arg2 , exp
        //args, exp
        args(token: IToken[]): boolean {

            //ARG2 , EXP [T4]
            function checkArgument(t1: IToken, t2: IToken, t3: IToken, t4: IToken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.type != Kons.TY_ARG2) {
                    if (t1.type != Kons.TY_ARG) {
                        return false;
                    }
                }

                if (t2.value != ',') return false;
                if (t3.type != Kons.TY_EXP) {
                    // if (t3.type != Kons.TY_BINOP_EQ) {
                    return false;
                    // }
                }

                if (t4) {
                    if (t4.valueLowerCase == "+") return false;
                    if (t4.valueLowerCase == "-") return false;
                    if (t4.type == Kons.TY_OP) return false;
                    // if (t4.type == Kons.TY_OP2) return false;
                }

                return true;
            }

            for (let i: number = 0; i < token.length; i++) {
                let t1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 2, data.barisObj.token);
                let t4: IToken = parse.getToken(i + 3, data.barisObj.token);

                if (checkArgument(t1, t2, t3, t4)) {

                    let tokenBaru: IToken = {
                        token: [
                            parse.getToken(i, token),
                            parse.getToken(i + 1, token),
                            parse.getToken(i + 2, token)],
                        type: Kons.TY_ARG
                    }

                    ha.comp.log.log("arg:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    return true;
                };

            }

            return false;
        }

        panggilfungsiArg(): boolean {
            let ada: boolean = false;

            //kata kurung
            function check(t0: IToken, t1: IToken, t2: IToken): boolean {

                //tidak boleh null
                if (!t1) return false;
                if (!t2) return false;

                //t1 harus kata
                if (t1.type != Kons.TY_KATA) return false;

                //t2 salah satu harus match
                let kurung: number[] = [
                    Kons.TY_KURUNG_ARG,
                ];
                if (kurung.indexOf(t2.type) < 0) return false;

                //tidak boleh didahului function
                if (t0) {
                    if ('function' == t0.valueLowerCase) {
                        return false;
                    }

                    //tidak boleh didahuli dim
                    if ('dim' == t0.valueLowerCase) {
                        return false;
                    }
                }

                //ok

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let t1: IToken = parse.getToken(i - 1, data.barisObj.token);
                let t2: IToken = parse.getToken(i + 0, data.barisObj.token);
                let t3: IToken = parse.getToken(i + 1, data.barisObj.token);
                // let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                // ha.comp.log.group('check fungsi group');
                if (check(t1, t2, t3)) {
                    ada = true;

                    let tokenBaru: IToken = {
                        token: [t2, t3],
                        type: Kons.TY_PANGGIL_FUNGSI
                    }
                    ha.comp.log.log("fungsi exp arg:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    i--;
                }
                // ha.comp.log.groupEnd();
            }

            if (ada) {
                //panggil exp
                exp.exp();
            }

            return ada;
        }

        panggilfungsi(): boolean {
            let ada: boolean = false;

            //kata kurung
            function check(t0: IToken, t1: IToken, t2: IToken, t3: IToken): boolean {

                //tidak boleh null
                if (!t1) return false;
                if (!t2) return false;

                //t1 harus kata
                if (t1.type != Kons.TY_KATA) {
                    if (t1.type != Kons.TY_KATA_DOT) {
                        return false;
                    }
                }

                //t1 tidak boleh dim
                if ('dim' == t1.valueLowerCase) return false;

                //t2 salah satu harus match
                let kurung: number[] = [
                    Kons.TY_KURUNG_ARG2,
                    Kons.TY_KURUNG_KOSONG,
                    Kons.TY_KURUNG_SINGLE,
                    Kons.TY_KURUNG_ARG,
                ];
                if (kurung.indexOf(t2.type) < 0) return false;

                //tidak boleh didahului function
                if (t0) {
                    if ('function' == t0.valueLowerCase) {
                        return false;
                    }

                    //tidak boleh didahuli dim
                    if ('dim' == t0.valueLowerCase) {
                        return false;
                    }
                }

                //tidak boleh diikuti =
                if (t3) {
                    if (t3.valueLowerCase == '=') return false;
                    if (t3.valueLowerCase == '\\') return false;
                }

                //ok

                return true;
            }

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let token0: IToken = parse.getToken(i - 1, data.barisObj.token);
                let token1: IToken = parse.getToken(i + 0, data.barisObj.token);
                let token2: IToken = parse.getToken(i + 1, data.barisObj.token);
                let token3: IToken = parse.getToken(i + 2, data.barisObj.token);

                // ha.comp.log.group('check fungsi group');
                if (check(token0, token1, token2, token3)) {
                    ada = true;

                    let tokenBaru: IToken = {
                        token: [token1, token2],
                        type: Kons.TY_PANGGIL_FUNGSI
                    }
                    ha.comp.log.log("fungsi exp:");
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    i--;
                }
                // ha.comp.log.groupEnd();
            }

            if (ada) {
                //panggil exp
                exp.exp();
            }

            return ada;
        }

        getQuote2(idx: number): number {
            // ha.comp.log.group('get quote');

            for (let i: number = idx; i < data.barisObj.token.length; i++) {
                let item: IToken = data.barisObj.token[i];
                // ha.comp.log.log('token as string: ' + (item.token as string) + '/' + item.token.toString());
                if ((item.value as string) == "\"") {
                    return i;
                    // if (i == idx) {
                    //     // ha.comp.log.groupEnd();
                    //     return i;
                    // } else {
                    //     let itemSebelum: IToken = data.barisObj.token[i - 1];
                    //     if (itemSebelum && itemSebelum.value.toString() != "\\") {
                    //         // ha.comp.log.groupEnd();
                    //         return i;
                    //     }
                    // }
                }
            }

            // ha.comp.log.groupEnd();
            return -1;
        }

        /*
        teks(): boolean {
            let idx: number = 0;
            let idx2: number = 0;
            // let l: number = 0;

            // ha.comp.log.group('teks:');
            // ha.comp.log.log(this.data.barisObj.token);

            idx = this.getQuote2(0);
            if (idx == -1) {
                // ha.comp.log.groupEnd();
                return false;
            }

            idx2 = this.getQuote2(idx + 1);
            if (idx2 == -1) {
                // ha.comp.log.groupEnd();
                return false;
            }

            // l = idx2 - idx;

            // ha.comp.log.log('idx1: ' + idx);
            // ha.comp.log.log('idx2: ' + idx2);

            //package
            let tokenBaru: IToken = {
                token: [],
                type: Kons.TY_TEKS
            }

            tokenBaru.token = ar.ambilTengah(data.barisObj.token, idx, idx2);
            ha.comp.log.log("teks:");
            ha.comp.log.log(parse.tokenToValue(tokenBaru));

            // ha.comp.log.log('teks baru:');
            // parse.baris.renderLines(tokenBaru.token);

            // ha.comp.log.log('sebelum:');
            // ha.comp.log.log(this.data.barisObj.token);

            data.barisObj.token = ar.ganti(data.barisObj.token, idx, idx2, tokenBaru);

            // ha.comp.log.log('setelah:');
            // ha.comp.log.log(this.data.barisObj.token);

            // ha.comp.log.groupEnd();

            return true;
        }
        */

    }

    export var exp: Exp = new Exp();
}