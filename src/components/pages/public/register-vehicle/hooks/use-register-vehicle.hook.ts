import { useState } from "react";
import { UserVehicleService } from "../../../../../services/user_vehicle";
import {
  IUserVehicle,
  IUserVehicleGetAllResp,
  IUserVehicleInsertReq,
  IUserVehicleInsertResp,
} from "../../../../../state/models/user-vehicle";
import { SnackbarUtilities } from "../../../utilities";

export const useRegisterVehicle = (
  setUserVehicles: React.Dispatch<React.SetStateAction<IUserVehicle[]>>
) => {
  const [isInsertingVehicle, setIsInsertingVehicle] = useState(false);

  const insertVehicleHandler = async (
    obj: IUserVehicleInsertReq
  ): Promise<void> => {
    setIsInsertingVehicle(true);
    try {
      const result: IUserVehicleInsertResp = await UserVehicleService.insert(
        obj
      );
      if (!result.error) {
        handleSuccessfullFetch(result.data!);
      } else {
        handleFailedFetch(result.error[0]);
      }
    } catch (error) {
      console.log(error);
      console.log("catch is being handled by UserVehicleService.getAll");
    } finally {
      setIsInsertingVehicle(false);
    }
  };

  const handleSuccessfullFetch = (userVehicle: IUserVehicle): void => {
    setUserVehicles((e) => [...e, userVehicle]);
    SnackbarUtilities.success(
      "Matricula agregada exitosamente!",
      "bottom",
      "right"
    );
  };

  const handleFailedFetch = (error: string): void => {
    SnackbarUtilities.info(error, "bottom", "right");
  };

  return {
    insertVehicleHandler,
    isInsertingVehicle,
  };
};
