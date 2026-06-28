/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2a0002",
        "on-tertiary-fixed": "#1c1c1a",
        "on-secondary-fixed": "#261900",
        "surface-container-low": "#f6f3f2",
        "background": "#fcf9f8",
        "on-primary-fixed-variant": "#77302d",
        "on-tertiary-container": "#8d8c89",
        "on-secondary-container": "#785a1a",
        "secondary-container": "#fed488",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#3d0506",
        "tertiary": "#10100e",
        "on-surface-variant": "#544341",
        "on-error": "#ffffff",
        "primary-fixed": "#ffdad7",
        "surface-dim": "#dcd9d9",
        "surface-variant": "#e5e2e1",
        "on-surface": "#1c1b1b",
        "surface-container-highest": "#e5e2e1",
        "outline": "#877270",
        "tertiary-fixed-dim": "#c8c6c2",
        "tertiary-container": "#252523",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#dac1bf",
        "tertiary-fixed": "#e5e2de",
        "surface": "#fcf9f8",
        "on-primary-container": "#cc726d",
        "error": "#ba1a1a",
        "secondary-fixed-dim": "#e9c176",
        "inverse-primary": "#ffb3ad",
        "on-background": "#1c1b1b",
        "on-secondary-fixed-variant": "#5d4201",
        "error-container": "#ffdad6",
        "surface-tint": "#954742",
        "secondary-fixed": "#ffdea5",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-container-high": "#eae7e7",
        "surface-container": "#f0eded",
        "primary-fixed-dim": "#ffb3ad",
        "surface-bright": "#fcf9f8",
        "on-tertiary-fixed-variant": "#474744",
        "on-primary": "#ffffff",
        "primary-container": "#4a0e0e",
        "inverse-surface": "#313030",
        "inverse-on-surface": "#f3f0ef",
        "secondary": "#775a19"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "container-max": "1280px",
        "section-gap": "80px",
        "margin-mobile": "16px",
        "margin-desktop": "64px"
      },
      fontFamily: {
        "display-lg": ["Playfair Display"],
        "title-md": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "body-md": ["Manrope"],
        "body-lg": ["Manrope"],
        "label-sm": ["Manrope"],
        "headline-lg-mobile": ["Playfair Display"]
      },
      fontSize: {
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "title-md": ["20px", { "lineHeight": "28px", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "600" }]
      },
      screens:{
        'f':'1052px',
        's':'970px',
        'sl':'610px',
        'ss':'520px'
      }
    },
  },
  plugins: [],
}