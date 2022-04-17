namespace ha.comp {
    class Logger2 {
        private _aktif: boolean = true;
        public get aktif(): boolean {
            return this._aktif;
        }
        public set aktif(value: boolean) {
            this._aktif = value;
        }

        constructor() {

        }

        group(msg: any): void {
            if (this._aktif) {
                console.group(msg);
                msg;
            }
        }

        groupEnd(): void {
            if (this._aktif) {
                console.groupEnd();
            }
        }

        log(msg: any): void {
            if (this._aktif) {
                console.log(msg);
                msg;
            }
        }
    }

    export var log: Logger2 = new Logger2();
}