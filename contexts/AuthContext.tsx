"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "teacher" | "admin" | "other";

const API_BASE_URL = "http://127.0.0.1:8000";

export type AuthUser = {
  id: number;
  username: string; // wir nehmen E-Mail als username
  accessToken: string; // kommt vom Backend
  tokenType: string; // z.B. "bearer"
  chatIds: {
    id: string;
    title: string;
  }[];
};

type AuthContextType = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  chatIds: {
    id: string;
    title: string;
  }[];
  login: (params: {
    identifier: string;
    password: string;
  }) => Promise<"ok" | "not_registered">;
  register: (params: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
  logout: () => Promise<void>;
  addChatId: (id: string, title: string) => void;
  removeChatId: (id: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "mintelligent_auth_user_v1";

type ChatDTO = {
  chat_id: number;
  title: string;
  created_at?: string | null;
};

type LoginResponse = {
  access_token: string;
  token_type?: string;
  history?: ChatDTO[]; // Liste von ChatIDs
  user_id: number;
  username: string;
};

type RegisterBody = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Beim Laden: User aus localStorage holen
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AuthUser;
      setUser(parsed);
    } catch {
      // ignorieren
    }
  }, []);

  // User speichern / löschen
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login: AuthContextType["login"] = async ({ identifier, password }) => {
    // identifier = E-Mail (wir nutzen sie als username)
    const body = {
      username: identifier,
      password,
    };

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 404 || res.status === 401) {
      // Benutzer existiert nicht → später weiterleiten zur Registrierung
      return "not_registered";
    }

    if (!res.ok) {
      throw new Error("LOGIN_FAILED");
    }

    const data = (await res.json()) as LoginResponse;

    const chatIds = (data.history ?? []).map((chat) => ({
      id: String(chat.chat_id),
      title: chat.title,
    }));

    const authUser: AuthUser = {
      id: data.user_id,
      username: identifier,
      accessToken: data.access_token,
      tokenType: data.token_type ?? "bearer",
      chatIds,
    };

    setUser(authUser);
    return "ok";
  };

  const register: AuthContextType["register"] = async ({
    name,
    email,
    password,
    role, // aktuell nur zur Info, wird noch nicht ans Backend geschickt
  }) => {
    // Namen in Vor- und Nachname splitten (sehr einfache Logik)
    const parts = name.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || firstName;

    const body: RegisterBody = {
      first_name: firstName,
      last_name: lastName,
      username: email, // wir nutzen E-Mail als username
      password,
      email,
    };

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("REGISTER_FAILED");
    }

    // Nach erfolgreicher Registrierung direkt einloggen
    await login({ identifier: email, password });
  };

  const logout: AuthContextType["logout"] = async () => {
    // falls Backend einen Logout-Endpunkt hat, könnt ihr den hier aufrufen
    setUser(null);
  };

  const addChatId = (id: string, title: string) => {
    if (!user) return;
    if (user.chatIds.some((chat) => chat.id === id)) return;
    const updated: AuthUser = {
      ...user,
      chatIds: [...user.chatIds, { id, title }],
    };
    setUser(updated);
  };

  const removeChatId = (id: string) => {
    if (!user) return;
    const updated: AuthUser = {
      ...user,
      chatIds: user.chatIds.filter((chat) => chat.id !== id),
    };
    setUser(updated);
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    chatIds: user?.chatIds ?? [],
    login,
    register,
    logout,
    addChatId,
    removeChatId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth muss innerhalb eines AuthProvider benutzt werden");
  return ctx;
};
