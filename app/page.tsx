"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useI18n } from "@/hooks/useI18n";
import { useRouter } from "next/navigation";

type Message = {
  id: number;
  sender: "user" | "assistant";
  text: string;
  personalized: boolean;
  timestamp: string;
};

export default function HomePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const { lang, toggleLang } = useLanguage();
  const t = useI18n();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "assistant",
      text: t.initialAssistant,
      personalized: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  // Begrüßungstext an Sprache anpassen
  useEffect(() => {
    setMessages((prev) => {
      if (!prev.length) return prev;
      const first = prev[0];
      if (first.sender !== "assistant") return prev;
      const updated = [...prev];
      updated[0] = { ...first, text: t.initialAssistant };
      return updated;
    });
  }, [t.initialAssistant]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString();

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      personalized: isLoggedIn,
      timestamp: now,
    };

    const assistantText = isLoggedIn
      ? `${t.modePersonal}: ${
          user?.name ?? ""
        } – (später echte personalisierte Antwort über Bedrock/Lambda).`
      : `${t.modeGuest}: ${
          lang === "de"
            ? "Später bekommst du hier passende MINT-Projektvorschläge – ganz ohne Login."
            : "Later you will get suitable MINT project suggestions here – even without logging in."
        }`;

    const assistantMsg: Message = {
      id: Date.now() + 1,
      sender: "assistant",
      text: assistantText,
      personalized: isLoggedIn,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div className="app-header-left">
          <h1>{t.headerTitle}</h1>
        </div>
        <div className="app-header-right">
          <button className="btn btn-outline" onClick={toggleLang}>
            {t.langSwitch} ({lang.toUpperCase()})
          </button>
          {isLoggedIn && (
            <span className="user-chip">
              {user?.name} ({user?.email})
            </span>
          )}
          {isLoggedIn ? (
            <button className="btn btn-primary" onClick={() => logout()}>
              {t.logout}
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline"
                onClick={() => router.push("/login")}
              >
                {t.login}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/register")}
              >
                {t.register}
              </button>
            </>
          )}
        </div>
      </header>

      <div className="app-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li className="sidebar-item active">{t.navAbout}</li>
              <li className="sidebar-item">{t.navProjects}</li>
              <li className="sidebar-item">{t.navContact}</li>
            </ul>
          </nav>

          <div className="sidebar-footer">
            {isLoggedIn ? (
              <button
                className="btn btn-outline btn-full"
                onClick={() => logout()}
              >
                {t.logout}
              </button>
            ) : (
              <span className="sidebar-hint">{t.guestHintSidebar}</span>
            )}
          </div>
        </aside>

        {/* MAIN / CHAT */}
        <main className="main">
          <section className="chat-card">
            <header className="chat-header">
              <h2>{t.assistantTitle}</h2>
              <span
                className={`badge ${
                  isLoggedIn ? "badge-personal" : "badge-guest"
                }`}
              >
                {isLoggedIn ? t.modePersonal : t.modeGuest}
              </span>
            </header>

            <p className="chat-mode-hint">
              {isLoggedIn ? t.modeHintPersonal : t.modeHintGuest}
            </p>

            <div className="chat-window">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.sender === "user"
                      ? "chat-message chat-message-user"
                      : "chat-message"
                  }
                >
                  <div className="chat-message-meta">
                    <span className="chat-sender">
                      {m.sender === "user"
                        ? lang === "de"
                          ? "Du"
                          : "You"
                        : "MINTelligent"}
                    </span>
                    <span className="chat-time">{m.timestamp}</span>
                    {m.personalized && (
                      <span className="chip chip-small">
                        {t.modePersonal}
                      </span>
                    )}
                  </div>
                  <div className="chat-bubble">{m.text}</div>
                </div>
              ))}
            </div>

            <form className="chat-input-row" onSubmit={handleSend}>
              <input
                className="chat-input"
                type="text"
                placeholder={t.chatPlaceholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                {lang === "de" ? "Senden" : "Send"}
              </button>
            </form>

            <div className="search-row">
              <input
                className="search-input"
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>
        </main>
      </div>

      <footer className="app-footer">
        <small>{t.footer}</small>
      </footer>
    </div>
  );
}
