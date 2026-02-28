import { create } from "zustand";
import type { IForgetPassword } from "../interface";
import { AuthService } from "../Service/auth.service";

interface IResetPassState {
  email: string;
  token: string;
  isForgetPass: boolean;
  isVerifyOtp: boolean;
  isChangePass: boolean;

  sendOtp: (data: IForgetPassword) => Promise<void>;
  verifyOtp: (data: { otp: string }) => Promise<void>;
  resetPassword: (data: { password: string }) => Promise<void>;
  reset: () => void;
}

const initialState = {
  email: "",
  token: "",
  isChangePass: false,
  isForgetPass: false,
  isVerifyOtp: false,
};

export const useResetPassStore = create<IResetPassState>((set, get) => ({
  ...initialState,

  sendOtp: async (data: IForgetPassword) => {
    set({ isForgetPass: true });
    try {
      const res = await AuthService.forgetPassword(data);
      if (res.success === true) {
        set({ email: data.email });
      }
    } catch (error) {
      // errors handled by caller / toast layer
    } finally {
      set({ isForgetPass: false });
    }
  },

  verifyOtp: async (data: { otp: string }) => {
    set({ isVerifyOtp: true });
    try {
      const res = await AuthService.verifyOtp({
        ...data,
        email: get().email,
      });
      if (res.success === true) {
        set({ token: res.token });
      }
    } catch (error) {
      // errors handled by caller / toast layer
    } finally {
      set({ isVerifyOtp: false });
    }
  },

  resetPassword: async (data: { password: string }) => {
    set({ isChangePass: true });
    try {
      const res = await AuthService.changePassword({
        ...data,
        email: get().email,
        token: get().token,
      });
      if (res.success === true) {
        get().reset();
      }
    } catch (error) {
      // errors handled by caller / toast layer
    } finally {
      set({ isChangePass: false });
    }
  },

  reset: () => set(initialState),
}));
