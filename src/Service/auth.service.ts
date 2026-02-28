import axiosInstance from "../config/axiosInstance";
import type {
  IChangePassword,
  IForgetPassword,
  IUser,
  IVerifyOtp,
} from "../interface";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const AuthService = {
  login: async (data: ILoginPayload): Promise<IUser> => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data.data.user;
  },

  register: async (data: IRegisterPayload): Promise<IUser> => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data.data;
  },

  check: async (): Promise<IUser | null> => {
    const res = await axiosInstance.get("/auth/check");
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
  },

  forgetPassword: async (data: IForgetPassword) => {
    const res = await axiosInstance.post("/auth/password/request-otp", data);
    return res.data;
  },
  verifyOtp: async (data: IVerifyOtp) => {
    const res = await axiosInstance.post("/auth/password/verify-otp", data);
    return res.data;
  },
  changePassword: async (data: IChangePassword) => {
    const res = await axiosInstance.post("/auth/password/reset", data);
    return res.data;
  },
};
