namespace ha.parse {
    class Terjemah {

        private flDim: boolean = false;
        private flBinopExp: boolean = false;

        constructor() {

        }

        log(data: any): void {
            ha.comp.log.log(data, 'tj');
        }

        terjemah(token: IToken): string {
            let hasil: string = '';

            this.log("terjemah:");
            this.log(token);

            hasil = this.langsung(token);
            if (hasil != '') return hasil;

            hasil = this.exp(token);
            if (hasil != '') return hasil;

            hasil = this.stmt(token);
            if (hasil != '') return hasil;

            hasil = this.gakDikenal(token);
            if (hasil != '') return hasil;

            this.log(token);
            this.log('token type ' + token.type);
            throw Error();
        }

        exp(token: IToken): string {
            if (false) { }
            else if (token.type == Kons.TY_ARG) {
                return terj.terjemah(token.token[0]) + ',' + terj.terjemah(token.token[2]);
            }
            else if (token.type == Kons.TY_BINOP) {
                return terj.terjemah(token.token[0]) + " " + terj.terjemah(token.token[1]) + " " + terj.terjemah(token.token[2]);
            }
            else if (token.type == Kons.TY_PANGGIL_FUNGSI) {
                return this.fungsi(token);
            }
            else if (token.type == Kons.TY_ARG2) {
                return terj.terjemah(token.token[0]) + ',' + terj.terjemah(token.token[2]);
            }
            else if (token.type == Kons.TY_ARG) {
                //arg2 , exp
                return terj.terjemah(token.token[0]) + ',' + terj.terjemah(token.token[2]);
            }
            else if (token.type == Kons.TY_EXP) {
                return this.terjemah(token.token[0]);
            }
            else if (token.type == Kons.TY_KURUNG_ARG2) {
                return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
            }
            else if (token.type == Kons.TY_KURUNG_ARG) {
                return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
            }
            else if (token.type == Kons.TY_KURUNG_KOSONG) {
                return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
            }
            else if (token.type == Kons.TY_KURUNG_SINGLE) {
                return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
            }
            else {
                return '';
            }
        }

        stmt(token: IToken): string {

            if (false) { }
            else if (token.type == Kons.TY_FOR_STMT) {
                //FOR ANY TO EXP
                //0   1   2  3
                return this.terjemah(token.token[0]) + ' ' + this.terjemah(token.token[1]) + ' ' + this.terjemah(token.token[2]) + ' ' + this.terjemah(token.token[3]);
            }
            else if (token.type == Kons.TY_FOR_STEP_STMT) {
                //FOR_STMT STEP EXP
                //0        1    2
                return this.terjemah(token.token[0]) + ' ' + this.terjemah(token.token[1]) + ' ' + this.terjemah(token.token[2])
            }
            else if (token.type == Kons.TY_IF_EXP) {
                //IF EXP
                let hasil: string = '';
                this.flBinopExp = true;
                hasil = this.terjemah(token.token[0]) + ' ' + this.terjemah(token.token[1]);
                this.flBinopExp = false;
                return hasil;
            }
            else if (token.type == Kons.TY_IF_THEN) {
                //IF_EXP THEN
                return this.terjemah(token.token[0]) + "{"
            }
            else if (token.type == Kons.TY_ELSE_STMT) {
                //else exp
                return "else { " + this.terjemah(token.token[1]);
            }
            else if (token.type == Kons.TY_ELSE_THEN_STMT) {
                //else then
                return this.terjemah(token.token[0]);
            }
            else if (token.type == Kons.TY_PERINTAH) {
                let hsl: string = '';

                //diganti ke fungsi
                //ditambahin await

                hsl = "await" + token.token[0].value + "(" + this.terjemah(token.token[1]) + ")";

                return hsl;
            }
            else if (token.type == Kons.TY_WHILE_STMT) {
                let hasil: string = '';

                this.flBinopExp = true;

                hasil += "while " + this.terjemah(token.token[1]) + " {";

                this.flBinopExp = false;

                return hasil
            }
            else if (token.type == Kons.TY_FUNC_DEC) {
                let hsl: string = '';
                let st: boolean = data.config.awaitFl;

                data.config.awaitFl = false;

                hsl = token.token[0].value.toLowerCase() + " " + this.terjemah(token.token[1]) + " {";

                data.config.awaitFl = st;

                if (data.config.awaitFl) {
                    hsl = 'async ' + hsl;
                }

                return hsl;
            }
            else if (token.type == Kons.TY_RETURN) {

                return "return " + this.terjemah(token.token[1]);
            }
            else if (token.type == Kons.TY_MODIFIER) {
                let mod: string = token.token[0].valueLowerCase;

                if (mod == 'global') {
                    return "var " + this.terjemah(token.token[1]);
                }
                else if (mod == 'local') {
                    return "let " + this.terjemah(token.token[1]);
                }
                else {
                    throw Error('');
                }

            }
            else if (token.type == Kons.TY_DIM_DEC) {
                return "Dim(" + this.terjemah(token.token[1]) + ")";
            }
            else if (token.type == Kons.TY_DIM_ASSINMENT) {
                //kata () = exp
                //0    1  2 3

                return token.token[0].value + this.kurungKotak(token.token[1]) + "=" + this.terjemah(token.token[3]);
            }
            else if (token.type == Kons.TY_RETURN_EXP) {
                //return exp|kata
                return this.terjemah(token.token[0]) + ' ' + this.terjemah(token.token[1]);
            }

            return '';
        }

