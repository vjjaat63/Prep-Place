import { useState, useEffect } from "react";
import { useUser } from "../context/AuthContext";
import { Loader2Icon, CameraIcon, UserIcon, Trash2Icon, CheckCircleIcon, KeyRoundIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function ProfilePage() {
  const { user, updateProfile, requestAccountDeletion, confirmAccountDeletion } = useUser();
  
  const [name, setName] = useState(user?.fullName || "");
  const [profileImage, setProfileImage] = useState(user?.imageUrl || null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Deletion states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1); // 1: request, 2: verify
  const [deleteOtp, setDeleteOtp] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.fullName);
      setProfileImage(user.imageUrl);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Only send what changed
    const data = {};
    if (name !== user.fullName) data.name = name;
    if (profileImage !== user.imageUrl) data.profileImage = profileImage;
    
    if (Object.keys(data).length > 0) {
      await updateProfile(data);
    } else {
      toast("No changes to save", { icon: "ℹ️" });
    }
    
    setIsUpdating(false);
  };

  const handleRequestDeletion = async () => {
    setIsDeleting(true);
    const success = await requestAccountDeletion(deletePassword);
    if (success) {
      setDeleteStep(2);
    }
    setIsDeleting(false);
  };

  const handleConfirmDeletion = async () => {
    if (deleteOtp.length !== 6) return;
    setIsDeleting(true);
    await confirmAccountDeletion(deleteOtp);
    setIsDeleting(false);
    // auth context will set user to null and route to home
  };

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      
      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-3xl space-y-8">
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl border-b border-base-200 pb-4 mb-4">Edit Profile</h2>
              
              <form onSubmit={handleUpdate} className="space-y-6 max-w-md mx-auto w-full">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="size-32 rounded-full bg-base-200 border-4 border-base-100 shadow-md flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="size-16 text-base-content/30" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                      <CameraIcon className="size-5" />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setProfileImage(reader.result);
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                    </label>
                  </div>
                  <p className="text-xs text-base-content/60">Click the camera icon to change picture</p>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/60">Email (Cannot be changed)</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full opacity-60 cursor-not-allowed"
                    value={user?.email || ""}
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2Icon className="size-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="size-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-error/20">
            <div className="card-body">
              <h2 className="card-title text-xl text-error flex items-center gap-2">
                <Trash2Icon className="size-5" /> Danger Zone
              </h2>
              <p className="text-base-content/70 mt-2">
                Once you delete your account, there is no going back. Please be certain. All your generated data and active sessions will be lost.
              </p>
              <div className="mt-4">
                <button 
                  className="btn btn-error btn-outline"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Delete Account</h3>
            
            {deleteStep === 1 ? (
              <>
                <p className="py-4">Please enter your password to request account deletion. This action cannot be undone.</p>
                <div className="form-control mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                      <LockIcon className="size-5" />
                    </div>
                    <input
                      type={showDeletePassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10 pr-10 focus:input-error transition-colors"
                      placeholder="Your current password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-error transition-colors"
                      onClick={() => setShowDeletePassword(!showDeletePassword)}
                    >
                      {showDeletePassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                    </button>
                  </div>
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={() => { setShowDeleteModal(false); setDeletePassword(""); }} disabled={isDeleting}>Cancel</button>
                  <button className="btn btn-error" onClick={handleRequestDeletion} disabled={isDeleting || !deletePassword}>
                    {isDeleting ? <Loader2Icon className="size-4 animate-spin" /> : "Request Deletion"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="py-4">We've sent a 6-digit verification code to your email. Enter it below to permanently delete your account.</p>
                <div className="form-control mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                      <KeyRoundIcon className="size-5" />
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10 text-center tracking-widest text-lg font-mono"
                      placeholder="••••••"
                      maxLength={6}
                      value={deleteOtp}
                      onChange={(e) => setDeleteOtp(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={() => { setShowDeleteModal(false); setDeleteStep(1); setDeleteOtp(""); setDeletePassword(""); }} disabled={isDeleting}>Cancel</button>
                  <button className="btn btn-error" onClick={handleConfirmDeletion} disabled={isDeleting || deleteOtp.length !== 6}>
                    {isDeleting ? <Loader2Icon className="size-4 animate-spin" /> : "Permanently Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="modal-backdrop" onClick={() => !isDeleting && setShowDeleteModal(false)}></div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
