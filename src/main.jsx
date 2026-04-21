import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

const AppWithAnimations = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 100,
      delay: 100,
      anchorPlacement: "top-bottom",
      disableMutationObserver: false,
    });

    const refreshAOS = () => AOS.refresh();
    window.addEventListener("resize", refreshAOS);
    window.addEventListener("scroll", () => setTimeout(refreshAOS, 100));

    return () => {
      window.removeEventListener("resize", refreshAOS);
      window.removeEventListener("scroll", refreshAOS);
    };
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWithAnimations />
  </StrictMode>
);