        langsung(token: IToken): string {
            if (false) {

            }
            else if (token.type == Kons.TY_ANGKA) {
                return token.value;
            }
            else if (token.type == Kons.TY_RES_WORD) {
                if (token.value.toLowerCase() == "wend") {
                    return "}";
                }
                else if (token.value.toLowerCase() == "next") {
                    return "}";
                }
                else if (token.value.toLowerCase() == 'end function') {
                    return "}";
                }
                else if (token.value.toLowerCase() == "endif") {
                    return "}";
                }
                else if (token.value.toLowerCase() == "else") {
                    return "} else {"
                }
                else if (token.value.toLowerCase() == "function") {
                    return "function ";
                }
                else if (token.value.toLowerCase() == "return") {
                    return "return ";
                }
                else if (token.value.toLowerCase() == "mod") {
                    return " % ";
                }
                else {
                    return token.value;
                }
            }
            else if (token.type == Kons.TY_TEKS) {
                return token.value
            }
            else if (token.type == Kons.TY_KATA) {
                if (token.token && token.token.length == 2) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                }
                else if (token.value) {
                    return token.value;
                }
                else {
                    throw Error('');
                }
            }
            else if (token.type == Kons.TY_KATA_DOT) {
                return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
            }
            else if (token.type == Kons.TY_MIN) {
                return token.token[0].value + this.terjemah(token.token[1]);
            }
            else if (token.type == Kons.TY_OP) {
                if (token.value == "<>") {
                    return "!=";
                }
                else if (token.value.toLowerCase() == "mod") {
                    return " % ";
                }
                else if (token.value.toLowerCase() == '=') {
                    if (this.flBinopExp) return "==";
                    return "="
                }
                return token.value;
            }
            else if (token.type == Kons.TY_SYMBOL) {
                if (token.value == ".") return token.value;
                return token.value + " ";
            }
            else if (token.type == Kons.TY_WHILE) {
                return token.valueLowerCase;
            }
            else if (token.type == Kons.TY_WEND) {
                return token.valueLowerCase
            }

            return '';
        }

        gakDikenal(token: IToken): string {
            let hasil: string = '';
            for (let i: number = 0; i < token.token.length; i++) {
                let token2: IToken = token.token[i];
                if (token2.value) {
                    hasil += token2.valueLowerCase
                }
                else {
                    hasil += this.terjemah(token2);
                }
            }

            return hasil;
        }

        kurungKotak(token: IToken): string {
            if (token.type == Kons.TY_KURUNG_KOSONG) {
                return "[]";
            }
            else if (token.type == Kons.TY_KURUNG_SINGLE) {
                return "[" + this.terjemah(token.token[1]) + "]";
            }
            else if (token.type == Kons.TY_KURUNG_ARG2) {
                return "[" + this.terjemah(token.token[0]) + "][" + this.terjemah(token.token[1]) + "]";
            }
            else if (token.type == Kons.TY_KURUNG_ARG) {
                throw Error('');
            }
            else {
                return "[" + this.terjemah(token.token[1]) + "]";
            }
        }

        kurung(token: IToken): string {
            return "(" + token.token[1] + ")";
        }

        fungsi(token: IToken): string {
            if (this.flDim) {
                return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
            }
            else {
                let ty: number = token.token[1].type;
                if (ty == Kons.TY_KURUNG_ARG2 || ty == Kons.TY_KURUNG_SINGLE) {
                    let nama: string = this.terjemah(token.token[0]);
                    let kurung: string = this.kurung(token.token[1]);
                    let kurungKotak: string = this.kurungKotak(token.token[1]);
                    let f1: string = nama + kurung;
                    let d1: string = nama + kurungKotak;
                    let res: String = '';

                    f1 = '(await ' + f1 + ')';
                    res = "?" + d1 + ":" + f1;

                    let f: string = "Array.isArray(nama)" + res;
                    return f;
                }
                else {
                    //fungsi
                    let nama: string = this.terjemah(token.token[0]);
                    let kurung: string = this.terjemah(token.token[1]);
                    return `(await ${nama + kurung})`;
                }
            }
        }
    }

    export var terj: Terjemah = new Terjemah();
}