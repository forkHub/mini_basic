namespace ha.parse {
    class Terjemah {

        terjemah(token: IToken): string {
            console.log("terjemah");
            console.log(token);
            // let b: boolean = false;

            if (false) {
                return '';
            }
            // else if (token.type == Kons.TY_VAR_ASSIGNMENT) {
            //     return this.varAssign(token);
            // }
            else if (token.type == Kons.TY_ANGKA) {
                return token.value;
            }
            else if (token.type == Kons.TY_ARG) {
                return this.terjemah(token.token[0]) + ',' + this.terjemah(token.token[2]);
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
                else if (token.value.toLowerCase() == "cls") {
                    return "Cls()";
                }
                else {
                    return token.value;
                }
            }
            else if (token.type == Kons.TY_BINOP) {
                if (token.token.length == 2) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                }
                else if (token.token.length == 3) {
                    return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " " + this.terjemah(token.token[2]);
                }
                else {
                    throw new Error();
                }
            }
            else if (token.type == Kons.TY_TEKS) {
                return this.string(token.token);
            }
            else if (token.type == Kons.TY_BARIS) {
                return '';
            }
            else if (token.type == Kons.TY_FOR_DEC) {
                //TODO:
                //for kata = exp to exp2 => for (let kata = exp; kata <= exp2; kata++) {
                //0   1    2 3   4  5
                // let hasil: string = '';
                // hasil += 'for (let ' + this.terjemah(token.token[1]) + " = " + this.terjemah(token.token[3]) + ";";
                // hasil += ' ' + this.terjemah(token.token[1]) + " <= " + this.terjemah(token.token[5]) + ";";
                // hasil += ' ' + this.terjemah(token.token[1]) + '++) {'
                // return hasil;
                return '';
            }
            else if (token.type == Kons.TY_FOR_STEP) {
                let hasil: string = '';
                return hasil;
            }
            else if (token.type == Kons.TY_IF_EXP) {
                //if binop then => if binop {
                return 'if (' + this.terjemah(token.token[1]) + ") {";
            }
            else if (token.type == Kons.TY_IF_THEN_P) {
                //if perintah
                //0  1
                return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " }";
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
            // else if (token.type == Kons.TY_KURUNG_ISI) {
            //     return this.terjemah(token.token[0]) + this.terjemah(token.token[1]) + this.terjemah(token.token[2]);
            // }
            else if (token.type == Kons.TY_KURUNG_KOSONG) {
                return "()";
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
                return token.value;
            }
            else if (token.type == Kons.TY_PANGGIL_FUNGSI) {
                let hsl: string = '';

                hsl = this.terjemah(token.token[0]) + this.terjemah(token.token[1]);

                if (data.config.awaitFl) {
                    hsl = hsl.trim();
                    hsl = 'await ' + hsl;
                }

                return hsl;
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
            else if (token.type == Kons.TY_WEND) {
                return this.wend(token);
            }
            else if (token.type == Kons.TY_SYMBOL) {
                if (token.value == ".") return token.value;
                return token.value + " ";
            }
            else if (token.type == Kons.TY_IF_ELSE_THEN_P) {
                return "} else if " + " (" + this.terjemah(token.token[1]) + ") " + " { ";
            }
            else if (token.type == Kons.TY_ELSE_THEN) {
                //TODO:
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
            else if (token.type == Kons.TY_ARG2) {
                //TODO;

                return '';

            }
            else if (token.type == Kons.TY_EXP) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_IF_THEN) {
                //TODO:
                return '';
            }
            // else if (token.type == Kons.TY_BINOP_EQ) {
            //     //TODO:
            //     return '';
            // }
            else if (token.type == Kons.TY_IF_THEN_P2) {
                return '';
            }
            else if (token.type == Kons.TY_TYPE_NEW_INST) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_IF_EXP_P) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_MODIFIER) {
                //TODO:
                return '';
            }
            else if (token.type == Kons.TY_KURUNG_ARG2) {
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
                //TODO:
                return '';
            }

            else {
                console.log(token);
                console.log('token type ' + token.type);
                throw Error();
            }
        }

        string(token: IToken[]): string {
            let hasil: string = '';
            token.forEach((item: IToken) => {
                hasil += item.value;
            });
            return " " + hasil;
        }

        wend(token: IToken): string {
            let hasil: string = '';

            hasil += token.token[0].value.toLowerCase();
            hasil += " (" + this.terjemah(token.token[1]) + ") {";

            return hasil;
        }

        varAssign(token: IToken): string {
            // let hasil: string = '';
            if (token.token.length == 2) {
                let token1: string = token.token[0].value.toLowerCase();
                let token2: string = this.terjemah(token.token[1]);

                if (token1 == "global") {
                    return "window." + token2;
                }
                else if (token1 == "const") {
                    return "const " + token2;
                }
                else {
                    console.log('token 1 ' + token1);
                    console.log('token 2 ' + token2);
                    throw Error("");
                }
            }
            else if (token.token.length == 3) {
                return this.terjemah(token.token[0]) + "=" + this.terjemah(token.token[2]);
            }
            else {
                throw Error('');
            }
        }
    }

    export var terj: Terjemah = new Terjemah();
}