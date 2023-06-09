import { handleApiErrors } from "../utilities";
import { USER_VEHICLE_API_ENDPOINTS } from ".";
import parkingUtsApi from "../api/parking-uts.api";
import {
  IUserVehicleGetAllReq,
  IUserVehicleGetAllResp,
  IUserVehicleInsertReq,
  IUserVehicleInsertResp,
} from "../../state/models/user-vehicle";

/**
 * Service class for User Vehicle API operations
 */
export class UserVehicleService {
  /**
   * Retrieves all user vehicles associated with the provided email
   *
   * @param obj The request object containing the user's email
   * @returns The response object containing the list of user vehicles
   * @throws Error when the API call fails
   */
  static async getAll(
    obj: IUserVehicleGetAllReq
  ): Promise<IUserVehicleGetAllResp> {
    console.log(`${USER_VEHICLE_API_ENDPOINTS.GET_ALL}/${obj.email}`)
    return handleApiErrors<IUserVehicleGetAllResp>(
      () =>
        parkingUtsApi.get<IUserVehicleGetAllResp>(
          `${USER_VEHICLE_API_ENDPOINTS.GET_ALL}/${obj.email}`
        ),
      USER_VEHICLE_API_ENDPOINTS.GET_ALL
    );
  }

    /**
   * Inserts a new user vehicle
   *
   * @param obj The request object containing the user vehicle data
   * @returns The response object indicating the success or failure of the insertion
   * @throws Error when the API call fails
   */
    static async insert(obj: IUserVehicleInsertReq): Promise<IUserVehicleInsertResp> {
      return handleApiErrors<IUserVehicleInsertResp>(
        () => parkingUtsApi.post<IUserVehicleInsertResp>(USER_VEHICLE_API_ENDPOINTS.INSERT, obj),
        USER_VEHICLE_API_ENDPOINTS.INSERT
      );
    }
}
