"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse_1) {
        class Blitz {
            _dataStr = '';
            _token = [];
            _barisAr = [];
            lexer = new Lexer();
            grammar = new Grammar();
            _baris = new Baris();
            _kataKunci2 = [
                "After", "And", "Before", "Case", "Const", "Data", "Default", "Delete", "Dim", "Each", "Else",
                "ElseIf", "End", "EndIf", "Exit", "False", "Field", "First", "Float", "For",
                "Forever", "Function", "Global", "Gosub", "Goto", "If", "Insert", "Int", "Last", "Local",
                "Mod", "New", "Next", "Not", "Null", "Or", "Pi", "Read", "Repeat", "Restore", "Return",
                "Sar", "Select", "Shl", "Shr", "Step", "Str", "Then", "To", "True", "Type", "Until", "Wend",
                "While", "Xor", "Include"
            ];
            _kataKunci = [
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
            async load(file) {
                let hasil = await ha.comp.util.Ajax2('get', file, '');
                return hasil;
            }
            async mulai(file) {
                console.log('load file: ' + file);
                parse_1.parse.dataStr = await this.load(file);
                parse_1.parse.dataStr += ";";
                // console.log("lexer2");
                this.lexer.lexer();
                // console.log(this._token);
                this._baris.lines();
                console.log(this._barisAr.length);
                for (let i = 0; i < this._barisAr.length; i++) {
                    let barisObj = this._barisAr[i];
                    this.grammar.barisObj = barisObj;
                    this._baris.renderLines(barisObj.token);
                    this.grammar.grammar();
                }
            }
            // public get kataAr(): string[] {
            //     return this._kataAr;
            // }
            get kataKunci() {
                return this._kataKunci;
            }
            get dataStr() {
                return this._dataStr;
            }
            set dataStr(value) {
                this._dataStr = value;
            }
            get token() {
                return this._token;
            }
            get barisAr() {
                return this._barisAr;
            }
            get baris() {
                return this._baris;
            }
            get kataKunci2() {
                return this._kataKunci2;
            }
        }
        class Lexer {
            lexer() {
                while (parse_1.parse.dataStr.length > 0) {
                    if (this.getKeyword2()) { }
                    else if (this.getKeyword()) { }
                    else if (this.getId()) { }
                    else if (this.getLineNumb()) { }
                    else if (this.getNumber()) { }
                    else {
                        console.group('found unknown character');
                        console.log(parse_1.parse.dataStr.slice(0, 10));
                        console.log(parse_1.parse.dataStr.charCodeAt(0));
                        console.log(parse_1.parse.dataStr.charAt(0));
                        console.groupEnd();
                        // throw Error('');
                    }
                }
                console.log("ok");
                // console.log(parse.token);
            }
            getNumber() {
                let id = /^[0-9][0-9.]*/;
                let hsl = (parse_1.parse.dataStr.match(id));
                if (hsl) {
                    parse_1.parse.dataStr = parse_1.parse.dataStr.slice(hsl[0].length);
                    // console.debug('no: ' + hsl);
                    // this.sisa(str);
                    // parse.kataAr.push(hsl + '');
                    parse_1.parse.token.push({
                        token: hsl + '',
                        type: parse_1.Kons.TY_ANGKA
                    });
                    return true;
                }
                return false;
            }
            getKeyword2() {
                for (let i = 0; i < parse_1.parse.kataKunci.length; i++) {
                    let kata = parse_1.parse.kataKunci2[i];
                    if (parse_1.parse.dataStr.slice(0, kata.length) == kata) {
                        // console.debug('keyword: ' + kata);
                        // parse.kataAr.push(kata);
                        parse_1.parse.token.push({
                            token: kata,
                            type: parse_1.Kons.Ty_RES_WORD
                        });
                        parse_1.parse.dataStr = parse_1.parse.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getKeyword() {
                for (let i = 0; i < parse_1.parse.kataKunci.length; i++) {
                    let kata = parse_1.parse.kataKunci[i];
                    if (parse_1.parse.dataStr.slice(0, kata.length) == kata) {
                        // console.debug('keyword: ' + kata);
                        // parse.kataAr.push(kata);
                        parse_1.parse.token.push({
                            token: kata,
                            type: parse_1.Kons.TY_KATA
                        });
                        parse_1.parse.dataStr = parse_1.parse.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getId() {
                let id = /^[a-zA-Z_][a-zA-Z0-9_$%#]*/;
                let hsl = (parse_1.parse.dataStr.match(id));
                if (hsl) {
                    parse_1.parse.dataStr = parse_1.parse.dataStr.slice(hsl[0].length);
                    // console.debug('kata: ' + hsl);
                    // parse.kataAr.push(hsl + '')
                    parse_1.parse.token.push({
                        token: hsl + '',
                        type: parse_1.Kons.TY_KATA
                    });
                    return true;
                }
                return false;
            }
            getLineNumb() {
                if (parse_1.parse.dataStr.charAt(0) == ';') {
                    // console.log('ln');
                    parse_1.parse.dataStr = parse_1.parse.dataStr.slice(1, parse_1.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse_1.parse.token.push({
                        token: ';',
                        type: parse_1.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse_1.parse.dataStr.charCodeAt(0) == 13) {
                    // console.log('ln');
                    parse_1.parse.dataStr = parse_1.parse.dataStr.slice(1, parse_1.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse_1.parse.token.push({
                        token: ';',
                        type: parse_1.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse_1.parse.dataStr.charCodeAt(0) == 10) {
                    // console.log('ln');
                    parse_1.parse.dataStr = parse_1.parse.dataStr.slice(1, parse_1.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse_1.parse.token.push({
                        token: ';',
                        type: parse_1.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse_1.parse.dataStr.charCodeAt(0) == 9) {
                    // console.log('ln');
                    parse_1.parse.dataStr = parse_1.parse.dataStr.slice(1, parse_1.parse.dataStr.length);
                    // parse.kataAr.push(";");
                    parse_1.parse.token.push({
                        token: ';',
                        type: parse_1.Kons.TY_BARIS
                    });
                    return true;
                }
                return false;
            }
        }
        class Baris {
            ar = new Arr();
            lines() {
                let idx = 100000;
                let idxTerakhir = 0;
                // let ctr: number=
                console.log('lines');
                while (idx > 0) {
                    idx = this.getLineBreak(idxTerakhir);
                    // console.log('line break ' + idx);
                    if (idx > 0) {
                        let kiri = this.ar.tengah(parse_1.parse.token, idxTerakhir, idx);
                        kiri = this.bersih(kiri);
                        if (kiri.length > 0) {
                            parse_1.parse.barisAr.push({
                                n: 0,
                                token: kiri
                            });
                            // this.renderLines(kiri);
                        }
                        idxTerakhir = idx + 1;
                    }
                }
            }
            bersih(token) {
                // let ctr: number = 0;
                // console.group('bersih');
                while ((token.length > 0) && token[0].type == parse_1.Kons.TY_BARIS) {
                    token = token.slice(1);
                    // console.log(token);
                    // ctr++;
                    // if (ctr > 10) break;
                }
                while ((token.length > 0) && token[token.length - 1].type == parse_1.Kons.TY_BARIS) {
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
            valid(token) {
                token;
                return true;
            }
            renderLines(token) {
                let str = '';
                token.forEach((token) => {
                    str += token.token;
                });
                console.log(str);
            }
            getLineBreak(idx) {
                for (let i = idx; i < parse_1.parse.token.length; i++) {
                    if (parse_1.parse.token[i].type == parse_1.Kons.TY_BARIS) {
                        return i;
                    }
                }
                return -1;
            }
        }
        class Grammar {
            _ar = new Arr();
            _barisObj;
            stmt = new GrammarStmt();
            get ar() {
                return this._ar;
            }
            set ar(value) {
                this._ar = value;
            }
            get barisObj() {
                return this._barisObj;
            }
            set barisObj(value) {
                this._barisObj = value;
            }
            number() {
                return false;
            }
            isOp(token) {
                if (token.token == "+")
                    return true;
                if (token.token == "-")
                    return true;
                if (token.token == "*")
                    return true;
                if (token.token == "/")
                    return true;
                if (token.token == "%")
                    return true;
                return false;
            }
            isExp(token) {
                if (token.type == parse_1.Kons.TY_ANGKA)
                    return true;
                if (token.type == parse_1.Kons.Ty_TEKS)
                    return true;
                if (token.type == parse_1.Kons.TY_BINOP)
                    return true;
                if (token.type == parse_1.Kons.TY_KATA)
                    return true;
                if (token.type == parse_1.Kons.TY_PANGGIL_FUNGSI)
                    return true;
                return false;
            }
            isStmt(token) {
                if (token.type == parse_1.Kons.Ty_VAR_ASSIGNMENT)
                    return true;
                return false;
            }
            binop() {
                let ada = false;
                // console.group('binop:');
                // console.log(this._barisObj.token);
                for (let i = 0; i <= this._barisObj.token.length - 3; i++) {
                    // console.group('iterate ' + i);
                    let token1 = this._barisObj.token[i];
                    let token2 = this._barisObj.token[i + 1];
                    let token3 = this._barisObj.token[i + 2];
                    let tokenBaru;
                    // console.log(token1);
                    // console.log(token2);
                    // console.log(token3);
                    if (this.isExp(token1)) {
                        if (this.isOp(token2)) {
                            if (this.isExp(token3)) {
                                tokenBaru = {
                                    type: parse_1.Kons.TY_BINOP,
                                    token: []
                                };
                                let tokenIsi = tokenBaru.token;
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
            getQuote2(idx) {
                // console.group('get quote');
                for (let i = idx; i < this._barisObj.token.length; i++) {
                    let item = this._barisObj.token[i];
                    // console.log('token as string: ' + (item.token as string) + '/' + item.token.toString());
                    if (item.token == "\"") {
                        if (i == idx) {
                            // console.groupEnd();
                            return i;
                        }
                        else {
                            let itemSebelum = this._barisObj.token[i - 1];
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
            teks() {
                let idx = 0;
                let idx2 = 0;
                let l = 0;
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
                let tokenBaru = {
                    token: [],
                    type: parse_1.Kons.Ty_TEKS
                };
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
            hapusSpace() {
                // console.group('hapus space');
                for (let i = 0; i < this._barisObj.token.length; i++) {
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
            grammar() {
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
            modifier() {
                // console.group('modifier');
                // console.log('l ' + this._barisObj.token.length);
                for (let i = 0; i <= this._barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    let token1 = this._barisObj.token[i];
                    let token2 = this._barisObj.token[i + 1];
                    let nama = token1.token.toString();
                    if (nama == "Global" || (nama == "Const")) {
                        if (token2.type == parse_1.Kons.Ty_VAR_ASSIGNMENT) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse_1.Kons.Ty_VAR_ASSIGNMENT
                            };
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
            kurungKosong() {
                // console.group('kurung kosong');
                for (let i = 0; i <= this._barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    let token1 = this._barisObj.token[i];
                    let token2 = this._barisObj.token[i + 1];
                    if (token1.token.toString() == "(") {
                        if (token2.token.toString() == ")") {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse_1.Kons.TY_KURUNG_KOSONG
                            };
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
            panggilfungsi() {
                // console.group('panggil fungsi');
                for (let i = 0; i <= this._barisObj.token.length - 2; i++) {
                    // console.log('iterate ' + i);
                    let token1 = this._barisObj.token[i];
                    let token2 = this._barisObj.token[i + 1];
                    if (token1.type == parse_1.Kons.TY_KATA) {
                        if (token2.type == parse_1.Kons.TY_KURUNG_KOSONG) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse_1.Kons.TY_PANGGIL_FUNGSI
                            };
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
            argument() {
                // console.group('argument');
                for (let i = 0; i <= this._barisObj.token.length - 3; i++) {
                    // console.log('iterate ' + i);
                    let token1 = this._barisObj.token[i];
                    let token2 = this._barisObj.token[i + 1];
                    let token3 = this._barisObj.token[i + 2];
                    if (this.isExp(token1)) {
                        if (token2.token.toString() == ",") {
                            if (this.isExp(token3)) {
                                let tokenBaru = {
                                    token: [token1, token2, token3],
                                    type: parse_1.Kons.TY_ARGUMENT
                                };
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
            _grammar;
            set grammar(value) {
                this._grammar = value;
            }
            //2
            Baru() {
                return false;
            }
            varAssign() {
                console.group('var assign:');
                for (let i = 0; i <= this._grammar.barisObj.token.length - 3; i++) {
                    // console.log('iterate ' + i);
                    let token1 = this._grammar.barisObj.token[i];
                    let token2 = this._grammar.barisObj.token[i + 1];
                    let token3 = this._grammar.barisObj.token[i + 2];
                    if (token1.type == parse_1.Kons.TY_KATA) {
                        if (token2.token.toString() == '=') {
                            if (this._grammar.isExp(token3)) {
                                let tokenBaru = {
                                    token: [
                                        token1,
                                        token2,
                                        token3
                                    ],
                                    type: parse_1.Kons.Ty_VAR_ASSIGNMENT
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
            perintah() {
                console.group('perintah');
                if (this._grammar.barisObj.token.length < 2) {
                    console.log('gagal, terlalu pendek');
                    console.log(this._grammar.barisObj.token);
                    console.groupEnd();
                    return false;
                    ;
                }
                for (let i = 0; i <= this._grammar.barisObj.token.length - 2; i++) {
                    console.log('iterate ' + i);
                    let token1 = this._grammar.barisObj.token[i];
                    let token2 = this._grammar.barisObj.token[i + 1];
                    if (token1.type == parse_1.Kons.TY_KATA || (token1.type == parse_1.Kons.Ty_RES_WORD)) {
                        if (this._grammar.isExp(token2) || token2.type == parse_1.Kons.TY_ARGUMENT) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse_1.Kons.TY_PERINTAH
                            };
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
            kiri(token, idx) {
                return token.slice(0, idx);
            }
            kanan(token, idx) {
                return token.slice(idx + 1);
            }
            tengah(token, idx, idx2) {
                return token.slice(idx, idx2 + 1);
            }
            ganti(token, idx, idx2, token2) {
                let kiri = this.kiri(token, idx);
                let kanan = this.kanan(token, idx2);
                // console.group('ganti:');
                // console.log('token:');
                // console.log(token);
                // console.log('kiri:');
                // console.log(kiri);
                // console.log('kanan:');
                // console.log(kanan);
                let hasil = kiri.concat(token2).concat(kanan);
                // console.log('hasil:');
                // console.log(hasil);
                // console.groupEnd();
                return hasil;
            }
            hapus(token, idx) {
                let hasil;
                let kiri;
                let kanan;
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
        parse_1.parse = new Blitz();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
ha.parse.parse.mulai('./data/aristoids.bb');
// ha.parse.parse.mulai('./data/test.txt');
