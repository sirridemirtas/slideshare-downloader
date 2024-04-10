import cn from "classnames";
import useScrollPosition from "@/hooks/useScrollPosition";
import styles from "./AppBar.module.css";

const AppBar = () => {
  const { y } = useScrollPosition();

  return (
    <nav className={cn(styles.nav_wrapper, y > 0 ? styles.scroll : "")}>
      <div className={styles.nav}>
        <span className={styles.title}>SlideShare Downloader</span>
        <span></span>
      </div>
    </nav>
  );
};

export default AppBar;
