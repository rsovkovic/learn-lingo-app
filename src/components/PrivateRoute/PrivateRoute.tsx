import { Navigate } from "react-router-dom";

type Props = {
  isAllowed: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
};

export default function PrivateRoute({
  isAllowed,
  isLoading,
  children,
}: Props) {
  if (isLoading) return null;
  if (!isAllowed) return <Navigate to="/" replace />;
  return <>{children}</>;
}
