namespace ha.parse {
    class Grammar2 {
        private _aturanAr: IAturan[] = [];
        public get aturanAr(): IAturan[] {
            return this._aturanAr;
        }

        constructor() {

        }

        def(): IAturan {
            return {
                nama: '',
                type: 0,
                kondisi: [],
                sbl: [],
                stl: []
            }
        }

        init(): void {
            //arg kata 
            {
                this._aturanAr.push({
                    nama: 'arg_kata',
                    type: Kons.TY_ARG_KATA,
                    kondisi: [
                        [Kons.TY_KATA],
                        [Kons.TY_KOMA],
                        [Kons.TY_KATA]
                    ],
                    sbl: [Kons.TY_KOMA, Kons.TY_OP, Kons.TY_OP2],
                    stl: [
                        Kons.TY_OP, Kons.TY_OP2,
                        Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE
                    ]
                })

                this._aturanAr.push({
                    nama: 'arg_kata_m',
                    type: Kons.TY_ARG_KATA_M,
                    kondisi: [
                        [Kons.TY_ARG_KATA],
                        [Kons.TY_KOMA],
                        [Kons.TY_KATA]
                    ],
                    sbl: [Kons.TY_KOMA],
                    stl: [Kons.TY_OP, Kons.TY_OP2,
                        ,
                    Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE
                    ]
                })

            }

            //arg2 campur
            {

                this._aturanAr.push({
                    nama: 'arg kata exp',
                    type: Kons.TY_ARG2,
                    kondisi: [
                        [Kons.TY_KATA],
                        [Kons.TY_KOMA],
                        [Kons.TY_EXP]
                    ],
                    sbl: [Kons.TY_KOMA],
                    stl: [Kons.TY_OP, Kons.TY_OP2]
                })

                this._aturanAr.push({
                    nama: 'arg exp kata',
                    type: Kons.TY_ARG2,
                    kondisi: [
                        [Kons.TY_EXP],
                        [Kons.TY_KOMA],
                        [Kons.TY_KATA]
                    ],
                    sbl: [Kons.TY_KOMA],
                    stl: [Kons.TY_OP, Kons.TY_OP2]
                })

                this._aturanAr.push({
                    nama: 'arg => arg2 kata',
                    type: Kons.TY_ARG2,
                    kondisi: [
                        [Kons.TY_EXP],
                        [Kons.TY_KOMA],
                        [Kons.TY_KATA]
                    ],
                    sbl: [Kons.TY_KOMA],
                    stl: [Kons.TY_OP, Kons.TY_OP2]
                })

            }

            this._aturanAr.push({
                nama: 'arg campur',
                type: Kons.TY_ARG,
                kondisi: [
                    [Kons.TY_ARG_KATA_M, Kons.TY_ARG_KATA, Kons.TY_ARG2, Kons.TY_ARG],
                    [Kons.TY_KOMA],
                    [Kons.TY_EXP, Kons.TY_KATA]
                ],
                sbl: [Kons.TY_KOMA],
                stl: [Kons.TY_OP, Kons.TY_OP2]
            })

            //exp
            this._aturanAr = this._aturanAr.concat([
                {
                    nama: 'binop kata',
                    type: Kons.TY_BINOP,
                    kondisi: [
                        [Kons.TY_KATA, Kons.TY_EXP],
                        [Kons.TY_OP, Kons.TY_OP2],
                        [Kons.TY_KATA, Kons.TY_EXP]
                    ],
                    sbl: [Kons.TY_EQ, Kons.TY_OP, Kons.TY_OP2],
                    stl: [Kons.TY_KURUNG_ARG, Kons.TY_ARG2, Kons.TY_ARG_KATA, Kons.TY_ARG_KATA_M, Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_KOSONG]
                }
            ])

            //stmt
            this._aturanAr = this._aturanAr.concat([
                {
                    nama: 'perintah ',
                    type: Kons.TY_PERINTAH,
                    kondisi: [
                        [Kons.TY_KATA],
                        [Kons.TY_ARG_KATA, Kons.TY_ARG_KATA_M],
                    ],
                    sbl: [Kons.TY_EQ, Kons.TY_OP, Kons.TY_OP2],
                    stl: [Kons.TY_KURUNG_ARG, Kons.TY_ARG2, Kons.TY_ARG_KATA, Kons.TY_ARG_KATA_M, Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_KOSONG]
                }
            ])

        }

