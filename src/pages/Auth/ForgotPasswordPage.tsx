import { Link, useNavigate } from "react-router-dom";
import TrustRow from "../../components/ui/TrustRow";
import Button from "../../components/ui/Button";
import { Mail } from "lucide-react";
import BackLink from "../../components/ui/BackLink";
import MobileLogo from "../../components/MobileLogo";
import LeftPanel from "../../components/LeftPanel";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../../schema";
import Input from "../../components/ui/Input";
import { useResetPassStore } from "../../store/useRestPassword";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isForgetPass, sendOtp } = useResetPassStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    await sendOtp({ email: data.email });
    console.log("Send OTP to:", data.email);
    await new Promise((r) => setTimeout(r, 1000)); // simulate
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      <LeftPanel
        badge="Account recovery"
        icon={<Mail size={28} color="white" strokeWidth={1.5} />}
        title="Reset your"
        highlight="password."
        description="Enter your registered email and we'll send you a one-time code to verify your identity."
        steps={[
          { label: "Enter your email address", active: true },
          { label: "Verify the OTP code", active: false },
          { label: "Set a new password", active: false },
        ]}
      />

      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <MobileLogo />
          <BackLink to="/login" label="Back to Sign In" />

          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
              <Mail size={22} className="text-violet-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Forgot password?
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              No worries! Enter your email and we'll send you a reset code.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                inputSize="md"
                variant={errors.email ? "error" : "default"}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 py-3 pl-4 pr-4 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              width={"full"}
              loading={isForgetPass}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm tracking-wide hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-200 active:scale-95 transition-all duration-200"
            >
              Send Reset Code
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:text-violet-800 transition-colors"
            >
              Sign in
            </Link>
          </p>

          <TrustRow />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
