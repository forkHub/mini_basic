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
            static TY_TEKS = 5;
            static TY_RES_WORD = 6;
            static Ty_VAR_ASSIGNMENT = 7;
            static TY_PERINTAH = 8;
            static TY_ARGUMENT = 9;
            static TY_KURUNG_KOSONG = 10;
            static TY_PANGGIL_FUNGSI = 11;
            static TY_OP = 100;
            static TY_KATA_DOT = 200;
            static TY_KURUNG_ISI = 300;
            static TY_IF = 400;
            static TY_IFP = 425;
            static TY_ELSEIF = 450;
            static TY_MIN = 500;
            static TY_FOR = 600;
            static TY_WEND = 700;
            static TY_SYMBOL = 800;
            static TY_FUNC = 900;
        }
        parse.Kons = Kons;
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
