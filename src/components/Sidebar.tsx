"use client";

import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { RiPencilLine } from "react-icons/ri";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo" onClick={() => router.push("/for-you")}>
        <img src="/assets/logo.png" alt="logo" />
      </div>

      <div className="sidebar__menu">
        <div
          className={`sidebar__menu-item ${pathname === "/for-you" ? "sidebar__menu-item--active" : ""}`}
          onClick={() => router.push("/for-you")}
        >
          <AiOutlineHome size={24} />
          <span>For you</span>
        </div>

        <div
          className={`sidebar__menu-item ${pathname === "/library" ? "sidebar__menu-item--active" : ""}`}
          onClick={() => router.push("/library")}
        >
          <BiLibrary size={24} />
          <span>My Library</span>
        </div>

        <div className="sidebar__menu-item sidebar__menu-item--disabled">
          <RiPencilLine size={24} />
          <span>Highlights</span>
        </div>

        <div className="sidebar__menu-item sidebar__menu-item--disabled">
          <AiOutlineSearch size={24} />
          <span>Search</span>
        </div>
      </div>

      <div className="sidebar__bottom">
        <div
          className={`sidebar__menu-item ${pathname === "/settings" ? "sidebar__menu-item--active" : ""}`}
          onClick={() => router.push("/settings")}
        >
          <AiOutlineSetting size={24} />
          <span>Settings</span>
        </div>

        <div className="sidebar__menu-item sidebar__menu-item--disabled">
          <AiOutlineQuestionCircle size={24} />
          <span>Help & Support</span>
        </div>

        {user ? (
          <div className="sidebar__menu-item" onClick={handleLogout}>
            <span>Logout</span>
          </div>
        ) : (
          <div className="sidebar__menu-item" onClick={() => router.push("/")}>
            <span>Login</span>
          </div>
        )}
      </div>
    </div>
  );
}
