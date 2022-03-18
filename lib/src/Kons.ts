namespace ha.parse {
    export class Kons {
        //literal
        static readonly TY_ANGKA: number = 1;
        static readonly TY_KATA: number = 2;
        static readonly TY_BARIS: number = 3;
        static readonly TY_TEKS: number = 4;
        static readonly TY_RES_WORD: number = 5;
        static readonly TY_OP: number = 6;
        static readonly TY_SYMBOL: number = 7;

        //comp
        static readonly TY_ARGUMENT: number = 100;
        static readonly TY_ARGUMENT2: number = 101;
        static readonly TY_MIN: number = 102;

        static readonly TY_KURUNG_KOSONG: number = 153;
        static readonly TY_KURUNG_ISI: number = 154;    //todo: DIHAPUS, gak pernah di buat tokennya
        static readonly TY_KURUNG_SINGLE: number = 155;
        static readonly TY_KURUNG_ARG: number = 156;
        static readonly TY_KURUNG_ARG2: number = 157;

        //exp2
        static readonly TY_KATA_DOT: number = 200;
        static readonly TY_BINOP: number = 201;
        static readonly TY_PANGGIL_FUNGSI: number = 202;
        static readonly TY_EXP: number = 203;

        static readonly TY_KOTAK: number = 203; //gak dipakai
        static readonly TY_ARRAY: number = 204;

        //stmt
        static readonly TY_VAR_ASSIGNMENT: number = 300;
        static readonly TY_PERINTAH: number = 301;
        static readonly TY_IF: number = 302;
        static readonly TY_IFTHEN: number = 303;
        static readonly TY_IFP: number = 304;
        static readonly TY_IFP2: number = 305;
        static readonly TY_ELSEIF: number = 306;

        static readonly TY_FOR: number = 305;
        static readonly TY_WEND: number = 306;
        static readonly TY_FUNC_DEC: number = 307;
        static readonly TY_RETURN: number = 308;
        static readonly TY_MOD: number = 309;

        static readonly TY_DIM_ASSINMENT: number = 400;
        static readonly TY_DIM_DEC: number = 401;       //deklarasi dim() tanpa assign ke var
        static readonly TY_DIM_DEC_VAR: number = 402;   //assign dim ke var
    }
}