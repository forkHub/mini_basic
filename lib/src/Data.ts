
namespace ha.parse {
    class Data {

        private _dataStr: string = '';  //baris
        private _token: IToken[] = [];  //daftar token dalam satu baris
        private _barisObj: IBarisObj;   //baris aktif
        private _errList: string[] = [];
        private _barisAktif: string = '';
        private _ignore: string[] = [];
        private _jmlIgnore: number = 0;
        private _errGakIgnore: boolean = false;
        private _errBaru: string[] = [];

        public get errBaru(): string[] {
            return this._errBaru;
        }
        public set errBaru(value: string[]) {
            this._errBaru = value;
        }

        public get errGakIgnore(): boolean {
            return this._errGakIgnore;
        }
        public set errGakIgnore(value: boolean) {
            this._errGakIgnore = value;
        }


        public get jmlIgnore(): number {
            return this._jmlIgnore;
        }
        public set jmlIgnore(value: number) {
            this._jmlIgnore = value;
        }

        public get ignore(): string[] {
            return this._ignore;
        }
        public get barisAktif(): string {
            return this._barisAktif;
        }
        public set barisAktif(value: string) {
            this._barisAktif = value;
        }
        public get errList(): string[] {
            return this._errList;
        }
        public set errList(value: string[]) {
            this._errList = value;
        }

        readonly config: Config = new Config();

        public get barisObj(): IBarisObj {
            return this._barisObj;
        }
        public set barisObj(value: IBarisObj) {
            this._barisObj = value;
        }

        private _kataKunci2: string[] = [
            "if", "elseif", "endif", "else", "then",

            "for", "next", "to", "step",

            "function", "end function", "return",

            "while", "wend", "repeat", "until",

            "const", "global", "local",

            "type", "field", "end type", "new",
            "delete", "before", "after", "each", "last",

            //const
            "false", "true", "null",

            "case", "select", "end select",

            "end",

            "dim",

            //
            "//",
        ];

        private _kataKunciDouble: string[] = [
            "end function",
            "end type",
            "end select",
            "else if"
        ];

        public get kataKunciDouble(): string[] {
            return this._kataKunciDouble;
        }

        private _op: string[] = [
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
            "=",
        ];

        // private _op2: string[] = [
        //     "&&",
        //     "||",
        //     // "and",
        //     // "or"
        // ];


        private _symbol: string[] = [
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
            "?",
            "&",
            ";",
            "'",
            "!",
            "$",
            "#",
            "%",

            //ignore
            " ",
            "\t",
        ];

        private _cmd: string[] = [
            "Graphics3D",
            "Include",
            "Global"
        ];

        // public get op2(): string[] {
        //     return this._op2;
        // }
        public get symbol(): string[] {
            return this._symbol;
        }
        public get dataStr(): string {
            return this._dataStr;
        }
        public set dataStr(value: string) {
            this._dataStr = value;
        }
        public get token(): IToken[] {
            return this._token;
        }
        // public get barisAr(): IBarisObj[] {
        //     return this._barisAr;
        // }

        public get kataKunci2(): string[] {
            return this._kataKunci2;
        }
        public get op(): string[] {
            return this._op;
        }
        public set op(value: string[]) {
            this._op = value;
        }
        public get cmd(): string[] {
            return this._cmd;
        }
        public set cmd(value: string[]) {
            this._cmd = value;
        }

        constructor() {
            // this._ignore = Ignore;
        }

    }

    class Config {
        private _awaitFl: boolean = true;
        public get awaitFl(): boolean {
            return this._awaitFl;
        }
        public set awaitFl(value: boolean) {
            this._awaitFl = value;
        }

    }

    export var data: Data = new Data();
}