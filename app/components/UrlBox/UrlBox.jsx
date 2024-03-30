import { useContext } from "react";
import { AppContext, AppActions } from "../../store";
import styles from "./UrlBox.module.css";

const UrlBox = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleSetUrl = () => {
    const url = document.getElementById(styles.input).value;
    dispatch({ type: AppActions.SET_URL, payload: url });

    fetch(`http://localhost:3000/api/slide?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: AppActions.SET_TITLE, payload: data.title });
        dispatch({
          type: AppActions.SET_SLIDE_SIZE,
          payload: data.slides.size,
        });
        dispatch({ type: AppActions.SET_THUMBS, payload: data.thumbs });
        dispatch({ type: AppActions.SET_SLIDES, payload: data.slides });
      });
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={styles.input} className={styles.label}>
        Enter the URL of the SlideShare presentation you want to download
      </label>
      <div className={styles.inputs}>
        <input
          id={styles.input}
          className={styles.input}
          type="text"
          placeholder="https://www.slideshare.net/SkeletonTech/skeleton-culture-code"
          autoFocus={true}
        />
        <button className={styles.button} onClick={handleSetUrl}>
          Get Slide
        </button>
      </div>
    </div>
  );
};

export default UrlBox;
