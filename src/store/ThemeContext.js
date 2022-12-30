import { createContext } from "react";

export const ThemeContext = createContext({
  colors: {
    primary: "#31A683",
    secondary: "#E6F3EF",
    black: "#000000",
    yellow: "#F2FFCB",
    white: "#FFFFFF",
  },

  text: {
    dark: "#292929",
    white: "#FFFFFF",
    light: "rgba(41, 41, 41, 0.5)",
    primary: "#31A683",
    secondary: "#E6F3EF",
    black: "#000000",
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  fonts: {
    primary: "Inter",
    secondary: "Roboto",
  },

  fontSizes: [
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "32px",
    "40px",
  ],

  borderRadius: ["0px", "4px", "8px", "16px", "32px", "64px", "128px"],
  borderWidth: ["0px", "1px", "2px", "4px", "8px"],
  borderColor: ["#FFFFFF", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575"],

  breakpoints: ["0px", "576px", "768px", "992px", "1200px", "1600px"],

  space: [
    "0px",
    "2px",
    "4px",
    "8px",
    "12px",
    "16px",
    "20px",
    "24px",
    "32px",
    "64px",
    "128px",
    "256px",
  ],

  bg: {
    default: "#FFFFFF",
    primary: "#31A683",
    secondary: "#E6F3EF",
    yellow: "#F2FFCB",
    dark:"#E5E5E5",
    disabled: "rgba(41, 41, 41, 0.4)",
  },
});
