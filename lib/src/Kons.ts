namespace ha.parse {
    export class Kons {
        //literal
        static readonly TY_ANGKA: number = 1;
        static readonly TY_KATA: number = 2;
        static readonly TY_BARIS: number = 3;
        static readonly TY_TEKS: number = 4;
        static readonly TY_RES_WORD: number = 5;
        static readonly TY_OP: number = 6;
        static readonly TY_OP2: number = 7;
        static readonly TY_SYMBOL: number = 8;
        static readonly TY_TRUE: number = 9;
        static readonly TY_FALSE: number = 10;
        static readonly TY_NULL: number = 11;
        static readonly TY_COLON: number = 12;

        //comp
        static readonly TY_MIN: number = 50;

        static readonly TY_ARG: number = 100;
        static readonly TY_ARG2: number = 101;
        static readonly TY_ARG_KATA: number = 100;

        static readonly TY_KURUNG_KOSONG: number = 153;
        // static readonly TY_KURUNG_ISI: number = 154;    //todo: DIHAPUS, gak pernah di buat tokennya
        static readonly TY_KURUNG_SINGLE: number = 155;
        static readonly TY_KURUNG_ARG: number = 156;
        static readonly TY_KURUNG_ARG2: number = 157;

        //exp2
        static readonly TY_KATA_DOT: number = 200;
        static readonly TY_BINOP: number = 201;
        static readonly TY_BINOP_EQ: number = 202;
        static readonly TY_PANGGIL_FUNGSI: number = 203;
        static readonly TY_EXP: number = 204;

        //stmt
        static readonly TY_STMT: number = 300;
        static readonly TY_STMT_COLON: number = 301;
        static readonly TY_STMT_M: number = 302;
        static readonly TY_PERINTAH: number = 303;

        static readonly TY_FOR: number = 305;
        static readonly TY_FOR_STEP: number = 306;
        static readonly TY_WEND: number = 307;
        static readonly TY_FUNC_DEC: number = 308;
        static readonly TY_MOD: number = 309;
        static readonly TY_RETURN: number = 310;
        static readonly TY_RETURN_EXP: number = 311;

        static readonly TY_DIM_ASSINMENT: number = 400;
        static readonly TY_DIM_DEC: number = 401;       //deklarasi dim() tanpa assign ke var
        static readonly TY_DIM_DEC_VAR: number = 402;   //assign dim ke var

        static readonly TY_TYPE_NEW_DEC: number = 500;
        static readonly TY_TYPE_DEF: number = 510;
        static readonly TY_FIELD_DEF: number = 520;
        static readonly TY_TYPE: number = 530;
        static readonly TY_FIELD: number = 540;
        static readonly TY_FIELD_M: number = 545;
        static readonly TY_ENDTYPE: number = 550;
        static readonly TY_TYPE_ACCESS: number = 560;

        static readonly TY_IF_EXP: number = 600;
        static readonly TY_IF_EXP_P: number = 601;
        static readonly TY_IF_EXP_P2: number = 602;

        static readonly TY_IF_THEN: number = 650;
        static readonly TY_IF_THEN_P: number = 651;
        static readonly TY_IF_THEN_P2: number = 652;

        static readonly TY_IF_ELSE_P: number = 660;
        static readonly TY_IF_ELSE_P2: number = 661;

        static readonly TY_IF_ELSE_THEN_P: number = 670;
        static readonly TY_IF_ELSE_THEN_P2: number = 671;

        static readonly TY_ELSE_DEC: number = 700;
        static readonly TY_ELSE_THEN: number = 701;
        static readonly TY_ELSE_P: number = 702;
        static readonly TY_ELSE_P2: number = 703;

        static readonly TY_ELSEIF_DEC: number = 750;
        static readonly TY_ELSEIF_THEN: number = 751;
        static readonly TY_ELSEIF_THEN_P: number = 752;
        static readonly TY_ELSEIF_THEN_P2: number = 753;
        static readonly TY_ELSEIF_P: number = 754;
        static readonly TY_ELSEIF_P2: number = 755;
        static readonly TY_ELSEIF_ELSE_P: number = 756;
        static readonly TY_ELSEIF_ELSE_P2: number = 757;

        static readonly TY_MOD_DEC: number = 800;
        static readonly TY_MOD_ISI: number = 801;

        static readonly TY_CASE: number = 900;
        static readonly TY_SELECT: number = 910;
        static readonly TY_END_SELECT: number = 920;
        static readonly TY_CASE_DEC: number = 930;
        static readonly TY_SELECT_DEC: number = 940;

    }
}