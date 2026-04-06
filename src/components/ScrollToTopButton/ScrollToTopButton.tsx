import { useEffect, useState } from "react";
import css from "./ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className={css.btn}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg width={25} height={25} fill="#0000">
        <use href="/sprite.svg#chevron-up" />
      </svg>
    </button>
  );
}
