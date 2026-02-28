import { create } from "zustand";
import { toast } from "react-hot-toast";
import { AuthService } from "../Service/auth.service";
import type {
  IChangePassword,
  IForgetPassword,
  IUser,
  IVerifyOtp,
} from "../interface";
import { getErrorMessage } from "../lib/utils";
import { FileMinus } from "lucide-react";

interface IAuthState {
  user: IUser | null;
  isLoadingLogin: boolean;
  isLoadingCheck: boolean;
  isLoadingRegister: boolean;
  isLoadingLogout: boolean;
  isChangePassword: boolean;

  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  check: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  isLoadingLogin: false,
  isLoadingCheck: false,
  isLoadingRegister: false,
  isLoadingLogout: false,
  isChangePassword: false,

  login: async (data) => {
    set({ isLoadingLogin: true });
    try {
      const user = await AuthService.login(data);
      if (!user) {
        throw new Error("Login failed: No user data returned");
      }
      set({ user });
      toast.success("Login successful 🎉");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoadingLogin: false });
    }
  },

  register: async (data) => {
    set({ isLoadingRegister: true });
    try {
      const user = await AuthService.register(data);
      set({ user });
      toast.success("Account created successfully 🎊");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoadingRegister: false });
    }
  },

  check: async () => {
    set({ isLoadingCheck: true });
    try {
      const user = await AuthService.check();
      console.log("Checked user:", user);
      set({ user });
    } catch (error: any) {
      set({ user: null });
      toast.error("Session expired, please login again ⚠️");
    } finally {
      set({ isLoadingCheck: false });
    }
  },

  resetPassword: async (data: IChangePassword) => {
    set({ isChangePassword: true });
    try {
      return await AuthService.changePassword(data);
    } catch (error) {
    } finally {
      set({ isChangePassword: false });
    }
  },

  verifyOtp: async (data: IVerifyOtp) => {
    set({ isChangePassword: true });
    try {
      const res = AuthService.verifyOtp(data);
    } catch (error) {
    } finally {
      set({ isChangePassword: false });
    }
  },

  sendOtp: async (data: IForgetPassword) => {
    set({ isChangePassword: true });
    try {
      const res = await AuthService.forgetPassword(data);
    } catch (error) {
    } finally {
      set({ isChangePassword: false });
    }
  },

  logout: async () => {
    set({ isLoadingLogout: true });
    try {
      await AuthService.logout();
      set({ user: null });
      toast.success("Logged out successfully 👋");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoadingLogout: false });
    }
  },
}));
