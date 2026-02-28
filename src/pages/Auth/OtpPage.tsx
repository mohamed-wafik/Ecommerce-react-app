import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../../components/LeftPanel";
import { ShieldCheck } from "lucide-react";
import MobileLogo from "../../components/MobileLogo";
import BackLink from "../../components/ui/BackLink";
import TrustRow from "../../components/ui/TrustRow";
import Button from "../../components/ui/Button";
import { useResetPassStore } from "../../store/useRestPassword";

const OtpPage = () => {
  const navigate = useNavigate();
  const { isVerifyOtp, verifyOtp } = useResetPassStore();
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Handle individual OTP digit input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = () => {
    // TODO: replace with your resend OTP API call
    console.log("Resend OTP");
    setResendCountdown(60);
    const timer = setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    await verifyOtp({ otp: code });
    console.log("Verify OTP:", code);
    await new Promise((r) => setTimeout(r, 1000)); // simulate

    navigate("/change-password");
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      <LeftPanel
        badge="Email verification"
        icon={<ShieldCheck size={28} color="white" strokeWidth={1.5} />}
        title="Verify your"
        highlight="identity."
        description="We've sent a 6-digit code to your email address. Enter it below to continue."
        steps={[
          { label: "Enter your email address", active: false },
          { label: "Verify the OTP code", active: true },
          { label: "Set a new password", active: false },
        ]}
      />

      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <MobileLogo />
          <BackLink to="/forgot-password" label="Back" />

          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
              <ShieldCheck
                size={22}
                className="text-violet-600"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Check your email
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              We sent a 6-digit verification code. It expires in{" "}
              <span className="font-medium text-slate-700">10 minutes</span>.
            </p>
          </div>

          {/* OTP inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                Verification Code
              </label>
              <div
                className="flex gap-2.5 justify-between"
                onPaste={handleOtpPaste}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`
                      w-full aspect-square max-w-[52px] text-center text-xl font-bold
                      rounded-xl border-2 outline-none
                      transition-all duration-200 bg-slate-50
                      ${
                        digit
                          ? "border-violet-500 bg-violet-50 text-violet-700"
                          : "border-slate-200 text-slate-800"
                      }
                      focus:border-violet-500 focus:ring-2 focus:ring-violet-100
                    `}
                  />
                ))}
              </div>
            </div>

            <Button
              width={"full"}
              loading={isVerifyOtp}
              disabled={!isComplete}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 ${
                isComplete
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-200 active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Verify Code
            </Button>
          </form>

          {/* Resend */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Didn't receive the code?{" "}
              {resendCountdown > 0 ? (
                <span className="font-medium text-slate-400">
                  Resend in {resendCountdown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-semibold text-violet-600 hover:text-violet-800 transition-colors"
                >
                  Resend code
                </button>
              )}
            </p>
          </div>

          <TrustRow />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
