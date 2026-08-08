import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon, BotIcon, FileTextIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useUser } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useUser();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg ">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              Prep Place
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/problems")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* INTERVIEWS PAGE LINK */}
          <Link
            to={"/interviews"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/interviews")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BotIcon className="size-4" />
              <span className="font-medium hidden lg:inline">Interviews</span>
            </div>
          </Link>

          {/* RESUME PAGE LINK */}
          <Link
            to={"/resume"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/resume")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <FileTextIcon className="size-4" />
              <span className="font-medium hidden lg:inline">Resume</span>
            </div>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/dashboard")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </div>
          </Link>

          <div className="ml-4 mt-2">
            {user && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-ghost btn-circle avatar p-[2px] transition-all duration-300 ${
                    user.role === "admin"
                      ? "bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-[0_0_12px_rgba(236,72,153,0.5)] hover:scale-105"
                      : "border border-base-300"
                  }`}
                >
                  <div className="w-10 rounded-full overflow-hidden bg-base-200">
                    <img alt="User avatar" src={user.imageUrl} />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56 border border-base-300">
                  <li className="menu-title px-4 py-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-base-content">{user.fullName}</span>
                      {user.role === "admin" && (
                        <span className="badge badge-sm bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold border-none text-[10px] px-1.5 py-0.5 shadow-sm">
                          👑 ADMIN
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-base-content/60 block truncate">{user.email}</span>
                  </li>
                  <li>
                    <Link to="/profile" className="hover:bg-base-200 transition-colors mt-2">
                      <UserIcon className="size-4" />
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-error hover:bg-error/10 hover:text-error transition-colors mt-2">
                      <LogOutIcon className="size-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
