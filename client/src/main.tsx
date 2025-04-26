import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add script for FontAwesome
const fontAwesomeScript = document.createElement('script');
fontAwesomeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js';
fontAwesomeScript.integrity = 'sha512-fzff82+8pzHnwA1mQ0dzz9/E0B+ZRizq7Ki3evvivs72brA3zA7KydPRbEPE198D8Gj6JiCyZzCwJyvOWIIyLQ==';
fontAwesomeScript.crossOrigin = 'anonymous';
fontAwesomeScript.referrerPolicy = 'no-referrer';
document.head.appendChild(fontAwesomeScript);

// Set page title
document.title = "Wizard Assistant - Digital Grimoire";

// Create meta tags for description and theme color
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'An interactive, offline-capable occult reference app styled as a grimoire with Tarot, Astrology, and Geomancy sections in both English and Spanish';
document.head.appendChild(metaDescription);

const metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = '#4A154B'; // Grimoire purple
document.head.appendChild(metaThemeColor);

// Render app
createRoot(document.getElementById("root")!).render(<App />);
