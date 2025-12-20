import React, { Fragment, JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { User } from "@/store/auth/auth.types";

interface ProtectedRouteProps {
  element: JSX.Element;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const ProtectedRoute = ({ element, user, isAuthenticated, loading }: ProtectedRouteProps) => {
  const location = useLocation();

  // 1️⃣ Handle loading first - prevents redirect loop
  if (loading) {
    return <Skeleton />;
  }

  // 2️⃣ If NOT authenticated and trying to access a protected path → redirect to login
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3️⃣ If authenticated and trying to access /auth pages → redirect home
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    return <Navigate to="/" replace />;
  }

  return <Fragment>{element}</Fragment>;
};

export default ProtectedRoute;