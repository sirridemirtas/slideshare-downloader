import { useContext } from "react";
import { AppContext } from "@/store";
import { AppActions } from "@/store";
import { DownloadPDF } from "@/components/common";
import { Button } from "@/components/ui";
import { PresentToAllIcon, SelectAllIcon } from "@/components/icons";
import styles from "./Preview.module.css";

const Preview = ({ props }) => {
  const { state, dispatch } = useContext(AppContext);

  const isFullScreenAvailable = () => {
    return (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  };

  const openSelectionMode = () => {
    dispatch({
      type: AppActions.SET_SELECTION_MODE,
      payload: true,
    });

    dispatch({
      type: AppActions.SET_PRESENTATION_MODE,
      payload: false,
    });

    Promise.resolve().then(() => {
      document
        .getElementById("selection")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const openPresentationMode = () => {
    dispatch({
      type: AppActions.SET_PRESENTATION_MODE,
      payload: true,
    });

    dispatch({
      type: AppActions.SET_SELECTION_MODE,
      payload: false,
    });

    Promise.resolve().then(() => {
      document
        .getElementById("presentation")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <div className={styles.cardContainer} id={"preview"} {...props}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={state.slides[0]} alt="Slide Cover" />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <b>Title: </b>
          {
            // split to max 50 characters
            state.title.length > 50
              ? state.title.substring(0, 50) + "..."
              : state.title
          }
        </div>

        <div>
          <b>Page Count: </b>
          {state.slideSize}
        </div>

        <DownloadPDF label={"Download Full Slide"} full={true} />

        <Button
          label={"Selection Mode"}
          onClick={openSelectionMode}
          icon={<SelectAllIcon />}
          kind="text"
          disabled={state.slides.length === 0 || state.selection_mode === true}
        />

        {isFullScreenAvailable && (
          <Button
            label={"Open Presentation Mode"}
            onClick={openPresentationMode}
            icon={<PresentToAllIcon />}
            kind="text"
            disabled={
              state.slides.length === 0 || state.presentation_mode === true
            }
          />
        )}

        <span className={"disclaimer"}>
          The download function may not always work due to server limitations.
          You can install the application on your computer as described on&nbsp;
          <a
            href="https://github.com/sirridemirtas/slideshare-downloader"
            target="_blank"
            className="link"
          >
            GitHub <small>↗</small>
          </a>{" "}
          and use it without restrictions.
        </span>
      </div>
    </div>
  );
};

export default Preview;
