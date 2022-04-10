"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Aturan {
            _daftar = [];
            get daftar() {
                return this._daftar;
            }
        }
        parse.aturan = new Aturan();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Baris {
            pecahBaris() {
                let idx = 100000;
                let idxTerakhir = 0;
                console.group('lines');
                while (idx >= 0) {
                    idx = this.getLineBreak(idxTerakhir);
                    if (idx >= 0) {
                        let kiri = parse.ar.ambilTengah(parse.data.token, idxTerakhir, idx);
                        kiri = this.bersih(kiri);
                        if (kiri.length > 0) {
                            parse.data.barisAr.push({
                                n: 0,
                                token: kiri,
                                baris: parse.baris.getLine(kiri)
                            });
                        }
                        idxTerakhir = idx + 1;
                    }
                }
                console.groupEnd();
            }
            bersih(tokenAr) {
                while ((tokenAr.length > 0) && tokenAr[0].type == parse.Kons.TY_BARIS) {
                    tokenAr = tokenAr.slice(1);
                }
                while ((tokenAr.length > 0) && tokenAr[tokenAr.length - 1].type == parse.Kons.TY_BARIS) {
                    tokenAr = tokenAr.slice(0, tokenAr.length - 1);
                }
                if (!tokenAr)
                    tokenAr = [];
                return tokenAr;
            }
            hapusComment(tokenAr) {
                let idx = -1;
                for (let i = 0; i < tokenAr.length; i++) {
                    if (tokenAr[i].valueLowerCase == ";") {
                        idx = i;
                        break;
                    }
                }
                if (idx >= 0) {
                    tokenAr = tokenAr.slice(0, idx);
                }
                if (!tokenAr)
                    tokenAr = [];
                return tokenAr;
            }
            valid(token) {
                token;
                return true;
            }
            getLine(token) {
                let str = '';
                token.forEach((token) => {
                    str += token.value;
                });
                return str;
            }
            getLineBreak(idx) {
                for (let i = idx; i < parse.data.token.length; i++) {
                    if (parse.data.token[i].type == parse.Kons.TY_BARIS) {
                        return i;
                    }
                }
                return -1;
            }
        }
        parse.baris = new Baris();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class CaseStmt {
            caseDec() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_CASE)
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_CASE_DEC,
                            token: [t1, t2]
                        };
                        console.log("case dec:");
                        console.log(parse.parse.tokenToValue(tokenBaru, true));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) { }
                return ada;
            }
            selectDec() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_SELECT)
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_SELECT_DEC,
                            token: [t1, t2]
                        };
                        console.log("select dec:");
                        console.log(parse.parse.tokenToValue(tokenBaru, true));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) { }
                return ada;
            }
        }
        parse.caseStmt = new CaseStmt();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Data {
            _dataStr = '';
            _token = [];
            _barisAr = [];
            _barisObj;
            config = new Config();
            get barisObj() {
                return this._barisObj;
            }
            set barisObj(value) {
                this._barisObj = value;
            }
            _kataKunci2 = [
                "if", "elseif", "endif", "else", "then",
                "for", "next", "to", "step",
                "function", "end function", "return",
                "while", "wend",
                "const", "global", "local",
                "type", "field", "end type", "new",
                "delete", "before", "after", "each", "last",
                "false", "true", "null",
                "case", "select", "end select",
                "end",
                "//",
            ];
            _kataKunci3 = [
                "end function",
                "end type",
                "end select",
            ];
            get kataKunci3() {
                return this._kataKunci3;
            }
            _op = [
                "+",
                "/",
                "*",
                "-",
                "==",
                "<=",
                ">=",
                "=>",
                "<>",
                ">",
                "<",
                "!=",
                "not",
                "mod"
            ];
            _op2 = [
                "&&",
                "||",
                "and",
                "or"
            ];
            _symbol = [
                '"',
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
                "=",
                "//",
                "?",
                "&",
                ";",
                "'",
                "!",
                "$",
                "#",
                "%",
                " "
            ];
            _cmd = [
                "Graphics3D",
                "Include",
                "Global"
            ];
            get op2() {
                return this._op2;
            }
            get symbol() {
                return this._symbol;
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
            get kataKunci2() {
                return this._kataKunci2;
            }
            get op() {
                return this._op;
            }
            set op(value) {
                this._op = value;
            }
            get cmd() {
                return this._cmd;
            }
            set cmd(value) {
                this._cmd = value;
            }
        }
        class Config {
            _awaitFl = true;
            get awaitFl() {
                return this._awaitFl;
            }
            set awaitFl(value) {
                this._awaitFl = value;
            }
        }
        parse.data = new Data();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Exp {
            hapusComment() {
                let tokenAr = parse.data.barisObj.token;
                let idx = -1;
                for (let i = 0; i < tokenAr.length; i++) {
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
                if (!tokenAr)
                    tokenAr = [];
                parse.data.barisObj.token = tokenAr;
                return false;
            }
            isExpBinopLogic(type) {
                if (type == parse.Kons.TY_EXP)
                    return true;
                if (type == parse.Kons.TY_BINOP_EQ)
                    return true;
                if (type == parse.Kons.TY_BINOP)
                    return true;
                if (type == parse.Kons.TY_DIM_ASSINMENT)
                    return true;
                return false;
            }
            isExp(token) {
                if (!token)
                    return false;
                if (token.type == parse.Kons.TY_EXP)
                    return true;
                if (token.type == parse.Kons.TY_ANGKA)
                    return true;
                if (token.type == parse.Kons.TY_MIN)
                    return true;
                if (token.type == parse.Kons.TY_TEKS)
                    return true;
                if (token.type == parse.Kons.TY_BINOP)
                    return true;
                if (token.type == parse.Kons.TY_KATA)
                    return true;
                if (token.type == parse.Kons.TY_PANGGIL_FUNGSI)
                    return true;
                if (token.type == parse.Kons.TY_KATA_DOT)
                    return true;
                if (token.value && token.value.toLowerCase() == "true")
                    return true;
                if (token.value && token.value.toLowerCase() == "false")
                    return true;
                return false;
            }
            expKata() {
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if ("return" == t1.valueLowerCase)
                        return false;
                    let ar2 = [
                        parse.Kons.TY_KATA,
                        parse.Kons.TY_TEKS,
                        parse.Kons.TY_EXP,
                        parse.Kons.TY_ARG,
                        parse.Kons.TY_ARG2,
                        parse.Kons.TY_ANGKA,
                        parse.Kons.TY_PANGGIL_FUNGSI,
                        parse.Kons.TY_BINOP,
                        parse.Kons.TY_ARG_KATA,
                        parse.Kons.TY_ARG_KATA_M
                    ];
                    if (t2) {
                        if (ar2.indexOf(t2.type) >= 0)
                            return false;
                        if (t2.valueLowerCase == '=')
                            return false;
                        if (t2.valueLowerCase == "\\")
                            return false;
                        if (t2.valueLowerCase == ".")
                            return false;
                        if (t2.valueLowerCase == ",")
                            return false;
                        if (t2.valueLowerCase == '(') {
                            return false;
                        }
                        if (t2.type == parse.Kons.TY_KURUNG_ARG)
                            return false;
                        if (t2.type == parse.Kons.TY_KURUNG_ARG2)
                            return false;
                        if (t2.type == parse.Kons.TY_KURUNG_KOSONG)
                            return false;
                        if (t2.type == parse.Kons.TY_KURUNG_SINGLE)
                            return false;
                    }
                    if (t0) {
                        if (t0.valueLowerCase == 'global')
                            return false;
                        if (t0.valueLowerCase == 'local')
                            return false;
                        if (t0.valueLowerCase == 'const')
                            return false;
                        if (t0.valueLowerCase == 'new')
                            return false;
                        if (t0.valueLowerCase == '.')
                            return false;
                        if (t0.valueLowerCase == "\\")
                            return false;
                        if (t0.valueLowerCase == "type")
                            return false;
                        if (t0.valueLowerCase == "field")
                            return false;
                        if (t0.valueLowerCase == ",")
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(token0, token1, token2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_EXP,
                            token: [token1]
                        };
                        console.log("exp");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
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
            expKurungSingle() {
                function check(t0, t1) {
                    if (!t1)
                        return false;
                    if (t1.type != parse.Kons.TY_KURUNG_SINGLE)
                        return false;
                    if (t0) {
                        if (t0.type == parse.Kons.TY_KATA)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(token0, token1)) {
                        tokenBaru = {
                            type: parse.Kons.TY_EXP,
                            token: [token1]
                        };
                        console.log("exp kurung single");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
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
            exp() {
                function check(t0, t1) {
                    if (!t1)
                        return false;
                    let ar = [
                        parse.Kons.TY_ANGKA,
                        parse.Kons.TY_BINOP,
                        parse.Kons.TY_TEKS,
                        parse.Kons.TY_MIN,
                        parse.Kons.TY_PANGGIL_FUNGSI,
                        parse.Kons.TY_TYPE_ACCESS,
                        parse.Kons.TY_FALSE,
                        parse.Kons.TY_TRUE,
                        parse.Kons.TY_NULL
                    ];
                    if (ar.indexOf(t1.type) < 0)
                        return false;
                    if (t0) {
                        if (t0.valueLowerCase == 'global')
                            return false;
                        if (t0.valueLowerCase == 'local')
                            return false;
                        if (t0.valueLowerCase == 'const')
                            return false;
                        if (t0.valueLowerCase == 'new')
                            return false;
                        if (t0.valueLowerCase == '.')
                            return false;
                        if (t0.valueLowerCase == "\\")
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(token0, token1)) {
                        tokenBaru = {
                            type: parse.Kons.TY_EXP,
                            token: [token1]
                        };
                        console.log("exp");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
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
            exp3() {
                return true;
            }
            isOp(token) {
                if (token.valueLowerCase == "+")
                    return true;
                if (token.valueLowerCase == "-")
                    return true;
                if (token.valueLowerCase == "*")
                    return true;
                if (token.valueLowerCase == "/")
                    return true;
                if (token.valueLowerCase == "%")
                    return true;
                if (token.valueLowerCase && token.value.toLowerCase() == "mod")
                    return true;
                if (token.type == parse.Kons.TY_OP)
                    return true;
                return false;
            }
            kataDot() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if (t2.valueLowerCase != ".")
                        return false;
                    if (t3.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_KATA_DOT,
                            token: [t1, t2, t3]
                        };
                        console.log("kata dot:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            kurungKosong() {
                for (let i = 0; i <= parse.data.barisObj.token.length - 2; i++) {
                    let token1 = parse.data.barisObj.token[i];
                    let token2 = parse.data.barisObj.token[i + 1];
                    if (token1.value == "(") {
                        if (token2.value == ")") {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_KURUNG_KOSONG
                            };
                            console.log("kurung kosong:");
                            console.log(parse.parse.tokenToValue(tokenBaru));
                            parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            kurungSingle() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != '(')
                        return false;
                    if (t3.valueLowerCase != ')')
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(token1, token2, token3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [token1, token2, token3],
                            type: parse.Kons.TY_KURUNG_SINGLE
                        };
                        console.log("kurung single:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                return ada;
            }
            kurungArg2() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != '(')
                        return false;
                    if (t3.valueLowerCase != ')')
                        return false;
                    if (t2.type != parse.Kons.TY_ARG2)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(token1, token2, token3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [token1, token2, token3],
                            type: parse.Kons.TY_KURUNG_ARG2
                        };
                        console.log("kurung arg 2:");
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                return ada;
            }
            kurungArg() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != '(')
                        return false;
                    if (t3.valueLowerCase != ')')
                        return false;
                    if (t2.type != parse.Kons.TY_ARG)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(token1, token2, token3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [token1, token2, token3],
                            type: parse.Kons.TY_KURUNG_ARG
                        };
                        console.log("kurung arg:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                return ada;
            }
            binop() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_EXP)
                        return false;
                    if (t2.type != parse.Kons.TY_OP)
                        return false;
                    if (t3.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_BINOP,
                            token: [t1, t2, t3]
                        };
                        console.log("binop");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.binop();
                    this.exp();
                }
                return ada;
            }
            binopEq() {
                let ada = false;
                function check(t0, t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA) {
                        if (t1.type != parse.Kons.TY_EXP) {
                            return false;
                        }
                    }
                    if (t2.valueLowerCase != "=")
                        return false;
                    if (t3.type != parse.Kons.TY_EXP)
                        return false;
                    if (t0) {
                        if (t0.valueLowerCase == 'global')
                            return false;
                        if (t0.valueLowerCase == 'local')
                            return false;
                        if (t0.valueLowerCase == 'const')
                            return false;
                    }
                    if (t4) {
                        if (t4.type == parse.Kons.TY_OP)
                            return false;
                        if (t4.valueLowerCase == '=')
                            return false;
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1, t2, t3, t4)) {
                        tokenBaru = {
                            type: parse.Kons.TY_BINOP_EQ,
                            token: [t1, t2, t3]
                        };
                        console.log("binop eq");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.binopLogic();
                }
                return ada;
            }
            binopLogic() {
                let ada = false;
                function check(t0, t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (parse.exp.isExpBinopLogic(t1.type) == false)
                        return false;
                    if (t2.type != parse.Kons.TY_OP2)
                        return false;
                    if (parse.exp.isExpBinopLogic(t3.type) == false)
                        return false;
                    if (t0) {
                        if (t0.valueLowerCase == '=')
                            return false;
                        if (t0.type == parse.Kons.TY_OP)
                            return false;
                        if (t0.type == parse.Kons.TY_OP2)
                            return false;
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_BINOP,
                            token: [t1, t2, t3]
                        };
                        console.log("binop logik");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.exp();
                }
                return ada;
            }
            not() {
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token1 = parse.data.barisObj.token[i];
                    let token2 = parse.data.barisObj.token[i + 1];
                    let tokenBaru;
                    if (check(token1, token2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_BINOP,
                            token: [token1, token2]
                        };
                        console.log("binop not:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_OP)
                        return false;
                    if (t1.value.toLowerCase() != "not")
                        return false;
                    if (!parse.exp.isExp(t2))
                        return false;
                    return true;
                }
            }
            min() {
                let ada = false;
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.valueLowerCase != "+") {
                        if (t1.valueLowerCase != "-") {
                            return false;
                        }
                    }
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    if (t0) {
                        if (t0.type == parse.Kons.TY_EXP)
                            return false;
                        if (t0.type == parse.Kons.TY_KURUNG_ARG)
                            return false;
                        if (t0.type == parse.Kons.TY_KURUNG_ARG2)
                            return false;
                        if (t0.type == parse.Kons.TY_KURUNG_KOSONG)
                            return false;
                        if (t0.type == parse.Kons.TY_KURUNG_SINGLE)
                            return false;
                        if (t0.type == parse.Kons.TY_KATA)
                            return false;
                        if (t0.valueLowerCase == ")")
                            return false;
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_MIN,
                            token: [t1, t2]
                        };
                        console.log("min:");
                        console.log(tokenBaru);
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        if (t0) {
                            console.log('to');
                            console.log(t0);
                        }
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.exp();
                }
                return ada;
            }
            arg2() {
                function check(t0, t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_EXP)
                        return false;
                    if (t2.valueLowerCase != ',')
                        return false;
                    if (t3.type != parse.Kons.TY_EXP)
                        return false;
                    if (t0) {
                        if (t0.valueLowerCase == ",")
                            return false;
                        if (t0.valueLowerCase == "-")
                            return false;
                        if (t0.valueLowerCase == "+")
                            return false;
                        if (t0.type == parse.Kons.TY_OP)
                            return false;
                    }
                    if (t4) {
                        if (t4.valueLowerCase == '+')
                            return false;
                        if (t4.type == parse.Kons.TY_OP)
                            return false;
                        if (t4.type == parse.Kons.TY_OP2)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1, t2, t3, t4)) {
                        tokenBaru = {
                            type: parse.Kons.TY_ARG2,
                            token: [t1, t2, t3]
                        };
                        console.log("argument2:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            args(token) {
                function checkArgument(t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_ARG2) {
                        if (t1.type != parse.Kons.TY_ARG) {
                            return false;
                        }
                    }
                    if (t2.value != ',')
                        return false;
                    if (t3.type != parse.Kons.TY_EXP)
                        return false;
                    if (t4) {
                        if (t4.valueLowerCase == "+")
                            return false;
                        if (t4.valueLowerCase == "-")
                            return false;
                        if (t4.type == parse.Kons.TY_OP)
                            return false;
                        if (t4.type == parse.Kons.TY_OP2)
                            return false;
                    }
                    return true;
                }
                for (let i = 0; i < token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    if (checkArgument(t1, t2, t3, t4)) {
                        let tokenBaru = {
                            token: [
                                parse.parse.getToken(i, token),
                                parse.parse.getToken(i + 1, token),
                                parse.parse.getToken(i + 2, token)
                            ],
                            type: parse.Kons.TY_ARG
                        };
                        console.log("arg:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        return true;
                    }
                    ;
                }
                return false;
            }
            panggilfungsiArg() {
                let ada = false;
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    let kurung = [
                        parse.Kons.TY_KURUNG_ARG,
                    ];
                    if (kurung.indexOf(t2.type) < 0)
                        return false;
                    if (t0) {
                        if ('function' == t0.valueLowerCase) {
                            return false;
                        }
                        if ('dim' == t0.valueLowerCase) {
                            return false;
                        }
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    if (check(t1, t2, t3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [t2, t3],
                            type: parse.Kons.TY_PANGGIL_FUNGSI
                        };
                        console.log("fungsi exp arg:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                if (ada) {
                    parse.exp.exp();
                }
                return ada;
            }
            panggilfungsi() {
                let ada = false;
                function check(t0, t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if ('dim' == t1.valueLowerCase)
                        return false;
                    let kurung = [
                        parse.Kons.TY_KURUNG_ARG2,
                        parse.Kons.TY_KURUNG_KOSONG,
                        parse.Kons.TY_KURUNG_SINGLE
                    ];
                    if (kurung.indexOf(t2.type) < 0)
                        return false;
                    if (t0) {
                        if ('function' == t0.valueLowerCase) {
                            return false;
                        }
                        if ('dim' == t0.valueLowerCase) {
                            return false;
                        }
                    }
                    if (t3) {
                        if (t3.valueLowerCase == '=')
                            return false;
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(token0, token1, token2, token3)) {
                        ada = true;
                        let tokenBaru = {
                            token: [token1, token2],
                            type: parse.Kons.TY_PANGGIL_FUNGSI
                        };
                        console.log("fungsi exp:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        i--;
                    }
                }
                if (ada) {
                    parse.exp.exp();
                }
                return ada;
            }
            getQuote2(idx) {
                for (let i = idx; i < parse.data.barisObj.token.length; i++) {
                    let item = parse.data.barisObj.token[i];
                    if (item.value == "\"") {
                        return i;
                    }
                }
                return -1;
            }
            teks() {
                let idx = 0;
                let idx2 = 0;
                idx = this.getQuote2(0);
                if (idx == -1) {
                    return false;
                }
                idx2 = this.getQuote2(idx + 1);
                if (idx2 == -1) {
                    return false;
                }
                let tokenBaru = {
                    token: [],
                    type: parse.Kons.TY_TEKS
                };
                tokenBaru.token = parse.ar.ambilTengah(parse.data.barisObj.token, idx, idx2);
                console.log("teks:");
                console.log(parse.parse.tokenToValue(tokenBaru));
                parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, idx, idx2, tokenBaru);
                return true;
            }
        }
        parse.exp = new Exp();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Grammar {
            hapusSpace() {
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    if (parse.data.barisObj.token[i].value == ' ') {
                        parse.data.barisObj.token = parse.ar.hapus(parse.data.barisObj.token, i);
                        return true;
                    }
                }
                return false;
            }
            grammar() {
                console.group('grammar');
                while (parse.data.barisObj.token.length > 1) {
                    if (false) { }
                    else if (parse.exp.teks()) { }
                    else if (parse.exp.hapusComment()) { }
                    else if (this.hapusSpace()) { }
                    else if (parse.exp.exp()) { }
                    else if (parse.exp.expKurungSingle()) { }
                    else if (parse.exp.expKata()) { }
                    else if (parse.exp.kataDot()) { }
                    else if (parse.exp.kurungKosong()) { }
                    else if (parse.exp.kurungSingle()) { }
                    else if (parse.exp.panggilfungsi()) { }
                    else if (parse.exp.panggilfungsiArg()) { }
                    else if (parse.exp.min()) { }
                    else if (parse.exp.binop()) { }
                    else if (parse.exp.binopEq()) { }
                    else if (parse.exp.binopLogic()) { }
                    else if (parse.exp.not()) { }
                    else if (parse.exp.arg2()) { }
                    else if (parse.exp.args(parse.data.barisObj.token)) { }
                    else if (parse.exp.kurungArg2()) { }
                    else if (parse.exp.kurungArg()) { }
                    else if (parse.typeStmt.typeAkses()) { }
                    else if (parse.gm2.checkLog()) { }
                    else if (parse.stmt.modifier()) { }
                    else if (parse.stmt.modIsi()) { }
                    else if (parse.stmt.returnExp()) { }
                    else if (parse.stmt.forPendek()) { }
                    else if (parse.stmt.forStep()) { }
                    else if (parse.ifStmt.ifExp()) { }
                    else if (parse.ifStmt.ifExpP()) { }
                    else if (parse.ifStmt.ifExpP2()) { }
                    else if (parse.ifStmt.ifThen()) { }
                    else if (parse.ifStmt.ifThenP()) { }
                    else if (parse.ifStmt.ifThenP2()) { }
                    else if (parse.ifStmt.ifElseThenP()) { }
                    else if (parse.ifStmt.ifElseThenP2()) { }
                    else if (parse.ifStmt.elseIfThen()) { }
                    else if (parse.stmt.funcDec()) { }
                    else if (parse.stmt.while2()) { }
                    else if (parse.stmt.perintah()) { }
                    else if (parse.typeStmt.typeNew()) { }
                    else if (parse.typeStmt.typeDef()) { }
                    else if (parse.typeStmt.fieldDef()) { }
                    else if (parse.typeStmt.typeAkses()) { }
                    else if (parse.stmt.dimDec()) { }
                    else if (parse.stmt.dimAssign()) { }
                    else if (parse.caseStmt.caseDec()) { }
                    else if (parse.caseStmt.selectDec()) { }
                    else if (parse.stmt.stmtColon()) { }
                    else if (parse.stmt.stmtColon2()) { }
                    else if (parse.stmt.stmtMul()) { }
                    else if (parse.data.barisObj.token.length > 1) {
                        console.log("error:");
                        console.log(parse.data.barisObj.token);
                        parse.data.barisObj.token.forEach((token) => {
                            console.log(parse.parse.tokenToValue(token));
                        });
                        throw Error('');
                    }
                }
                console.groupEnd();
            }
        }
        parse.grammar = new Grammar();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Grammar2 {
            _aturanAr = [];
            get aturanAr() {
                return this._aturanAr;
            }
            constructor() {
            }
            def() {
                return {
                    nama: '',
                    type: 0,
                    kondisi: [],
                    sbl: [],
                    stl: []
                };
            }
            init() {
                {
                    this._aturanAr.push({
                        nama: 'arg_kata',
                        type: parse.Kons.TY_ARG_KATA,
                        kondisi: [
                            [parse.Kons.TY_KATA],
                            [parse.Kons.TY_KOMA],
                            [parse.Kons.TY_KATA]
                        ],
                        sbl: [parse.Kons.TY_KOMA, parse.Kons.TY_OP, parse.Kons.TY_OP2],
                        stl: [
                            parse.Kons.TY_OP, parse.Kons.TY_OP2,
                            parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE
                        ]
                    });
                    this._aturanAr.push({
                        nama: 'arg_kata_m',
                        type: parse.Kons.TY_ARG_KATA_M,
                        kondisi: [
                            [parse.Kons.TY_ARG_KATA],
                            [parse.Kons.TY_KOMA],
                            [parse.Kons.TY_KATA]
                        ],
                        sbl: [parse.Kons.TY_KOMA],
                        stl: [parse.Kons.TY_OP, parse.Kons.TY_OP2,
                            ,
                            parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE
                        ]
                    });
                }
                {
                    this._aturanAr.push({
                        nama: 'arg kata exp',
                        type: parse.Kons.TY_ARG2,
                        kondisi: [
                            [parse.Kons.TY_KATA],
                            [parse.Kons.TY_KOMA],
                            [parse.Kons.TY_EXP]
                        ],
                        sbl: [parse.Kons.TY_KOMA],
                        stl: [parse.Kons.TY_OP, parse.Kons.TY_OP2]
                    });
                    this._aturanAr.push({
                        nama: 'arg exp kata',
                        type: parse.Kons.TY_ARG2,
                        kondisi: [
                            [parse.Kons.TY_EXP],
                            [parse.Kons.TY_KOMA],
                            [parse.Kons.TY_KATA]
                        ],
                        sbl: [parse.Kons.TY_KOMA],
                        stl: [parse.Kons.TY_OP, parse.Kons.TY_OP2]
                    });
                    this._aturanAr.push({
                        nama: 'arg => arg2 kata',
                        type: parse.Kons.TY_ARG2,
                        kondisi: [
                            [parse.Kons.TY_EXP],
                            [parse.Kons.TY_KOMA],
                            [parse.Kons.TY_KATA]
                        ],
                        sbl: [parse.Kons.TY_KOMA],
                        stl: [parse.Kons.TY_OP, parse.Kons.TY_OP2]
                    });
                }
                this._aturanAr.push({
                    nama: 'arg campur',
                    type: parse.Kons.TY_ARG,
                    kondisi: [
                        [parse.Kons.TY_ARG_KATA_M, parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG2, parse.Kons.TY_ARG],
                        [parse.Kons.TY_KOMA],
                        [parse.Kons.TY_EXP, parse.Kons.TY_KATA]
                    ],
                    sbl: [parse.Kons.TY_KOMA],
                    stl: [parse.Kons.TY_OP, parse.Kons.TY_OP2]
                });
                this._aturanAr = this._aturanAr.concat([
                    {
                        nama: 'binop kata',
                        type: parse.Kons.TY_BINOP,
                        kondisi: [
                            [parse.Kons.TY_KATA, parse.Kons.TY_EXP],
                            [parse.Kons.TY_OP, parse.Kons.TY_OP2],
                            [parse.Kons.TY_KATA, parse.Kons.TY_EXP]
                        ],
                        sbl: [parse.Kons.TY_EQ, parse.Kons.TY_OP, parse.Kons.TY_OP2],
                        stl: [parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_ARG2, parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG_KATA_M, parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_KURUNG_KOSONG]
                    }
                ]);
                this._aturanAr = this._aturanAr.concat([
                    {
                        nama: 'perintah ',
                        type: parse.Kons.TY_PERINTAH,
                        kondisi: [
                            [parse.Kons.TY_KATA],
                            [parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG_KATA_M],
                        ],
                        sbl: [parse.Kons.TY_EQ, parse.Kons.TY_OP, parse.Kons.TY_OP2],
                        stl: [parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_ARG2, parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG_KATA_M, parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_KURUNG_KOSONG]
                    }
                ]);
            }
            tambahAturan(data) {
                this._aturanAr.push({
                    nama: data[0],
                    type: data[1],
                    kondisi: data[2],
                    sbl: data[3],
                    stl: data[4]
                });
            }
            checkLog() {
                let hasil = false;
                console.group('check');
                hasil = this.check();
                console.groupEnd();
                return hasil;
            }
            check() {
                let idxAturan = 0;
                let aturan;
                let barisAda;
                let checkAda = false;
                while (true) {
                    aturan = this.aturanAr[idxAturan];
                    barisAda = this.checkBaris(parse.data.barisObj.token, aturan);
                    if (barisAda) {
                        checkAda = true;
                        idxAturan = 0;
                    }
                    else {
                        idxAturan++;
                        if (idxAturan >= this.aturanAr.length) {
                            break;
                        }
                    }
                }
                return checkAda;
            }
            checkBaris(tokenAr, aturan) {
                let ada = false;
                for (let i = tokenAr.length - 1; i >= 0; i--) {
                    let ok = false;
                    ok = this.checkAturan(tokenAr, aturan, i);
                    if (ok) {
                        let tokenBaru = {
                            token: [],
                            type: aturan.type
                        };
                        for (let j = 0; j < aturan.kondisi.length; j++) {
                            tokenBaru.token.push(parse.parse.getToken(i + j, tokenAr));
                        }
                        console.log(aturan.nama);
                        console.log(tokenBaru);
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru, false);
                        ada = true;
                    }
                }
                return ada;
            }
            checkKondisi(kond, token) {
                let hasil = false;
                hasil = (kond.indexOf(token.type) >= 0);
                return hasil;
            }
            checkAturan(tokenAr, aturan, idx) {
                let t;
                let hasil = true;
                for (let i = 0; i < aturan.kondisi.length; i++) {
                    t = parse.parse.getToken(idx + i, tokenAr);
                    if (!t) {
                        hasil = false;
                    }
                    else {
                        let cocok = this.checkKondisi(aturan.kondisi[i], t);
                        if (!cocok) {
                            hasil = false;
                        }
                        else {
                        }
                    }
                }
                t = parse.parse.getToken(idx - 1, tokenAr);
                if (t) {
                    if (aturan.sbl.indexOf(t.type) >= 0) {
                        hasil = false;
                    }
                }
                t = parse.parse.getToken(idx + aturan.kondisi.length, tokenAr);
                if (t) {
                    if (aturan.stl.indexOf(t.type) >= 0) {
                        hasil = false;
                    }
                }
                return hasil;
            }
        }
        parse.gm2 = new Grammar2();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class IfStmt {
            isPerintah(type) {
                if (parse.Kons.TY_PERINTAH == type)
                    return true;
                if (parse.Kons.TY_RETURN == type)
                    return true;
                if (parse.Kons.TY_RETURN_EXP == type)
                    return true;
                if (parse.Kons.TY_BINOP_EQ == type)
                    return true;
                if (parse.Kons.TY_EXP == type)
                    return true;
                return false;
            }
            ifExp() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.valueLowerCase != "if")
                        return false;
                    if (t2.type != parse.Kons.TY_EXP) {
                        if (t2.type != parse.Kons.TY_DIM_ASSINMENT) {
                            if (t2.type != parse.Kons.TY_BINOP_EQ) {
                                return false;
                            }
                        }
                    }
                    if (t3) {
                        if (t3.type == parse.Kons.TY_OP)
                            return false;
                        if (t3.type == parse.Kons.TY_OP2)
                            return false;
                        if (t3.valueLowerCase == "=")
                            return false;
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_EXP,
                            token: [t1, t2]
                        };
                        console.log("if pendek:");
                        console.log(tokenBaru);
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifExpP();
                    this.ifThen();
                }
                return ada;
            }
            ifExpP() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_IF_EXP)
                        return false;
                    if (parse.ifStmt.isPerintah(t2.type) == false)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_EXP_P,
                            token: [t1, t2]
                        };
                        console.log("if EXP p:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifExpP2();
                    this.ifElseThenP();
                }
                return ada;
            }
            ifExpP2() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_IF_EXP)
                        return false;
                    if (t2.valueLowerCase != ":")
                        return false;
                    if (parse.ifStmt.isPerintah(t3.type))
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_EXP_P2,
                            token: [t1, t2, t3]
                        };
                        console.log("if EXP p2:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifExpP2();
                    this.ifElseThenP();
                    this.ifElseThenP2();
                }
                return ada;
            }
            ifThen() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_IF_EXP)
                        return false;
                    if (t2.valueLowerCase != 'then')
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_THEN,
                            token: [t1, t2]
                        };
                        console.log("if then:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifThenP();
                }
                return ada;
            }
            ifThenP() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_IF_THEN)
                        return false;
                    if (!parse.ifStmt.isPerintah(t2.type))
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_THEN_P,
                            token: [t1, t2]
                        };
                        console.log("if perintah:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifThenP2();
                    this.ifElseThenP();
                }
                return ada;
            }
            ifThenP2() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_IF_THEN_P)
                        return false;
                    if (t2.valueLowerCase != ':')
                        return false;
                    if (parse.ifStmt.isPerintah(t3.type) == false)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_THEN_P2,
                            token: [t1, t2, t3]
                        };
                        console.log("if perintah2:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifThenP2();
                }
                return ada;
            }
            ifElseThenP() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    let t1Ar = [
                        parse.Kons.TY_IF_THEN_P,
                        parse.Kons.TY_IF_THEN_P2
                    ];
                    if (t1Ar.indexOf(t1.type) < 0)
                        return false;
                    if (t2.valueLowerCase != 'else')
                        return false;
                    if (parse.ifStmt.isPerintah(t3.type) == false)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_ELSE_THEN_P,
                            token: [t1, t2, t3]
                        };
                        console.log("if else:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifElseThenP2();
                }
                return ada;
            }
            ifElseThenP2() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_IF_ELSE_THEN_P)
                        return false;
                    if (t2.valueLowerCase != ':')
                        return false;
                    if (parse.ifStmt.isPerintah(t3.type) == false)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_IF_ELSE_THEN_P2,
                            token: [t1, t2, t3]
                        };
                        console.log("if else P 2:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.ifElseThenP2();
                }
                return ada;
            }
            elseIfThen() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != "elseif")
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    if (t3.valueLowerCase != "then")
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_ELSE_THEN,
                            token: [t1, t2, t3]
                        };
                        console.log("else if then");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
        }
        parse.ifStmt = new IfStmt();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Kons {
            static TY_ANGKA = 1;
            static TY_KATA = 2;
            static TY_BARIS = 3;
            static TY_TEKS = 4;
            static TY_RES_WORD = 5;
            static TY_OP = 6;
            static TY_OP2 = 7;
            static TY_SYMBOL = 8;
            static TY_TRUE = 9;
            static TY_FALSE = 10;
            static TY_NULL = 11;
            static TY_COLON = 12;
            static TY_KOMA = 13;
            static TY_KURUNG_BUKA = 14;
            static TY_KURUNG_TUTUP = 15;
            static TY_EQ = 16;
            static TY_MIN = 50;
            static TY_ARG = 100;
            static TY_ARG2 = 101;
            static TY_ARG_KATA = 102;
            static TY_ARG_KATA_M = 103;
            static TY_KURUNG_KOSONG = 153;
            static TY_KURUNG_SINGLE = 155;
            static TY_KURUNG_ARG = 156;
            static TY_KURUNG_ARG2 = 157;
            static TY_KATA_DOT = 200;
            static TY_BINOP = 201;
            static TY_BINOP_EQ = 202;
            static TY_PANGGIL_FUNGSI = 203;
            static TY_EXP = 204;
            static TY_STMT = 300;
            static TY_STMT_COLON = 301;
            static TY_STMT_M = 302;
            static TY_PERINTAH = 303;
            static TY_FOR = 305;
            static TY_FOR_STEP = 306;
            static TY_WEND = 307;
            static TY_FUNC_DEC = 308;
            static TY_MOD = 309;
            static TY_RETURN = 310;
            static TY_RETURN_EXP = 311;
            static TY_DIM_ASSINMENT = 400;
            static TY_DIM_DEC = 401;
            static TY_DIM_DEC_VAR = 402;
            static TY_TYPE_NEW_DEC = 500;
            static TY_TYPE_DEF = 510;
            static TY_FIELD_DEF = 520;
            static TY_TYPE = 530;
            static TY_FIELD = 540;
            static TY_FIELD_M = 545;
            static TY_ENDTYPE = 550;
            static TY_TYPE_ACCESS = 560;
            static TY_IF_EXP = 600;
            static TY_IF_EXP_P = 601;
            static TY_IF_EXP_P2 = 602;
            static TY_IF_THEN = 650;
            static TY_IF_THEN_P = 651;
            static TY_IF_THEN_P2 = 652;
            static TY_IF_ELSE_P = 660;
            static TY_IF_ELSE_P2 = 661;
            static TY_IF_ELSE_THEN_P = 670;
            static TY_IF_ELSE_THEN_P2 = 671;
            static TY_ELSE_DEC = 700;
            static TY_ELSE_THEN = 701;
            static TY_ELSE_P = 702;
            static TY_ELSE_P2 = 703;
            static TY_ELSEIF_DEC = 750;
            static TY_ELSEIF_THEN = 751;
            static TY_ELSEIF_THEN_P = 752;
            static TY_ELSEIF_THEN_P2 = 753;
            static TY_ELSEIF_P = 754;
            static TY_ELSEIF_P2 = 755;
            static TY_ELSEIF_ELSE_P = 756;
            static TY_ELSEIF_ELSE_P2 = 757;
            static TY_MOD_DEC = 800;
            static TY_MOD_ISI = 801;
            static TY_CASE = 900;
            static TY_SELECT = 910;
            static TY_END_SELECT = 920;
            static TY_CASE_DEC = 930;
            static TY_SELECT_DEC = 940;
        }
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Lexer {
            lexer() {
                console.group('lexer start');
                while (parse.data.dataStr.length > 0) {
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
                        console.log(parse.data.dataStr.slice(0, 10));
                        console.log(parse.data.dataStr.charCodeAt(0));
                        console.log(parse.data.dataStr.charAt(0));
                        console.groupEnd();
                        throw Error('');
                    }
                }
                parse.data.token.forEach((token) => {
                    token.valueLowerCase = '';
                    if (token.value) {
                        token.valueLowerCase = token.value.toLocaleLowerCase();
                    }
                });
                console.groupEnd();
            }
            getOp() {
                for (let i = 0; i < parse.data.op.length; i++) {
                    let kata = parse.data.op[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_OP
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getOp2() {
                for (let i = 0; i < parse.data.op2.length; i++) {
                    let kata = parse.data.op2[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_OP2
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getCmd() {
                for (let i = 0; i < parse.data.cmd.length; i++) {
                    let kata = parse.data.cmd[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        parse.data.token.push({
                            value: kata,
                            type: parse.Kons.TY_KATA
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getNumber() {
                let id = /^[0-9]*\.?[0-9]+/;
                let hsl = (parse.data.dataStr.match(id));
                let value;
                if (hsl) {
                    value = hsl + '';
                    parse.data.dataStr = parse.data.dataStr.slice(value.length);
                    let token = {
                        value: value + '',
                        type: parse.Kons.TY_ANGKA
                    };
                    parse.data.token.push(token);
                    return true;
                }
                return false;
            }
            getComment() {
                if (parse.data.dataStr.slice(0, 2) == '//') {
                    parse.data.dataStr = '';
                    return true;
                }
                return false;
            }
            getKeyword3() {
                for (let i = 0; i < parse.data.kataKunci3.length; i++) {
                    let kata = parse.data.kataKunci3[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        let token = {
                            value: kata,
                            type: parse.Kons.TY_RES_WORD,
                            valueLowerCase: kata.toLowerCase()
                        };
                        let lc = kata.toLowerCase();
                        if ("type" == lc) {
                            token.type = parse.Kons.TY_TYPE;
                        }
                        if ("field" == lc) {
                            token.type = parse.Kons.TY_FIELD;
                        }
                        else if ("end type" == lc) {
                            token.type = parse.Kons.TY_ENDTYPE;
                        }
                        else if ("each" == lc) {
                        }
                        else if ("return" == lc) {
                            token.type = parse.Kons.TY_RETURN;
                        }
                        else if ("false" == lc) {
                            token.type = parse.Kons.TY_FALSE;
                        }
                        else if ("true" == lc) {
                            token.type = parse.Kons.TY_TRUE;
                        }
                        else if ("null" == lc) {
                            token.type = parse.Kons.TY_NULL;
                        }
                        else if ("end" == lc) {
                            token.type = parse.Kons.TY_PERINTAH;
                        }
                        else if ("case" == lc) {
                            token.type = parse.Kons.TY_CASE;
                        }
                        else if ("select" == lc) {
                            token.type = parse.Kons.TY_SELECT;
                        }
                        else if ("end select" == lc) {
                            token.type = parse.Kons.TY_END_SELECT;
                        }
                        else {
                            console.warn("kata belum didefinisikan: " + lc);
                        }
                        parse.data.token.push(token);
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getSymbol() {
                for (let i = 0; i < parse.data.symbol.length; i++) {
                    let kata = parse.data.symbol[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata) {
                        let token = {
                            value: kata,
                            type: parse.Kons.TY_SYMBOL,
                            valueLowerCase: kata.toLowerCase()
                        };
                        parse.data.token.push(token);
                        let lc = kata.toLowerCase();
                        if (":" == lc) {
                            token.type = parse.Kons.TY_COLON;
                        }
                        else if ("," == lc) {
                            token.type = parse.Kons.TY_KOMA;
                        }
                        else if ("(" == lc) {
                            token.type = parse.Kons.TY_KURUNG_BUKA;
                        }
                        else if (")" == lc) {
                            token.type = parse.Kons.TY_KURUNG_TUTUP;
                        }
                        else if ("=" == lc) {
                            token.type = parse.Kons.TY_EQ;
                        }
                        parse.data.dataStr = parse.data.dataStr.slice(kata.length);
                        return true;
                    }
                }
                return false;
            }
            getKata() {
                let id = /^[a-zA-Z_][a-zA-Z0-9_$%#@]*/;
                let hsl = (parse.data.dataStr.match(id));
                let value = '';
                if (hsl) {
                    parse.data.dataStr = parse.data.dataStr.slice(hsl[0].length);
                    value = hsl + '';
                    if (value.charAt(value.length - 1) == "#") {
                        value = value.slice(0, value.length - 1);
                    }
                    let token = {
                        value: value,
                        type: parse.Kons.TY_KATA,
                        valueLowerCase: value.toLowerCase()
                    };
                    parse.data.token.push(token);
                    if (parse.data.kataKunci2.indexOf(token.valueLowerCase) >= 0) {
                        token.type = parse.Kons.TY_RES_WORD;
                    }
                    let lc = token.valueLowerCase;
                    if ("type" == lc) {
                        token.type = parse.Kons.TY_TYPE;
                    }
                    else if ("field" == lc) {
                        token.type = parse.Kons.TY_FIELD;
                    }
                    else if ("end type" == lc) {
                        token.type = parse.Kons.TY_ENDTYPE;
                    }
                    else if ("each" == lc) {
                    }
                    else if ("return" == lc) {
                        token.type = parse.Kons.TY_RETURN;
                    }
                    else if ("false" == lc) {
                        token.type = parse.Kons.TY_FALSE;
                    }
                    else if ("true" == lc) {
                        token.type = parse.Kons.TY_TRUE;
                    }
                    else if ("null" == lc) {
                        token.type = parse.Kons.TY_NULL;
                    }
                    else if ("end" == lc) {
                        token.type = parse.Kons.TY_PERINTAH;
                    }
                    else if ("case" == lc) {
                        token.type = parse.Kons.TY_CASE;
                    }
                    else if ("select" == lc) {
                        token.type = parse.Kons.TY_SELECT;
                    }
                    else if ("end select" == lc) {
                        token.type = parse.Kons.TY_END_SELECT;
                    }
                    else {
                    }
                    return true;
                }
                return false;
            }
            getLineBreak() {
                if (parse.data.dataStr.charCodeAt(0) == 13) {
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    parse.data.token.push({
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.data.dataStr.charCodeAt(0) == 10) {
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    parse.data.token.push({
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                if (parse.data.dataStr.charCodeAt(0) == 9) {
                    parse.data.dataStr = parse.data.dataStr.slice(1, parse.data.dataStr.length);
                    parse.data.token.push({
                        value: '\n',
                        type: parse.Kons.TY_BARIS
                    });
                    return true;
                }
                return false;
            }
        }
        parse.lexer = new Lexer();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse_1) {
        class Blitz {
            init() {
                parse_1.gm2.init();
            }
            async parse(str) {
                parse_1.data.dataStr = str;
                parse_1.data.dataStr += ";;";
                parse_1.data.dataStr += "\r\n";
                while (parse_1.data.barisAr.length > 0) {
                    parse_1.data.barisAr.pop();
                }
                while (parse_1.data.token.length > 0) {
                    parse_1.data.token.pop();
                }
                parse_1.lexer.lexer();
                parse_1.baris.pecahBaris();
                console.group("grammar");
                for (let i = 0; i < parse_1.data.barisAr.length; i++) {
                    let barisObj = parse_1.data.barisAr[i];
                    parse_1.data.barisObj = barisObj;
                    console.log(parse_1.baris.getLine(barisObj.token));
                    parse_1.grammar.grammar();
                }
                console.groupEnd();
                console.group("hasil:");
                for (let i = 0; i < parse_1.data.barisAr.length; i++) {
                    console.log(parse_1.data.barisAr[i].baris);
                    console.log(parse_1.data.barisAr[i].token);
                    console.log(parse_1.data.barisAr[i].terjemah);
                    console.log("");
                }
                console.groupEnd();
                console.log("finish");
                return ha.parse.parse.blijs();
            }
            blijs() {
                let hsl = '';
                console.log('blijs');
                hsl += "async function Start() {\n";
                parse_1.data.barisAr.forEach((barisObj) => {
                    hsl += barisObj.terjemah + "\n";
                });
                hsl += `
                if (Loop) {
                    window.Loop = async () => {
                        await Loop();
                    }
                }
                else {
                    console.log("Loop doesn't exists");
                }
            `;
                hsl += "}\n";
                return hsl;
            }
            getToken(idx, token) {
                if (idx < 0)
                    return null;
                if (idx >= token.length)
                    return null;
                return token[idx];
            }
            tokenToAr(token) {
                let ar = [];
                if (token.value) {
                    ar.push(token.valueLowerCase);
                }
                else if (token.token) {
                    token.token.forEach((token2) => {
                        ar.push(this.tokenToAr(token2));
                    });
                }
                return ar;
            }
            tokenToValue(token, debug = false) {
                let hasil = '';
                if (debug) {
                    console.log('token to value');
                    console.log(token);
                    console.log(token.token);
                }
                if (!token)
                    throw Error();
                if (token.valueLowerCase) {
                    if (token.valueLowerCase != '') {
                        hasil += ' ';
                        hasil += token.valueLowerCase;
                        return hasil;
                    }
                }
                if (token.token) {
                    token.token.forEach((token2) => {
                        hasil += parse_1.parse.tokenToValue(token2);
                    });
                    return hasil;
                }
                throw new Error('');
            }
            debugToken(token) {
                console.group('debug token:');
                token.forEach((item) => {
                    console.log(this.tokenToValue(item));
                });
                console.groupEnd();
            }
        }
        class Arr {
            kiri(token, idx) {
                return token.slice(0, idx);
            }
            kanan(token, idx) {
                return token.slice(idx + 1);
            }
            ambilTengah(token, idx, idx2) {
                return token.slice(idx, idx2 + 1);
            }
            ganti(token, idx, idx2, token2, debug = false) {
                let kiri = this.kiri(token, idx);
                let kanan = this.kanan(token, idx2);
                if (debug) {
                    console.log('index ' + idx);
                    console.log('token:');
                    console.log(token);
                    console.log('kiri:');
                    console.log(kiri);
                    console.log('kiri l ' + kiri.length);
                    console.log('kanan:');
                    console.log('kanan l: ' + kanan.length);
                    console.log(kanan);
                    console.log('token2:');
                    console.log(token2);
                }
                let hasil = kiri.concat(token2);
                hasil = hasil.concat(kanan);
                if (debug) {
                    console.log('hasil length ' + hasil.length);
                }
                if (hasil.length > token.length) {
                    throw Error('');
                }
                return hasil;
            }
            hapus(token, idx) {
                let hasil;
                let kiri;
                let kanan;
                kiri = this.kiri(token, idx);
                kanan = this.kanan(token, idx);
                hasil = kiri.concat(kanan);
                return hasil;
            }
        }
        parse_1.ar = new Arr();
        parse_1.parse = new Blitz();
        parse_1.parse.init();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Stmt {
            Baru() {
                return false;
            }
            stmtMul() {
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_STMT_COLON)
                        return false;
                    let t2Ar = [
                        parse.Kons.TY_STMT,
                        parse.Kons.TY_PERINTAH
                    ];
                    if (t2Ar.indexOf(t2.type) < 0)
                        return false;
                    if (t0) {
                        if (t0.type == parse.Kons.TY_COLON)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    if (check(t0, t1, t2)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_STMT_M,
                            token: [t1, t2]
                        };
                        console.log("stmt mul");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            stmtColon2() {
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_STMT_M)
                        return false;
                    if (t2.type != parse.Kons.TY_COLON)
                        return false;
                    if (t0) {
                        if (t0.type == parse.Kons.TY_COLON)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    if (check(t0, t1, t2)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_STMT_COLON,
                            token: [t1, t2]
                        };
                        console.log("stmt colon");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            stmtColon() {
                function check(t0, t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    let t1Ar = [
                        parse.Kons.TY_PERINTAH
                    ];
                    if (t1Ar.indexOf(t1.type) < 0)
                        return false;
                    if (t2.type != parse.Kons.TY_COLON)
                        return false;
                    if (t0) {
                        if (t0.type == parse.Kons.TY_COLON)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    if (check(t0, t1, t2)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_STMT_COLON,
                            token: [t1, t2]
                        };
                        console.log("stmt colon");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            stmt() {
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    let t1Ar = [
                        parse.Kons.TY_MOD_ISI,
                        parse.Kons.TY_IF_THEN,
                        parse.Kons.TY_ELSE_THEN,
                        parse.Kons.TY_ELSEIF_THEN
                    ];
                    t1Ar;
                    return false;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    if (check(t1, t2)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_STMT,
                            token: [t1, t2]
                        };
                        console.log("dim assign");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            dimAssign() {
                function check(t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (!t4)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    let ar = [parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_KURUNG_ARG2];
                    if (ar.indexOf(t2.type) < 0)
                        return false;
                    if (t3.valueLowerCase != '=')
                        return false;
                    if (t4.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    if (check(t1, t2, t3, t4)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_DIM_ASSINMENT,
                            token: [t1, t2, t3, t4]
                        };
                        console.log("dim assign");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            dimDec() {
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != 'dim')
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    let ar = [parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_SINGLE];
                    if (ar.indexOf(t3.type) < 0)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i <= parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(t1, t2, t3)) {
                        let tokenBaru = {
                            token: [
                                t1,
                                t2,
                                t3
                            ],
                            type: parse.Kons.TY_DIM_DEC
                        };
                        console.log('dim dec: ');
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            forPendek() {
                let ada = false;
                function check(t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (!t4)
                        return false;
                    if ("for" != t1.valueLowerCase)
                        return false;
                    if (parse.Kons.TY_BINOP_EQ != t2.type)
                        return false;
                    if ("to" != t3.valueLowerCase)
                        return false;
                    if (parse.Kons.TY_EXP != t4.type)
                        return false;
                    return true;
                }
                for (let i = 0; i <= parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let token4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    if (check(token1, token2, token3, token4)) {
                        let tokenBaru = {
                            token: [
                                token1,
                                token2,
                                token3,
                                token4,
                            ],
                            type: parse.Kons.TY_FOR
                        };
                        console.log('for: ');
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            forStep() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (parse.Kons.TY_FOR != t1.type)
                        return false;
                    if ("step" != t2.valueLowerCase)
                        return false;
                    if (parse.Kons.TY_EXP != t3.type)
                        return false;
                    return true;
                }
                for (let i = 0; i <= parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(token1, token2, token3)) {
                        let tokenBaru = {
                            token: [
                                token1,
                                token2,
                                token3,
                            ],
                            type: parse.Kons.TY_FOR_STEP
                        };
                        console.log('for step: ');
                        console.log(parse.parse.tokenToAr(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            funcDec() {
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.valueLowerCase != 'function')
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    let kurungAr = [
                        parse.Kons.TY_KURUNG_ARG,
                        parse.Kons.TY_KURUNG_ARG2,
                        parse.Kons.TY_KURUNG_SINGLE,
                        parse.Kons.TY_KURUNG_KOSONG
                    ];
                    if (kurungAr.indexOf(t3.type) < 0)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i <= parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(token1, token2, token3)) {
                        let tokenBaru = {
                            token: [
                                token1,
                                token2,
                                token3
                            ],
                            type: parse.Kons.TY_FUNC_DEC
                        };
                        console.log('func dec: ');
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            modifier() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    let modAr = [
                        "const",
                        "global",
                        "local"
                    ];
                    if (modAr.indexOf(t1.valueLowerCase) < 0)
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    if (check(token1, token2)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_MOD,
                            token: [token1, token2]
                        };
                        console.log("modifier");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    this.modIsi();
                }
                return ada;
            }
            modIsi() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_MOD)
                        return false;
                    if (t2.valueLowerCase != '=')
                        return false;
                    if (t3.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_MOD_ISI,
                            token: [t1, t2, t3]
                        };
                        console.log("mod isi");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) { }
                return ada;
            }
            new2() {
                for (let i = 0; i <= parse.data.barisObj.token.length - 2; i++) {
                    let token1 = parse.data.barisObj.token[i];
                    let token2 = parse.data.barisObj.token[i + 1];
                    if (token1.value && token1.value.toLowerCase() == "new") {
                        if (token2.type == parse.Kons.TY_KATA || (token2.type == parse.Kons.TY_PANGGIL_FUNGSI)) {
                            let tokenBaru = {
                                token: [token1, token2],
                                type: parse.Kons.TY_PERINTAH
                            };
                            console.log("new:");
                            console.log(tokenBaru);
                            parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + 1, tokenBaru);
                            return true;
                        }
                    }
                }
                return false;
            }
            perintah() {
                function check(t0, t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if (t1.valueLowerCase == 'dim')
                        return false;
                    let t2Ar = [
                        parse.Kons.TY_EXP,
                        parse.Kons.TY_ARG,
                        parse.Kons.TY_ARG2,
                        parse.Kons.TY_ARG_KATA,
                        parse.Kons.TY_ARG_KATA_M
                    ];
                    if (t2Ar.indexOf(t2.type) < 0) {
                        return false;
                    }
                    if (t0) {
                        if (t0.type == parse.Kons.TY_EXP) {
                            return false;
                        }
                    }
                    if (t3) {
                        if (t3.valueLowerCase == '=')
                            return false;
                        if (t3.type == parse.Kons.TY_OP)
                            return false;
                        if (t3.type == parse.Kons.TY_OP2)
                            return false;
                        if (t3.type == parse.Kons.TY_KOMA)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_PERINTAH,
                            token: [t1, t2]
                        };
                        console.log("perintah:");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            returnExp() {
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.type != parse.Kons.TY_RETURN)
                        return false;
                    if (t2.type != parse.Kons.TY_EXP)
                        return false;
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_RETURN_EXP,
                            token: [t1, t2]
                        };
                        console.log("return exp");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            while2() {
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let token1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let token2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let token3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(token1, token2, token3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_WEND,
                            token: [token1, token2]
                        };
                        console.log("while:");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + 1, tokenBaru);
                        ada = true;
                        i--;
                    }
                }
                return ada;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t3)
                        return false;
                    if (!t1.value)
                        return false;
                    if (t1.value.toLowerCase() != 'while')
                        return false;
                    if (parse.exp.isExp(t2) == false)
                        return false;
                    return true;
                }
            }
        }
        parse.stmt = new Stmt();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Terjemah {
            terjemah(token) {
                console.log("terjemah");
                console.log(token);
                if (false) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_ANGKA) {
                    return token.value;
                }
                else if (token.type == parse.Kons.TY_ARG) {
                    return this.terjemah(token.token[0]) + ',' + this.terjemah(token.token[2]);
                }
                else if (token.type == parse.Kons.TY_RES_WORD) {
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
                        return "} else {";
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
                else if (token.type == parse.Kons.TY_BINOP) {
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
                else if (token.type == parse.Kons.TY_TEKS) {
                    return this.string(token.token);
                }
                else if (token.type == parse.Kons.TY_BARIS) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_FOR) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_FOR_STEP) {
                    let hasil = '';
                    return hasil;
                }
                else if (token.type == parse.Kons.TY_IF_EXP) {
                    return 'if (' + this.terjemah(token.token[1]) + ") {";
                }
                else if (token.type == parse.Kons.TY_IF_THEN_P) {
                    return this.terjemah(token.token[0]) + " " + this.terjemah(token.token[1]) + " }";
                }
                else if (token.type == parse.Kons.TY_KATA) {
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
                else if (token.type == parse.Kons.TY_KATA_DOT) {
                    return this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_KURUNG_KOSONG) {
                    return "()";
                }
                else if (token.type == parse.Kons.TY_MIN) {
                    return token.token[0].value + this.terjemah(token.token[1]);
                }
                else if (token.type == parse.Kons.TY_OP) {
                    if (token.value == "<>") {
                        return "!=";
                    }
                    else if (token.value.toLowerCase() == "mod") {
                        return " % ";
                    }
                    return token.value;
                }
                else if (token.type == parse.Kons.TY_PANGGIL_FUNGSI) {
                    let hsl = '';
                    hsl = this.terjemah(token.token[0]) + this.terjemah(token.token[1]);
                    if (parse.data.config.awaitFl) {
                        hsl = hsl.trim();
                        hsl = 'await ' + hsl;
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_PERINTAH) {
                    let hsl = '';
                    if (token.token.length == 2) {
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
                    if (parse.data.config.awaitFl) {
                        hsl = hsl.trim();
                        if (hsl.slice(0, 6) == 'return') {
                        }
                        else {
                            hsl = 'await ' + hsl;
                        }
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_WEND) {
                    return this.wend(token);
                }
                else if (token.type == parse.Kons.TY_SYMBOL) {
                    if (token.value == ".")
                        return token.value;
                    return token.value + " ";
                }
                else if (token.type == parse.Kons.TY_IF_ELSE_THEN_P) {
                    return "} else if " + " (" + this.terjemah(token.token[1]) + ") " + " { ";
                }
                else if (token.type == parse.Kons.TY_ELSE_THEN) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_FUNC_DEC) {
                    let hsl = '';
                    let st = parse.data.config.awaitFl;
                    parse.data.config.awaitFl = false;
                    hsl = token.token[0].value.toLowerCase() + " " + this.terjemah(token.token[1]) + " {";
                    parse.data.config.awaitFl = st;
                    if (parse.data.config.awaitFl) {
                        hsl = 'async ' + hsl;
                    }
                    return hsl;
                }
                else if (token.type == parse.Kons.TY_RETURN) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_ARG2) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_EXP) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_IF_THEN) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_BINOP_EQ) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_IF_THEN_P2) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_TYPE_NEW_DEC) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_IF_EXP_P) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_MOD) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_KURUNG_ARG2) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_DIM_DEC) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_DIM_ASSINMENT) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_RETURN_EXP) {
                    return '';
                }
                else {
                    console.log(token);
                    console.log('token type ' + token.type);
                    throw Error();
                }
            }
            string(token) {
                let hasil = '';
                token.forEach((item) => {
                    hasil += item.value;
                });
                return " " + hasil;
            }
            wend(token) {
                let hasil = '';
                hasil += token.token[0].value.toLowerCase();
                hasil += " (" + this.terjemah(token.token[1]) + ") {";
                return hasil;
            }
            varAssign(token) {
                if (token.token.length == 2) {
                    let token1 = token.token[0].value.toLowerCase();
                    let token2 = this.terjemah(token.token[1]);
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
        parse.terj = new Terjemah();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class TypeStmt {
            typeNew() {
                let ada = false;
                function check(t1, t2, t3, t4) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (!t4)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA_DOT)
                        return false;
                    if (t2.valueLowerCase != "=")
                        return false;
                    if (t3.valueLowerCase != "new")
                        return false;
                    if (t4.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3, t4)) {
                        tokenBaru = {
                            type: parse.Kons.TY_TYPE_NEW_DEC,
                            token: [t1, t2, t3, t4]
                        };
                        console.log("type dec");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            typeDef() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.valueLowerCase != "type")
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_TYPE_DEF,
                            token: [t1, t2]
                        };
                        console.log("type def");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            fieldDef() {
                let ada = false;
                function check(t1, t2) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (t1.valueLowerCase != "field")
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2)) {
                        tokenBaru = {
                            type: parse.Kons.TY_FIELD_DEF,
                            token: [t1, t2]
                        };
                        console.log("field def");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            fieldDefM() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_TYPE_DEF)
                        return false;
                    if (t2.valueLowerCase != ",")
                        return false;
                    if (t2.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_FIELD_DEF,
                            token: [t1, t2]
                        };
                        console.log("field def");
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                return ada;
            }
            typeAkses() {
                let ada = false;
                function check(t1, t2, t3) {
                    if (!t1)
                        return false;
                    if (!t2)
                        return false;
                    if (!t3)
                        return false;
                    if (t1.type != parse.Kons.TY_KATA)
                        return false;
                    if (t2.valueLowerCase != '\\')
                        return false;
                    if (t3.type != parse.Kons.TY_KATA)
                        return false;
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t1, t2, t3)) {
                        tokenBaru = {
                            type: parse.Kons.TY_TYPE_ACCESS,
                            token: [t1, t2, t3]
                        };
                        console.log("type access");
                        console.log(tokenBaru);
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
                        ada = true;
                    }
                }
                if (ada) {
                    parse.exp.exp();
                }
                return ada;
            }
        }
        parse.typeStmt = new TypeStmt();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
