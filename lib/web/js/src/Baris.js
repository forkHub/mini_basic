"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Baris {
            // private ar: Arr = new Arr();
            lines() {
                let idx = 100000;
                let idxTerakhir = 0;
                // let ctr: number=
                console.group('lines');
                while (idx >= 0) {
                    idx = this.getLineBreak(idxTerakhir);
                    console.log('line break ' + idx);
                    if (idx >= 0) {
                        let kiri = parse.ar.ambilTengah(parse.data.token, idxTerakhir, idx);
                        kiri = this.bersih(kiri);
                        if (kiri.length > 0) {
                            parse.data.barisAr.push({
                                n: 0,
                                token: kiri,
                                baris: parse.baris.renderLines(kiri)
                            });
                            this.renderLines(kiri);
                        }
                        idxTerakhir = idx + 1;
                    }
                }
                console.groupEnd();
            }
            bersih(tokenAr) {
                // console.group('bersih');
                while ((tokenAr.length > 0) && tokenAr[0].type == parse.Kons.TY_BARIS) {
                    // tokenAr = tokenAr.slice(1);
                    tokenAr = [];
                }
                while ((tokenAr.length > 0) && tokenAr[tokenAr.length - 1].type == parse.Kons.TY_BARIS) {
                    tokenAr = tokenAr.slice(0, tokenAr.length - 1);
                }
                //bersihkan comment
                let idx = -1;
                for (let i = 0; i < tokenAr.length; i++) {
                    if (tokenAr[i].value == ';') {
                        idx = i;
                        break;
                    }
                }
                if (idx >= 0) {
                    console.group('comment:');
                    console.log('sebelum');
                    console.log(tokenAr);
                    tokenAr = tokenAr.slice(0, idx);
                    console.log('sesudah:');
                    console.log(tokenAr);
                    console.groupEnd();
                }
                if (!tokenAr)
                    tokenAr = [];
                // console.groupEnd();
                return tokenAr;
            }
            valid(token) {
                token;
                return true;
            }
            renderLines(token) {
                let str = '';
                token.forEach((token) => {
                    str += token.value;
                });
                console.log(str);
                return str;
            }
            getLineBreak(idx) {
                for (let i = idx; i < parse.data.token.length; i++) {
                    if (parse.data.token[i].type == parse.Kons.TY_BARIS) {
                        return i;
                    }
                }
                return -1;
            }
        }
        parse.baris = new Baris();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
