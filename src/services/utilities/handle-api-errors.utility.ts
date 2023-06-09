import axios, { AxiosError, AxiosResponse } from "axios";
import { ErrorMessages } from "../../state/models/errors";
import { SnackbarUtilities } from "../../components/pages/utilities";

// Define a type for the response data that can also contain error messages
type ApiResponse<T> = T & { error?: string[] };

// Define a custom error handler type
type CustomErrorHandler = (error: unknown) => void;

// Handle Axios errors
const handleAxiosError = async (
  error: AxiosError,
  endpoint: string
): Promise<never> => {
  const errorLog = `Axios error: ${error.message}`;
  SnackbarUtilities.error(ErrorMessages.CONTACT_ADMIN, "top", "right");
  return Promise.reject(error);
};

// Handle unexpected errors
const handleUnexpectedError = async (
  error: Error,
  endpoint: string
): Promise<never> => {
  const errorLog = `Unexpected error: ${error.message}`;
  SnackbarUtilities.error(ErrorMessages.CONTACT_ADMIN, "top", "right");
  return Promise.reject(error);
};

// Handle unknown error types
const handleUnknownError = async (
  error: unknown,
  endpoint: string
): Promise<never> => {
  const errorLog = `Unexpected else error: ${JSON.stringify(error)}`;
  SnackbarUtilities.error(ErrorMessages.CONTACT_ADMIN, "top", "right");
  return Promise.reject(error);
};

// Define the handleApiErrors function that will wrap API calls and handle errors
export const handleApiErrors = async <T extends { error?: string[] }>(
  apiCall: () => Promise<AxiosResponse<T>>,
  endpoint: string, // Add an 'endpoint' parameter to the function
  customErrorHandler?: CustomErrorHandler
): Promise<T> => {
  try {
    // Call the API
    const response = await apiCall();
    const responseData: ApiResponse<T> = response.data;
    return responseData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, endpoint);
    } else if (error instanceof Error) {
      return handleUnexpectedError(error, endpoint);
    } else if (customErrorHandler) {
      customErrorHandler(error);
      return Promise.reject(error);
    } else {
      return handleUnknownError(error, endpoint);
    }
  }
};
