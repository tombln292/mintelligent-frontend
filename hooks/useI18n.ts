"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export const TEXT = {
  de: {
    headerTitle: "Willkommen bei MINTelligent!",
    login: "Anmelden",
    logout: "Abmelden",
    register: "Registrieren",
    navAbout: "Über MINT Zukunft e.V.",
    navProjects: "Projekte",
    navContact: "Kontakt",
    guestHintSidebar:
      "Du kannst den Chat auch ohne Anmeldung im Gastmodus testen.",
    assistantTitle: "MINTelligent Assistent",
    modeGuest: "Gastmodus",
    modePersonal: "Personalisierter Modus",
    modeHintGuest:
      "Du bist im Gastmodus. Du bekommst allgemeine Informationen. Melde dich an, um personalisierte Empfehlungen zu erhalten.",
    modeHintPersonal:
      "Deine Antworten können später mit deinem Profil, deiner Schule und deinen Klassen verknüpft werden.",
    initialAssistant:
      "Hallo, ich bin dein MINTelligent Assistent. Wie kann ich dir heute helfen?",
    chatPlaceholder:
      "Stell dem Assistenten eine Frage zu MINT-Projekten, Förderprogrammen, etc.",
    searchPlaceholder:
      "Projekte durchsuchen (Platzhalter – später echte Suche)",
    footer: "© 2025 MINTelligent – Prototyp",
    loginTitle: "Anmelden",
    loginDescription:
      "Melde dich an, um personalisierte Empfehlungen und gespeicherte Einstellungen zu erhalten.",
    loginEmail: "E-Mail",
    loginPassword: "Passwort",
    loginSubmit: "Anmelden",
    loginNoAccount: "Noch kein Konto?",
    loginGoToRegister: "Jetzt registrieren",
    registerTitle: "Registrieren",
    registerDescription:
      "Erstelle ein Konto, um personalisierte Projektvorschläge für deine Schule zu erhalten.",
    registerName: "Name",
    registerEmail: "E-Mail",
    registerPassword: "Passwort",
    registerRole: "Rolle",
    registerSubmit: "Konto erstellen",
    addlTeacher: "Lehrkraft / MINT-Koordinator:in",
    addlAdmin: "Schulleitung / Behörde",
    addlOther: "Sonstige Rolle",
    langSwitch: "DE / EN",
  },
  en: {
    headerTitle: "Welcome to MINTelligent!",
    login: "Login",
    logout: "Logout",
    register: "Sign up",
    navAbout: "About MINT Zukunft e.V.",
    navProjects: "Projects",
    navContact: "Contact",
    guestHintSidebar:
      "You can also try the assistant in guest mode without signing in.",
    assistantTitle: "MINTelligent Assistant",
    modeGuest: "Guest mode",
    modePersonal: "Personalized mode",
    modeHintGuest:
      "You are in guest mode. You will get general information. Sign in for personalized recommendations.",
    modeHintPersonal:
      "Your answers can later be linked with your profile, school and classes.",
    initialAssistant:
      "Hi, I’m your MINTelligent assistant. How can I help you today?",
    chatPlaceholder:
      "Ask the assistant about STEM projects, funding programmes, etc.",
    searchPlaceholder: "Search projects (placeholder – real search later)",
    footer: "© 2025 MINTelligent – Prototype",
    loginTitle: "Login",
    loginDescription:
      "Sign in to access personalized recommendations and saved settings.",
    loginEmail: "Email",
    loginPassword: "Password",
    loginSubmit: "Login",
    loginNoAccount: "No account yet?",
    loginGoToRegister: "Create one now",
    registerTitle: "Register",
    registerDescription:
      "Create an account to receive personalized project suggestions for your school.",
    registerName: "Name",
    registerEmail: "Email",
    registerPassword: "Password",
    registerRole: "Role",
    registerSubmit: "Create account",
    addlTeacher: "Teacher / STEM coordinator",
    addlAdmin: "School leadership / authority",
    addlOther: "Other role",
    langSwitch: "DE / EN",
  },
};

export const useI18n = () => {
  const { lang } = useLanguage();
  return TEXT[lang];
};
