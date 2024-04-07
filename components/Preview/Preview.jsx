import { useContext } from "react";
import { AppContext } from "../../store";
import { AppActions } from "../../store";
import DownloadPDF from "../DownloadPDF/DownloadPDF";
import styles from "./Preview.module.css";
import { Button } from "../UI";

const Preview = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.cover}
        style={{
          backgroundImage: `url(${state.slides[0]})`,
          //filter: "blur(10px)",
        }}
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
          <DownloadPDF label={"Download Full Slide"} />
        </span>
        <span>
          <Button
            label={"Download Selected Pages"}
            onClick={() =>
              dispatch({
                type: AppActions.SET_SELECTION_MODE,
                payload: true,
              })
            }
          />
        </span>
      </div>
    </div>
  );
};

export default Preview;
