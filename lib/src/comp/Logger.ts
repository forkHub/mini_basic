namespace ha.comp {
    class Logger {
        private _aktif: boolean = true;
        private _debugTag: boolean = false;

        public get debugTag(): boolean {
            return this._debugTag;
        }
        public set debugTag(value: boolean) {
            this._debugTag = value;
        }
        public get aktif(): boolean {
            return this._aktif;
        }
        public set aktif(value: boolean) {
            this._aktif = value;
        }

        constructor() {

        }


        debug(msg: any, mode: string = 'log'): void {
            if (!this._debugTag) return;
            if (mode == "log") {
                this.log(msg);
            }
            else if (mode == "collapse") {
                this.groupCollapsed(msg);
            }
            else if (mode == 'group') {
                this.group(msg);
            }
            else if (mode == "end") {
                this.groupEnd();
            }
        }

        groupCollapsed(msg: any): void {
            if (!this._aktif) return;
            log.groupCollapsed(msg);
        }

        group(msg: any): void {
            if (this._aktif) {
                log.group(msg);
                msg;
            }
        }

        error(e: Error) {
            window.console.error(e)
        }

        warn(msg: string) {
            if (!this._aktif) return;
            console.warn(msg);
        }

        groupEnd(): void {
            if (this._aktif) {
                log.groupEnd();
            }
        }

        log(msg: any): void {
            if (this._aktif) {
                log.log(msg);
                // msg;
            }
        }
    }

    export var log: Logger = new Logger();
}