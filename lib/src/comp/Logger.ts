namespace ha.comp {
    export class Logger {
        private _aktif: boolean = true;
        private _debugTag: boolean = false;
        private daftarTag: ITag[] = [];
        private _defTagLabel: string = 'def';
        private _defMode: string = 'log';
        private daftarLog: ILog[] = [];

        public get defMode(): string {
            return this._defMode;
        }
        public set defMode(value: string) {
            this._defMode = value;
        }

        public get defTagLabel(): string {
            return this._defTagLabel;
        }
        public set defTagLabel(value: string) {
            this._defTagLabel = value;
        }

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
            this.daftarTag.push({
                label: 'def',
                aktif: true
            })
        }

        private tambahTag(label: string): ITag {
            let tag: ITag = this.cariTag(label);
            if (tag) return tag;

            tag = {
                label: label,
                aktif: false
            };

            this.daftarTag.push(tag);
            return tag;
        }

        private cariTag(label: string): ITag {
            for (let i: number = 0; i < this.daftarTag.length; i++) {
                if (this.daftarTag[i].label == label) return this.daftarTag[i];
            }

            return null;
        }

        groupCollapsed(msg: any, label: string = 'def'): void {
            this.isiLog(msg, 'collapsed', label);
        }

        group(msg: any, label: string = 'def'): void {
            this.isiLog(msg, 'group', label);
        }

        error(e: Error) {
            this.isiLog('', 'log', 'def', e);
        }

        warn(msg: any, label: string = 'def') {
            this.isiLog(msg, 'warn', label);
        }

        groupEnd(label: string = 'def'): void {
            this.isiLog('', 'end', label);
        }

        isiLog(data: any, mode: string = 'log', label: string = 'def', error: Error = Error('')): void {
            let tag: ITag = this.tambahTag(label);
            this.daftarLog.push({
                tag: tag,
                log: data,
                mode: mode,
                error: error
            });
        }

        log(data: any, label: string = 'def'): void {
            this.isiLog(data, 'log', label);
        }

        tampil(label: string): void {
            this.daftarLog.forEach((item: ILog) => {
                if (item.tag.label == label) {
                    if (item.mode == 'log') {
                        console.log(item.log)
                    }
                    else if (item.mode == 'warn') {
                        console.warn(item.log)
                    }
                    else if (item.mode == 'error') {
                        console.error(item.error);
                    }
                    else if (item.mode == 'collapsed') {
                        console.groupCollapsed();
                    }
                    else if (item.mode == 'group') {
                        console.group(item.log);
                    }
                    else {
                        throw Error('');
                    }
                }
            })
        }
    }

    interface ITag {
        label: string;
        aktif: boolean;
    }

    interface ILog {
        tag: ITag;
        log: any;
        mode: string;
        error?: Error
    }

    export var log: Logger = new Logger();
}