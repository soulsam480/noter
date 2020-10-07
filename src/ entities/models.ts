export interface Board {
    key?: string,
    data: {
        blocks: [],
        version: string
    },
    meta: {
        name: string,
        stamp: number,
        cover: string,
        coverBg: object
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
    }
}
export interface UserData {
    name: string,
    email: string,
    uid: string,
    img: string,
    num: number,
    eVer: boolean
}
export interface BoardStatus {
    id: string,
    status: string
}