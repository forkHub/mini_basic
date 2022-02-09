import { Util } from "./comp/Util.js";

/*
//After, And, Before, Case, Const, Data, Default, Delete, Dim, Each, 
Else, ElseIf, End, EndIf, Exit, False, Field, First, Float, For,
    Forever, Function, Global, Gosub, Goto, If, Insert, Int, Last, Local,
    Mod, New, Next, Not, Null, Or, Pi, Read, Repeat, Restore, Return,
    Sar, Select, Shl, Shr, Step, Str, Then, To, True, Type, Until, Wend,
    While, Xor, Include
    */

class ParseBlitz {
    private kataKunci: string[] = [
        "After", "And", "Before", "Case", "Const", "Data", "Default", "Delete", "Dim", "Each", "Else",
        "ElseIf", "End", "EndIf", "Exit", "False", "Field", "First", "Float", "For",
        "Forever", "Function", "Global", "Gosub", "Goto", "If", "Insert", "Int", "Last", "Local",
        "Mod", "New", "Next", "Not", "Null", "Or", "Pi", "Read", "Repeat", "Restore", "Return",
        "Sar", "Select", "Shl", "Shr", "Step", "Str", "Then", "To", "True", "Type", "Until", "Wend",
        "While", "Xor", "Include"
    ];

    private opr: string[] = [
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
        "!="
    ];

    async load(file: string): Promise<string> {
        let hasil: string = await Util.Ajax2('get', file, '');
        return hasil;
    }

    async mulai(file: string): Promise<void> {
        let baris: string = await this.load(file);
        this.parse(baris);
    }

    parse(str: string): void {
        let baris: string = str;

        baris = baris.trim();
        baris += String.fromCharCode(10);

        while (baris.length > 0) {
            let baris2: string = this.lexer(baris);

            if (baris == baris2) {
                console.debug("=======================");
                console.debug(baris.charCodeAt(0));
                console.debug(baris.charAt(0));
                console.debug(baris.charCodeAt(baris.length - 1));
                console.debug(baris.charAt(baris.length - 1));
                console.debug(baris.slice(0, 200));
                console.debug("=======================");
                throw new Error('');
            }
            else {
                baris = baris2;
            }
        }
    }

    sisa(str: string): void {
        console.debug(str);
    }

    lexer(str: string): string {
        let baris2: string;
        let baris: string = str;
        let ulang: boolean = true;

        baris2 = baris;

        while (ulang) {
            ulang = true;

            baris2 = this.getComment(baris2);
            baris2 = this.getKeyword(baris2);
            baris2 = this.getOp(baris2);
            baris2 = this.getIdentifier(baris2);
            baris2 = this.getNumber(baris2);
            baris2 = this.getLineNumber(baris2);
            baris2 = this.getString(baris2);

            if (baris2 == baris) {
                ulang = false;
            }
            else {
                baris = baris2;
            }
        }

        return baris;
    }

    getFuncCall(str: string): string {
        str;
        return str;
    }

    getString(str: string): string {
        if (str.charAt(0) == '"') {

            let ulang: boolean = true;
            let idx: number = 0;

            while (ulang) {

                idx = str.indexOf('"', idx + 1);

                if (idx > 0) {
                    if (str.charAt(idx - 1) != '\\') {
                        // console.debug("char akhir: " + str.charAt(idx));
                        // console.debug("char sebelum: " + str.charAt(idx - 1));
                        ulang = false;
                    }
                }

            }

            console.debug("string: " + str.slice(0, idx + 1));
            // console.log("idx: " + idx);  
            str = str.slice(idx + 1);
        }

        return str;
    }

    getComment(str: string): string {
        let id: RegExp = /^;.*\n/;
        let hsl: RegExpMatchArray = (str.match(id));
        let hsl2: string;

        if (hsl) {
            hsl2 = hsl + '';
            str = str.slice(hsl2.length);
            console.debug('cmt: ' + hsl2);
        }

        return str;

    }

    getOp(str: string): string {
        for (let i: number = 0; i < this.opr.length; i++) {
            let kata: string = this.opr[i];

            if (str.slice(0, kata.length) == kata) {
                console.debug('opr: ' + kata);
                str = str.slice(kata.length);
                return str;
            }
        }

        return str;
    }

    getIdentifier(str: string): string {
        let id: RegExp = /^[a-zA-Z][a-zA-Z0-9_$]+/;
        let hsl: RegExpMatchArray = (str.match(id));

        if (hsl) {
            str = str.slice(hsl[0].length);
            console.debug('id: ' + hsl);
            // this.sisa(str);
        }

        return str;
    }

    getLineNumber(str: string): string {
        if (str.charCodeAt(0) == 10) {
            str = str.slice(1);
            console.debug('lb: ');
        }

        return str;

    }

    getNumber(str: string): string {
        let id: RegExp = /^[0-9][0-9.]+/;
        let hsl: RegExpMatchArray = (str.match(id));

        if (hsl) {
            str = str.slice(hsl[0].length);
            console.debug('no: ' + hsl);
            // this.sisa(str);
        }

        return str;
    }

    getKeyword(str: string): string {

        for (let i: number = 0; i < this.kataKunci.length; i++) {
            let kata: string = this.kataKunci[i];

            if (str.slice(0, kata.length) == kata) {
                console.debug('keyword: ' + kata);
                str = str.slice(kata.length);
                return str;
            }
        }

        return str;
    }
}

let p: ParseBlitz = new ParseBlitz();
p.mulai('./data/aristoids.bb');
