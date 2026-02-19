"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function AuthModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      dispatch(closeModal());
      setEmail("");
      setPassword("");
      router.push("/for-you"); 
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      dispatch(closeModal());
      router.push('/for-you'); 
    } catch (err) {
      setError("Google sign-in failed");
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
      dispatch(closeModal());
      router.push('/for-you'); 
    } catch (err) {
      setError("Guest login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal__overlay" onClick={() => dispatch(closeModal())}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={() => dispatch(closeModal())}>
          <AiOutlineClose />
        </button>

        <h2 className="modal__title">
          {isLogin ? "Log in to Summarist" : "Sign up to Summarist"}
        </h2>

        {!isLogin && (
          <button className="btn__google" onClick={handleGoogleLogin}>
            <FcGoogle size={24} />
            Sign up with Google
          </button>
        )}

        {isLogin && (
          <>
            <button
              className="btn__guest"
              onClick={handleGuestLogin}
              disabled={loading}
            >
              Login as a Guest
            </button>
            <button className="btn__google" onClick={handleGoogleLogin}>
              <FcGoogle size={24} />
              Login with Google
            </button>
          </>
        )}

        <div className="modal__separator">
          <span>or</span>
        </div>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal__input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal__input"
            required
          />

          {error && <div className="modal__error">{error}</div>}

          <button type="submit" className="btn modal__btn" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="modal__switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="modal__switch--btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
