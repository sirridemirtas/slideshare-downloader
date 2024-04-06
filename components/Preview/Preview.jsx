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
      <div className={styles.cover}>
        <img src={state.slides[0]} alt="SlideShare cover" />
      </div>
      <div className={styles.details}>
        <span>
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
