"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Kons {
            static TY_ANGKA = 1;
            static TY_KATA = 2;
            static TY_BARIS = 3;
            static TY_BINOP = 4;
            static Ty_TEKS = 5;
            static Ty_RES_WORD = 6;
            static Ty_VAR_ASSIGNMENT = 7;
            static TY_PERINTAH = 8;
            static TY_ARGUMENT = 9;
            static TY_KURUNG_KOSONG = 10;
            static TY_PANGGIL_FUNGSI = 11;
        }
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
