"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useI18n } from "@/hooks/useI18n";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type Message = {
  id: number;
  sender: "user" | "assistant";
  text: string;
  personalized: boolean;
  timestamp: string;
};

type BackendHistoryItem =
  | { sender: "user" | "bot"; text: string; timestamp?: string }
  | { role: "user" | "assistant"; content: string; timestamp?: string };

type ChatResponse = {
  id: string;
  history: BackendHistoryItem[];
};

function mapHistoryToMessages(history: BackendHistoryItem[]): Message[] {
  return history.map((item, index) => {
    const isUser =
      "sender" in item ? item.sender === "user" : item.role === "user";
    const text = "text" in item ? item.text : item.content;
    const ts = item.timestamp || new Date().toLocaleTimeString();
    return {
      id: index + 1,
      sender: isUser ? "user" : "assistant",
      text,
      personalized: true,
      timestamp: ts,
    };
  });
}

export default function HomePage() {
  const { user, isLoggedIn, logout, chatIds, addChatId } = useAuth();
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
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);

  // Begrüßungstext neu setzen, wenn Sprache wechselt
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

  const loadChat = async (chatId: string) => {
    if (!user?.accessToken) return;
    setLoadingChat(true);
    try {
      const res = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
        headers: {
          Authorization: `${user.tokenType ?? "Bearer"} ${user.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("CHAT_LOAD_FAILED");
      }
      const data = (await res.json()) as ChatResponse;
      setCurrentChatId(data.id);
      setMessages(mapHistoryToMessages(data.history));
    } catch (err) {
      console.error(err);
      alert(
        lang === "de"
          ? "Chat konnte nicht geladen werden."
          : "Could not load chat."
      );
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // EINGELOGGT → Nachricht ans Backend schicken
    if (isLoggedIn && user?.accessToken) {
      try {
        const body = {
          message: trimmed,
          chat_id: currentChatId, // null = neuer Chat
        };

        const res = await fetch(`${API_BASE_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user.tokenType ?? "Bearer"} ${
              user.accessToken
            }`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error("CHAT_SEND_FAILED");
        }

        const data = (await res.json()) as ChatResponse;

        setCurrentChatId(data.id);
        setMessages(mapHistoryToMessages(data.history));
        addChatId(data.id);
        setInput("");
        return;
      } catch (err) {
        console.error(err);
        alert(
          lang === "de"
            ? "Beim Senden an das Backend ist ein Fehler aufgetreten."
            : "Error while sending to backend."
        );
        // Fallback: weiter unten
      }
    }

    // GASTMODUS oder Fehler → einfache Demo-Antwort
    const now = new Date().toLocaleTimeString();
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      personalized: false,
      timestamp: now,
    };

    const assistantText =
      lang === "de"
        ? "Allgemeine Beispielantwort: Später bekommst du hier passende MINT-Projektvorschläge – ganz ohne Login."
        : "General example answer: Later you will get suitable STEM project suggestions here – even without logging in.";

    const assistantMsg: Message = {
      id: Date.now() + 1,
      sender: "assistant",
      text: assistantText,
      personalized: false,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([
      {
        id: 1,
        sender: "assistant",
        text: t.initialAssistant,
        personalized: isLoggedIn,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
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
              {user?.username}
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
        {/* SIDEBAR: Nav + Chatliste */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li
                className="sidebar-item active"
                onClick={() => router.push("/")}
              >
                MINTelligent
              </li>
              <li
                className="sidebar-item"
                onClick={() => router.push("/about")}
              >
                {t.navAbout}
              </li>
              <li
                className="sidebar-item"
                onClick={() => router.push("/contact")}
              >
                {t.navContact}
              </li>
            </ul>
          </nav>



          {isLoggedIn && (
            <div style={{ marginTop: "16px" }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  marginBottom: "6px",
                  color: "var(--text-muted)",
                }}
              >
                {lang === "de" ? "Deine Chats" : "Your chats"}
              </div>
              <button
                className="btn btn-outline btn-full"
                type="button"
                onClick={startNewChat}
              >
                {lang === "de" ? "Neuer Chat" : "New chat"}
              </button>
              <div style={{ marginTop: "8px", maxHeight: "220px", overflowY: "auto" }}>
                {chatIds.length === 0 && (
                  <div className="sidebar-hint">
                    {lang === "de"
                      ? "Noch keine Chats gespeichert."
                      : "No chats saved yet."}
                  </div>
                )}
                {chatIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="sidebar-item"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      marginBottom: "4px",
                      backgroundColor:
                        currentChatId === id ? "var(--accent-soft)" : undefined,
                    }}
                    onClick={() => loadChat(id)}
                  >
                    {lang === "de" ? "Chat" : "Chat"} {id}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-footer">
            {!isLoggedIn && (
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
              {loadingChat && (
                <div className="sidebar-hint">
                  {lang === "de" ? "Chat wird geladen..." : "Loading chat..."}
                </div>
              )}
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
                    {m.personalized && isLoggedIn && (
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
          </section>
        </main>
      </div>

     <footer className="app-footer">
        <small>{t.footer}</small>
        <div className="footer-links">
          <button
            type="button"
            className="footer-link"
            onClick={() => router.push("/impressum")}
          >
            {lang === "de" ? "Impressum" : "Imprint"}
          </button>
          <button
            type="button"
            className="footer-link"
            onClick={() => router.push("/datenschutz")}
          >
            {lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
          </button>
        </div>
      </footer>
      
    </div>
  );
}
