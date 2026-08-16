import { Akaya_Kanadaka, Coiny, Faculty_Glyphic } from "next/font/google";

export const titleFont = Coiny({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-coiny",
});

export const subtitleFont = Akaya_Kanadaka({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-akaya-kanadaka",
});

export const bodyFont = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-faculty-glyphic",
});
