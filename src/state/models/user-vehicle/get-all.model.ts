import { ApiResponse } from "../others";
import { IUserVehicle } from "./";

export interface IUserVehicleGetAllReq {
  email: string;
}

export interface IUserVehicleGetAllResp extends ApiResponse<IUserVehicle[]> {}
