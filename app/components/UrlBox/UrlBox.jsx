import { useContext } from "react";
import { AppContext, AppActions } from "../../store";
import { isSlideShareUrl, upgradetoHTTPS } from "../../../helpers/url";
import styles from "./UrlBox.module.css";

const UrlBox = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleSetUrl = (event) => {
    event.preventDefault();

    let url = document.getElementById(styles.input).value.trim();
    if (isSlideShareUrl(url) === false) {
      dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
      return;
    }
    url = upgradetoHTTPS(url);

    dispatch({ type: AppActions.SET_INVALID_URL, payload: false });
    dispatch({ type: AppActions.SET_URL, payload: url });

    fetch(`/api/slide?url=${url}`)
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
          return;
        }
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
      <form className={styles.inputs} onSubmit={handleSetUrl}>
        <input
          id={styles.input}
          className={styles.input}
          type="text"
          placeholder="https://www.slideshare.net/SkeletonTech/skeleton-culture-code"
          autoFocus={true}
        />
        <button className={styles.button}>Get Slide</button>
      </form>
      <label className={styles.error}>
        {state.invalidUrl && "Invalid SlideShare URL"}
      </label>
    </div>
  );
};

export default UrlBox;
