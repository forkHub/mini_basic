namespace ha.parse {
    class Lexer {

        /**
         * data diambil dari data.datastr
         * data disimpan ke data.token
         * 
         */
        lexer(): void {
            console.group('lexer start');

            while (data.dataStr.length > 0) {
                if (this.keyWordDouble()) { }
                else if (this.getString()) { }
                else if (this.getComment()) { }
                else if (this.getTab()) { }
                else if (this.getOp()) { }
                // else if (this.getOp2()) { }
                else if (this.getKata()) { }
                else if (this.getNumber()) { }
                else if (this.getSymbol()) { }
                else {

                    let token: IToken = {
                        value: data.dataStr.charAt(0),
                        type: Kons.TY_SYMBOL,
                        valueLowerCase: data.dataStr.charAt(0).toLowerCase()
                    };
                    data.token.push(token);
                    data.dataStr = data.dataStr.slice(1);

                    console.group('found unknown character');
                    console.log(data.dataStr.slice(0, 10));
                    console.log(data.dataStr.charCodeAt(0));
                    console.log(data.dataStr.charAt(0));
                    console.groupEnd();
                }
            }

            //lower case
            data.token.forEach((token: IToken) => {
                token.valueLowerCase = '';
                if (token.value) {
                    token.valueLowerCase = token.value.toLocaleLowerCase();
                }
            })

            console.groupEnd();
        }

        getTab(): boolean {
            let char1: string;

            char1 = data.dataStr.charAt(0);

            if (char1 == "\t") {
                data.dataStr = data.dataStr.slice(1);
                return true;
            }

            return false;
        }

        getComment(): boolean {
            let char1: string;

            char1 = data.dataStr.charAt(0);

            if (char1 == ";") {
                data.dataStr = '';
                return true;
            }

            return false;
        }

        getString(): boolean {
            let char1: string;

            // console.log('get string');

            char1 = data.dataStr.charAt(0);

            if (char1 == "\"") {
                let idx: number = this.kutip2(data.dataStr);
                if (idx < 0) {
                    ha.comp.log.log("string tidak ketemu");
                    throw Error();
                }
                else {
                    // console.log('data.token: ');
                    // console.log(data.token);
                    // console.log('idx ' + idx);
                    // console.log('datastr ' + data.dataStr);
                    // console.log('hasil ' + data.dataStr.slice(0, idx + 1));

                    data.token.push({
                        value: data.dataStr.slice(0, idx + 1),
                        type: Kons.TY_TEKS
                    })

                    data.dataStr = data.dataStr.slice(idx + 1);

                    // console.log('sisa: ' + data.dataStr);

                    return true;
                }
            }

            return false;
        }

        getOp(): boolean {
            for (let i: number = 0; i < data.op.length; i++) {
                let kata: string = data.op[i];

                if (data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                    data.token.push({
                        // token: kata,
                        value: kata,
                        type: Kons.TY_OP
                    });
                    data.dataStr = data.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

        // getOp2(): boolean {
        //     for (let i: number = 0; i < data.op2.length; i++) {
        //         let kata: string = data.op2[i];

        //         if (data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
        //             data.token.push({
        //                 value: kata,
        //                 type: Kons.TY_OP2
        //             });
        //             data.dataStr = data.dataStr.slice(kata.length);
        //             return true;
        //         }
        //     }

        //     return false;
        // }

        getNumber(): boolean {
            let id: RegExp = /^[0-9]*\.?[0-9]+/;
            let hsl: RegExpMatchArray = (data.dataStr.match(id));
            let value: string;

            if (hsl) {
                value = hsl + '';
                // console.log('get number, value: ' + value + '|');
                // console.log('hsl');
                // console.log(hsl);

                // console.log(hsl.groups.length);
                // console.log(hsl);
                // console.log(hsl[0]);
                // console.log(hsl.groups[0].length);
                data.dataStr = data.dataStr.slice(value.length);
                // console.debug('no: ' + hsl);
                // this.sisa(str);
                // parse.kataAr.push(hsl + '');

                let token: IToken = {
                    value: value + '',
                    type: Kons.TY_ANGKA
                }
                data.token.push(token);
                // console.log('get number: ' + JSON.stringify(token));
                // console.log(hsl);
                // console.log(hsl[0]);

                // console.log(data.token);
                return true;
            }

            return false;
        }

        keyWordDouble(): boolean {

            for (let i: number = 0; i < data.kataKunciDouble.length; i++) {
                let kata: string = data.kataKunciDouble[i];

                if (data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {

                    //filter keyword
                    let token: IToken = {
                        value: kata,
                        type: Kons.TY_RES_WORD,
                        valueLowerCase: kata.toLowerCase()
                    }

                    let lc: string = kata.toLowerCase();

                    // if ("end type" == lc) {
                    //     token.type = Kons.TY_ENDTYPE;
                    // }
                    if (false) { }
                    else if ("end select" == lc) {
                        token.type = Kons.TY_END_SELECT
                    }
                    else if ("else if" == lc) {
                        token.type = Kons.TY_ELSE_IF
                    }
                    else {
                        console.warn("kata belum didefinisikan: " + lc);
                    }

                    data.token.push(token);
                    data.dataStr = data.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

        getSymbol(): boolean {

            for (let i: number = 0; i < data.symbol.length; i++) {
                let kata: string = data.symbol[i];

                if (data.dataStr.slice(0, kata.length).toLowerCase() == kata) {

                    let token: IToken = {
                        // token: kata,
                        value: kata,
                        type: Kons.TY_SYMBOL,
                        valueLowerCase: kata.toLowerCase()
                    };

                    data.token.push(token);


                    let lc: string = kata.toLowerCase();
                    if (":" == lc) {
                        token.type = Kons.TY_COLON
                    }
                    else if ("," == lc) {
                        token.type = Kons.TY_KOMA
                    }
                    else if ("(" == lc) {
                        token.type = Kons.TY_KURUNG_BUKA
                    }
                    else if (")" == lc) {
                        token.type = Kons.TY_KURUNG_TUTUP
                    }
                    else if ("=" == lc) {
                        token.type = Kons.TY_OP
                    }
                    else if ("\\" == lc) {
                        token.type = Kons.TY_BACK_SLASH
                    }
                    else if ("." == lc) {
                        token.type = Kons.TY_DOT
                    }
                    else if ("\t" == lc) {

                    }

                    data.dataStr = data.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

        getKata(): boolean {
            let id: RegExp = /^[a-zA-Z_][a-zA-Z0-9_$%#@]*/;
            let hsl: RegExpMatchArray = (data.dataStr.match(id));
            let value: string = '';

            if (hsl) {
                data.dataStr = data.dataStr.slice(hsl[0].length);

                value = hsl + '';

                if (value.charAt(value.length - 1) == "#") {
                    value = value.slice(0, value.length - 1);
                }

                let token: IToken = {
                    value: value,
                    type: Kons.TY_KATA,
                    valueLowerCase: value.toLowerCase()
                }

                data.token.push(token);

                if (data.kataKunci2.indexOf(token.valueLowerCase) >= 0) {
                    token.type = Kons.TY_RES_WORD;
                }

                let lc: string = token.valueLowerCase;
                if ("type" == lc) {
                    token.type = Kons.TY_TYPE;
                }
                else if ("field" == lc) {
                    token.type = Kons.TY_FIELD;
                }
                else if ("each" == lc) {
                    token.type = Kons.TY_EACH;
                }
                else if ("return" == lc) {
                    token.type = Kons.TY_RETURN;
                }
                else if ("false" == lc) {
                    token.type = Kons.TY_FALSE;
                }
                else if ("true" == lc) {
                    token.type = Kons.TY_TRUE
                }
                else if ("null" == lc) {
                    token.type = Kons.TY_NULL
                }
                else if ("end" == lc) {
                    token.type = Kons.TY_PERINTAH
                }
                else if ("case" == lc) {
                    token.type = Kons.TY_CASE
                }
                else if ("select" == lc) {
                    token.type = Kons.TY_SELECT
                }
                else if ("end select" == lc) {
                    token.type = Kons.TY_END_SELECT
                }
                else if ("dim" == lc) {
                    token.type = Kons.TY_DIM
                }
                else if ("new" == lc) {
                    token.type = Kons.TY_NEW
                }
                else if ("until" == lc) {
                    token.type = Kons.TY_UNTIL
                }
                else if ("global" == lc) {
                    token.type = Kons.TY_MODIFIER
                }
                else if ("local" == lc) {
                    token.type = Kons.TY_MODIFIER
                }
                else if ("const" == lc) {
                    token.type = Kons.TY_MODIFIER
                }
                else if ("for" == lc) {
                    token.type = Kons.TY_FOR
                }
                else if ("delete" == lc) {
                    token.type = Kons.TY_DELETE
                }
                else if ("else" == lc) {
                    token.type = Kons.TY_ELSE
                }

                //operator
                else if ("and" == lc) {
                    token.type = Kons.TY_OP
                }
                else if ("or" == lc) {
                    token.type = Kons.TY_OP
                }
                else if ("xor" == lc) {
                    token.type = Kons.TY_OP
                }
                else if ("mod" == lc) {
                    token.type = Kons.TY_OP
                }
                else if ("not" == lc) {
                    token.type = Kons.TY_NOT
                }
                else if ("shl" == lc) {
                    token.type = Kons.TY_NOT
                }
                else if ("shr" == lc) {
                    token.type = Kons.TY_NOT
                }
                else {
                }

                return true;
            }

            return false;
        }

        kutip2(str: string): number {
            let idx: number = 0;
            let mulai: number = 1;

            while (true) {
                idx = str.indexOf("\"", mulai);

                if (idx <= 0) return -1;
                if (idx >= 1) return idx;

                // let sebelum: string;

                // sebelum = str.charAt(idx - 1);
                // if (sebelum == '\\') {
                //     mulai = idx + 1;
                // }
                // else {
                //     return idx;
                // }
            }

        }
    }

    export var lexer: Lexer = new Lexer();
}
