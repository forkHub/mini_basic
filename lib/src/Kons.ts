namespace ha.parse {
    export class Kons {
        static readonly TY_ANGKA: number = 1;
        static readonly TY_KATA: number = 2;
        static readonly TY_BARIS: number = 3;
        static readonly TY_BINOP: number = 4;
        static readonly TY_TEKS: number = 5;
        static readonly TY_RES_WORD: number = 6;
        static readonly Ty_VAR_ASSIGNMENT: number = 7;
        static readonly TY_PERINTAH: number = 8;
        static readonly TY_ARGUMENT: number = 9;
        static readonly TY_KURUNG_KOSONG: number = 10;
        static readonly TY_PANGGIL_FUNGSI: number = 11;
        static readonly TY_OP: number = 100;
        static readonly TY_KATA_DOT: number = 200;
        static readonly TY_KURUNG_ISI: number = 300;
        static readonly TY_IF: number = 400;
        static readonly TY_IFP: number = 425;
        static readonly TY_ELSEIF: number = 450;
        static readonly TY_MIN: number = 500;
        static readonly TY_FOR: number = 600;
        static readonly TY_WEND: number = 700;
        static readonly TY_SYMBOL: number = 800;
        static readonly TY_FUNC: number = 900;
        static readonly TY_KOTAK: number = 1000;
        static readonly TY_ARRAY: number = 1100;
        static readonly TY_RETURN: number = 1200;

    }
}