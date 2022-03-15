declare namespace ha.parse {
    class Baris {
        lines(): void;
        bersih(tokenAr: Itoken[]): Itoken[];
        valid(token: Itoken[]): boolean;
        renderLines(token: Itoken[]): string;
        getLineBreak(idx: number): number;
    }
    export var baris: Baris;
    export {};
}
declare namespace ha.parse {
    class Data {
        private _dataStr;
        private _token;
        private _barisAr;
        private _barisObj;
        readonly config: Config;
        get barisObj(): IBarisObj;
        set barisObj(value: IBarisObj);
        private _kataKunci2;
        private _op;
        private _symbol;
        private _cmd;
        get symbol(): string[];
        get dataStr(): string;
        set dataStr(value: string);
        get token(): Itoken[];
        get barisAr(): IBarisObj[];
        get kataKunci2(): string[];
        get op(): string[];
        set op(value: string[]);
        get cmd(): string[];
        set cmd(value: string[]);
    }
    class Config {
        private _awaitFl;
        get awaitFl(): boolean;
        set awaitFl(value: boolean);
    }
    export var data: Data;
    export {};
}
declare namespace ha.parse {
    class Exp {
        isExp(token: Itoken): boolean;
        exp2(): boolean;
        exp3(): boolean;
        isOp(token: Itoken): boolean;
        kataDot(): boolean;
        kataDotChain(): boolean;
        checkKataDotFinal(token: Itoken): boolean;
        kataDotFinal(): boolean;
        kotak(): boolean;
        kotak2(): boolean;
        kotak3(): boolean;
        array2(): boolean;
        arrayDot(): boolean;
        kurungKosong(): boolean;
        kurungSingle(): boolean;
        binopIf(): boolean;
        binop(): boolean;
        not(): boolean;
        min(): boolean;
        checkArgument(tokenAr: Itoken[]): boolean;
        argument(token: Itoken[]): boolean;
        panggilfungsi(): boolean;
        getQuote2(idx: number): number;
        teks(): boolean;
    }
    export var exp: Exp;
    export {};
}
declare namespace ha.parse {
    class Grammar {
        private _barisObj;
        get barisObj(): IBarisObj;
        set barisObj(value: IBarisObj);
        isStmt(token: Itoken): boolean;
        hapusSpace(): boolean;
        grammar(): void;
    }
    export var grammar: Grammar;
    export {};
}
interface Itoken {
    type: number;
    token?: Itoken[];
    value?: string;
    valueLowerCase?: string;
}
interface IBarisObj {
    n?: number;
    token?: Itoken[];
    baris?: string;
    terjemah?: string;
}
declare namespace ha.parse {
    class Kons {
        static readonly TY_ANGKA: number;
        static readonly TY_KATA: number;
        static readonly TY_BARIS: number;
        static readonly TY_TEKS: number;
        static readonly TY_RES_WORD: number;
        static readonly TY_OP: number;
        static readonly TY_SYMBOL: number;
        static readonly TY_ARGUMENT: number;
        static readonly TY_ARGUMENT2: number;
        static readonly TY_MIN: number;
        static readonly TY_KURUNG_KOSONG: number;
        static readonly TY_KURUNG_ISI: number;
        static readonly TY_KURUNG_SINGLE: number;
        static readonly TY_KURUNG_ARG: number;
        static readonly TY_KURUNG_ARG2: number;
        static readonly TY_KATA_DOT: number;
        static readonly TY_BINOP: number;
        static readonly TY_PANGGIL_FUNGSI: number;
        static readonly TY_EXP: number;
        static readonly TY_KOTAK: number;
        static readonly TY_ARRAY: number;
        static readonly TY_VAR_ASSIGNMENT: number;
        static readonly TY_PERINTAH: number;
        static readonly TY_IF: number;
        static readonly TY_IFP: number;
        static readonly TY_ELSEIF: number;
        static readonly TY_FOR: number;
        static readonly TY_WEND: number;
        static readonly TY_FUNC_DEC: number;
        static readonly TY_RETURN: number;
        static readonly TY_MOD: number;
        static readonly TY_DIM_ASSINMENT: number;
        static readonly TY_DIM_DEC: number;
        static readonly TY_DIM_DEC_VAR: number;
    }
}
declare namespace ha.parse {
    class Lexer {
        lexer(): void;
        getOp(): boolean;
        getCmd(): boolean;
        getNumber(): boolean;
        getComment(): boolean;
        getKeyword2(): boolean;
        getSymbol(): boolean;
        getId(): boolean;
        getLineBreak(): boolean;
    }
    export var lexer: Lexer;
    export {};
}
declare namespace ha.parse {
    class Blitz {
        parse(str: string): Promise<string>;
        blijs(): string;
        getToken(idx: number, token: Itoken[]): Itoken;
        tokenToAr(token: Itoken): any[];
    }
    class Arr {
        kiri(token: Itoken[], idx: number): Itoken[];
        kanan(token: Itoken[], idx: number): Itoken[];
        ambilTengah(token: Itoken[], idx: number, idx2: number): Itoken[];
        ganti(token: Itoken[], idx: number, idx2: number, token2: Itoken): Itoken[];
        hapus(token: Itoken[], idx: number): Itoken[];
    }
    export var ar: Arr;
    export var parse: Blitz;
    export {};
}
declare namespace ha.parse {
    class Stmt {
        Baru(): boolean;
        dimAssign(): boolean;
        dimDec(): boolean;
        forPendek(): boolean;
        forStep(): boolean;
        funcDec(): boolean;
        elseIf(): boolean;
        ifPendekPerintah(): boolean;
        ifPendekThen(): boolean;
        ifPendek(): boolean;
        modifier(): boolean;
        new2(): boolean;
        perintah2(): boolean;
        return2(): boolean;
        return1(): boolean;
        varAssign(): boolean;
        while2(): boolean;
    }
    export var stmt: Stmt;
    export {};
}
declare namespace ha.parse {
    class Terjemah {
        terjemah(token: Itoken): string;
        string(token: Itoken[]): string;
        wend(token: Itoken): string;
        varAssign(token: Itoken): string;
    }
    export var terj: Terjemah;
    export {};
}
