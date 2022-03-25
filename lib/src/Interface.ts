interface Itoken {
    type: number,
    token?: Itoken[]
    value?: string;
    valueLowerCase?: string;
}

interface IBarisObj {
    n?: number,
    token?: Itoken[],
    baris?: string,
    terjemah?: string
}

interface IGrammar {
    type: number
    tokens: number[],
    setelah?: number,
    sebelum?: number
}