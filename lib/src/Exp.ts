namespace ha.parse {
    class Exp {

        isExp(token: Itoken): boolean {
            if (!token) return false;
            if (token.type == Kons.TY_EXP) return true;
            if (token.type == Kons.TY_ANGKA) return true;
            if (token.type == Kons.TY_MIN) return true;
            if (token.type == Kons.TY_TEKS) return true;
            if (token.type == Kons.TY_BINOP) return true;
            if (token.type == Kons.TY_KATA) return true;
            if (token.type == Kons.TY_PANGGIL_FUNGSI) return true;
            if (token.type == Kons.TY_KATA_DOT) return true;
            if (token.type == Kons.TY_KURUNG_ISI) return true;  //tidak valid
            if (token.type == Kons.TY_ARRAY) return true;
            if (token.value && token.value.toLowerCase() == "true") return true;
            if (token.value && token.value.toLowerCase() == "false") return true;

            return false;
        }

        //v2
        exp2(): boolean {
            function check(t0: Itoken, t1: Itoken, t2: Itoken): boolean {
                if (!t1) return false;

                let ar: number[] = [
                    Kons.TY_ANGKA,
                    Kons.TY_BINOP,
                    Kons.TY_TEKS,
                    Kons.TY_KATA,
                    Kons.TY_MIN,
                    Kons.TY_PANGGIL_FUNGSI,
                    Kons.TY_KURUNG_SINGLE
                ];

                if (ar.indexOf(t1.type) < 0) return false;

                //kata tidak boleh diikuti (
                if (t1.type == Kons.TY_KATA) {
                    if (t2) {
                        if (t2.valueLowerCase == '(') {
                            return false;
                        }

                        if (t2.type == Kons.TY_KURUNG_ARG) return false;
                        if (t2.type == Kons.TY_KURUNG_ARG2) return false;
                        if (t2.type == Kons.TY_KURUNG_ISI) return false;    //TODO: [ref] dihapus
                        if (t2.type == Kons.TY_KURUNG_KOSONG) return false;
                        if (t2.type == Kons.TY_KURUNG_SINGLE) return false;
                    }
                }

                //kurung single tidak diikuti kata boleh dijadikan expresion
                if (t1.type == Kons.TY_KURUNG_ISI) {
                    if (t0 && t0.type == Kons.TY_KATA) {
                        return false;
                    }
                }

                //kata tidak boleh diikuti dot
                if (t1.type == Kons.TY_KATA) {
                    if (t2 && ("." == t2.valueLowerCase)) {
                        return false;
                    }
                }

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                // let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token0, token1, token2)) {
                    tokenBaru = {
                        type: Kons.TY_EXP,
                        token: [token1]
                    }

                    console.log("exp");
                    console.log(parse.tokenToAr(tokenBaru));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        isOp(token: Itoken): boolean {
            // if (token.token == "=") return true;
            if (token.value == "+") return true;
            if (token.value == "-") return true;
            if (token.value == "*") return true;
            if (token.value == "/") return true;
            if (token.value == "%") return true;
            if (token.value && token.value.toLowerCase() == "mod") return true;
            if (token.type == Kons.TY_OP) return true;
            return false;
        }

        kataDot(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];

                if (token1.type == Kons.TY_KATA) {
                    if (token2.value == '.') {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KATA_DOT
                        }
                        console.log("kata dot:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                    }
                }
            }

            return false;
        }

        kataDotChain(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];

                if (token1.type == Kons.TY_KATA_DOT) {
                    if (token2.type == Kons.TY_KATA_DOT) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KATA_DOT
                        }
                        console.log("kata dot chain:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                    }
                }
            }

            return false;
        }

        checkKataDotFinal(token: Itoken): boolean {
            if (token) {
                if (token.type == Kons.TY_KATA_DOT) {
                    return false;
                } else if (token.value == '.') {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        }

        kataDotFinal(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

                let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];

                if (token1.type == Kons.TY_KATA_DOT) {
                    if (token2.type == Kons.TY_KATA) {
                        if (this.checkKataDotFinal(token0)) {
                            let tokenBaru: Itoken = {
                                token: [token1, token2],
                                type: Kons.TY_KATA
                            }
                            console.log("kata dot final:");
                            console.log(tokenBaru);

                            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                            return true;
                        }
                    }
                }
            }

            return false;
        }

        kotak(): boolean {

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                if (token1 && token1.value == "[") {
                    if (token2 && token2.value == "]") {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KOTAK
                        }

                        console.log("kotak:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                    }
                }
            }

            return false;
        }

        kotak2(): boolean {
            //kotak ditambah kotak
            //[][]

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                if (token1 && token1.type == Kons.TY_KOTAK) {
                    if (token2 && token2.type == Kons.TY_KOTAK) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KOTAK
                        }

                        console.log("kotak 2:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                    }
                }
            }

            return false;
        }

        kotak3(): boolean {
            //kotak isi
            //[***]

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                if (token1 && token1.value == "[") {
                    if (exp.isExp(token2)) {
                        if (token3 && token3.value == "]") {

                            let tokenBaru: Itoken = {
                                token: [token1, token2, token3],
                                type: Kons.TY_KOTAK
                            }

                            console.log("kotak isi:");
                            console.log(tokenBaru);

                            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

                            return true;
                        }
                    }
                }
            }

            return false;

        }

        array2(): boolean {
            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);

                if (token1 && token1.type == Kons.TY_KATA) {
                    if (token2 && token2.type == Kons.TY_KOTAK) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_ARRAY
                        }

                        console.log("array:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                    }
                }
            }

            return false;
        }

        //TODO: [ref] dihapus gak dipakai
        arrayDot(): boolean {
            //array dot = kata dot
            //test[1].

            for (let i: number = 0; i <= grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                // let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                if (token1 && token1.type == Kons.TY_ARRAY) {
                    if (token2 && token2.value == ".") {
                        // if (token3 && token3.type == Kons.TY_KATA) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KATA_DOT
                        }

                        console.log("array:");
                        console.log(tokenBaru);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        return true;
                        // }
                    }
                }
            }

            return false;
        }

        //2
        kurungKosong(): boolean {
            // console.group('kurung kosong');

            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {
                // console.log('iterate ' + i);

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];

                if (token1.value == "(") {
                    if (token2.value == ")") {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KURUNG_KOSONG
                        }
                        console.log("kurung kosong:");
                        console.log(tokenBaru);

                        // console.log('sebelum:')
                        // console.log(this._barisObj.token);

                        grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                        // console.log('sesudah:');
                        // console.log(this._barisObj.token);

                        // console.groupEnd();
                        return true;
                    }
                    // else {
                    //     console.log('gagal: ' + token2.token.toString());
                    // }

                }
                // else {
                //     console.log("gagal: " + token1.token.toString());
                // }
            }

            // console.groupEnd();
            return false;
        }

        //v2
        kurungSingle(): boolean {
            let ada: boolean = false;

            //( exp )
            function check(t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                //strict
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                if (t1.valueLowerCase != '(') return false;
                if (t3.valueLowerCase != ')') return false;
                if (t2.type != Kons.TY_EXP) return false;

                //optional

                //ok

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {
                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                if (check(token1, token2, token3)) {
                    ada = true;

                    let tokenBaru: Itoken = {
                        token: [token1, token2, token3],
                        type: Kons.TY_KURUNG_SINGLE
                    }
                    console.log("kurung single:");
                    console.log(parse.tokenToAr(tokenBaru));

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                    i--;
                }
            }

            return ada;
        }

        //v2
        binopIf(): boolean {

            //[if, while, until] exp = exp
            function check(t0: Itoken, t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                if (!t0) return false;
                if (!t1) return false;
                if (!t2) return false;
                if (!t3) return false;

                let ar: string[] = ['if', 'while', 'until'];
                if (ar.indexOf(t0.valueLowerCase) < 0) return false;
                if (exp.isExp(t1) == false) return false;
                if (t2.valueLowerCase != '=') return false;
                if (exp.isExp(t3) == false) return false;

                return true;
            }

            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                let tokenBaru: Itoken;

                if (check(token0, token1, token2, token3)) {
                    tokenBaru = {
                        type: Kons.TY_BINOP,
                        token: [token1, token2, token3]
                    }

                    console.log("binop if/until/while:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;
        }

        binop(): boolean {
            let ada: boolean = false;

            // console.group('binop:');
            // console.log(this.grammar.barisObj.token);

            for (let i: number = 0; i <= grammar.barisObj.token.length - 3; i++) {
                // console.group('iterate ' + i);

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let token3: Itoken = grammar.barisObj.token[i + 2];
                let tokenBaru: Itoken;

                // console.log(token1);
                // console.log(token2);
                // console.log(token3);

                if (this.isExp(token1)) {
                    if (this.isOp(token2)) {
                        if (this.isExp(token3)) {

                            tokenBaru = {
                                type: Kons.TY_BINOP,
                                token: []
                            }

                            let tokenIsi: Itoken[] = tokenBaru.token as Itoken[];
                            tokenIsi.push(token1);
                            tokenIsi.push(token2);
                            tokenIsi.push(token3);

                            // console.log('binop, token baru:');
                            // console.log(tokenBaru);

                            // console.log('asal:');
                            // console.log(this.grammar.barisObj.token);

                            console.log("binop:");
                            console.log(tokenBaru);

                            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

                            // console.log('setelah:');
                            // console.log(this.grammar.barisObj.token);

                            ada = true;
                        }
                    }
                }

                // console.groupEnd();

            }

            // console.groupEnd();
            return ada;
        }

        not(): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let tokenBaru: Itoken;

                if (check(token1, token2)) {
                    tokenBaru = {
                        type: Kons.TY_BINOP,
                        token: [token1, token2]
                    }

                    console.log("binop not:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    ada = true;
                }
            }

            return ada;

            //not exp
            function check(t1: Itoken, t2: Itoken): boolean {
                if (!t1) return false;
                if (!t2) return false;
                if (t1.type != Kons.TY_OP) return false;
                if (t1.value.toLowerCase() != "not") return false;
                if (!exp.isExp(t2)) return false;
                return true;
            }

        }

        min(): boolean {

            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

                let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let token3: Itoken = grammar.barisObj.token[i + 2];
                let tokenBaru: Itoken;
                let ok: boolean = true;

                if ((token1.value != '-') && (token1.value != '+')) {
                    ok = false;
                }

                if (!this.isExp(token2)) {
                    ok = false;
                }

                //gak boleh diikuti kata (
                //gak boleh diikuti kata ()
                //gak boleh diikuti kata (-)
                if (this.isExp(token2)) {
                    if (token3 && token3.value == "(") {
                        ok = false;
                    }
                    if (token3 && token3.type == Kons.TY_KURUNG_KOSONG) {
                        ok = false
                    }
                    if (token3 && token3.type == Kons.TY_KURUNG_ISI) {
                        ok = false
                    }
                }

                if (token0 && this.isExp(token0)) ok = false;
                if (token0 && token0.value == ')') ok = false;
                if (token0 && token0.type == Kons.TY_KURUNG_ISI) ok = false;

                if (ok) {

                    tokenBaru = {
                        type: Kons.TY_MIN,
                        token: []
                    }

                    let tokenIsi: Itoken[] = tokenBaru.token as Itoken[];
                    tokenIsi.push(token1);
                    tokenIsi.push(token2);

                    console.log("min:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                    return true;

                }

            }

            return false;
        }

        checkArgument(tokenAr: Itoken[]): boolean {
            if (!tokenAr[1]) return false;
            if (!tokenAr[2]) return false;
            if (!tokenAr[3]) return false;

            if (this.isExp(tokenAr[1]) == false) {
                if (tokenAr[1].type != Kons.TY_ARGUMENT) {
                    return false;
                }
            }

            if (!(tokenAr[2].value == ',')) return false;
            if (this.isExp(tokenAr[3]) == false) return false;

            if (tokenAr[4] && tokenAr[4].value == "(") return false;

            return true;
        }

        argument(token: Itoken[]): boolean {
            for (let i: number = 0; i < token.length; i++) {

                // console.log("argument " + i);

                if (this.checkArgument([
                    parse.getToken(i - 1, token),
                    parse.getToken(i + 0, token),
                    parse.getToken(i + 1, token),
                    parse.getToken(i + 2, token),
                    parse.getToken(i + 3, token),
                ])) {

                    let tokenBaru: Itoken = {
                        token: [
                            parse.getToken(i, token),
                            parse.getToken(i + 1, token),
                            parse.getToken(i + 2, token)],
                        type: Kons.TY_ARGUMENT
                    }

                    console.log("arg2:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

                    return true;
                };

            }

            return false;
        }

        //v2
        panggilfungsi(): boolean {
            let ada: boolean = false;

            //kata kurung [=]
            function check(t0: Itoken, t1: Itoken, t2: Itoken, t3: Itoken): boolean {
                // console.debug('check fungsi exp');
                // console.log(t1);
                // console.log(t2);
                // console.log(t3);

                // console.debug('check null');
                //tidak boleh null
                if (!t1) return false;
                if (!t2) return false;

                // console.debug('check t1 kata');
                //t1 harus kata
                if (t1.type != Kons.TY_KATA) return false;

                //t1 tidak boleh dim
                if ('dim' == t1.valueLowerCase) return false;

                //tidak boleh diikuti =, masuk dim assingment kecuali bila didahului if
                if (t3) {
                    if (t3.valueLowerCase == '=') {
                        let ifAr: string[] = [
                            'if', 'while', 'until'
                        ];
                        if (t0 && ifAr.indexOf(t0.valueLowerCase) < 0) {
                            return false;
                        }
                    }
                }

                //t2 salah satu harus match
                let kurung: number[] = [
                    Kons.TY_KURUNG_ARG,
                    Kons.TY_KURUNG_ARG2,
                    Kons.TY_KURUNG_ISI, //TODO: dep
                    Kons.TY_KURUNG_KOSONG,
                    Kons.TY_KURUNG_SINGLE
                ];
                if (kurung.indexOf(t2.type) < 0) return false;

                //tidak boleh didahului function
                if (t0 && 'function' == t0.valueLowerCase) {
                    return false;
                }

                //ok

                return true;
            }

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let token1: Itoken = parse.getToken(i + 0, grammar.barisObj.token);
                let token2: Itoken = parse.getToken(i + 1, grammar.barisObj.token);
                let token3: Itoken = parse.getToken(i + 2, grammar.barisObj.token);

                // console.group('check fungsi group');
                if (check(token0, token1, token2, token3)) {
                    ada = true;

                    let tokenBaru: Itoken = {
                        token: [token1, token2],
                        type: Kons.TY_PANGGIL_FUNGSI
                    }
                    console.log("fungsi exp:");
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);

                    i--;
                }
                // console.groupEnd();
            }

            if (ada) {
                //panggil exp
                exp.exp2();
            }

            return ada;
        }

        getQuote2(idx: number): number {
            // console.group('get quote');

            for (let i: number = idx; i < grammar.barisObj.token.length; i++) {
                let item: Itoken = grammar.barisObj.token[i];
                // console.log('token as string: ' + (item.token as string) + '/' + item.token.toString());
                if ((item.value as string) == "\"") {
                    if (i == idx) {
                        // console.groupEnd();
                        return i;
                    } else {
                        let itemSebelum: Itoken = grammar.barisObj.token[i - 1];
                        if (itemSebelum.value.toString() != "\\") {
                            // console.groupEnd();
                            return i;
                        }
                    }
                }
            }

            // console.groupEnd();
            return -1;
        }

        teks(): boolean {
            let idx: number = 0;
            let idx2: number = 0;
            let l: number = 0;

            // console.group('teks:');
            // console.log(this.grammar.barisObj.token);

            idx = this.getQuote2(0);
            if (idx == -1) {
                // console.groupEnd();
                return false;
            }


            idx2 = this.getQuote2(idx + 1);
            if (idx2 == -1) {
                // console.groupEnd();
                return false;
            }

            l = idx2 - idx;
            l;

            // console.log('idx1: ' + idx);
            // console.log('idx2: ' + idx2);

            //package
            let tokenBaru: Itoken = {
                token: [],
                type: Kons.TY_TEKS
            }

            tokenBaru.token = ar.ambilTengah(grammar.barisObj.token, idx, idx2);
            console.log("teks:");
            console.log(tokenBaru);

            // console.log('teks baru:');
            // parse.baris.renderLines(tokenBaru.token);

            // console.log('sebelum:');
            // console.log(this.grammar.barisObj.token);

            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, idx, idx2, tokenBaru);

            // console.log('setelah:');
            // console.log(this.grammar.barisObj.token);

            // console.groupEnd();

            return true;
        }

    }
    export var exp: Exp = new Exp();
}