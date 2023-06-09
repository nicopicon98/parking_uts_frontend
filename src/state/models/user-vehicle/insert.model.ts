import { ApiResponse } from "../others";
import { IUserVehicle } from "./";

export interface IUserVehicleInsertReq {
  userEmail: string;
  vehiclePlate: string;
}

export interface IUserVehicleInsertResp extends ApiResponse<IUserVehicle> {}
