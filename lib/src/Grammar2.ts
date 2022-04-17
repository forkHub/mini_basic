namespace ha.parse {
    class Grammar2 {
        private _aturanExpAr: IAturan[] = [];
        public get aturanExpAr(): IAturan[] {
            return this._aturanExpAr;
        }

        private _aturanStmtAr: IAturan[] = [];
        public get aturanStmtAr(): IAturan[] {
            return this._aturanStmtAr;
        }

        constructor() {

        }

        // def(): IAturan {
        //     return {
        //         nama: '',
        //         type: 0,
        //         kondisi: [],
        //         sbl: [],
        //         stl: []
        //     }
        // }

        aturanExp(): void {
            this._aturanExpAr = this._aturanExpAr.concat([
                {
                    type: Kons.TY_BINOP,
                    aturan: {
                        nama: 'binop baru',
                        kondisi: [
                            [Kons.TY_KATA, Kons.TY_EXP, Kons.TY_KATA_DOT],
                            [Kons.TY_OP],
                            [Kons.TY_KATA, Kons.TY_EXP]
                        ],
                        sbl: [Kons.TY_MODIFIER, Kons.TY_OP, Kons.TY_BACK_SLASH],
                        stl: [Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE]
                    }
                }

            ])

            //arg kata 
            {
                this.aturanExpAr.push({
                    type: Kons.TY_ARG_KATA,
                    aturan: {
                        nama: 'arg_kata',
                        kondisi: [
                            [Kons.TY_KATA],
                            [Kons.TY_KOMA],
                            [Kons.TY_KATA]
                        ],
                        sbl: [Kons.TY_KOMA, Kons.TY_OP, Kons.TY_BACK_SLASH, Kons.TY_MODIFIER, Kons.TY_MODIFIER],
                        stl: [
                            Kons.TY_OP,
                            Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE
                        ]

                    }
                })

                this.aturanExpAr.push({
                    type: Kons.TY_ARG_KATA_M,
                    aturan: {
                        nama: 'arg_kata_m',
                        kondisi: [
                            [Kons.TY_ARG_KATA],
                            [Kons.TY_KOMA],
                            [Kons.TY_KATA]
                        ],
                        sbl: [Kons.TY_KOMA,],
                        stl: [
                            Kons.TY_OP,
                            Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE
                        ]

                    }
                })

            }

            //arg2 campur
            {

                this.aturanExpAr.push({
                    type: Kons.TY_ARG2,
                    aturan: {
                        nama: 'arg kata exp',
                        kondisi: [
                            [Kons.TY_KATA,],
                            [Kons.TY_KOMA],
                            [Kons.TY_EXP, ,]
                        ],
                        sbl: [Kons.TY_KOMA, Kons.TY_OP, Kons.TY_BACK_SLASH,],
                        stl: [Kons.TY_OP]

                    }
                })

                this.aturanExpAr.push({
                    type: Kons.TY_ARG2,
                    aturan: {
                        nama: 'exp , kata',
                        kondisi: [
                            [Kons.TY_EXP,],
                            [Kons.TY_KOMA],
                            [Kons.TY_KATA,]
                        ],
                        sbl: [Kons.TY_KOMA, Kons.TY_BACK_SLASH,],
                        stl: [Kons.TY_OP, Kons.TY_BACK_SLASH]

                    }
                })

            }

            //arg campur
            this.aturanExpAr.push({
                type: Kons.TY_ARG,
                aturan: {
                    nama: 'arg campur',
                    kondisi: [
                        [Kons.TY_ARG_KATA_M, Kons.TY_ARG_KATA, Kons.TY_ARG2, Kons.TY_ARG,],
                        [Kons.TY_KOMA],
                        [Kons.TY_EXP, Kons.TY_KATA,]
                    ],
                    sbl: [Kons.TY_KOMA],
                    stl: [Kons.TY_OP]
                }
            })
        }

        aturanStmt(): void {
            //stmt
            this._aturanStmtAr = this.aturanStmtAr.concat([
                {
                    type: Kons.TY_PERINTAH,
                    aturan: {
                        nama: 'perintah ',
                        kondisi: [
                            [Kons.TY_KATA],
                            [Kons.TY_ARG_KATA, Kons.TY_ARG_KATA_M],
                        ],
                        sbl: [, Kons.TY_OP,],
                        stl: [Kons.TY_KURUNG_ARG, Kons.TY_ARG2, Kons.TY_ARG_KATA, Kons.TY_ARG_KATA_M, Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_KOSONG]
                    }
                },

                {
                    type: Kons.TY_LABEL,
                    aturan: {
                        nama: 'label ',
                        kondisi: [
                            [Kons.TY_DOT],
                            [Kons.TY_KATA],
                        ],
                        sbl: [Kons.TY_KATA],
                        stl: []

                    }
                },
                {
                    type: Kons.TY_UNTIL_DEC,
                    aturan: {
                        nama: 'until  ',
                        kondisi: [
                            [Kons.TY_UNTIL],
                            [Kons.TY_EXP],
                        ],
                        sbl: [],
                        stl: []

                    }
                },
                {
                    type: Kons.TY_MOD_ISI_M,
                    aturan: {
                        nama: 'mod isi tambahan argument  ',
                        kondisi: [
                            [Kons.TY_MOD_ISI],
                            [Kons.TY_KOMA],
                            [Kons.TY_KATA, Kons.TY_EXP],
                        ],
                        sbl: [],
                        stl: [Kons.TY_OP]

                    }
                },
                {
                    type: Kons.TY_MOD_ISI_M,
                    aturan: {
                        nama: 'mod isi tambahan argument2  ',
                        kondisi: [
                            [Kons.TY_MOD_ISI_M],
                            [Kons.TY_KOMA],
                            [Kons.TY_EXP, Kons.TY_KATA],
                        ],
                        sbl: [],
                        stl: [Kons.TY_OP]

                    }
                },
                {
                    type: Kons.TY_MOD_DEC_M,
                    aturan: {
                        nama: 'mod, arg  ',
                        kondisi: [
                            [Kons.TY_MOD_DEC, Kons.TY_MOD_DEC_M],
                            [Kons.TY_KOMA],
                            [Kons.TY_KATA],
                        ],
                        sbl: [], stl: []
                    }
                },
                {
                    type: Kons.TY_FOR_EACH,
                    aturan: {
                        nama: 'for each  ',
                        kondisi: [
                            [Kons.TY_FOR],
                            [Kons.TY_KATA, Kons.TY_KATA_DOT],
                            [Kons.TY_OP],
                            [Kons.TY_EACH],
                            [Kons.TY_KATA]
                        ],
                        sbl: [],
                        stl: []

                    }
                },
                {
                    type: Kons.TY_DELETE_STMT,
                    aturan: {
                        nama: 'delete stmt',
                        kondisi: [
                            [Kons.TY_DELETE],
                            [Kons.TY_KATA, Kons.TY_KATA_DOT],
                        ],
                        sbl: [],
                        stl: []

                    }
                },
            ])

            //type
            this._aturanStmtAr = this.aturanStmtAr.concat([
                {
                    type: Kons.TY_FIELD_NEW_DEF_M,
                    aturan: {
                        nama: 'field def m',
                        kondisi: [
                            [Kons.TY_FIELD],
                            [Kons.TY_ARG, Kons.TY_ARG_KATA_M, Kons.TY_ARG2, Kons.TY_ARG_KATA],
                        ],
                        sbl: [],
                        stl: [Kons.TY_KOMA]

                    }
                },
                {
                    type: Kons.TY_NEW_INST,
                    aturan: {
                        nama: 'new',
                        kondisi: [
                            [Kons.TY_NEW],
                            [Kons.TY_KATA],
                        ],
                        sbl: [],
                        stl: []

                    }
                },
                {
                    type: Kons.TY_TYPE_ACCESS_DIM,
                    aturan: {
                        nama: 'dim(n)\\kata',
                        kondisi: [
                            [Kons.TY_KATA],
                            [Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_ARG2],
                            [Kons.TY_BACK_SLASH],
                            [Kons.TY_KATA]
                        ],
                        sbl: [],
                        stl: []

                    }
                },
                {
                    type: Kons.TY_DIM_PROP_ASSINMENT,
                    aturan: {
                        nama: 'dim(n)\\prop = exp|kata',
                        kondisi: [
                            [Kons.TY_TYPE_ACCESS_DIM],
                            [],
                            [Kons.TY_EXP, Kons.TY_KATA]
                        ],
                        sbl: [],
                        stl: [
                            Kons.TY_ARG, Kons.TY_ARG2, Kons.TY_ARG_KATA, Kons.TY_ARG_KATA_M,
                            Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE,
                            Kons.TY_KURUNG_BUKA
                        ]

                    }
                },

            ])

            //dim
            this._aturanStmtAr = this.aturanStmtAr.concat([
                {
                    type: Kons.TY_DIM_DEC,
                    aturan: {
                        nama: 'dim dec',
                        kondisi: [
                            [Kons.TY_DIM],
                            [Kons.TY_KATA_DOT, Kons.TY_KATA],
                            [Kons.TY_KURUNG_SINGLE, Kons.TY_ARG2, Kons.TY_ARG_KATA]
                        ],
                        sbl: [],
                        stl: []

                    }
                }
            ])

        }

        init(): void {
            this.aturanExp();
            this.aturanStmt();
        }

        // tambahAturan(data: any[]): void {
        //     this._aturanAr.push({
        //         nama: data[0],
        //         type: data[1],
        //         kondisi: data[2],
        //         sbl: data[3],
        //         stl: data[4]
        //     });
        // }

        checkLog(aturan: IAturan[]): boolean {
            let hasil: boolean = false;
            console.group('check');
            hasil = this.check(aturan);
            console.groupEnd();
            return hasil;
        }

        check(aturanAr: IAturan[]): boolean {
            let idxAturan: number = 0;
            let aturan: IAturan;
            let barisAda: boolean;
            let checkAda: boolean = false;

            while (true) {
                aturan = aturanAr[idxAturan];
                barisAda = this.checkBaris(data.barisObj.token, aturan);
                if (barisAda) {
                    checkAda = true;
                    idxAturan = 0;
                }
                else {
                    idxAturan++;
                    if (idxAturan >= aturanAr.length) {
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

                    for (let j: number = 0; j < aturan.aturan.kondisi.length; j++) {
                        tokenBaru.token.push(parse.getToken(i + j, tokenAr));
                    }

                    console.log(aturan.aturan.nama);
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
            for (let i: number = 0; i < aturan.aturan.kondisi.length; i++) {
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
                    let cocok: boolean = this.checkKondisi(aturan.aturan.kondisi[i], t);

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
                if (aturan.aturan.sbl.indexOf(t.type) >= 0) {
                    // console.log('prev ada');
                    hasil = false;
                }
            }

            //check setelahnya
            // console.log('check next');
            t = parse.getToken(idx + aturan.aturan.kondisi.length, tokenAr);
            if (t) {
                if (aturan.aturan.stl.indexOf(t.type) >= 0) {
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
    type?: number,
    aturan?: {
        nama?: string,
        kondisi?: number[][],
        sbl?: number[],
        stl?: number[],
    }
}