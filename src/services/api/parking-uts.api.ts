import axios, { AxiosInstance } from "axios";

class ParkingUtsApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL!,
      headers: {
        "Content-type": "application/json",
      },
    });

    this.api.interceptors.request.use((config) => {
      console.log(config, "config");
      return config;
    });

    this.api.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        // Handle errors globally here if needed
        console.log(error);
        return Promise.reject(error);
      }
    );
  }

  getApi() {
    return this.api;
  }
}

const parkingUtsApi = new ParkingUtsApi().getApi();

export default parkingUtsApi;
