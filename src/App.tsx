import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Teachers from "./pages/teachers/Teachers";
import Favorites from "./pages/favorites/Favorites";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Header from "./components/Header/Header";
import { useAuthState } from "./hooks/useAuthState";

export default function App() {
  const { isAuthed, isLoading } = useAuthState();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAllowed={isAuthed} isLoading={isLoading}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
