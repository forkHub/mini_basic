namespace ha.parse {
    class Grammar2 {
        private bl: Builder;
        private _aturanExpAr: IAturan[] = [];
        public get aturanExpAr(): IAturan[] {
            return this._aturanExpAr;
        }

        private _aturanStmtAr: IAturan[] = [];
        public get aturanStmtAr(): IAturan[] {
            return this._aturanStmtAr;
        }

        constructor() {
            this.bl = new Builder();
        }

        aturanExp(): void {
            this._aturanExpAr = this._aturanExpAr.concat([
                {
                    type: Kons.TY_BINOP,
                    aturan: {
                        nama: 'binop baru',
                        kondisi: [
                            [Kons.TY_KATA, Kons.TY_EXP, Kons.TY_KATA_DOT],
                            [Kons.TY_OP],
                            [Kons.TY_KATA, Kons.TY_EXP, Kons.TY_KATA_DOT]
                        ],
                        sbl: [Kons.TY_MODIFIER, Kons.TY_OP, Kons.TY_BACK_SLASH],
                        stl: [Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE]
                    }
                },
                {
                    type: Kons.TY_BINOP,    //NOT
                    aturan: {
                        nama: 'not',
                        kondisi: [
                            [Kons.TY_NOT],
                            [Kons.TY_EXP],
                        ],
                        sbl: [],
                        stl: []
                    }
                },
                {
                    type: Kons.TY_ARG2,
                    aturan: {
                        nama: 'arg 2',
                        kondisi: [
                            [Kons.TY_KATA, Kons.TY_EXP],
                            [Kons.TY_KOMA],
                            [Kons.TY_EXP, Kons.TY_KATA]
                        ],
                        sbl: [Kons.TY_KOMA, Kons.TY_OP, Kons.TY_BACK_SLASH,],
                        stl: [
                            Kons.TY_OP, Kons.TY_KURUNG_BUKA, Kons.TY_ARG, Kons.TY_ARG2,
                            Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE
                        ]

                    }
                },
                {
                    type: Kons.TY_ARG,
                    aturan: {
                        nama: 'arg campur',
                        kondisi: [
                            [Kons.TY_ARG2, Kons.TY_ARG,],
                            [Kons.TY_KOMA],
                            [Kons.TY_EXP, Kons.TY_KATA,]
                        ],
                        sbl: [Kons.TY_KOMA],
                        stl: [
                            Kons.TY_OP,
                            Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_ARG, Kons.TY_KURUNG_ARG2, Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_KOSONG, Kons.TY_KURUNG_SINGLE
                        ]
                    }
                },
                this.bl.ty(Kons.TY_WHILE_STMT).kond([Kons.TY_WHILE]).kond([Kons.TY_EXP]).build()

            ])
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
                            [Kons.TY_ARG, Kons.TY_ARG2, Kons.TY_EXP, Kons.TY_KATA],
                        ],
                        sbl: [, Kons.TY_OP,],
                        stl: [Kons.TY_KURUNG_ARG, Kons.TY_ARG2, Kons.TY_KURUNG_BUKA, Kons.TY_KURUNG_SINGLE, Kons.TY_KURUNG_KOSONG]
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
                    // type: Kons.TY_DELETE_STMT,
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
                // {
                //     type: Kons.TY_ELSE_STMT,
                //     aturan: {
                //         nama: 'else stmt',
                //         kondisi: [
                //             [Kons.TY_ELSE],
                //             [Kons.TY_EXP, Kons.TY_PERINTAH],
                //         ],
                //         sbl: [],
                //         stl: []

                //     }
                // },
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
                            [Kons.TY_KURUNG_SINGLE, Kons.TY_ARG2]
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

        checkLog(aturan: IAturan[]): boolean {
            let hasil: boolean = false;
            ha.comp.log.group('check');
            hasil = this.check(aturan);
            ha.comp.log.groupEnd();
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

            // ha.comp.log.log("hasil check: " + checkAda);
            // ha.comp.log.log('sisa: ' + data.barisObj.token.length);

            return checkAda;
        }

        checkBaris(tokenAr: IToken[], aturan: IAturan): boolean {
            let ada: boolean = false;

            for (let i: number = tokenAr.length - 1; i >= 0; i--) {
                let ok: boolean = false;

                // ha.comp.log.group('iterate aturan: ' + aturan.nama);
                // ha.comp.log.log('idx token ' + i);
                ok = this.checkAturan(tokenAr, aturan, i);

                if (ok) {
                    let tokenBaru: IToken = {
                        token: [],
                        type: aturan.type
                    };

                    for (let j: number = 0; j < aturan.aturan.kondisi.length; j++) {
                        tokenBaru.token.push(parse.getToken(i + j, tokenAr));
                    }

                    ha.comp.log.log(aturan.aturan.nama);
                    ha.comp.log.log(tokenBaru);
                    ha.comp.log.log(parse.tokenToValue(tokenBaru));

                    // ha.comp.log.log('sebelum:')
                    // parse.debugToken(data.barisObj.token);

                    data.barisObj.token = ar.ganti(data.barisObj.token, i, i + tokenBaru.token.length - 1, tokenBaru, false);

                    // ha.comp.log.log('sesudah:')
                    // parse.debugToken(data.barisObj.token);

                    ada = true;
                }

                // ha.comp.log.groupEnd();
            }

            return ada;
        }

        checkKondisi(kond: number[], token: IToken): boolean {
            let hasil: boolean = false;

            // ha.comp.log.group('check kondisi')
            // ha.comp.log.log('kondisi:');
            // ha.comp.log.log(kond);
            // ha.comp.log.log('token:');
            // ha.comp.log.log(token);

            hasil = (kond.indexOf(token.type) >= 0);
            // ha.comp.log.log('hasil: ' + hasil);

            // ha.comp.log.groupEnd();

            return hasil;
        }

        checkAturan(tokenAr: IToken[], aturan: IAturan, idx: number): boolean {
            let t: IToken;
            let hasil: boolean = true;

            // ha.comp.log.log('idx token: ' + idx);

            // ha.comp.log.log('iterate kondisi:');
            for (let i: number = 0; i < aturan.aturan.kondisi.length; i++) {
                // ha.comp.log.group('idx: ' + i);

                t = parse.getToken(idx + i, tokenAr);
                // ha.comp.log.log('idx kondisi: ' + i);
                // ha.comp.log.log('ambil token, idx ' + (idx + i));
                // ha.comp.log.log('token:');
                // ha.comp.log.log(t);

                if (!t) {
                    hasil = false;
                }
                else {
                    let cocok: boolean = this.checkKondisi(aturan.aturan.kondisi[i], t);

                    if (!cocok) {
                        // ha.comp.log.log('kondisi tidak ada')
                        hasil = false;
                    }
                    else {
                        // ha.comp.log.log('kondisi ada');
                    }
                }

                // ha.comp.log.groupEnd();
            }

            //check prev
            // ha.comp.log.log('check prev');
            t = parse.getToken(idx - 1, tokenAr);
            if (t) {
                if (aturan.aturan.sbl.indexOf(t.type) >= 0) {
                    // ha.comp.log.log('prev ada');
                    hasil = false;
                }
            }

            //check setelahnya
            // ha.comp.log.log('check next');
            t = parse.getToken(idx + aturan.aturan.kondisi.length, tokenAr);
            if (t) {
                if (aturan.aturan.stl.indexOf(t.type) >= 0) {
                    // ha.comp.log.log('next ada');
                    hasil = false;
                }
            }

            // ha.comp.log.log('hasil ' + hasil);

            return hasil;
        }

    }

    export var gm2: Grammar2 = new Grammar2();

    class Builder {
        private hasil: IAturan;

        ty(ty: number): Builder {
            this.hasil = {
                type: 0,
                aturan: {
                    nama: '',
                    kondisi: [],
                    sbl: [],
                    stl: []
                }
            };

            this.hasil.type = ty;
            return this;
        }

        kond(kond: number[]): Builder {
            this.hasil.aturan.kondisi.push(kond)
            return this;
        }

        sbl(n: number[]): Builder {
            n.forEach((n1: number) => {
                this.hasil.aturan.sbl.push(n1);
            })
            return this;
        }

        stl(n: number[]): Builder {
            n.forEach((n1: number) => {
                this.hasil.aturan.stl.push(n1);
            })
            return this;
        }

        build(): IAturan {
            return this.hasil;
        }
    }
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