"use strict";
// import { Util } from "./comp/Util.js";
/*
//After, And, Before, Case, Const, Data, Default, Delete, Dim, Each,
Else, ElseIf, End, EndIf, Exit, False, Field, First, Float, For,
    Forever, Function, Global, Gosub, Goto, If, Insert, Int, Last, Local,
    Mod, New, Next, Not, Null, Or, Pi, Read, Repeat, Restore, Return,
    Sar, Select, Shl, Shr, Step, Str, Then, To, True, Type, Until, Wend,
    While, Xor, Include
    */
class ParseBlitz {
    dataStr = '';
    kataKunci = [
        "After", "And", "Before", "Case", "Const", "Data", "Default", "Delete", "Dim", "Each", "Else",
        "ElseIf", "End", "EndIf", "Exit", "False", "Field", "First", "Float", "For",
        "Forever", "Function", "Global", "Gosub", "Goto", "If", "Insert", "Int", "Last", "Local",
        "Mod", "New", "Next", "Not", "Null", "Or", "Pi", "Read", "Repeat", "Restore", "Return",
        "Sar", "Select", "Shl", "Shr", "Step", "Str", "Then", "To", "True", "Type", "Until", "Wend",
        "While", "Xor", "Include",
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
        ";",
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
    // private opr: string[] = [
    //     "=",
    //     "+",
    //     "/",
    //     "*",
    //     "-",
    //     "==",
    //     "<=",
    //     ">=",
    //     ">",
    //     "<",
    //     "!="
    // ];
    async load(file) {
        let hasil = await ha.comp.util.Ajax2('get', file, '');
        return hasil;
    }
    async mulai(file) {
        console.log('load file: ' + file);
        this.dataStr = await this.load(file);
        console.log("lexer2");
        this.lexer2();
        // this.parse(baris);
    }
    // parse(str: string): void {
    //     let baris: string = str;
    //     baris = baris.trim();
    //     baris += String.fromCharCode(10);
    //     while (baris.length > 0) {
    //         let baris2: string = this.lexer(baris);
    //         if (baris == baris2) {
    //             console.debug("=======================");
    //             console.debug(baris.charCodeAt(0));
    //             console.debug(baris.charAt(0));
    //             console.debug(baris.charCodeAt(baris.length - 1));
    //             console.debug(baris.charAt(baris.length - 1));
    //             console.debug(baris.slice(0, 200));
    //             console.debug("=======================");
    //             throw new Error('');
    //         }
    //         else {
    //             baris = baris2;
    //         }
    //     }
    // }
    // sisa(str: string): void {
    //     console.debug(str);
    // }
    lexer2() {
        // let baris2: string;
        // let baris: string = str;
        // let ulang: boolean = true;
        while (this.dataStr.length > 0) {
            if (this.getKeyword()) { }
            else if (this.getKata()) { }
            else if (this.getLineNumb()) { }
            else if (this.getNumber()) { }
            else {
                console.log(this.dataStr.slice(0, 100));
                console.log(this.dataStr.charCodeAt(0));
                console.log(this.dataStr.charAt(0));
                throw Error('');
            }
        }
        console.log("ok");
    }
    getNumber() {
        let id = /^[0-9][0-9.]*/;
        let hsl = (this.dataStr.match(id));
        if (hsl) {
            this.dataStr = this.dataStr.slice(hsl[0].length);
            console.debug('no: ' + hsl);
            // this.sisa(str);
            return true;
        }
        return false;
    }
    getKeyword() {
        for (let i = 0; i < this.kataKunci.length; i++) {
            let kata = this.kataKunci[i];
            if (this.dataStr.slice(0, kata.length) == kata) {
                console.debug('keyword: ' + kata);
                this.dataStr = this.dataStr.slice(kata.length);
                return true;
            }
        }
        return false;
    }
    getKata() {
        let id = /^[a-zA-Z_][a-zA-Z0-9_$%#]*/;
        let hsl = (this.dataStr.match(id));
        if (hsl) {
            this.dataStr = this.dataStr.slice(hsl[0].length);
            console.debug('kata: ' + hsl);
            return true;
        }
        return false;
    }
    getLineNumb() {
        if (this.dataStr.charCodeAt(0) == 13) {
            console.log('ln');
            this.dataStr = this.dataStr.slice(1, this.dataStr.length);
            return true;
        }
        if (this.dataStr.charCodeAt(0) == 10) {
            console.log('ln');
            this.dataStr = this.dataStr.slice(1, this.dataStr.length);
            return true;
        }
        if (this.dataStr.charCodeAt(0) == 9) {
            console.log('ln');
            this.dataStr = this.dataStr.slice(1, this.dataStr.length);
            return true;
        }
        return false;
    }
}
let p = new ParseBlitz();
p.mulai('./data/aristoids.bb');
