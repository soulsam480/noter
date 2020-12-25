export interface Board {
  id?: string;
  data: {
    blocks: [];
    version: string;
  };
  meta: {
    name: string;
    stamp: number;
    cover: string;
    coverBg: {};
  };
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
