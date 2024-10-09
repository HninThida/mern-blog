import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to the top whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run this effect whenever the pathname changes

  return null;
};

export default ScrollToTop;
