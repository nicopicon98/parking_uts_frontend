import { ApiResponse } from "../others";
import { IUserInfo } from "../user";

export interface IAuthLoginReq {
  email: string;
  password: string;
}

export interface IAuthLoginResp extends ApiResponse<IUserInfo> {}
