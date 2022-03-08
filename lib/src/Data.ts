namespace ha.parse {
    class Data {
        private _dataStr: string = '';
        private _token: Itoken[] = [];
        private _barisAr: IBarisObj[] = [];
        private _barisObj: IBarisObj;
        readonly config: Config = new Config();

        public get barisObj(): IBarisObj {
            return this._barisObj;
        }
        public set barisObj(value: IBarisObj) {
            this._barisObj = value;
        }

        private _kataKunci2: string[] = [
            "If", "ElseIf", "EndIf", "Else", "Then",

            "For", "Next", "To",

            "Function", "end function",

            "While", "Wend",

            //const
            //"false", "true", "null", "mod",

            //
            "//",
        ];

        private _op: string[] = [
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
            ";",
            "&&",
            "||",
            "not"
        ];

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

            //ignore
            " "
        ];
        private _cmd: string[] = [
            "Graphics3D",
            "Include",
            "Global"
        ];


        public get symbol(): string[] {
            return this._symbol;
        }
        public get dataStr(): string {
            return this._dataStr;
        }
        public set dataStr(value: string) {
            this._dataStr = value;
        }
        public get token(): Itoken[] {
            return this._token;
        }
        public get barisAr(): IBarisObj[] {
            return this._barisAr;
        }

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