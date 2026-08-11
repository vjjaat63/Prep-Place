import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/AuthContext";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import toast from "react-hot-toast";

function OAuthCallbackPage() {
  const { checkAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (token) {
        localStorage.setItem("jwt", token);
        await checkAuth();
        toast.success("Successfully logged in with OAuth!");
        navigate("/dashboard", { replace: true });
      } else if (error) {
        toast.error(decodeURIComponent(error));
        navigate("/login", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleOAuthCallback();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen bg-base-300 flex flex-col items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
        <div className="card-body flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-8 text-white" />
          </div>
          <Loader2Icon className="size-8 animate-spin text-primary mt-2" />
          <h2 className="text-xl font-bold">Completing Sign In...</h2>
          <p className="text-sm text-base-content/60">Please wait while we log you into Prep Place.</p>
        </div>
      </div>
    </div>
  );
}

export default OAuthCallbackPage;
