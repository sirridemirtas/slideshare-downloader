import cn from "classnames";
import useScrollPosition from "@/hooks/useScrollPosition";
import { FileSaveIcon } from "@/components/icons";
import styles from "./AppBar.module.css";

const AppBar = () => {
  const { y } = useScrollPosition();

  return (
    <nav className={cn(styles.nav_wrapper, y > 0 ? styles.scroll : "")}>
      <div className={styles.nav}>
        <h1 className={styles.logo}>
          <FileSaveIcon />
          <div className={styles.logo_text}>
            <div>SlideShare Viewer&nbsp;</div>
            <div>& Downloader</div>
          </div>
        </h1>
        <span>
          <a
            href="https://github.com/sirridemirtas/slideshare-downloader"
            target="_blank"
            className="link"
          >
            GitHub
          </a>
        </span>
      </div>
    </nav>
  );
};

export default AppBar;
