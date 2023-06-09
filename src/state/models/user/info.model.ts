import { IRole } from "../role";

export interface IUserInfo {
  name: string;
  lastName: string;
  nickname: string;
  email: string;
  role: IRole;
}


