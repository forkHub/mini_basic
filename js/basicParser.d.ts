declare namespace ha.parse {
    class Baris {
        pecahBaris(): void;
        bersih(tokenAr: IToken[]): IToken[];
        hapusComment(tokenAr: IToken[]): IToken[];
        valid(token: IToken[]): boolean;
        getLine(token: IToken[]): string;
        getLineBreak(idx: number): number;
    }
    export var baris: Baris;
    export {};
}
declare namespace ha.parse {
    class CaseStmt {
        caseDec(): boolean;
        selectDec(): boolean;
    }
    export var caseStmt: CaseStmt;
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
        private _kataKunci3;
        get kataKunci3(): string[];
        private _op;
        private _op2;
        private _symbol;
        private _cmd;
        get op2(): string[];
        get symbol(): string[];
        get dataStr(): string;
        set dataStr(value: string);
        get token(): IToken[];
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
        hapusComment(): boolean;
        isExpBinopLogic(type: number): boolean;
        isExp(token: IToken): boolean;
        expKata(): boolean;
        expKurungSingle(): boolean;
        exp(): boolean;
        exp3(): boolean;
        isOp(token: IToken): boolean;
        kataDot(): boolean;
        kurungKosong(): boolean;
        kurungSingle(): boolean;
        kurungArg2(): boolean;
        kurungArg(): boolean;
        binop(): boolean;
        binopEq(): boolean;
        binopLogic(): boolean;
        not(): boolean;
        min(): boolean;
        arg2(): boolean;
        args(token: IToken[]): boolean;
        panggilfungsiArg(): boolean;
        panggilfungsi(): boolean;
        getQuote2(idx: number): number;
        teks(): boolean;
    }
    export var exp: Exp;
    export {};
}
declare namespace ha.parse {
    class Grammar {
        hapusSpace(): boolean;
        grammar(): void;
    }
    export var grammar: Grammar;
    export {};
}
declare namespace ha.parse {
    class Grammar2 {
    }
    export var grammar2: Grammar2;
    export {};
}
declare namespace ha.parse {
    class IfStmt {
        isPerintah(type: number): boolean;
        ifExp(): boolean;
        ifExpP(): boolean;
        ifExpP2(): boolean;
        ifThen(): boolean;
        ifThenP(): boolean;
        ifThenP2(): boolean;
        ifElseThenP(): boolean;
        ifElseThenP2(): boolean;
        elseIfThen(): boolean;
    }
    export var ifStmt: IfStmt;
    export {};
}
interface IToken {
    type: number;
    token?: IToken[];
    value?: string;
    valueLowerCase?: string;
}
interface IBarisObj {
    n?: number;
    token?: IToken[];
    baris?: string;
    terjemah?: string;
}
interface IGrammar {
    type: number;
    tokens: number[];
    setelah?: number;
    sebelum?: number;
}
declare namespace ha.parse {
    class Kons {
        static readonly TY_ANGKA: number;
        static readonly TY_KATA: number;
        static readonly TY_BARIS: number;
        static readonly TY_TEKS: number;
        static readonly TY_RES_WORD: number;
        static readonly TY_OP: number;
        static readonly TY_OP2: number;
        static readonly TY_SYMBOL: number;
        static readonly TY_TRUE: number;
        static readonly TY_FALSE: number;
        static readonly TY_NULL: number;
        static readonly TY_COLON: number;
        static readonly TY_MIN: number;
        static readonly TY_ARG: number;
        static readonly TY_ARG2: number;
        static readonly TY_ARG_KATA: number;
        static readonly TY_KURUNG_KOSONG: number;
        static readonly TY_KURUNG_SINGLE: number;
        static readonly TY_KURUNG_ARG: number;
        static readonly TY_KURUNG_ARG2: number;
        static readonly TY_KATA_DOT: number;
        static readonly TY_BINOP: number;
        static readonly TY_BINOP_EQ: number;
        static readonly TY_PANGGIL_FUNGSI: number;
        static readonly TY_EXP: number;
        static readonly TY_STMT: number;
        static readonly TY_STMT_COLON: number;
        static readonly TY_STMT_M: number;
        static readonly TY_PERINTAH: number;
        static readonly TY_FOR: number;
        static readonly TY_FOR_STEP: number;
        static readonly TY_WEND: number;
        static readonly TY_FUNC_DEC: number;
        static readonly TY_MOD: number;
        static readonly TY_RETURN: number;
        static readonly TY_RETURN_EXP: number;
        static readonly TY_DIM_ASSINMENT: number;
        static readonly TY_DIM_DEC: number;
        static readonly TY_DIM_DEC_VAR: number;
        static readonly TY_TYPE_NEW_DEC: number;
        static readonly TY_TYPE_DEF: number;
        static readonly TY_FIELD_DEF: number;
        static readonly TY_TYPE: number;
        static readonly TY_FIELD: number;
        static readonly TY_FIELD_M: number;
        static readonly TY_ENDTYPE: number;
        static readonly TY_TYPE_ACCESS: number;
        static readonly TY_IF_EXP: number;
        static readonly TY_IF_EXP_P: number;
        static readonly TY_IF_EXP_P2: number;
        static readonly TY_IF_THEN: number;
        static readonly TY_IF_THEN_P: number;
        static readonly TY_IF_THEN_P2: number;
        static readonly TY_IF_ELSE_P: number;
        static readonly TY_IF_ELSE_P2: number;
        static readonly TY_IF_ELSE_THEN_P: number;
        static readonly TY_IF_ELSE_THEN_P2: number;
        static readonly TY_ELSE_DEC: number;
        static readonly TY_ELSE_THEN: number;
        static readonly TY_ELSE_P: number;
        static readonly TY_ELSE_P2: number;
        static readonly TY_ELSEIF_DEC: number;
        static readonly TY_ELSEIF_THEN: number;
        static readonly TY_ELSEIF_THEN_P: number;
        static readonly TY_ELSEIF_THEN_P2: number;
        static readonly TY_ELSEIF_P: number;
        static readonly TY_ELSEIF_P2: number;
        static readonly TY_ELSEIF_ELSE_P: number;
        static readonly TY_ELSEIF_ELSE_P2: number;
        static readonly TY_MOD_DEC: number;
        static readonly TY_MOD_ISI: number;
        static readonly TY_CASE: number;
        static readonly TY_SELECT: number;
        static readonly TY_END_SELECT: number;
        static readonly TY_CASE_DEC: number;
        static readonly TY_SELECT_DEC: number;
    }
}
declare namespace ha.parse {
    class Lexer {
        lexer(): void;
        getOp(): boolean;
        getOp2(): boolean;
        getCmd(): boolean;
        getNumber(): boolean;
        getComment(): boolean;
        getKeyword3(): boolean;
        getSymbol(): boolean;
        getKata(): boolean;
        getLineBreak(): boolean;
    }
    export var lexer: Lexer;
    export {};
}
declare namespace ha.parse {
    class Blitz {
        parse(str: string): Promise<string>;
        blijs(): string;
        getToken(idx: number, token: IToken[]): IToken;
        tokenToAr(token: IToken): any[];
        tokenToValue(token: IToken, debug?: boolean): string;
    }
    class Arr {
        kiri(token: IToken[], idx: number): IToken[];
        kanan(token: IToken[], idx: number): IToken[];
        ambilTengah(token: IToken[], idx: number, idx2: number): IToken[];
        ganti(token: IToken[], idx: number, idx2: number, token2: IToken, debug?: boolean): IToken[];
        hapus(token: IToken[], idx: number): IToken[];
    }
    export var ar: Arr;
    export var parse: Blitz;
    export {};
}
declare namespace ha.parse {
    class Stmt {
        Baru(): boolean;
        stmtMul(): boolean;
        stmtColon2(): boolean;
        stmtColon(): boolean;
        stmt(): boolean;
        dimAssign(): boolean;
        dimDec(): boolean;
        forPendek(): boolean;
        forStep(): boolean;
        funcDec(): boolean;
        modifier(): boolean;
        modIsi(): boolean;
        new2(): boolean;
        perintah(): boolean;
        returnExp(): boolean;
        while2(): boolean;
    }
    export var stmt: Stmt;
    export {};
}
declare namespace ha.parse {
    class Terjemah {
        terjemah(token: IToken): string;
        string(token: IToken[]): string;
        wend(token: IToken): string;
        varAssign(token: IToken): string;
    }
    export var terj: Terjemah;
    export {};
}
declare namespace ha.parse {
    class TypeStmt {
        typeNew(): boolean;
        typeDef(): boolean;
        fieldDef(): boolean;
        fieldDefM(): boolean;
        typeAkses(): boolean;
    }
    export var typeStmt: TypeStmt;
    export {};
}
