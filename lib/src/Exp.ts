namespace ha.parse {
    class Exp {
        // private _ar: Arr = new Arr();

        isExp(token: Itoken): boolean {
            if (!token) return false;
            if (token.type == Kons.TY_ANGKA) return true;
            if (token.type == Kons.TY_MIN) return true;
            if (token.type == Kons.TY_TEKS) return true;
            if (token.type == Kons.TY_BINOP) return true;
            if (token.type == Kons.TY_KATA) return true;
            if (token.type == Kons.TY_PANGGIL_FUNGSI) return true;
            if (token.type == Kons.TY_KATA_DOT) return true;
            if (token.type == Kons.TY_KURUNG_ISI) return true;
            if (token.type == Kons.TY_ARRAY) return true;
            if (token.value && token.value.toLowerCase() == "true") return true;
            if (token.value && token.value.toLowerCase() == "false") return true;

            return false;
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

        arrayDot(): boolean {
            //araray dot => kata dot
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

        kurungIsi(): boolean {

            for (let i: number = 0; i <= grammar.barisObj.token.length - 3; i++) {

                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];
                let token3: Itoken = grammar.barisObj.token[i + 2];

                if (token1.value == "(") {
                    if (token2.type == Kons.TY_ARGUMENT || this.isExp(token2)) {
                        if (token3.value == ")") {

                            let tokenBaru: Itoken = {
                                token: [token1, token2, token3],
                                type: Kons.TY_KURUNG_ISI
                            }
                            console.log("kurung isi:");
                            console.log(tokenBaru);

                            grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

                            return true;
                        }

                    }

                }
            }

            return false;
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

        // binopMin(): boolean {

        //     for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

        //         let token1: Itoken = grammar.barisObj.token[i];
        //         let token2: Itoken = grammar.barisObj.token[i + 1];
        //         let tokenBaru: Itoken;

        //         if (this.isExp(token1)) {
        //             if (token2.type == Kons.TY_MIN) {

        //                 tokenBaru = {
        //                     type: Kons.TY_BINOP,
        //                     token: [token1, token2]
        //                 }

        //                 console.log("binop Min:");
        //                 console.log(tokenBaru);

        //                 grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

        //                 return true;
        //             }
        //         }

        //     }

        //     return false;
        // }

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
                    if (token3 && token3.type == Kons.TY_KURUNG_ISI) {
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

        // argument(): boolean {

        //     for (let i: number = 0; i <= grammar.barisObj.token.length - 3; i++) {

        //         let token1: Itoken = grammar.barisObj.token[i];
        //         let token2: Itoken = grammar.barisObj.token[i + 1];
        //         let token3: Itoken = grammar.barisObj.token[i + 2];

        //         if (exp.isExp(token1)) {
        //             if (token2.token.toString() == ",") {
        //                 if (exp.isExp(token3)) {

        //                     let tokenBaru: Itoken = {
        //                         token: [token1, token2, token3],
        //                         type: Kons.TY_ARGUMENT
        //                     }
        //                     console.log("arg:");
        //                     console.log(tokenBaru);

        //                     grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 2, tokenBaru);

        //                     return true;
        //                 }
        //             }

        //         }
        //     }

        //     return false;
        // }

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

        // argument2(token: Itoken[]): boolean {

        // }

        //2
        checkPanggilFungsi(token0: Itoken): boolean {
            console.log('check panggil fungsi');
            if (token0) {
                if (token0.value == '.') {
                    console.log('false, didahului dot');
                    return false;
                } else if (token0.type == Kons.TY_KATA_DOT) {
                    console.log('false, didahulu kata dot');
                    return false;
                }
                else {
                    // console.log('ok, type: ' + token.type);
                    console.log(token0);
                    return true;
                }
            }
            else {
                // console.log('ok, token null');
                console.log(token0);
                return true;
            }
        }

        checkPanggilFungsi1(token1: Itoken): boolean {
            if (token1.value) {
                if (token1.value.toLowerCase() == 'if') {
                    console.log('check fungsi gagal, if tidak boleh: ' + token1.value);
                    return false;
                }
                else if (token1.value.toLowerCase() == 'elseif') {
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

        panggilfungsi(): boolean {

            for (let i: number = 0; i <= grammar.barisObj.token.length - 2; i++) {

                let token0: Itoken = parse.getToken(i - 1, grammar.barisObj.token);
                let token1: Itoken = grammar.barisObj.token[i];
                let token2: Itoken = grammar.barisObj.token[i + 1];

                if (token1.type == Kons.TY_KATA || token1.type == Kons.TY_RES_WORD) {
                    if (token2.type == Kons.TY_KURUNG_KOSONG || token2.type == Kons.TY_KURUNG_ISI) {
                        if (this.checkPanggilFungsi(token0)) {
                            if (this.checkPanggilFungsi1(token1)) {
                                let tokenBaru: Itoken = {
                                    token: [token1, token2],
                                    type: Kons.TY_PANGGIL_FUNGSI
                                }

                                if (token1.value && token1.value.toLowerCase() == 'while') {
                                    tokenBaru.type = Kons.TY_WEND;
                                }

                                console.log('panggil fungsi:')
                                console.log(tokenBaru);

                                grammar.barisObj.token = ar.ganti(grammar.barisObj.token, i, i + 1, tokenBaru);

                                return true;
                            }
                        }
                    }
                }
            }

            return false;
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