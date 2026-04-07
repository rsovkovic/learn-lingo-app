import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { useAuthState } from "../../hooks/useAuthState";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import css from "./Header.module.css";

export default function Header() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  const { user, isLoading, isAuthed } = useAuthState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  const displayName = user?.displayName?.trim();
  const displayEmail = user?.email?.trim();

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.logo}>
            <svg width={28} height={28}>
              <use href="/sprite.svg#ukraine" />
            </svg>
            <span> LearnLingo</span>
          </NavLink>
          <div className={css.navBox}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/teachers">Teachers</NavLink>
            {isAuthed && <NavLink to="/favorites">Favorites</NavLink>}
          </div>
        </nav>

        <div className={css.auth}>
          {!isLoading && isAuthed ? (
            <>
              <span className={css.spanName}>
                {displayName || displayEmail || "User"}
              </span>
              <button
                className={css.logout}
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className={css.login}
                type="button"
                onClick={() => setAuthMode("login")}
              >
                <svg width={20} height={20} className={css.icon}>
                  <use href="/sprite.svg#log-in-01" />
                </svg>
                Log in
              </button>
              <button
                className={css.reg}
                type="button"
                onClick={() => setAuthMode("register")}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
      {authMode && (
        <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
      )}
    </header>
  );
}
