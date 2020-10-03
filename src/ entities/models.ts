export interface Board {
    key: string,
    data: {
        blocks: [],
        version: string
    },
    meta: {
        name: string,
        stamp: number
    }
}

export interface User {
    loggedIn: boolean,
    data: {
        name: string,
        email: string,
        uid: string,
        img: string,
        num: number,
        eVer: boolean
    } | null
}