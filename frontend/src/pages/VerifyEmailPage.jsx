import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useUser } from "../context/AuthContext";
import { Loader2Icon, KeyRoundIcon, SparklesIcon } from "lucide-react";
import Navbar from "../components/Navbar";

function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const { verifyEmail, resendOtp } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await verifyEmail(email, otp);
    if (success) {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    await resendOtp(email);
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      
      <div className="flex items-center justify-center py-20 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                <SparklesIcon className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Verify Email
                </h1>
                <p className="text-base-content/60 mt-2">Enter the 6-digit code sent to <br/><span className="font-semibold text-primary">{email}</span></p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">OTP Code</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                    <KeyRoundIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 focus:input-primary transition-colors text-center font-mono tracking-widest text-lg"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="size-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-base-content/70 flex flex-col space-y-2">
              <p>Didn't receive the code?</p>
              <button 
                type="button" 
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:underline font-medium flex items-center justify-center"
              >
                {isResending ? <Loader2Icon className="size-4 animate-spin mr-1" /> : null}
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
