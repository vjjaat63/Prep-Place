import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useUser = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      const dbUser = response.data;
      
      setUser({
        id: dbUser.clerkId || dbUser._id, // clerkId maintains compatibility with existing Stream chat/video data
        _id: dbUser._id,
        firstName: dbUser.name ? dbUser.name.split(" ")[0] : "",
        fullName: dbUser.name,
        imageUrl: dbUser.profileImage,
        email: dbUser.email,
      });
      setIsSignedIn(true);
    } catch (error) {
      setUser(null);
      setIsSignedIn(false);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const dbUser = response.data;
      
      if (dbUser.token) {
        localStorage.setItem("jwt", dbUser.token);
      }

      setUser({
        id: dbUser.clerkId || dbUser._id,
        _id: dbUser._id,
        firstName: dbUser.name ? dbUser.name.split(" ")[0] : "",
        fullName: dbUser.name,
        imageUrl: dbUser.profileImage,
        email: dbUser.email,
      });
      setIsSignedIn(true);
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
      return false;
    }
  };

  const register = async (name, email, password, profileImage) => {
    try {
      await axiosInstance.post("/auth/register", { name, email, password, profileImage });
      toast.success("OTP sent to your email");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
      return false;
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/auth/verify-email", { email, otp });
      const dbUser = response.data;

      if (dbUser.token) {
        localStorage.setItem("jwt", dbUser.token);
      }

      setUser({
        id: dbUser.clerkId || dbUser._id,
        _id: dbUser._id,
        firstName: dbUser.name ? dbUser.name.split(" ")[0] : "",
        fullName: dbUser.name,
        imageUrl: dbUser.profileImage,
        email: dbUser.email,
      });
      setIsSignedIn(true);
      toast.success("Email verified and logged in successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
      return false;
    }
  };

  const resendOtp = async (email) => {
    try {
      await axiosInstance.post("/auth/resend-otp", { email });
      toast.success("OTP resent successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("jwt");
      setUser(null);
      setIsSignedIn(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await axiosInstance.put("/auth/profile", data);
      const dbUser = response.data;
      setUser({
        id: dbUser.clerkId || dbUser._id,
        _id: dbUser._id,
        firstName: dbUser.name ? dbUser.name.split(" ")[0] : "",
        fullName: dbUser.name,
        imageUrl: dbUser.profileImage,
        email: dbUser.email,
      });
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      return false;
    }
  };

  const requestAccountDeletion = async (password) => {
    try {
      await axiosInstance.post("/auth/delete-request", { password });
      toast.success("Deletion OTP sent to your email");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to request deletion");
      return false;
    }
  };

  const confirmAccountDeletion = async (otp) => {
    try {
      await axiosInstance.delete("/auth/account", { data: { otp } });
      setUser(null);
      setIsSignedIn(false);
      toast.success("Account deleted successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isSignedIn, isLoaded, login, register, verifyEmail, resendOtp, logout, checkAuth, updateProfile, requestAccountDeletion, confirmAccountDeletion }}>
      {children}
    </AuthContext.Provider>
  );
};
