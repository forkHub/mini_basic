namespace ha.parse {
    class Blitz {

        private _dataStr: string = '';
        private _token: Itoken[] = [];
        private _barisAr: IBarisObj[] = [];

        private lexer: Lexer = new Lexer();
        private grammar: Grammar = new Grammar();
        private _baris: Baris = new Baris();

        private _kataKunci2: string[] = [
            "After", "And", "Before", "Case", "Const", "Data", "Default", "Delete", "Dim", "Each", "Else",
            "ElseIf", "End", "EndIf", "Exit", "False", "Field", "First", "Float", "For",
            "Forever", "Function", "Global", "Gosub", "Goto", "If", "Insert", "Int", "Last", "Local",
            "Mod", "New", "Next", "Not", "Null", "Or", "Pi", "Read", "Repeat", "Restore", "Return",
            "Sar", "Select", "Shl", "Shr", "Step", "Str", "Then", "To", "True", "Type", "Until", "Wend",
            "While", "Xor", "Include"
        ];

        private _kataKunci: string[] = [
            //operator
            "=",
            "+",
            "/",
            "*",
            "-",
            "==",
            "<=",
            ">=",
            ">",
            "<",
            "!=",

            //symbol
            '"',
            "'",
            ".",
            "[",
            "{",
            "}",
            "]",
            ",",
            "(",
            ")",
            ":",
            "\\",

            //ignore
            " "
        ];

        async load(file: string): Promise<string> {
            let hasil: string = await ha.comp.util.Ajax2('get', file, '');
            return hasil;
        }

        async mulai(file: string): Promise<void> {
            console.log('load file: ' + file);
            parse.dataStr = await this.load(file);
            parse.dataStr += ";";

            // console.log("lexer2");
            this.lexer.lexer();
            // console.log(this._token);

            this._baris.lines();

            console.log(this._barisAr.length);

            for (let i: number = 0; i < this._barisAr.length; i++) {
                let barisObj: IBarisObj = this._barisAr[i];
                this.grammar.barisObj = barisObj;
                this._baris.renderLines(barisObj.token);
                this.grammar.grammar();
            }
        }

        // public get kataAr(): string[] {
        //     return this._kataAr;
        // }
        public get kataKunci(): string[] {
            return this._kataKunci;
        }
        public get dataStr(): string {
            return this._dataStr;
        }
        public set dataStr(value: string) {
            this._dataStr = value;
        }
        public get token(): Itoken[] {
            return this._token;
        }
        public get barisAr(): IBarisObj[] {
            return this._barisAr;
        }
        public get baris(): Baris {
            return this._baris;
        }
        public get kataKunci2(): string[] {
            return this._kataKunci2;
        }


    }

    class Lexer {
        lexer(): void {

            while (parse.dataStr.length > 0) {
                if (this.getKeyword2()) { }
                else if (this.getKeyword()) { }
                else if (this.getId()) { }
                else if (this.getLineNumb()) { }
                else if (this.getNumber()) { }
                else {
                    console.group('found unknown character');
                    console.log(parse.dataStr.slice(0, 10));
                    console.log(parse.dataStr.charCodeAt(0));
                    console.log(parse.dataStr.charAt(0));
                    console.groupEnd();
                    // throw Error('');
                }
            }

            console.log("ok");
            // console.log(parse.token);
        }

        getNumber(): boolean {
            let id: RegExp = /^[0-9][0-9.]*/;
            let hsl: RegExpMatchArray = (parse.dataStr.match(id));

            if (hsl) {
                parse.dataStr = parse.dataStr.slice(hsl[0].length);
                // console.debug('no: ' + hsl);
                // this.sisa(str);
                // parse.kataAr.push(hsl + '');
                parse.token.push({
                    token: hsl + '',
                    type: Kons.TY_ANGKA
                });
                return true;
            }

            return false;
        }

        getKeyword2(): boolean {

            for (let i: number = 0; i < parse.kataKunci.length; i++) {
                let kata: string = parse.kataKunci2[i];

                if (parse.dataStr.slice(0, kata.length) == kata) {
                    // console.debug('keyword: ' + kata);
                    // parse.kataAr.push(kata);
                    parse.token.push({
                        token: kata,
                        type: Kons.Ty_RES_WORD
                    });
                    parse.dataStr = parse.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

        getKeyword(): boolean {

            for (let i: number = 0; i < parse.kataKunci.length; i++) {
                let kata: string = parse.kataKunci[i];

                if (parse.dataStr.slice(0, kata.length) == kata) {
                    // console.debug('keyword: ' + kata);
                    // parse.kataAr.push(kata);
                    parse.token.push({
                        token: kata,
                        type: Kons.TY_KATA
                    });
                    parse.dataStr = parse.dataStr.slice(kata.length);
                    return true;
                }
            }

            return false;
        }

        getId(): boolean {
            let id: RegExp = /^[a-zA-Z_][a-zA-Z0-9_$%#]*/;
            let hsl: RegExpMatchArray = (parse.dataStr.match(id));

            if (hsl) {
                parse.dataStr = parse.dataStr.slice(hsl[0].length);
                // console.debug('kata: ' + hsl);
                // parse.kataAr.push(hsl + '')
                parse.token.push({
                    token: hsl + '',
                    type: Kons.TY_KATA
                });
                return true;
            }

            return false;
        }

        getLineNumb(): boolean {
            if (parse.dataStr.charAt(0) == ';') {
                // console.log('ln');
                parse.dataStr = parse.dataStr.slice(1, parse.dataStr.length);
                // parse.kataAr.push(";");
                parse.token.push({
                    token: ';',
                    type: Kons.TY_BARIS
                })
                return true;
            }

            if (parse.dataStr.charCodeAt(0) == 13) {
                // console.log('ln');
                parse.dataStr = parse.dataStr.slice(1, parse.dataStr.length);
                // parse.kataAr.push(";");
                parse.token.push({
                    token: ';',
                    type: Kons.TY_BARIS
                })
                return true;
            }

            if (parse.dataStr.charCodeAt(0) == 10) {
                // console.log('ln');
                parse.dataStr = parse.dataStr.slice(1, parse.dataStr.length);
                // parse.kataAr.push(";");
                parse.token.push({
                    token: ';',
                    type: Kons.TY_BARIS
                });
                return true;
            }

            if (parse.dataStr.charCodeAt(0) == 9) {
                // console.log('ln');
                parse.dataStr = parse.dataStr.slice(1, parse.dataStr.length);
                // parse.kataAr.push(";");
                parse.token.push({
                    token: ';',
                    type: Kons.TY_BARIS
                });
                return true;
            }

            return false;
        }
    }

    class Baris {
        private ar: Arr = new Arr();

        lines(): void {
            let idx: number = 100000;
            let idxTerakhir: number = 0;
            // let ctr: number=

            console.log('lines');

            while (idx > 0) {
                idx = this.getLineBreak(idxTerakhir);
                // console.log('line break ' + idx);

                if (idx > 0) {
                    let kiri: Itoken[] = this.ar.tengah(parse.token, idxTerakhir, idx);
                    kiri = this.bersih(kiri);

                    if (kiri.length > 0) {
                        parse.barisAr.push({
                            n: 0,
                            token: kiri
                        });
                        // this.renderLines(kiri);
                    }

                    idxTerakhir = idx + 1;
                }
            }
        }

        bersih(token: Itoken[]): Itoken[] {
            // let ctr: number = 0;

            // console.group('bersih');
            while ((token.length > 0) && token[0].type == Kons.TY_BARIS) {
                token = token.slice(1);
                // console.log(token);
                // ctr++;
                // if (ctr > 10) break;
            }

            while ((token.length > 0) && token[token.length - 1].type == Kons.TY_BARIS) {
                token = token.slice(0, token.length - 1);
                // console.log(token);
                // ctr++;
                // if (ctr > 10) break;
            }

            // console.log('hasil');
            // console.log(token);
            // console.groupEnd();

            return token;
        }

        valid(token: Itoken[]): boolean {
            token;
            return true;
        }

        renderLines(token: Itoken[]): void {
            let str: string = '';
            token.forEach((token: Itoken) => {
                str += token.token;
            });

            console.log(str);
        }

        getLineBreak(idx: number): number {
            for (let i: number = idx; i < parse.token.length; i++) {
                if (parse.token[i].type == Kons.TY_BARIS) {
                    return i;
                }
            }

            return -1;
        }
    }

    class Grammar {
        private _ar: Arr = new Arr();
        private _barisObj: IBarisObj;
        private stmt: GrammarStmt = new GrammarStmt();

        public get ar(): Arr {
            return this._ar;
        }
        public set ar(value: Arr) {
            this._ar = value;
        }
        public get barisObj(): IBarisObj {
            return this._barisObj;
        }
        public set barisObj(value: IBarisObj) {
            this._barisObj = value;
        }

        number(): boolean {
            return false;
        }

        isOp(token: Itoken): boolean {
            if (token.token == "+") return true;
            if (token.token == "-") return true;
            if (token.token == "*") return true;
            if (token.token == "/") return true;
            if (token.token == "%") return true;
            return false;
        }

        isExp(token: Itoken): boolean {
            if (token.type == Kons.TY_ANGKA) return true;
            if (token.type == Kons.Ty_TEKS) return true;
            if (token.type == Kons.TY_BINOP) return true;
            if (token.type == Kons.TY_KATA) return true;
            if (token.type == Kons.TY_PANGGIL_FUNGSI) return true;

            return false;
        }

        isStmt(token: Itoken): boolean {
            if (token.type == Kons.Ty_VAR_ASSIGNMENT) return true;
            return false;
        }

        binop(): boolean {
            let ada: boolean = false;

            // console.group('binop:');
            // console.log(this._barisObj.token);

            for (let i: number = 0; i <= this._barisObj.token.length - 3; i++) {
                // console.group('iterate ' + i);

                let token1: Itoken = this._barisObj.token[i];
                let token2: Itoken = this._barisObj.token[i + 1];
                let token3: Itoken = this._barisObj.token[i + 2];
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
                            // console.log(this._barisObj.token);

                            this._barisObj.token = this.ar.ganti(this._barisObj.token, i, i + 2, tokenBaru);

                            // console.log('setelah:');
                            // console.log(this._barisObj.token);

                            ada = true;
                        }
                    }
                }

                // console.groupEnd();

            }

            // console.groupEnd();
            return ada;
        }

        getQuote2(idx: number): number {
            // console.group('get quote');

            for (let i: number = idx; i < this._barisObj.token.length; i++) {
                let item: Itoken = this._barisObj.token[i];
                // console.log('token as string: ' + (item.token as string) + '/' + item.token.toString());
                if ((item.token as string) == "\"") {
                    if (i == idx) {
                        // console.groupEnd();
                        return i;
                    } else {
                        let itemSebelum: Itoken = this._barisObj.token[i - 1];
                        if (itemSebelum.token.toString() != "\\") {
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
            // console.log(this._barisObj.token);

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
                type: Kons.Ty_TEKS
            }

            tokenBaru.token = this.ar.tengah(this._barisObj.token, idx, idx2);

            // console.log('teks baru:');
            // parse.baris.renderLines(tokenBaru.token);

            // console.log('sebelum:');
            // console.log(this._barisObj.token);

            this._barisObj.token = this.ar.ganti(this._barisObj.token, idx, idx2, tokenBaru);

            // console.log('setelah:');
            // console.log(this._barisObj.token);

            // console.groupEnd();

            return true;
        }

        hapusSpace(): boolean {
            // console.group('hapus space');

            for (let i: number = 0; i < this._barisObj.token.length; i++) {

                if (this._barisObj.token[i].token.toString() == ' ') {

                    // console.log('idx ' + i);

                    // console.log('sebelum:');
                    // console.log(this._barisObj.token);

                    this._barisObj.token = this.ar.hapus(this._barisObj.token, i);

                    // console.log('sesudah:');
                    // console.log(this._barisObj.token);

                    // console.groupEnd();
                    return true;
                }

            }

            // console.groupEnd();
            return false;
        }

        grammar(): void {
            console.group('grammar');
            this.stmt.grammar = this;
            // console.log(this._barisObj);

            while (this._barisObj.token.length > 1) {
                //BASIC
                if (this.teks()) {
                    // console.log('reset');
                }
                else if (this.hapusSpace()) {
                    // console.log('reset');
                }
                else if (this.kurungKosong()) {
                    // console.log('reset');
                }
                else if (this.argument()) {
                    // console.log('reset');
                }

                //EXP
                else if (this.binop()) {
                    // console.log('reset');
                }
                else if (this.panggilfungsi()) {

                }

                //STMT
                else if (this.stmt.perintah()) {
                    console.log('reset');
                }
                else if (this.stmt.varAssign()) {
                    console.log('reset');
                }
                else if (this.modifier()) {
                    console.log('reset');
                }
                else {
                    console.log("error:");
                    console.log(this._barisObj.token);
                    throw Error('');
                }
            }

            console.groupEnd();
        }

        modifier(): boolean {
            // console.group('modifier');
            // console.log('l ' + this._barisObj.token.length);

            for (let i: number = 0; i <= this._barisObj.token.length - 2; i++) {
                // console.log('iterate ' + i);

                let token1: Itoken = this._barisObj.token[i];
                let token2: Itoken = this._barisObj.token[i + 1];
                let nama: string = token1.token.toString();

                if (nama == "Global" || (nama == "Const")) {
                    if (token2.type == Kons.Ty_VAR_ASSIGNMENT) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.Ty_VAR_ASSIGNMENT
                        }

                        // console.log('sebelum:')
                        // console.log(this._barisObj.token);

                        this._barisObj.token = this.ar.ganti(this._barisObj.token, i, i + 1, tokenBaru);

                        // console.log('sesudah:');
                        // console.log(this._barisObj.token);

                        // console.groupEnd();
                        return true;
                    }
                    // else {
                    //     console.log('gagal: ' + token2.type);
                    // }
                }
                // else {
                //     console.log('gagal: ' + token1.token.toString() + '/' + nama);
                // }

            }

            // console.groupEnd();
            return false;
        }

        //2
        kurungKosong(): boolean {
            // console.group('kurung kosong');

            for (let i: number = 0; i <= this._barisObj.token.length - 2; i++) {
                // console.log('iterate ' + i);

                let token1: Itoken = this._barisObj.token[i];
                let token2: Itoken = this._barisObj.token[i + 1];

                if (token1.token.toString() == "(") {
                    if (token2.token.toString() == ")") {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_KURUNG_KOSONG
                        }

                        // console.log('sebelum:')
                        console.log(this._barisObj.token);

                        this._barisObj.token = this.ar.ganti(this._barisObj.token, i, i + 1, tokenBaru);

                        // console.log('sesudah:');
                        console.log(this._barisObj.token);

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

        //2
        panggilfungsi(): boolean {
            // console.group('panggil fungsi');

            for (let i: number = 0; i <= this._barisObj.token.length - 2; i++) {
                // console.log('iterate ' + i);

                let token1: Itoken = this._barisObj.token[i];
                let token2: Itoken = this._barisObj.token[i + 1];

                if (token1.type == Kons.TY_KATA) {
                    if (token2.type == Kons.TY_KURUNG_KOSONG) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_PANGGIL_FUNGSI
                        }

                        // console.log('sebelum:')
                        // console.log(this._barisObj.token);

                        this._barisObj.token = this.ar.ganti(this._barisObj.token, i, i + 1, tokenBaru);

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

        argument(): boolean {
            // console.group('argument');

            for (let i: number = 0; i <= this._barisObj.token.length - 3; i++) {
                // console.log('iterate ' + i);

                let token1: Itoken = this._barisObj.token[i];
                let token2: Itoken = this._barisObj.token[i + 1];
                let token3: Itoken = this._barisObj.token[i + 2];

                if (this.isExp(token1)) {
                    if (token2.token.toString() == ",") {
                        if (this.isExp(token3)) {

                            let tokenBaru: Itoken = {
                                token: [token1, token2, token3],
                                type: Kons.TY_ARGUMENT
                            }

                            // console.log('sebelum:')
                            console.log(this._barisObj.token);

                            this._barisObj.token = this.ar.ganti(this._barisObj.token, i, i + 2, tokenBaru);

                            // console.log('sesudah:');
                            console.log(this._barisObj.token);

                            // console.groupEnd();
                            return true;
                        }
                        // else {
                        //     console.log('gagal: ' + token2.type);
                        // }
                    }
                    // else {
                    //     console.log('gagal: ' + token2.token.toString());
                    // }

                }
                // else {
                //     console.log("gagal: " + token1.type)
                // }
            }

            // console.groupEnd();
            return false;
        }

    }

    class GrammarStmt {
        private _grammar: Grammar;
        public set grammar(value: Grammar) {
            this._grammar = value;
        }

        //2
        Baru(): boolean {
            return false;
        }

        varAssign(): boolean {
            console.group('var assign:');

            for (let i: number = 0; i <= this._grammar.barisObj.token.length - 3; i++) {
                // console.log('iterate ' + i);
                let token1: Itoken = this._grammar.barisObj.token[i];
                let token2: Itoken = this._grammar.barisObj.token[i + 1];
                let token3: Itoken = this._grammar.barisObj.token[i + 2];

                if (token1.type == Kons.TY_KATA) {
                    if (token2.token.toString() == '=') {
                        if (this._grammar.isExp(token3)) {
                            let tokenBaru: Itoken = {
                                token: [
                                    token1,
                                    token2,
                                    token3
                                ],
                                type: Kons.Ty_VAR_ASSIGNMENT
                            };

                            // console.log('token:');
                            // console.log(tokenBaru);

                            // console.log('sebelum:');
                            // console.log(this._barisObj.token);

                            this._grammar.barisObj.token = this._grammar.ar.ganti(this._grammar.barisObj.token, i, i + 2, tokenBaru);

                            // console.log('sesudah:');
                            // console.log(this._barisObj.token);

                            console.groupEnd();
                            return true;
                        }
                        else {
                            // console.log('failed: 3 ' + this.isExp(token3));
                        }
                    }
                    else {
                        // console.log('failed: token 2 ' + token2.token.toString());
                    }
                }
                else {
                    // console.log('failed: token1 type: ' + token1.type);
                }

                // console.groupEnd();
            }

            console.groupEnd();
            return false;
        }

        perintah(): boolean {
            console.group('perintah');

            if (this._grammar.barisObj.token.length < 2) {
                console.log('gagal, terlalu pendek');
                console.log(this._grammar.barisObj.token);
                console.groupEnd();
                return false;;
            }

            for (let i: number = 0; i <= this._grammar.barisObj.token.length - 2; i++) {
                console.log('iterate ' + i);

                let token1: Itoken = this._grammar.barisObj.token[i];
                let token2: Itoken = this._grammar.barisObj.token[i + 1];

                if (token1.type == Kons.TY_KATA || (token1.type == Kons.Ty_RES_WORD)) {
                    if (this._grammar.isExp(token2) || token2.type == Kons.TY_ARGUMENT) {

                        let tokenBaru: Itoken = {
                            token: [token1, token2],
                            type: Kons.TY_PERINTAH
                        }

                        // console.log('sebelum:')
                        // console.log(this._barisObj.token);

                        this._grammar.barisObj.token = this._grammar.ar.ganti(this._grammar.barisObj.token, i, i + 1, tokenBaru);

                        // console.log('sesudah:');
                        // console.log(this._barisObj.token);

                        console.groupEnd();
                        return true;
                    }
                    else {
                        console.log('gagal: ' + token2.type);
                    }
                }
                else {
                    console.log('gagal: ' + token1.type);
                }

            }

            console.groupEnd();
            return false;
        }

    }

    class Arr {
        kiri(token: Itoken[], idx: number): Itoken[] {
            return token.slice(0, idx);
        }

        kanan(token: Itoken[], idx: number): Itoken[] {
            return token.slice(idx + 1);
        }

        tengah(token: Itoken[], idx: number, idx2: number): Itoken[] {
            return token.slice(idx, idx2 + 1);
        }

        ganti(token: Itoken[], idx: number, idx2: number, token2: Itoken): Itoken[] {
            let kiri: Itoken[] = this.kiri(token, idx)
            let kanan: Itoken[] = this.kanan(token, idx2);

            // console.group('ganti:');
            // console.log('token:');
            // console.log(token);
            // console.log('kiri:');
            // console.log(kiri);
            // console.log('kanan:');
            // console.log(kanan);

            let hasil: Itoken[] = kiri.concat(token2).concat(kanan);

            // console.log('hasil:');
            // console.log(hasil);
            // console.groupEnd();

            return hasil;
        }

        hapus(token: Itoken[], idx: number): Itoken[] {
            let hasil: Itoken[];
            let kiri: Itoken[];
            let kanan: Itoken[];

            // console.group('hapus');

            kiri = this.kiri(token, idx);
            kanan = this.kanan(token, idx);

            // console.log('kiri:');
            // console.log(kiri);
            // console.log('kanan:');
            // console.log(kanan);

            hasil = kiri.concat(kanan);

            // console.log('hasil');

            // console.groupEnd();

            return hasil;
        }

    }

    export var parse: Blitz = new Blitz();
}


ha.parse.parse.mulai('./data/aristoids.bb');
// ha.parse.parse.mulai('./data/test.txt');
