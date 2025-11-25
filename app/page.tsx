"use client";

import React, { FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
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
  type LayoutType = "table" | "bars" | "pie";

  const layouts: LayoutType[] = ["bars"];
  const layout: LayoutType =
    layouts[Math.floor(Math.random() * layouts.length)];

  const clampScore = (value: number) => Math.max(0, Math.min(10, value));

  const engagementScore = clampScore(data.engagement_score);
  const difficultyScore = clampScore(data.difficulty_score);

  const engagementPercent = (engagementScore / 10) * 100;
  const difficultyPercent = (difficultyScore / 10) * 100;

  const totalScore = engagementScore + difficultyScore || 1;
  const engagementAngle = (engagementScore / totalScore) * 360;
  const difficultyAngle = (difficultyScore / totalScore) * 360;

  const pieStyle = {
    backgroundImage: `conic-gradient(
      #4caf50 0deg ${engagementAngle}deg,
      #ff9800 ${engagementAngle}deg ${engagementAngle + difficultyAngle}deg,
      #e0e0e0 ${engagementAngle + difficultyAngle}deg 360deg
    )`,
  };

  return (
    <div
      className={`visual-card visual-card--${layout}`}
      role="group"
      aria-label={`activity-visualization-${layout}`}
    >
      <div className="visual-card-header">
        <strong>{data.activity_name}</strong>
      </div>

      <div className="visual-card-body">
        {/* Original table layout */}
        {layout === "table" && (
          <>
            <div className="visual-card-row">
              <span className="visual-card-label">Engagement</span>
              <span className="visual-card-score">{engagementScore}/10</span>
            </div>
            <div className="visual-card-row">
              <span className="visual-card-label">Difficulty</span>
              <span className="visual-card-score">{difficultyScore}/10</span>
            </div>
            <div className="visual-card-row">
              <span className="visual-card-label">Costs</span>
              <span className="visual-card-value">{data.cost_estimation}</span>
            </div>
            <div className="visual-card-row">
              <span className="visual-card-label">Prep time</span>
              <span className="visual-card-value">
                {data.prep_time_minutes} min
              </span>
            </div>
          </>
        )}

        {/* Bar chart layout */}
        {layout === "bars" && (
          <div
            className="visual-card-chart visual-card-chart--bars"
            role="img"
            aria-label={`Engagement ${engagementScore} out of 10, difficulty ${difficultyScore} out of 10`}
          >
            <div className="visual-card-row">
              <span className="visual-card-label">Engagement</span>
              <div className="visual-card-bar-group">
                <div className="visual-card-bar-track">
                  <div
                    className="visual-card-bar-fill visual-card-bar-fill--engagement"
                    style={{ width: `${engagementPercent}%` }}
                  />
                </div>
                <span className="visual-card-score">{engagementScore}/10</span>
              </div>
            </div>

            <div className="visual-card-row">
              <span className="visual-card-label">Difficulty</span>
              <div className="visual-card-bar-group">
                <div className="visual-card-bar-track">
                  <div
                    className="visual-card-bar-fill visual-card-bar-fill--difficulty"
                    style={{ width: `${difficultyPercent}%` }}
                  />
                </div>
                <span className="visual-card-score">{difficultyScore}/10</span>
              </div>
            </div>

            <div className="visual-card-row">
              <span className="visual-card-label">Costs</span>
              <span className="visual-card-value">{data.cost_estimation}</span>
            </div>
            <div className="visual-card-row">
              <span className="visual-card-label">Prep time</span>
              <span className="visual-card-value">
                {data.prep_time_minutes} min
              </span>
            </div>
          </div>
        )}

        {/* Pie chart layout */}
        {layout === "pie" && (
          <div className="visual-card-chart visual-card-chart--pie">
            <div
              className="visual-card-pie"
              style={pieStyle}
              role="img"
              aria-label={`Engagement and difficulty distribution: engagement ${engagementScore}, difficulty ${difficultyScore}`}
            />
            <div className="visual-card-pie-legend">
              <div className="visual-card-row">
                <span className="visual-card-legend-swatch visual-card-legend-swatch--engagement" />
                <span className="visual-card-label">
                  Engagement: {engagementScore}/10
                </span>
              </div>
              <div className="visual-card-row">
                <span className="visual-card-legend-swatch visual-card-legend-swatch--difficulty" />
                <span className="visual-card-label">
                  Difficulty: {difficultyScore}/10
                </span>
              </div>
            </div>

            <div className="visual-card-row">
              <span className="visual-card-label">Costs</span>
              <span className="visual-card-value">{data.cost_estimation}</span>
            </div>
            <div className="visual-card-row">
              <span className="visual-card-label">Prep time</span>
              <span className="visual-card-value">
                {data.prep_time_minutes} min
              </span>
            </div>
          </div>
        )}
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
      {m.sender === "assistant" ? (
        <ReactMarkdown>{m.text}</ReactMarkdown>
      ) : (
        <div>{m.text}</div>
      )}
      {m.visualization && <VisualCard data={m.visualization} />}
    </>
  );
}

