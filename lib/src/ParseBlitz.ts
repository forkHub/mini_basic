namespace ha.parse {
    class Blitz {

        // async load(file: string): Promise<string> {
        //     let hasil: string = await ha.comp.util.Ajax2('get', file, '');
        //     return hasil;
        // }

        async parse(str: string): Promise<string> {
            data.dataStr = str;
            data.dataStr += ";;";
            data.dataStr += "\r\n";

            console.log('str: ' + str);

            while (data.barisAr.length > 0) {
                data.barisAr.pop();
            }
            while (data.token.length > 0) {
                data.token.pop();
            }

            console.log('baris ar length: ' + data.barisAr.length);

            lexer.lexer();

            baris.lines();

            console.log('baris ar length: ' + data.barisAr.length);

            console.group("grammar");
            for (let i: number = 0; i < data.barisAr.length; i++) {
                let barisObj: IBarisObj = data.barisAr[i];

                grammar.barisObj = barisObj;

                baris.renderLines(barisObj.token);
                grammar.grammar();

                console.group('terjemah:')
                barisObj.terjemah = terj.terjemah(barisObj.token[0]);
                console.groupEnd();

                console.log("hasil:");
                console.log(barisObj.terjemah);
                console.log("");
            }
            console.groupEnd();

            console.group("hasil:");
            for (let i: number = 0; i < data.barisAr.length; i++) {
                // console.log(data.barisAr[i].baris);
                // console.log(data.barisAr[i].terjemah);
                // console.log("");
            }
            console.groupEnd();

            console.log("finish");

            return await ha.parse.parse.blijs();
        }

        // async mulai(file: string): Promise<void> {
        //     console.log('load file: ' + file);
        //     data.dataStr = await this.load(file);
        //     data.dataStr += ";;";
        //     data.dataStr += "\r\n";

        //     console.log("data str length " + data.dataStr.length);

        //     lexer.lexer();

        //     baris.lines();

        //     console.log('baris ar length: ' + data.barisAr.length);

        //     console.group("grammar");
        //     for (let i: number = 0; i < data.barisAr.length; i++) {
        //         let barisObj: IBarisObj = data.barisAr[i];

        //         grammar.barisObj = barisObj;

        //         baris.renderLines(barisObj.token);

        //         grammar.grammar();
        //         barisObj.terjemah = terj.terjemah(barisObj.token[0]);

        //         console.log("hasil:");
        //         console.log(barisObj.terjemah);
        //         console.log("");
        //     }
        //     console.groupEnd();

        //     console.group("hasil:");
        //     for (let i: number = 0; i < data.barisAr.length; i++) {
        //         // console.log(data.barisAr[i].baris);
        //         console.log(data.barisAr[i].terjemah);
        //         // console.log("");
        //     }
        //     console.groupEnd();

        //     console.log("finish");
        // }

        async blijs(): Promise<string> {
            let hsl: string = '';
            console.log('blijs');

            hsl += "async function Start() {\n";
            data.barisAr.forEach((barisObj: IBarisObj) => {
                hsl += barisObj.terjemah + "\n";
            });
            hsl += `
                if (Loop) {
                    window.Loop = async () => {
                        await Loop();
                    }
                }
                else {
                    console.log("Loop doesn't exists");
                }
            `;
            hsl += "}\n";

            return hsl;
        }

        getToken(idx: number, token: Itoken[]): Itoken {
            if (idx < 0) return null;
            if (idx >= token.length) return null;
            return token[idx];
        }

    }

    class Arr {
        kiri(token: Itoken[], idx: number): Itoken[] {
            return token.slice(0, idx);
        }

        kanan(token: Itoken[], idx: number): Itoken[] {
            return token.slice(idx + 1);
        }

        ambilTengah(token: Itoken[], idx: number, idx2: number): Itoken[] {
            return token.slice(idx, idx2 + 1);
        }

        ganti(token: Itoken[], idx: number, idx2: number, token2: Itoken): Itoken[] {
            let kiri: Itoken[] = this.kiri(token, idx)
            let kanan: Itoken[] = this.kanan(token, idx2);

            let hasil: Itoken[] = kiri.concat(token2).concat(kanan);

            return hasil;
        }

        hapus(token: Itoken[], idx: number): Itoken[] {
            let hasil: Itoken[];
            let kiri: Itoken[];
            let kanan: Itoken[];

            // console.group('hapus');

            kiri = this.kiri(token, idx);
            kanan = this.kanan(token, idx);

            // console.log('kiri:');
            // console.log(kiri);
            // console.log('kanan:');
            // console.log(kanan);

            hasil = kiri.concat(kanan);

            // console.log('hasil');

            // console.groupEnd();

            return hasil;
        }

    }

    // export var baris: Baris = new Baris();
    export var ar: Arr = new Arr();
    export var parse: Blitz = new Blitz();
}

// ha.parse.parse.mulai('./data/aristoids.bb');
// ha.parse.parse.mulai('./data/test.txt');
// ha.parse.parse.mulai('./data/test2.txt').then(() => {
//     return ha.parse.parse.blijs();
// }).then((hsl: string) => {
//     console.log(hsl);
// })

