declare namespace ha.parse {
    class Aturan {
        private _daftar;
        get daftar(): IAturan[];
    }
    export var aturan: Aturan;
    export {};
}
declare namespace ha.parse {
    class Baris {
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
        private _barisObj;
        readonly config: Config;
        get barisObj(): IBarisObj;
        set barisObj(value: IBarisObj);
        private _kataKunci2;
        private _kataKunciDouble;
        get kataKunciDouble(): string[];
        private _op;
        private _symbol;
        private _cmd;
        get symbol(): string[];
        get dataStr(): string;
        set dataStr(value: string);
        get token(): IToken[];
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
        not(): boolean;
        min(): boolean;
        arg2(): boolean;
        args(token: IToken[]): boolean;
        panggilfungsiArg(): boolean;
        panggilfungsi(): boolean;
        getQuote2(idx: number): number;
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
        private _aturanExpAr;
        get aturanExpAr(): IAturan[];
        private _aturanStmtAr;
        get aturanStmtAr(): IAturan[];
        constructor();
        def(): IAturan;
        aturanExp(): void;
        aturanStmt(): void;
        init(): void;
        checkLog(aturan: IAturan[]): boolean;
        check(aturanAr: IAturan[]): boolean;
        checkBaris(tokenAr: IToken[], aturan: IAturan): boolean;
        checkKondisi(kond: number[], token: IToken): boolean;
        checkAturan(tokenAr: IToken[], aturan: IAturan, idx: number): boolean;
    }
    export var gm2: Grammar2;
    export {};
}
interface IAturan {
    nama?: string;
    type?: number;
    kondisi?: number[][];
    sbl?: number[];
    stl?: number[];
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
        static readonly TY_SYMBOL: number;
        static readonly TY_TRUE: number;
        static readonly TY_FALSE: number;
        static readonly TY_NULL: number;
        static readonly TY_COLON: number;
        static readonly TY_KOMA: number;
        static readonly TY_KURUNG_BUKA: number;
        static readonly TY_KURUNG_TUTUP: number;
        static readonly TY_NEW: number;
        static readonly TY_BACK_SLASH: number;
        static readonly TY_DOT: number;
        static readonly TY_UNTIL: number;
        static readonly TY_MODIFIER: number;
        static readonly TY_FOR: number;
        static readonly TY_EACH: number;
        static readonly TY_ARG: number;
        static readonly TY_ARG2: number;
        static readonly TY_ARG_KATA: number;
        static readonly TY_ARG_KATA_M: number;
        static readonly TY_KURUNG_KOSONG: number;
        static readonly TY_KURUNG_SINGLE: number;
        static readonly TY_KURUNG_ARG: number;
        static readonly TY_KURUNG_ARG2: number;
        static readonly TY_KATA_DOT: number;
        static readonly TY_BINOP: number;
        static readonly TY_PANGGIL_FUNGSI: number;
        static readonly TY_MIN: number;
        static readonly TY_EXP: number;
        static readonly TY_STMT: number;
        static readonly TY_STMT_COLON: number;
        static readonly TY_STMT_M: number;
        static readonly TY_PERINTAH: number;
        static readonly TY_LABEL: number;
        static readonly TY_FOR_DEC: number;
        static readonly TY_FOR_STEP: number;
        static readonly TY_WEND: number;
        static readonly TY_FUNC_DEC: number;
        static readonly TY_RETURN: number;
        static readonly TY_RETURN_EXP: number;
        static readonly TY_FOR_EACH: number;
        static readonly TY_DIM: number;
        static readonly TY_DIM_ASSINMENT: number;
        static readonly TY_DIM_DEC: number;
        static readonly TY_DIM_DEC_VAR: number;
        static readonly TY_DIM_PROP_ASSINMENT: number;
        static readonly TY_TYPE_NEW_INST: number;
        static readonly TY_TYPE_NEW_DEF: number;
        static readonly TY_FIELD_NEW_DEF: number;
        static readonly TY_TYPE: number;
        static readonly TY_FIELD: number;
        static readonly TY_FIELD_NEW_DEF_M: number;
        static readonly TY_ENDTYPE: number;
        static readonly TY_TYPE_ACCESS: number;
        static readonly TY_TYPE_ACCESS_DIM: number;
        static readonly TY_NEW_INST: number;
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
        static readonly TY_MOD_DEC_M: number;
        static readonly TY_MOD_ISI: number;
        static readonly TY_MOD_ISI_M: number;
        static readonly TY_CASE: number;
        static readonly TY_SELECT: number;
        static readonly TY_END_SELECT: number;
        static readonly TY_CASE_DEC: number;
        static readonly TY_SELECT_DEC: number;
        static readonly TY_UNTIL_DEC: number;
    }
}
declare namespace ha.parse {
    class Lexer {
        lexer(): void;
        getString(): boolean;
        getOp(): boolean;
        getNumber(): boolean;
        keyWordDouble(): boolean;
        getSymbol(): boolean;
        getKata(): boolean;
        kutip2(str: string): number;
    }
    export var lexer: Lexer;
    export {};
}
declare namespace ha.parse {
    class Blitz {
        init(): void;
        parse(str: string): Promise<void>;
        getToken(idx: number, token: IToken[]): IToken;
        tokenToAr(token: IToken): any[];
        tokenToValue(token: IToken, debug?: boolean): string;
        debugToken(token: IToken[]): void;
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
declare namespace ha.comp {
    class BaseComponent {
        protected _template: string;
        protected _elHtml: HTMLElement | null;
        protected _parent: HTMLElement;
        onRender(): void;
        onAttach(): void;
        onBuild(): void;
        onDetach(): void;
        mulai(...params: any[]): void;
        destroy(): void;
        attach(parent: HTMLElement): void;
        detach(): boolean;
        show(el?: HTMLElement): void;
        hide(el?: HTMLElement): void;
        getEl(query: string): HTMLElement;
        build(): void;
        getTemplate(query: string): HTMLElement;
        getElFromDoc(query: string): HTMLElement;
        get elHtml(): HTMLElement;
    }
}
declare namespace ha.comp {
    class Bind {
        private bindList;
        reg(setter: Function, getter: Function): void;
        update(): void;
    }
    export var bind: Bind;
    export {};
}
declare namespace ha.comp {
    class Dialog extends BaseComponent {
        constructor();
        init(): void;
        tampil(pesan?: string, def?: boolean): void;
        get okTbl(): HTMLButtonElement;
        get p(): HTMLParagraphElement;
    }
    export var dialog: Dialog;
    export {};
}
declare namespace ha.comp {
    class Loading extends BaseComponent {
        constructor();
        tampil(): void;
    }
    export var loading: Loading;
    export {};
}
declare namespace ha.comp {
    class Logger2 {
        private _aktif;
        get aktif(): boolean;
        set aktif(value: boolean);
        constructor();
        group(msg: any): void;
        groupEnd(): void;
        log(msg: any): void;
    }
    export var log: Logger2;
    export {};
}
declare namespace ha.comp {
    export class MenuPopup {
        private view;
        constructor();
        tampil(tombol: ITombol[]): void;
        buatClass(label: string): string;
        buatTombol(t: ITombol): void;
    }
    interface ITombol {
        label: string;
        f: Function;
    }
    export {};
}
declare namespace ha.comp {
    class Util {
        static readonly sUserId: string;
        static readonly sLevel: string;
        static readonly sFilter: string;
        static readonly storageId: string;
        static getEl(query: string, parent?: HTMLElement, err?: boolean): HTMLElement;
        static error(e: Error): void;
        static kirimWa(teks: string): string;
        static getUrl(url: string, params: any[]): string;
        static AjaxLogin(type: string, urlServer: string, dataStr: string, loginUrl: string, pf?: (p: ProgressEvent) => void): Promise<XMLHttpRequest>;
        static Ajax2(type: string, url: string, dataStr: string, pf?: (p: ProgressEvent) => void): Promise<string>;
        static sql(query: string): Promise<any[]>;
        static Ajax(type: string, url: string, dataStr: string, pf?: (p: ProgressEvent) => void): Promise<XMLHttpRequest>;
    }
}
