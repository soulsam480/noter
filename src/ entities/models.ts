export interface Board {
    key?: string,
    data: {
        blocks: [],
        version: string
    },
    meta: {
        name: string,
        stamp: number
    }
}
//? unused
export interface Blocks {
    blocks: [{
        data?: {
            level?: number,
            text?: string,
            items?: [""],
            style?: string
        },
        type?: string
    }],
    version: string
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
    }
}

export interface BoardStatus {
    id: string,
    status: string
}