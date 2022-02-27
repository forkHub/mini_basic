"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Grammar {
            _barisObj;
            get barisObj() {
                return this._barisObj;
            }
            set barisObj(value) {
                this._barisObj = value;
            }
            isStmt(token) {
                if (token.type == parse.Kons.Ty_VAR_ASSIGNMENT)
                    return true;
                return false;
            }
            hapusSpace() {
                // console.group('hapus space');
                for (let i = 0; i < this._barisObj.token.length; i++) {
                    if (this._barisObj.token[i].value == ' ') {
                        // console.log('idx ' + i);
                        // console.log('sebelum:');
                        // console.log(this._barisObj.token);
                        this._barisObj.token = parse.ar.hapus(this._barisObj.token, i);
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
                while (this._barisObj.token.length > 1) {
                    if (false) { }
                    //BASIC
                    else if (parse.exp.teks()) { }
                    else if (this.hapusSpace()) { }
                    else if (parse.exp.kataDotFinal()) { }
                    else if (parse.exp.kataDot()) { }
                    else if (parse.exp.kataDotChain()) { }
                    else if (parse.exp.kurungKosong()) { }
                    else if (parse.exp.kurungIsi()) { }
                    else if (parse.exp.panggilfungsi()) { }
                    else if (parse.exp.min()) { }
                    // else if (exp.binopMin()) { }
                    else if (parse.exp.binop()) { }
                    else if (parse.exp.argument(this._barisObj.token)) { }
                    // else if (exp.argument()) { }
                    //EXP
                    //STMT
                    else if (parse.stmt.new2()) { }
                    else if (parse.stmt.for2()) { }
                    else if (parse.stmt.varAssign()) { }
                    else if (parse.stmt.modifier()) { }
                    else if (parse.stmt.ifPerintah()) { }
                    else if (parse.stmt.if2()) { }
                    else if (parse.stmt.elseIf()) { }
                    else if (parse.stmt.funcDec()) { }
                    else if (parse.stmt.perintah()) { }
                    // else if (stmt.perintah2()) { }
                    else {
                        console.log("error:");
                        console.log(this._barisObj.token);
                        throw Error('');
                    }
                }
                console.groupEnd();
            }
        }
        parse.grammar = new Grammar();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
