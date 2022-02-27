"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse_1) {
        class Blitz {
            async load(file) {
                let hasil = await ha.comp.util.Ajax2('get', file, '');
                return hasil;
            }
            async mulai(file) {
                console.log('load file: ' + file);
                parse_1.data.dataStr = await this.load(file);
                parse_1.data.dataStr += ";;";
                parse_1.data.dataStr += "\r\n";
                console.log("data str length " + parse_1.data.dataStr.length);
                parse_1.lexer.lexer();
                parse_1.baris.lines();
                console.log('baris ar length: ' + parse_1.data.barisAr.length);
                console.group("grammar");
                for (let i = 0; i < parse_1.data.barisAr.length; i++) {
                    let barisObj = parse_1.data.barisAr[i];
                    parse_1.grammar.barisObj = barisObj;
                    parse_1.baris.renderLines(barisObj.token);
                    parse_1.grammar.grammar();
                    barisObj.terjemah = parse_1.terj.terjemah(barisObj.token[0]);
                    console.log("hasil:");
                    console.log(barisObj.terjemah);
                    console.log("");
                }
                console.groupEnd();
                console.group("hasil:");
                for (let i = 0; i < parse_1.data.barisAr.length; i++) {
                    // console.log(data.barisAr[i].baris);
                    console.log(parse_1.data.barisAr[i].terjemah);
                    // console.log("");
                }
                console.groupEnd();
                console.log("finish");
            }
            async blijs() {
                let hsl = '';
                console.log('blijs');
                hsl += "async function Start() {\n";
                parse_1.data.barisAr.forEach((barisObj) => {
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
            getToken(idx, token) {
                if (idx < 0)
                    return null;
                if (idx >= token.length)
                    return null;
                return token[idx];
            }
        }
        class Arr {
            kiri(token, idx) {
                return token.slice(0, idx);
            }
            kanan(token, idx) {
                return token.slice(idx + 1);
            }
            ambilTengah(token, idx, idx2) {
                return token.slice(idx, idx2 + 1);
            }
            ganti(token, idx, idx2, token2) {
                let kiri = this.kiri(token, idx);
                let kanan = this.kanan(token, idx2);
                let hasil = kiri.concat(token2).concat(kanan);
                return hasil;
            }
            hapus(token, idx) {
                let hasil;
                let kiri;
                let kanan;
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
        parse_1.ar = new Arr();
        parse_1.parse = new Blitz();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
// ha.parse.parse.mulai('./data/aristoids.bb');
// ha.parse.parse.mulai('./data/test.txt');
ha.parse.parse.mulai('./data/test2.txt').then(() => {
    return ha.parse.parse.blijs();
}).then((hsl) => {
    console.log(hsl);
});
