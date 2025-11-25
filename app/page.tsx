"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useI18n } from "@/hooks/useI18n";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type VisualizationData = {
  activity_name: string;
  engagement_score: number; // 1-10
  difficulty_score: number; // 1-10
  cost_estimation: "Niedrig" | "Mittel" | "Hoch";
  prep_time_minutes: number;
};

type Message = {
  id: number;
  sender: "user" | "assistant";
  text: string;
  personalized: boolean;
  timestamp: string;
  visualization?: VisualizationData | null;
};

/**
 * Small visual card to present activity complexity / metadata returned from the backend.
 * Place css for .visual-card, .visual-card-row, .visual-card-score etc. in your styles.
 */
export function VisualCard({ data }: { data: VisualizationData }) {
  return (
    <div className="visual-card" role="group" aria-label="activity-visualization">
      <div className="visual-card-header">
        <strong>{data.activity_name}</strong>
      </div>
      <div className="visual-card-body">
        <div className="visual-card-row">
          <span className="visual-card-label">Engagement</span>
          <span className="visual-card-score">{data.engagement_score}/10</span>
        </div>
        <div className="visual-card-row">
          <span className="visual-card-label">Difficulty</span>
          <span className="visual-card-score">{data.difficulty_score}/10</span>
        </div>
        <div className="visual-card-row">
          <span className="visual-card-label">Costs</span>
          <span className="visual-card-value">{data.cost_estimation}</span>
        </div>
        <div className="visual-card-row">
          <span className="visual-card-label">Prep time</span>
          <span className="visual-card-value">{data.prep_time_minutes} min</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to render message content: text + optional visualization card.
 * The main chat rendering can replace direct {m.text} with renderMessageContent(m)
 */
export function renderMessageContent(m: Message) {
  return (
    <>
      <div>{m.text}</div>
      {m.visualization && <VisualCard data={m.visualization} />}
    </>
  );
}

/**
 * Convert backend BotResponse to Message (includes optional visualization_data mapping).
 * Use this helper when creating bot messages so visualization gets attached to Message.
 */
export function botResponseToMessage(
  data: {
    role?: "assistant";
    chat_id: number | string;
    content: string;
    status: string;
    visualization_data?: any;
  }
): Message {
  const now = new Date().toLocaleTimeString();
  let viz: VisualizationData | null = null;
  if (data.visualization_data && typeof data.visualization_data === "object") {
    // Basic safe mapping / validation
    const vd = data.visualization_data;
    if (
      typeof vd.activity_name === "string" &&
      typeof vd.engagement_score === "number" &&
      typeof vd.difficulty_score === "number" &&
      (vd.cost_estimation === "Niedrig" ||
        vd.cost_estimation === "Mittel" ||
        vd.cost_estimation === "Hoch") &&
      typeof vd.prep_time_minutes === "number"
    ) {
      viz = {
        activity_name: vd.activity_name,
        engagement_score: vd.engagement_score,
        difficulty_score: vd.difficulty_score,
        cost_estimation: vd.cost_estimation,
        prep_time_minutes: vd.prep_time_minutes,
      };
    }
  }

  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    sender: "assistant",
    text: data.content,
    personalized: true,
    timestamp: now,
    visualization: viz,
  };
}

type ChatHistoryResponse = {
  chat_id: string;
  history: BackendHistoryItem[];
};

type BackendHistoryItem =
  | { sender: "user" | "bot"; text: string; timestamp?: string }
  | { role: "user" | "assistant"; content: string; timestamp?: string };

type BotResponse = {
  role: "assistant";
  chat_id: number | string;
  content: string;
  status: "success" | "information" | "error";
  visualization_data?: any;
};

function mapHistoryToMessages(history: BackendHistoryItem[]): Message[] {
  return history.map((item, index) => {
    const isUser =
      !("visualization_data" in item);
    const text = "text" in item ? item.text : item.content;
    const ts = item.timestamp ?? "";
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
      timestamp: "",
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
      const res = await fetch(`${API_BASE_URL}/open?id=${chatId}`, {
        headers: {
          Authorization: `${user.tokenType ?? "Bearer"} ${user.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("CHAT_LOAD_FAILED");
      }
      const data = (await res.json()) as ChatHistoryResponse;
      setCurrentChatId(data.chat_id);
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
          content: trimmed,
          // chat_id: currentChatId, // null = neuer Chat
        };

        const url =
        currentChatId != null
          ? `${API_BASE_URL}/chat?chat_id=${currentChatId}`
          : `${API_BASE_URL}/chat`;

        const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user.tokenType ?? "Bearer"} ${user.accessToken}`,
        },
        body: JSON.stringify(body),
      });
        if (!res.ok) {
          throw new Error("CHAT_SEND_FAILED");
        }

        const data = (await res.json()) as BotResponse;

        const chatIdStr = String(data.chat_id);
        if (!currentChatId) {
          setCurrentChatId(chatIdStr);
          addChatId(chatIdStr);
        }

        const now = new Date().toLocaleTimeString();

        // 1) append user message
        const userMsg: Message = {
          id: Date.now(),
          sender: "user",
          text: trimmed,
          personalized: true,
          timestamp: now,
        };

// 2) append bot message from backend
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text: data.content,
        personalized: true,
        timestamp: now, // or later from backend if you add it
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
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
          {/* kleiner Sprachschalter */}
          <button className="lang-toggle" onClick={toggleLang}>
            {t.langSwitch} ({lang.toUpperCase()})
          </button>

          {isLoggedIn && (
            <span className="user-chip">{user?.username}</span>
          )}

          {/* Login / Register / Logout schön gruppiert */}
          <div className="auth-header-buttons">
            {isLoggedIn ? (
              <button className="btn btn-primary" onClick={() => {
                setMessages([])
                logout()
              }}>
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
