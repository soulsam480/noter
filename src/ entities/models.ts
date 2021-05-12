export interface Board {
  id?: string;
  data:
    | {
        blocks: [];
        version: string;
      }
    | Record<string, any>;
  meta:
    | {
        name: string;
        stamp: number;
        cover: string;
        coverBg: {};
      }
    | Record<string, any>;
  createdAt?: Date;
  updateAt?: Date;
  access?: string[];
}
export interface User {
  loggedIn: boolean;
  data: {
    name: string;
    email: string;
    uid: string;
    img: string;
    username: string;
  } | null;
}
export interface UserData {
  name: string;
  email: string;
  uid: string;
  img: string;
  num: number;
  username: string;
}
export interface BoardStatus {
  id: string;
  status: string;
}
