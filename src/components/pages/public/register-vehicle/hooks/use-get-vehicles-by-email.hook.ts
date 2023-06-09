import { useState } from "react";
import { UserVehicleService } from "../../../../../services/user_vehicle";
import {
  IUserVehicle,
  IUserVehicleGetAllResp,
} from "../../../../../state/models/user-vehicle";
import { SnackbarUtilities } from "../../../utilities";

export const useGetVehiclesByEmail = () => {
  const [isFetchingVehiclesLoading, setIsFetchingVehiclesLoading] = useState(false);
  const [userVehicles, setUserVehicles] = useState<IUserVehicle[]>([]);

  const getUserVehiclesByEmail = async (email: string): Promise<void> => {
    setIsFetchingVehiclesLoading(true);
    try {
      const result: IUserVehicleGetAllResp = await UserVehicleService.getAll({
        email,
      });
      if (!result.error) {
        handleSuccessfullFetch(result.data!);
      } else {
        handleFailedFetch(result.error[0]);
      }
    } catch (error) {
      console.log(error);
      console.log("catch is being handled by UserVehicleService.getAll");
    } finally {
      setIsFetchingVehiclesLoading(false);
    }
  };

  const handleSuccessfullFetch = (userVehicles: IUserVehicle[]): void => {
    setUserVehicles(userVehicles);
  };

  const handleFailedFetch = (error: string): void => {
    SnackbarUtilities.info(error, "bottom", "right");
  };

  return {
    getUserVehiclesByEmail,
    isFetchingVehiclesLoading,
    userVehicles,
    setUserVehicles
  };
};
