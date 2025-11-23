"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "teacher" | "admin" | "other";

export type AuthUser = {
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (params: { email: string; password: string }) => Promise<void>;
  register: (params: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "mintelligent_auth_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // User aus localStorage laden
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AuthUser;
        setUser(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  // User speichern
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login: AuthContextType["login"] = async ({ email }) => {
    // TODO: Hier später Cognito / Amplify Auth verwenden
    setUser({
      name: email.split("@")[0] || email,
      email,
      role: "teacher",
    });
  };

  const register: AuthContextType["register"] = async ({
    name,
    email,
    role,
  }) => {
    // TODO: Hier später Cognito SignUp verwenden
    setUser({ name, email, role });
  };

  const logout: AuthContextType["logout"] = async () => {
    // TODO: Hier später Cognito SignOut
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth muss innerhalb eines AuthProvider benutzt werden");
  return ctx;
};