        tambahAturan(data: any[]): void {
            this._aturanAr.push({
                nama: data[0],
                type: data[1],
                kondisi: data[2],
                sbl: data[3],
                stl: data[4]
            });
        }

        checkLog(): boolean {
            let hasil: boolean = false;
            console.group('check');
            hasil = this.check();
            console.groupEnd();
            return hasil;
        }

        check(): boolean {
            let idxAturan: number = 0;
            let aturan: IAturan;
            let barisAda: boolean;
            let checkAda: boolean = false;

            while (true) {
                aturan = this.aturanAr[idxAturan];
                barisAda = this.checkBaris(data.barisObj.token, aturan);
                if (barisAda) {
                    checkAda = true;
                    idxAturan = 0;
                }
                else {
                    idxAturan++;
                    if (idxAturan >= this.aturanAr.length) {
                        break;
                    }
                }
            }

            // console.log("hasil check: " + checkAda);
            // console.log('sisa: ' + data.barisObj.token.length);

            return checkAda;
        }

        checkBaris(tokenAr: IToken[], aturan: IAturan): boolean {
            let ada: boolean = false;

            for (let i: number = tokenAr.length - 1; i >= 0; i--) {
                let ok: boolean = false;

                // console.group('iterate aturan: ' + aturan.nama);
                // console.log('idx token ' + i);
                ok = this.checkAturan(tokenAr, aturan, i);

                if (ok) {
                    let tokenBaru: IToken = {
                        token: [],
                        type: aturan.type
                    };

                    for (let j: number = 0; j < aturan.kondisi.length; j++) {
                        tokenBaru.token.push(parse.getToken(i + j, tokenAr));
                    }

                    console.log(aturan.nama);
                    console.log(tokenBaru);
                    console.log(parse.tokenToValue(tokenBaru));

                    // console.log('sebelum:')
                    // parse.debugToken(data.barisObj.token);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru, false);

                    // console.log('sesudah:')
                    // parse.debugToken(data.barisObj.token);

                    ada = true;
                }

                // console.groupEnd();
            }

            return ada;
        }

        checkKondisi(kond: number[], token: IToken): boolean {
            let hasil: boolean = false;

            // console.group('check kondisi')
            // console.log('kondisi:');
            // console.log(kond);
            // console.log('token:');
            // console.log(token);

            hasil = (kond.indexOf(token.type) >= 0);
            // console.log('hasil: ' + hasil);

            // console.groupEnd();

            return hasil;
        }

        checkAturan(tokenAr: IToken[], aturan: IAturan, idx: number): boolean {
            let t: IToken;
            let hasil: boolean = true;

            // console.log('idx token: ' + idx);

            // console.log('iterate kondisi:');
            for (let i: number = 0; i < aturan.kondisi.length; i++) {
                // console.group('idx: ' + i);

                t = parse.getToken(idx + i, tokenAr);
                // console.log('idx kondisi: ' + i);
                // console.log('ambil token, idx ' + (idx + i));
                // console.log('token:');
                // console.log(t);

                if (!t) {
                    hasil = false;
                }
                else {
                    let cocok: boolean = this.checkKondisi(aturan.kondisi[i], t);

                    if (!cocok) {
                        // console.log('kondisi tidak ada')
                        hasil = false;
                    }
                    else {
                        // console.log('kondisi ada');
                    }
                }

                // console.groupEnd();
            }

            //check prev
            // console.log('check prev');
            t = parse.getToken(idx - 1, tokenAr);
            if (t) {
                if (aturan.sbl.indexOf(t.type) >= 0) {
                    // console.log('prev ada');
                    hasil = false;
                }
            }

            //check setelahnya
            // console.log('check next');
            t = parse.getToken(idx + aturan.kondisi.length, tokenAr);
            if (t) {
                if (aturan.stl.indexOf(t.type) >= 0) {
                    // console.log('next ada');
                    hasil = false;
                }
            }

            // console.log('hasil ' + hasil);

            return hasil;
        }

    }

    export var gm2: Grammar2 = new Grammar2();
}

interface IAturan {
    nama?: string,
    type?: number,
    kondisi?: number[][],
    sbl?: number[],
    stl?: number[]
}