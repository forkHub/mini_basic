namespace ha.parse {
    class Terjemah {

        private flDim: boolean = false;
        private flBinopExp: boolean = false;

        terjemah(token: IToken): string {
            let hasil: string = '';

            console.log("terjemah");
            console.log(token);

            hasil = this.langsung(token);
            if (hasil != '') return hasil;

            hasil = this.exp(token);
            if (hasil != '') return hasil;

            hasil = this.stmt(token);
            if (hasil != '') return hasil;

            console.log(token);
            console.log('token type ' + token.type);
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
                //TODO:
                return '';
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
                return this.terjemah(token.token[0]) + this.terjemah(token.token[2]);
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
            else if (token.type == Kons.TY_FOR_DEC) {
                return '';
            }
            else if (token.type == Kons.TY_FOR_STEP) {
                let hasil: string = '';
                return hasil;
            }
            else if (token.type == Kons.TY_IF_EXP) {
                let hasil: string = '';

                //TODO:

                return hasil;
            }
            else if (token.type == Kons.TY_PERINTAH) {
                let hsl: string = '';

                if (token.token.length == 2) {
                    //if global
                    if (token.token[0].value && token.token[0].value.toLowerCase() == 'global') {
                        return 'window.' + this.terjemah(token.token[1]) + ';';
                    }
                    else {
                        hsl = this.terjemah(token.token[0]) + "(" + this.terjemah(token.token[1]) + ")";
                    }
                }
                else if (token.token.length == 1) {
                    if (token.value && token.value.toLowerCase() == 'wend') {
                        return "}";
                    }
                    else {
                        hsl = this.terjemah(token.token[0]) + "()";
                    }
                }
                else {
                    throw Error("");
                }

                if (data.config.awaitFl) {
                    hsl = hsl.trim();
                    if (hsl.slice(0, 6) == 'return') {

                    }
                    else {
                        hsl = 'await ' + hsl;
                    }
                }

                return hsl;
            }
            else if (token.type == Kons.TY_WEND_STMT) {
                // return this.wend(token);
            }
            else if (token.type == Kons.TY_ELSE_THEN) {
                return '';
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
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_IF_THEN) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_MODIFIER) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_DIM_DEC) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_DIM_ASSINMENT) {
                //TODO:
                return '';
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

            return '';
        }

        kurungKotak(token: IToken): string {
            return "[" + this.terjemah(token.token[1]) + "]";
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