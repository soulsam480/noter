export interface Board {
  key?: string;
  data: {
    blocks: [];
    version: string;
  };
  meta: {
    name: string;
    stamp: number;
    cover: string;
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
  };
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
