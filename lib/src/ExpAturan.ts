/// <reference path="Kons.ts" />

namespace ha.parse {
    export const aturanExp: IAturan[] = [
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


    ]
}
