import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Add custom styles for smooth scrolling and 3D effects
const style = document.createElement('style');
style.textContent = `
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #020617;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: default;
  }

  .perspective-1000 {
    perspective: 1000px;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  /* Enhanced glass effect */
  .backdrop-filter {
    -webkit-backdrop-filter: blur(10px) saturate(180%);
    backdrop-filter: blur(10px) saturate(180%);
  }

  /* Smooth transitions */
  * {
    transition-property: transform, opacity, background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  /* Hardware acceleration */
  .transform-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(107, 114, 128, 0.5);
    border-radius: 3px;
    transition: background-color 0.2s ease;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(107, 114, 128, 0.7);
  }

  /* Gradient text */
  .gradient-text {
    background: linear-gradient(to right, #60A5FA, #818CF8);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  /* Smooth fade animations */
  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
