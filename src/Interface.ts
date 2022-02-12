interface Itoken {
    type: number,
    token: string | Itoken[]
}

interface IBarisObj {
    n?: number,
    token?: Itoken[]
}