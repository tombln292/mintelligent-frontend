"use client";

import React, { useState, FormEvent } from "react";

type User = {
  name: string;
  role: "teacher" | "admin" | "other";
};

type Message = {
  id: number;
  sender: "user" | "assistant";
  text: string;
  personalized: boolean;
  timestamp: string;
};

const MintelligentApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "assistant",
      text: "Hallo, ich bin dein MINTelligent Assistent. Wie kann ich dir heute helfen?",
      personalized: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const isLoggedIn = !!user;

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
      ? `Personalisierte Beispielantwort für ${user?.name}: Ich berücksichtige zukünftig dein Profil, Schule, Klassenstufen und Ziele.`
      : "Allgemeine Beispielantwort: Später bekommst du hier Vorschläge zu passenden MINT-Projekten – ganz ohne Login.";

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

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-left">
          <h1>Welcome to MINTelligent!</h1>
        </div>
        <div className="app-header-right">
          {isLoggedIn && (
            <span className="user-chip">
              Eingeloggt als <strong>{user?.name}</strong>
            </span>
          )}
          {isLoggedIn ? (
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setShowLogin(true)}>
              Login
            </button>
          )}
        </div>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <nav>
            <ul>
              <li className="sidebar-item active">About MINT</li>
              <li className="sidebar-item">Projects</li>
              <li className="sidebar-item">Contact</li>
            </ul>
          </nav>

          <div className="sidebar-footer">
            {isLoggedIn ? (
              <button className="btn btn-outline btn-full" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <span className="sidebar-hint">
                Noch kein Login nötig, du kannst den Chat im Gastmodus testen.
              </span>
            )}
          </div>
        </aside>

        <main className="main">
          <section className="chat-card">
            <header className="chat-header">
              <h2>MINTelligent Assistent</h2>
              <span className={`badge ${isLoggedIn ? "badge-personal" : "badge-guest"}`}>
                {isLoggedIn ? "Personalisierter Modus" : "Gastmodus"}
              </span>
            </header>

            <p className="chat-mode-hint">
              {isLoggedIn
                ? "Deine Antworten können später mit deinem Profil, deiner Schule und deinen Klassen verknüpft werden."
                : "Du bist im Gastmodus. Du bekommst allgemeine Informationen. Melde dich an, um personalisierte Empfehlungen zu erhalten."}
            </p>

            <div className="chat-window">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.sender === "user" ? "chat-message chat-message-user" : "chat-message"
                  }
                >
                  <div className="chat-message-meta">
                    <span className="chat-sender">
                      {m.sender === "user" ? "Du" : "MINTelligent"}
                    </span>
                    <span className="chat-time">{m.timestamp}</span>
                    {m.personalized && <span className="chip chip-small">personalisiert</span>}
                  </div>
                  <div className="chat-bubble">{m.text}</div>
                </div>
              ))}
            </div>

            <form className="chat-input-row" onSubmit={handleSend}>
              <input
                className="chat-input"
                type="text"
                placeholder="Stell dem Assistenten eine Frage zu MINT-Projekten, Förderprogrammen, etc."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Senden
              </button>
            </form>

            <div className="search-row">
              <input
                className="search-input"
                type="text"
                placeholder="Projekte durchsuchen (Platzhalter – später mit echter Suche verbunden)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>
        </main>
      </div>

      <footer className="app-footer">
        <small>© {new Date().getFullYear()} MINTelligent – Prototyp</small>
      </footer>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(u) => {
            setUser(u);
            setShowLogin(false);
          }}
        />
      )}
    </div>
  );
};

type LoginModalProps = {
  onClose: () => void;
  onLogin: (user: User) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<User["role"]>("teacher");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name: name.trim(), role });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h3>Login (Demo)</h3>
        </header>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="form-label">
            Dein Name
            <input
              className="form-input"
              type="text"
              placeholder="z.B. Frau Müller"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="form-label">
            Rolle
            <select
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value as User["role"])}
            >
              <option value="teacher">Lehrkraft / MINT-Koordinator:in</option>
              <option value="admin">Schulleitung / Behörde</option>
              <option value="other">Sonstige Rolle</option>
            </select>
          </label>

          <p className="modal-hint">
            In der finalen Version wird dieser Login über Amazon Cognito laufen. Hier ist es nur
            eine Demo, um personalisierte Antworten zu testen.
          </p>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn btn-primary">
              Einloggen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MintelligentApp;
