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
            _barisObj;
            _errList = [];
            _barisAktif = '';
            _ignore = [];
            get ignore() {
                return this._ignore;
            }
            get barisAktif() {
                return this._barisAktif;
            }
            set barisAktif(value) {
                this._barisAktif = value;
            }
            get errList() {
                return this._errList;
            }
            set errList(value) {
                this._errList = value;
            }
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
                "while", "wend", "repeat", "until",
                "const", "global", "local",
                "type", "field", "end type", "new",
                "delete", "before", "after", "each", "last",
                "false", "true", "null",
                "case", "select", "end select",
                "end",
                "dim",
                "//",
            ];
            _kataKunciDouble = [
                "end function",
                "end type",
                "end select",
                "else if"
            ];
            get kataKunciDouble() {
                return this._kataKunciDouble;
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
                "&&",
                "||",
                "="
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
                " ",
                "\t",
            ];
            _cmd = [
                "Graphics3D",
                "Include",
                "Global"
            ];
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
            constructor() {
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
                    if (t1.type != parse.Kons.TY_KATA) {
                        if (t1.type != parse.Kons.TY_KATA_DOT) {
                            return false;
                        }
                    }
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
                        parse.Kons.TY_ARG_KATA_M,
                        parse.Kons.TY_NEW
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
                        if (t0.type == parse.Kons.TY_EACH)
                            return false;
                        if (t0.type == parse.Kons.TY_DELETE)
                            return false;
                        if (t0.type == parse.Kons.TY_BEFORE)
                            return false;
                        if (t0.type == parse.Kons.TY_LAST)
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
                        if (t0.type == parse.Kons.TY_KATA_DOT)
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
                        parse.Kons.TY_FALSE,
                        parse.Kons.TY_TRUE,
                        parse.Kons.TY_NULL,
                        parse.Kons.TY_DIM_ASSINMENT
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
                        if (t0.type == parse.Kons.TY_EACH)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t0 = parse.parse.getToken(i - 1, parse.data.barisObj.token);
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let tokenBaru;
                    if (check(t0, t1)) {
                        tokenBaru = {
                            type: parse.Kons.TY_EXP,
                            token: [t1]
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
                        console.log(parse.parse.tokenToValue(tokenBaru));
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
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
                    if (t2.type != parse.Kons.TY_EXP) {
                        return false;
                    }
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
                    if (t2.type != parse.Kons.TY_ARG2) {
                        if (t2.type != parse.Kons.TY_ARG_KATA) {
                            return false;
                        }
                    }
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
                    if (t2.type != parse.Kons.TY_ARG) {
                        if (t2.type != parse.Kons.TY_ARG_KATA_M) {
                            return false;
                        }
                    }
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
                    if (t2.type != parse.Kons.TY_EXP) {
                        if (t2.type != parse.Kons.TY_KATA) {
                            return false;
                        }
                    }
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
                        if (t0.type == parse.Kons.TY_MIN)
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
                    if (t1.type != parse.Kons.TY_EXP) {
                        return false;
                    }
                    if (t2.valueLowerCase != ',')
                        return false;
                    if (t3.type != parse.Kons.TY_EXP) {
                        return false;
                    }
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
                    if (t3.type != parse.Kons.TY_EXP) {
                        return false;
                    }
                    if (t4) {
                        if (t4.valueLowerCase == "+")
                            return false;
                        if (t4.valueLowerCase == "-")
                            return false;
                        if (t4.type == parse.Kons.TY_OP)
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
                    if (t1.type != parse.Kons.TY_KATA) {
                        if (t1.type != parse.Kons.TY_KATA_DOT) {
                            return false;
                        }
                    }
                    if ('dim' == t1.valueLowerCase)
                        return false;
                    let kurung = [
                        parse.Kons.TY_KURUNG_ARG2,
                        parse.Kons.TY_KURUNG_KOSONG,
                        parse.Kons.TY_KURUNG_SINGLE,
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
                    if (t3) {
                        if (t3.valueLowerCase == '=')
                            return false;
                        if (t3.valueLowerCase == '\\')
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
        }
        parse.exp = new Exp();
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
            static TY_SYMBOL = 8;
            static TY_TRUE = 9;
            static TY_FALSE = 10;
            static TY_NULL = 11;
            static TY_COLON = 12;
            static TY_KOMA = 13;
            static TY_KURUNG_BUKA = 14;
            static TY_KURUNG_TUTUP = 15;
            static TY_NEW = 17;
            static TY_BACK_SLASH = 18;
            static TY_DOT = 19;
            static TY_UNTIL = 20;
            static TY_MODIFIER = 21;
            static TY_FOR = 22;
            static TY_EACH = 23;
            static TY_DELETE = 24;
            static TY_TYPE = 25;
            static TY_FIELD = 26;
            static TY_BEFORE = 27;
            static TY_AFTER = 28;
            static TY_LAST = 29;
            static TY_ELSE_IF = 30;
            static TY_ELSE = 31;
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
            static TY_PANGGIL_FUNGSI = 203;
            static TY_MIN = 205;
            static TY_EXP = 240;
            static TY_STMT = 300;
            static TY_STMT_COLON = 301;
            static TY_STMT_M = 302;
            static TY_PERINTAH = 303;
            static TY_LABEL = 304;
            static TY_FOR_DEC = 305;
            static TY_FOR_STEP = 306;
            static TY_WEND = 307;
            static TY_FUNC_DEC = 308;
            static TY_RETURN = 310;
            static TY_RETURN_EXP = 311;
            static TY_FOR_EACH = 312;
            static TY_DIM = 400;
            static TY_DIM_ASSINMENT = 401;
            static TY_DIM_DEC = 402;
            static TY_DIM_DEC_VAR = 403;
            static TY_DIM_PROP_ASSINMENT = 404;
            static TY_IF_EXP = 600;
            static TY_IF_THEN = 650;
            static TY_ELSE_DEC = 700;
            static TY_ELSE_THEN = 701;
            static TY_ELSEIF_DEC = 750;
            static TY_ELSEIF_THEN = 751;
            static TY_MOD_DEC = 800;
            static TY_MOD_DEC_M = 801;
            static TY_MOD_ISI = 802;
            static TY_MOD_ISI_M = 803;
            static TY_CASE = 900;
            static TY_SELECT = 910;
            static TY_END_SELECT = 920;
            static TY_CASE_DEC = 930;
            static TY_SELECT_DEC = 940;
            static TY_UNTIL_DEC = 1000;
        }
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        parse.aturanExp = [
            {
                type: parse.Kons.TY_BINOP,
                aturan: {
                    nama: 'binop baru',
                    kondisi: [
                        [parse.Kons.TY_KATA, parse.Kons.TY_EXP, parse.Kons.TY_KATA_DOT],
                        [parse.Kons.TY_OP],
                        [parse.Kons.TY_KATA, parse.Kons.TY_EXP]
                    ],
                    sbl: [parse.Kons.TY_MODIFIER, parse.Kons.TY_OP, parse.Kons.TY_BACK_SLASH],
                    stl: [parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE]
                }
            }
        ];
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Grammar {
            hapusSpace() {
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let value = parse.data.barisObj.token[i].value;
                    if (value == ' ' || (value == '\t')) {
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
                    else if (parse.exp.not()) { }
                    else if (parse.exp.arg2()) { }
                    else if (parse.exp.args(parse.data.barisObj.token)) { }
                    else if (parse.exp.kurungArg2()) { }
                    else if (parse.exp.kurungArg()) { }
                    else if (parse.gm2.checkLog(parse.gm2.aturanExpAr)) { }
                    else if (parse.stmt.modifier()) { }
                    else if (parse.stmt.modIsi()) { }
                    else if (parse.stmt.returnExp()) { }
                    else if (parse.stmt.forPendek()) { }
                    else if (parse.stmt.forStep()) { }
                    else if (parse.ifStmt.ifExp()) { }
                    else if (parse.ifStmt.ifThen()) { }
                    else if (parse.ifStmt.elseIfThen()) { }
                    else if (parse.stmt.funcDec()) { }
                    else if (parse.stmt.while2()) { }
                    else if (parse.stmt.dimDec()) { }
                    else if (parse.stmt.dimAssign()) { }
                    else if (parse.caseStmt.caseDec()) { }
                    else if (parse.caseStmt.selectDec()) { }
                    else if (parse.stmt.stmtColon()) { }
                    else if (parse.stmt.stmtColon2()) { }
                    else if (parse.stmt.stmtMul()) { }
                    else if (parse.gm2.checkLog(parse.gm2.aturanStmtAr)) { }
                    else if (parse.data.barisObj.token.length > 1) {
                        console.log("error:");
                        console.log(parse.data.barisObj.token);
                        parse.data.barisObj.token.forEach((token) => {
                            console.log(parse.parse.tokenToValue(token));
                        });
                        parse.data.errList.push(parse.data.barisAktif);
                        console.groupEnd();
                        return;
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
            _aturanExpAr = [];
            get aturanExpAr() {
                return this._aturanExpAr;
            }
            _aturanStmtAr = [];
            get aturanStmtAr() {
                return this._aturanStmtAr;
            }
            constructor() {
            }
            aturanExp() {
                this._aturanExpAr = this._aturanExpAr.concat([
                    {
                        type: parse.Kons.TY_BINOP,
                        aturan: {
                            nama: 'binop baru',
                            kondisi: [
                                [parse.Kons.TY_KATA, parse.Kons.TY_EXP, parse.Kons.TY_KATA_DOT],
                                [parse.Kons.TY_OP],
                                [parse.Kons.TY_KATA, parse.Kons.TY_EXP]
                            ],
                            sbl: [parse.Kons.TY_MODIFIER, parse.Kons.TY_OP, parse.Kons.TY_BACK_SLASH],
                            stl: [parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE]
                        }
                    }
                ]);
                {
                    this.aturanExpAr.push({
                        type: parse.Kons.TY_ARG_KATA,
                        aturan: {
                            nama: 'arg_kata',
                            kondisi: [
                                [parse.Kons.TY_KATA],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_KATA]
                            ],
                            sbl: [parse.Kons.TY_KOMA, parse.Kons.TY_OP, parse.Kons.TY_BACK_SLASH, parse.Kons.TY_MODIFIER, parse.Kons.TY_MODIFIER],
                            stl: [
                                parse.Kons.TY_OP,
                                parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE
                            ]
                        }
                    });
                    this.aturanExpAr.push({
                        type: parse.Kons.TY_ARG_KATA_M,
                        aturan: {
                            nama: 'arg_kata_m',
                            kondisi: [
                                [parse.Kons.TY_ARG_KATA],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_KATA]
                            ],
                            sbl: [parse.Kons.TY_KOMA,],
                            stl: [
                                parse.Kons.TY_OP,
                                parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE
                            ]
                        }
                    });
                }
                {
                    this.aturanExpAr.push({
                        type: parse.Kons.TY_ARG2,
                        aturan: {
                            nama: 'arg kata exp',
                            kondisi: [
                                [parse.Kons.TY_KATA,],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_EXP, ,]
                            ],
                            sbl: [parse.Kons.TY_KOMA, parse.Kons.TY_OP, parse.Kons.TY_BACK_SLASH,],
                            stl: [parse.Kons.TY_OP]
                        }
                    });
                    this.aturanExpAr.push({
                        type: parse.Kons.TY_ARG2,
                        aturan: {
                            nama: 'exp , kata',
                            kondisi: [
                                [parse.Kons.TY_EXP,],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_KATA,]
                            ],
                            sbl: [parse.Kons.TY_KOMA, parse.Kons.TY_BACK_SLASH, parse.Kons.TY_OP],
                            stl: [parse.Kons.TY_OP, parse.Kons.TY_BACK_SLASH]
                        }
                    });
                }
                this.aturanExpAr.push({
                    type: parse.Kons.TY_ARG,
                    aturan: {
                        nama: 'arg campur',
                        kondisi: [
                            [parse.Kons.TY_ARG_KATA_M, parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG2, parse.Kons.TY_ARG,],
                            [parse.Kons.TY_KOMA],
                            [parse.Kons.TY_EXP, parse.Kons.TY_KATA,]
                        ],
                        sbl: [parse.Kons.TY_KOMA],
                        stl: [
                            parse.Kons.TY_OP,
                            parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_KURUNG_ARG2, parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_KOSONG, parse.Kons.TY_KURUNG_SINGLE
                        ]
                    }
                });
            }
            aturanStmt() {
                this._aturanStmtAr = this.aturanStmtAr.concat([
                    {
                        type: parse.Kons.TY_PERINTAH,
                        aturan: {
                            nama: 'perintah ',
                            kondisi: [
                                [parse.Kons.TY_KATA],
                                [parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG_KATA_M, parse.Kons.TY_ARG, parse.Kons.TY_ARG2, parse.Kons.TY_EXP],
                            ],
                            sbl: [, parse.Kons.TY_OP,],
                            stl: [parse.Kons.TY_KURUNG_ARG, parse.Kons.TY_ARG2, parse.Kons.TY_ARG_KATA, parse.Kons.TY_ARG_KATA_M, parse.Kons.TY_KURUNG_BUKA, parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_KURUNG_KOSONG]
                        }
                    },
                    {
                        type: parse.Kons.TY_LABEL,
                        aturan: {
                            nama: 'label ',
                            kondisi: [
                                [parse.Kons.TY_DOT],
                                [parse.Kons.TY_KATA],
                            ],
                            sbl: [parse.Kons.TY_KATA],
                            stl: []
                        }
                    },
                    {
                        type: parse.Kons.TY_UNTIL_DEC,
                        aturan: {
                            nama: 'until  ',
                            kondisi: [
                                [parse.Kons.TY_UNTIL],
                                [parse.Kons.TY_EXP],
                            ],
                            sbl: [],
                            stl: []
                        }
                    },
                    {
                        type: parse.Kons.TY_MOD_ISI_M,
                        aturan: {
                            nama: 'mod isi tambahan argument  ',
                            kondisi: [
                                [parse.Kons.TY_MOD_ISI],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_KATA, parse.Kons.TY_EXP],
                            ],
                            sbl: [],
                            stl: [parse.Kons.TY_OP]
                        }
                    },
                    {
                        type: parse.Kons.TY_MOD_ISI_M,
                        aturan: {
                            nama: 'mod isi tambahan argument2  ',
                            kondisi: [
                                [parse.Kons.TY_MOD_ISI_M],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_EXP, parse.Kons.TY_KATA],
                            ],
                            sbl: [],
                            stl: [parse.Kons.TY_OP]
                        }
                    },
                    {
                        type: parse.Kons.TY_MOD_DEC_M,
                        aturan: {
                            nama: 'mod, arg  ',
                            kondisi: [
                                [parse.Kons.TY_MOD_DEC, parse.Kons.TY_MOD_DEC_M],
                                [parse.Kons.TY_KOMA],
                                [parse.Kons.TY_KATA],
                            ],
                            sbl: [], stl: []
                        }
                    },
                    {
                        type: parse.Kons.TY_FOR_EACH,
                        aturan: {
                            nama: 'for each  ',
                            kondisi: [
                                [parse.Kons.TY_FOR],
                                [parse.Kons.TY_KATA, parse.Kons.TY_KATA_DOT],
                                [parse.Kons.TY_OP],
                                [parse.Kons.TY_EACH],
                                [parse.Kons.TY_KATA]
                            ],
                            sbl: [],
                            stl: []
                        }
                    },
                    {
                        aturan: {
                            nama: 'delete stmt',
                            kondisi: [
                                [parse.Kons.TY_DELETE],
                                [parse.Kons.TY_KATA, parse.Kons.TY_KATA_DOT],
                            ],
                            sbl: [],
                            stl: []
                        }
                    },
                    {
                        type: parse.Kons.TY_ELSE_DEC,
                        aturan: {
                            nama: 'else stmt',
                            kondisi: [
                                [parse.Kons.TY_ELSE],
                                [parse.Kons.TY_EXP, parse.Kons.TY_PERINTAH],
                            ],
                            sbl: [],
                            stl: []
                        }
                    },
                ]);
                this._aturanStmtAr = this.aturanStmtAr.concat([
                    {
                        type: parse.Kons.TY_DIM_DEC,
                        aturan: {
                            nama: 'dim dec',
                            kondisi: [
                                [parse.Kons.TY_DIM],
                                [parse.Kons.TY_KATA_DOT, parse.Kons.TY_KATA],
                                [parse.Kons.TY_KURUNG_SINGLE, parse.Kons.TY_ARG2, parse.Kons.TY_ARG_KATA]
                            ],
                            sbl: [],
                            stl: []
                        }
                    }
                ]);
            }
            init() {
                this.aturanExp();
                this.aturanStmt();
            }
            checkLog(aturan) {
                let hasil = false;
                console.group('check');
                hasil = this.check(aturan);
                console.groupEnd();
                return hasil;
            }
            check(aturanAr) {
                let idxAturan = 0;
                let aturan;
                let barisAda;
                let checkAda = false;
                while (true) {
                    aturan = aturanAr[idxAturan];
                    barisAda = this.checkBaris(parse.data.barisObj.token, aturan);
                    if (barisAda) {
                        checkAda = true;
                        idxAturan = 0;
                    }
                    else {
                        idxAturan++;
                        if (idxAturan >= aturanAr.length) {
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
                        for (let j = 0; j < aturan.aturan.kondisi.length; j++) {
                            tokenBaru.token.push(parse.parse.getToken(i + j, tokenAr));
                        }
                        console.log(aturan.aturan.nama);
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
                for (let i = 0; i < aturan.aturan.kondisi.length; i++) {
                    t = parse.parse.getToken(idx + i, tokenAr);
                    if (!t) {
                        hasil = false;
                    }
                    else {
                        let cocok = this.checkKondisi(aturan.aturan.kondisi[i], t);
                        if (!cocok) {
                            hasil = false;
                        }
                        else {
                        }
                    }
                }
                t = parse.parse.getToken(idx - 1, tokenAr);
                if (t) {
                    if (aturan.aturan.sbl.indexOf(t.type) >= 0) {
                        hasil = false;
                    }
                }
                t = parse.parse.getToken(idx + aturan.aturan.kondisi.length, tokenAr);
                if (t) {
                    if (aturan.aturan.stl.indexOf(t.type) >= 0) {
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
                    if (t1.valueLowerCase != "if") {
                        if (t1.type != parse.Kons.TY_ELSE_IF) {
                            return false;
                        }
                    }
                    if (t2.type != parse.Kons.TY_EXP) {
                        if (t2.type != parse.Kons.TY_DIM_ASSINMENT) {
                            return false;
                        }
                    }
                    if (t3) {
                        if (t3.type == parse.Kons.TY_OP)
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
                    this.ifThen();
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
        class Lexer {
            lexer() {
                console.group('lexer start');
                while (parse.data.dataStr.length > 0) {
                    if (this.keyWordDouble()) { }
                    else if (this.getString()) { }
                    else if (this.getComment()) { }
                    else if (this.getTab()) { }
                    else if (this.getOp()) { }
                    else if (this.getKata()) { }
                    else if (this.getNumber()) { }
                    else if (this.getSymbol()) { }
                    else {
                        let token = {
                            value: parse.data.dataStr.charAt(0),
                            type: parse.Kons.TY_SYMBOL,
                            valueLowerCase: parse.data.dataStr.charAt(0).toLowerCase()
                        };
                        parse.data.token.push(token);
                        parse.data.dataStr = parse.data.dataStr.slice(1);
                        console.group('found unknown character');
                        console.log(parse.data.dataStr.slice(0, 10));
                        console.log(parse.data.dataStr.charCodeAt(0));
                        console.log(parse.data.dataStr.charAt(0));
                        console.groupEnd();
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
            getTab() {
                let char1;
                char1 = parse.data.dataStr.charAt(0);
                if (char1 == "\t") {
                    parse.data.dataStr = parse.data.dataStr.slice(1);
                    return true;
                }
                return false;
            }
            getComment() {
                let char1;
                char1 = parse.data.dataStr.charAt(0);
                if (char1 == ";") {
                    parse.data.dataStr = '';
                    return true;
                }
                return false;
            }
            getString() {
                let char1;
                char1 = parse.data.dataStr.charAt(0);
                if (char1 == "\"") {
                    let idx = this.kutip2(parse.data.dataStr);
                    if (idx < 0) {
                        ha.comp.log.log("string tidak ketemu");
                        throw Error();
                    }
                    else {
                        parse.data.token.push({
                            value: parse.data.dataStr.slice(0, idx + 1),
                            type: parse.Kons.TY_TEKS
                        });
                        parse.data.dataStr = parse.data.dataStr.slice(idx + 1);
                        return true;
                    }
                }
                return false;
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
            keyWordDouble() {
                for (let i = 0; i < parse.data.kataKunciDouble.length; i++) {
                    let kata = parse.data.kataKunciDouble[i];
                    if (parse.data.dataStr.slice(0, kata.length).toLowerCase() == kata.toLowerCase()) {
                        let token = {
                            value: kata,
                            type: parse.Kons.TY_RES_WORD,
                            valueLowerCase: kata.toLowerCase()
                        };
                        let lc = kata.toLowerCase();
                        if (false) { }
                        else if ("end select" == lc) {
                            token.type = parse.Kons.TY_END_SELECT;
                        }
                        else if ("else if" == lc) {
                            token.type = parse.Kons.TY_ELSE_IF;
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
                            token.type = parse.Kons.TY_OP;
                        }
                        else if ("\\" == lc) {
                            token.type = parse.Kons.TY_BACK_SLASH;
                        }
                        else if ("." == lc) {
                            token.type = parse.Kons.TY_DOT;
                        }
                        else if ("\t" == lc) {
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
                    else if ("each" == lc) {
                        token.type = parse.Kons.TY_EACH;
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
                    else if ("dim" == lc) {
                        token.type = parse.Kons.TY_DIM;
                    }
                    else if ("new" == lc) {
                        token.type = parse.Kons.TY_NEW;
                    }
                    else if ("and" == lc) {
                        token.type = parse.Kons.TY_OP;
                    }
                    else if ("or" == lc) {
                        token.type = parse.Kons.TY_OP;
                    }
                    else if ("xor" == lc) {
                        token.type = parse.Kons.TY_OP;
                    }
                    else if ("mod" == lc) {
                        token.type = parse.Kons.TY_OP;
                    }
                    else if ("not" == lc) {
                        token.type = parse.Kons.TY_OP;
                    }
                    else if ("until" == lc) {
                        token.type = parse.Kons.TY_UNTIL;
                    }
                    else if ("global" == lc) {
                        token.type = parse.Kons.TY_MODIFIER;
                    }
                    else if ("local" == lc) {
                        token.type = parse.Kons.TY_MODIFIER;
                    }
                    else if ("const" == lc) {
                        token.type = parse.Kons.TY_MODIFIER;
                    }
                    else if ("for" == lc) {
                        token.type = parse.Kons.TY_FOR;
                    }
                    else if ("delete" == lc) {
                        token.type = parse.Kons.TY_DELETE;
                    }
                    else if ("else" == lc) {
                        token.type = parse.Kons.TY_ELSE;
                    }
                    else {
                    }
                    return true;
                }
                return false;
            }
            kutip2(str) {
                let idx = 0;
                let mulai = 1;
                while (true) {
                    idx = str.indexOf("\"", mulai);
                    if (idx <= 0)
                        return -1;
                    if (idx >= 1)
                        return idx;
                }
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
                console.groupCollapsed('parse: ' + str);
                parse_1.data.dataStr = parse_1.data.dataStr.trim();
                while (parse_1.data.token.length > 0) {
                    parse_1.data.token.pop();
                }
                console.log('str ' + parse_1.data.dataStr);
                parse_1.data.barisAktif = parse_1.data.dataStr;
                if (parse_1.data.ignore.indexOf(parse_1.data.barisAktif) >= 0) {
                    console.log('ignore: ' + parse_1.data.barisAktif);
                    console.groupEnd();
                    return;
                }
                parse_1.lexer.lexer();
                parse_1.data.barisObj = {
                    baris: str,
                    n: 0,
                    terjemah: '',
                    token: parse_1.data.token
                };
                parse_1.grammar.grammar();
                console.groupEnd();
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
                function check(t1, t2, t3, t4, t5) {
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
                    if (t5) {
                        if (t5.type == parse.Kons.TY_KATA)
                            return false;
                    }
                    return true;
                }
                let ada = false;
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    let t4 = parse.parse.getToken(i + 3, parse.data.barisObj.token);
                    let t5 = parse.parse.getToken(i + 4, parse.data.barisObj.token);
                    if (check(t1, t2, t3, t4, t5)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_DIM_ASSINMENT,
                            token: [t1, t2, t3, t4]
                        };
                        console.log("dim assign");
                        console.log(tokenBaru);
                        console.log(t5);
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
                            type: parse.Kons.TY_FOR_DEC
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
                    if (parse.Kons.TY_FOR_DEC != t1.type)
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
                    if (t2.type != parse.Kons.TY_KATA) {
                        if (t2.type != parse.Kons.TY_KATA_DOT) {
                            return false;
                        }
                    }
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
                function check(t1, t2, t3) {
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
                    if (t3) {
                    }
                    return true;
                }
                for (let i = 0; i < parse.data.barisObj.token.length; i++) {
                    let t1 = parse.parse.getToken(i + 0, parse.data.barisObj.token);
                    let t2 = parse.parse.getToken(i + 1, parse.data.barisObj.token);
                    let t3 = parse.parse.getToken(i + 2, parse.data.barisObj.token);
                    if (check(t1, t2, t3)) {
                        let tokenBaru;
                        tokenBaru = {
                            type: parse.Kons.TY_MOD_DEC,
                            token: [t1, t2]
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
                    if (t1.type != parse.Kons.TY_MOD_DEC)
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
                        parse.data.barisObj.token = parse.ar.ganti(parse.data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru);
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
                else if (token.type == parse.Kons.TY_FOR_DEC) {
                    return '';
                }
                else if (token.type == parse.Kons.TY_FOR_STEP) {
                    let hasil = '';
                    return hasil;
                }
                else if (token.type == parse.Kons.TY_IF_EXP) {
                    return 'if (' + this.terjemah(token.token[1]) + ") {";
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
                else if (token.type == parse.Kons.TY_MODIFIER) {
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
    var comp;
    (function (comp) {
        class BaseComponent {
            _template = '';
            _elHtml = document.createElement('div');
            _parent;
            onRender() {
            }
            onAttach() {
            }
            onBuild() {
            }
            onDetach() {
            }
            mulai(...params) {
                params;
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
                this.onAttach();
            }
            detach() {
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    this.onDetach();
                    return true;
                }
                this.onDetach();
                return false;
            }
            show(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'block';
            }
            hide(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'none';
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build() {
                let div = document.createElement('div');
                let el;
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml)
                    throw new Error('');
                this.onBuild();
            }
            getTemplate(query) {
                let template = document.body.querySelector('template').content;
                return template.querySelector(query).cloneNode(true);
            }
            getElFromDoc(query) {
                let el;
                el = document.querySelector(query);
                if (!el)
                    throw new Error();
                return el;
            }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Bind {
            bindList = [];
            reg(setter, getter) {
                let bindObj = {
                    data: '',
                    setter: setter,
                    getter: getter
                };
                this.bindList.push(bindObj);
                let data = bindObj.getter();
                bindObj.data = data;
            }
            update() {
                this.bindList.forEach((item) => {
                    let data = item.getter();
                    if (item.data != data) {
                        item.setter();
                        item.data = data;
                    }
                    else {
                    }
                });
            }
        }
        comp.bind = new Bind();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Dialog extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='comp dialog'>
					<div class='box'>
						<p class='deskripsi'>Contoh dialog </p>
						<button class="btn btn-primary ok">OK</button>
					</div>
				</div>
				`;
                this.build();
            }
            init() {
                this.detach();
            }
            tampil(pesan = '', def = true) {
                this.p.innerHTML = pesan;
                if (def) {
                    this.okTbl.onclick = () => {
                        this.detach();
                    };
                }
                this.attach(document.body);
                this._elHtml.style.display = 'block';
            }
            get okTbl() {
                return this.getEl('button.ok');
            }
            get p() {
                return this.getEl('p');
            }
        }
        comp.dialog = new Dialog();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat</p> 
					</div>
				</div>
			`;
                this.build();
            }
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Logger2 {
            _aktif = true;
            get aktif() {
                return this._aktif;
            }
            set aktif(value) {
                this._aktif = value;
            }
            constructor() {
            }
            group(msg) {
                if (this._aktif) {
                    console.group(msg);
                    msg;
                }
            }
            groupEnd() {
                if (this._aktif) {
                    console.groupEnd();
                }
            }
            log(msg) {
                if (this._aktif) {
                    console.log(msg);
                    msg;
                }
            }
        }
        comp.log = new Logger2();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            view = new View();
            constructor() {
            }
            tampil(tombol) {
                while (this.view.box.firstChild) {
                    this.view.box.removeChild(this.view.box.firstChild);
                }
                tombol.forEach((item) => {
                    this.buatTombol(item);
                });
                this.view.attach(document.body);
            }
            buatClass(label) {
                let hasil;
                hasil = label.toLowerCase();
                while (hasil.indexOf(' ') > -1) {
                    hasil = hasil.replace(' ', '-');
                }
                return hasil;
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.classList.add(this.buatClass(t.label));
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
	
					</div>
				</div>
			`;
                this.build();
                this.box.style.backgroundColor = 'white';
                this.box.style.padding = '8px';
                this.box.style.textAlign = 'center';
                this._elHtml.onclick = () => {
                    this.detach();
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static sUserId = 'user_id';
            static sLevel = 'level';
            static sFilter = 'filter';
            static storageId = 'xyz.hagarden.tugas';
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
                let xml;
                xml = await this.Ajax(type, urlServer, dataStr, pf);
                if (401 == xml.status) {
                    window.top.location.href = loginUrl;
                    return null;
                }
                else {
                    return xml;
                }
            }
            static async Ajax2(type, url, dataStr, pf = null) {
                let x = await this.Ajax(type, url, dataStr, pf);
                if (x.status == 200 || x.status == 0) {
                    return x.responseText;
                }
                console.log('error status code: ' + x.status);
                throw Error(x.responseText);
            }
            static async sql(query) {
                query;
                return [];
            }
            static async Ajax(type, url, dataStr, pf = null) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data');
                        console.log("type " + type);
                        comp.loading.attach(document.body);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            console.log('xhr error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (pf) {
                                pf(p);
                            }
                        };
                        xhr.open(type, url + "", true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.send(dataStr);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        comp.loading.detach();
                        reject(new Error(e.message));
                    }
                });
            }
        }
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