/**
 * Convert backend BotResponse to Message (includes optional visualization_data mapping).
 * Use this helper when creating bot messages so visualization gets attached to Message.
 */
export function botResponseToMessage(data: {
  role?: "assistant";
  chat_id: number | string;
  content: string;
  status: string;
  visualization_data?: any;
}): Message {
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
    const isUser = !("visualization_data" in item);
    const text = "text" in item ? item.text : item.content;
    const ts = item.timestamp ?? "";

    let viz: VisualizationData | null = null;
    if (!isUser && "visualization_data" in item && item.visualization_data) {
      // reuse the logic from botResponseToMessage or just cast if trusted
      // For simplicity, let's reuse a small helper or duplicate safe check
      const vd = item.visualization_data;
      if (vd && typeof vd === "object") {
        viz = {
          // @ts-ignore
          activity_name: vd.activity_name,
          // @ts-ignore
          engagement_score: vd.engagement_score,
          // @ts-ignore
          difficulty_score: vd.difficulty_score,
          // @ts-ignore
          cost_estimation: vd.cost_estimation,
          // @ts-ignore
          prep_time_minutes: vd.prep_time_minutes,
        };
      }
    }

    return {
      id: index + 1,
      sender: isUser ? "user" : "assistant",
      text,
      personalized: true,
      timestamp: ts,
      visualization: viz,
    };
  });
}

export default function HomePage() {
  const { user, isLoggedIn, logout, chatIds, addChatId, removeChatId } =
    useAuth();
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
    setMessages([]);
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
      setCurrentChatId(chatId);
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

  const deleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening the chat
    if (!user?.accessToken) return;
    if (
      !confirm(lang === "de" ? "Chat wirklich löschen?" : "Delete this chat?")
    )
      return;

    try {
      const res = await fetch(`${API_BASE_URL}/chat?id=${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${user.tokenType ?? "Bearer"} ${user.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("CHAT_DELETE_FAILED");
      }
      // success
      removeChatId(chatId);
      if (currentChatId === chatId) {
        startNewChat();
      }
    } catch (err) {
      console.error(err);
      alert(
        lang === "de"
          ? "Chat konnte nicht gelöscht werden."
          : "Could not delete chat."
      );
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
          timestamp: now,
          visualization: data.visualization_data,
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

          {isLoggedIn && <span className="user-chip">{user?.username}</span>}

          {/* Login / Register / Logout schön gruppiert */}
          <div className="auth-header-buttons">
            {isLoggedIn ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMessages([]);
                  logout();
                }}
              >
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
              <div
                style={{
                  marginTop: "8px",
                  maxHeight: "220px",
                  overflowY: "auto",
                }}
              >
                {chatIds.length === 0 && (
                  <div className="sidebar-hint">
                    {lang === "de"
                      ? "Noch keine Chats gespeichert."
                      : "No chats saved yet."}
                  </div>
                )}
                {chatIds.map((id) => (
                  <div
                    key={id}
                    className={`sidebar-item ${
                      currentChatId === id ? "active" : ""
                    }`}
                    onClick={() => loadChat(id)}
                  >
                    <span>
                      {lang === "de" ? "Chat" : "Chat"} {id}
                    </span>
                    <button
                      className="sidebar-delete-btn"
                      onClick={(e) => deleteChat(id, e)}
                      title={lang === "de" ? "Löschen" : "Delete"}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
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
                      <span className="chip chip-small">{t.modePersonal}</span>
                    )}
                  </div>
                  <div className="chat-bubble">{renderMessageContent(m)}</div>
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
