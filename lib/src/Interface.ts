interface IToken {
    type: number,
    token?: IToken[]
    value?: string;
    valueLowerCase?: string;
}

interface IBarisObj {
    n?: number,
    token?: IToken[],
    baris?: string,
    terjemah?: string
}

interface IGrammar {
    type: number
    tokens: number[],
    setelah?: number,
    sebelum?: number
}

interface ErrorList {
    // file: string,
    str: string
}