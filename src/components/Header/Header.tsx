// import { NavLink, type NavLinkProps } from "react-router-dom";
// import { useState } from "react";
// import AuthModal from "../AuthModal/AuthModal";

// const linkStyle: NavLinkProps["style"] = ({ isActive }) => ({
//   marginRight: 12,
//   textDecoration: "none",
//   fontWeight: isActive ? 700 : 400,
// });

// export default function Header() {
//   const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);

//   return (
//     <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
//       <nav>
//         <NavLink to="/" style={linkStyle}>
//           Home
//         </NavLink>
//         <NavLink to="/teachers" style={linkStyle}>
//           Teachers
//         </NavLink>
//         <NavLink to="/favorites" style={linkStyle}>
//           Favorites
//         </NavLink>

//         <button
//           type="button"
//           onClick={() => setAuthMode("login")}
//           style={{ marginLeft: 12 }}
//         >
//           Log in
//         </button>
//         <button
//           type="button"
//           onClick={() => setAuthMode("register")}
//           style={{ marginLeft: 8 }}
//         >
//           Registration
//         </button>

//         {authMode && (
//           <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
//         )}
//       </nav>
//     </header>
//   );
// }

// import { NavLink, type NavLinkProps, useNavigate } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { useAuthState } from "../../hooks/useAuthState";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import css from "./Header.module.css";

// const linkStyle: NavLinkProps["style"] = ({ isActive }) => ({
//   marginRight: 12,
//   textDecoration: "none",
//   fontWeight: isActive ? 700 : 400,
// });

export default function Header() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  const { user, isLoading, isAuthed } = useAuthState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    // якщо людина була на /favorites — щоб не бачила “редірект мигнув”
    navigate("/", { replace: true });
  };

  const displayName = user?.displayName?.trim();
  const displayEmail = user?.email?.trim();

  return (
    // <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
    <header className={css.header}>
      <div className={css.headerContainer}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.logo}>
            <svg width={28} height={28}>
              <use href="/sprite.svg#ukraine" />
            </svg>
            <span> LearnLingo</span>
          </NavLink>
          {/* <nav style={{ display: "flex", alignItems: "center", gap: 12 }}> */}
          <div className={css.navBox}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/teachers">Teachers</NavLink>
            {isAuthed && <NavLink to="/favorites">Favorites</NavLink>}
          </div>
        </nav>
        {/* <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
        > */}
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
