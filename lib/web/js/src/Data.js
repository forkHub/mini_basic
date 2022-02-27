"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Data {
            _dataStr = '';
            _token = [];
            _barisAr = [];
            config = new Config();
            _kataKunci2 = [
                "Dim",
                "If", "ElseIf", "EndIf", "Else", "Then",
                "For", "Next", "To",
                "Function", "end function", "Return",
                "While", "Wend",
                //const
                "false", "true", "null", "mod",
                //
                "//"
                //next
                // "Const", "Case", "Data", "Default", "Delete", "Each", "Exit", "Field", "First", "Float",
                // "Forever", "Gosub", "Goto", "Insert", "Int", "Last", "Local", "New", "Not", "Or",
                // "Pi", "Read", "Repeat", "Restore",
                // "Sar", "Select", "Shl", "Shr", "Step", "Str", "Type", "Until",
                // "Xor", "End", "And", "Global",
                // "After", "Before",
                //ignore
            ];
            _op = [
                "+",
                "/",
                "*",
                "-",
                "==",
                "<=",
                ">=",
                "<>",
                ">",
                "<",
                "!=",
                ";"
            ];
            _symbol = [
                //symbol
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
                //ignore
                " "
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
