export const colors = {
  bg: {
    primary: "#09090b",
    secondary: "#0c0c0f",
    card: "rgba(255, 255, 255, 0.03)",
    cardHover: "rgba(255, 255, 255, 0.06)",
    cardBorder: "rgba(255, 255, 255, 0.06)",
    cardBorderHover: "rgba(255, 255, 255, 0.12)",
  },
  text: {
    primary: "#fafafa",
    secondary: "rgba(250, 250, 250, 0.6)",
    muted: "rgba(250, 250, 250, 0.4)",
  },
  accent: {
    purple: "#a78bfa",
    blue: "#60a5fa",
    indigo: "#818cf8",
    violet: "#c084fc",
    fuchsia: "#e879f9",
    rose: "#fb7185",
  },
  gradient: {
    primary: "linear-gradient(135deg, #a78bfa 0%, #6366f1 50%, #818cf8 100%)",
    text: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 30%, #818cf8 60%, #60a5fa 100%)",
    card: "linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)",
  },
} as const;
