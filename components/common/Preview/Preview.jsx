import { useContext } from "react";
import { AppContext } from "@/store";
import { AppActions } from "@/store";
import { DownloadPDF } from "@/components/common";
import { Button } from "@/components/ui";
import styles from "./Preview.module.css";

const Preview = ({ props }) => {
  const { state, dispatch } = useContext(AppContext);

  const openSelectionMode = () => {
    dispatch({
      type: AppActions.SET_SELECTION_MODE,
      payload: true,
    });

    Promise.resolve().then(() => {
      document
        .getElementById("selection")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className={styles.wrapper} id={"preview"} {...props}>
      <div
        className={styles.cover}
        style={{ "--bg-image": "url(" + state.slides[0] + ")" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={state.slides[0]} alt="Slide Cover" />
      </div>
      <div className={styles.details}>
        <span className={styles.title}>
          <b>Title:</b> {state.title}
        </span>
        <span>
          <b>Page Count:</b> {state.slideSize}
        </span>
        <span>
          <DownloadPDF label={"Download Full Slide"} full={true} />
        </span>
        <span>
          <Button
            label={"Download Selected Pages"}
            onClick={openSelectionMode}
            kind="text"
          />
        </span>
      </div>
    </div>
  );
};

export default Preview;
