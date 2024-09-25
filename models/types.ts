export interface User extends userNamePassword {
    id?: string,
    books?: Book[]
}

export interface Book {
    id?: string,
    title: string,
    author: string
}

export interface userNamePassword {
    userName: string,
    password: string
}