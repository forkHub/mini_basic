namespace ha.parse {
    class Lexer {

        lexer(): void {
            console.group('lexer start');

            while (data.dataStr.length > 0) {
                if (this.getKeyword3()) { }
                if (this.getOp()) { }
                else if (this.getOp2()) { }
                else if (this.getCmd()) { }
                else if (this.getKata()) { }
                else if (this.getLineBreak()) { }
                else if (this.getNumber()) { }
                else if (this.getSymbol()) { }
                else {
                    console.group('found unknown character');
                    console.log(data.dataStr.slice(0, 10));
                    console.log(data.dataStr.charCodeAt(0));
                    console.log(data.dataStr.charAt(0));
                    console.groupEnd();
                    // break;
                    throw Error('');
                }
            }

            //
            data.token.forEach((token: IToken) => {
                token.valueLowerCase = '';
                if (token.value) {
                    token.valueLowerCase = token.value.toLocaleLowerCase();
                }
            })

            console.groupEnd();
            // console.log(data.token);
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

        getOp2(): boolean {
            for (let i: number = 0; i < data.op2.length; i++) {
                let kata: string = data.op2[i];

                if (data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                    data.token.push({
                        value: kata,
                        type: Kons.TY_OP2
                    });
                    data.dataStr = data.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

        //TODO: dihapus
        getCmd(): boolean {
            for (let i: number = 0; i < data.cmd.length; i++) {
                let kata: string = data.cmd[i];

                if (data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                    data.token.push({
                        value: kata,
                        type: Kons.TY_KATA
                    });
                    data.dataStr = data.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

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

        getComment(): boolean {
            if (data.dataStr.slice(0, 2) == '//') {
                data.dataStr = '';
                return true;
            }

            return false;
        }

        getKeyword3(): boolean {

            for (let i: number = 0; i < data.kataKunci3.length; i++) {
                let kata: string = data.kataKunci3[i];

                if (data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {

                    //filter keyword
                    let token: IToken = {
                        value: kata,
                        type: Kons.TY_RES_WORD,
                        valueLowerCase: kata.toLowerCase()
                    }

                    let lc: string = kata.toLowerCase();
                    if ("type" == lc) {
                        token.type = Kons.TY_TYPE;
                    }
                    if ("field" == lc) {
                        token.type = Kons.TY_FIELD;
                    }
                    else if ("end type" == lc) {
                        token.type = Kons.TY_ENDTYPE;
                    }
                    else if ("each" == lc) {
                        //TODO:
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
                    // console.debug('keyword: ' + kata);
                    // parse.kataAr.push(kata);
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
                // console.debug('kata: ' + hsl);
                // parse.kataAr.push(hsl + '')

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
                    // if (token.valueLowerCase == "if") {
                    // console.log(token.valueLowerCase);
                    // throw Error('');
                    token.type = Kons.TY_RES_WORD;
                    // }
                }

                //TODO: reserved word
                let lc: string = token.valueLowerCase;
                if ("type" == lc) {
                    token.type = Kons.TY_TYPE;
                }
                else if ("field" == lc) {
                    token.type = Kons.TY_FIELD;
                }
                else if ("end type" == lc) {
                    token.type = Kons.TY_ENDTYPE;
                }
                else if ("each" == lc) {
                    //TODO:
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
                else {
                    //console.warn("kata belum didefinisikan: " + lc);
                }

                return true;
            }

            return false;
        }

        getLineBreak(): boolean {
            // if (data.dataStr.charAt(0) == ';') {
            //     // console.log('ln');
            //     data.dataStr = data.dataStr.slice(1, data.dataStr.length);
            //     // parse.kataAr.push(";");
            //     data.token.push({
            //         // token: ';',
            //         value: '',
            //         type: Kons.TY_BARIS
            //     })
            //     return true;
            // }

            if (data.dataStr.charCodeAt(0) == 13) {
                // console.log('ln');
                data.dataStr = data.dataStr.slice(1, data.dataStr.length);
                // parse.kataAr.push(";");
                data.token.push({
                    // token: ';',
                    value: '\n',
                    type: Kons.TY_BARIS
                })
                return true;
            }

            if (data.dataStr.charCodeAt(0) == 10) {
                // console.log('ln');
                data.dataStr = data.dataStr.slice(1, data.dataStr.length);
                // parse.kataAr.push(";");
                data.token.push({
                    // token: ';', 
                    value: '\n',
                    type: Kons.TY_BARIS
                });
                return true;
            }

            if (data.dataStr.charCodeAt(0) == 9) {
                // console.log('ln');
                data.dataStr = data.dataStr.slice(1, data.dataStr.length);
                // parse.kataAr.push(";");
                data.token.push({
                    // token: ';',
                    value: '\n',
                    type: Kons.TY_BARIS
                });
                return true;
            }

            return false;
        }
    }

    export var lexer: Lexer = new Lexer();
}
