import { handleApiErrors } from "../utilities";
import { AUTH_API_ENDPOINTS } from ".";
import { IAuthLoginReq, IAuthLoginResp } from "../../state/models/auth";
import parkingUtsApi from "../api/parking-uts.api";

/**
 * Service class for authentication API operations
 */
export class AuthService {
  /**
   * Authenticates a user through the API
   *
   * @param obj The request object containing the user's credentials
   * @returns The response object containing the user's authentication token
   * @throws Error when the API call fails
   */
  static async login(obj: IAuthLoginReq): Promise<IAuthLoginResp> {
    console.log(obj, "obj");
    console.log(process.env.REACT_APP_API_URL! + AUTH_API_ENDPOINTS.LOGIN, "estoy atacando")
    return handleApiErrors<IAuthLoginResp>(
      () => parkingUtsApi.post<IAuthLoginResp>(AUTH_API_ENDPOINTS.LOGIN, obj),
      AUTH_API_ENDPOINTS.LOGIN
    );
  }
}
