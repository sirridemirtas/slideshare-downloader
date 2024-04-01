import { useContext, useState } from "react";
import { AppContext, AppActions } from "../../store";
import { isSlideShareUrl, upgradetoHTTPS } from "../../utils/url";
import styles from "./UrlBox.module.css";

const UrlBox = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetUrl = (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    let url = document.getElementById(styles.input).value.trim();
    if (isSlideShareUrl(url) === false) {
      dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
      setIsLoading(false);
      return;
    }
    url = upgradetoHTTPS(url);

    dispatch({ type: AppActions.SET_INVALID_URL, payload: false });
    dispatch({ type: AppActions.SET_URL, payload: url });

    fetch(`/api/slide?url=${url}`)
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
          throw new Error("No data received");
        }
        dispatch({ type: AppActions.SET_TITLE, payload: data.title });
        dispatch({
          type: AppActions.SET_SLIDE_SIZE,
          payload: data.size,
        });
        dispatch({ type: AppActions.SET_THUMBS, payload: data.thumbs });
        dispatch({ type: AppActions.SET_SLIDES, payload: data.slides });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error.message
        );
      })
      .finally(() => {
        setIsLoading(false);
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
          onClick={(e) => e.target.select()}
          disabled={isLoading}
          pattern="^(?:https?:\/\/)?(?:www\.)?slideshare\.net\/.*$"
          title="Enter a valid SlideShare URL"
          required
        />
        <button className={styles.button} disabled={isLoading}>
          Get Slide
        </button>
      </form>
      <label className={styles.error}>
        {state.invalidUrl && "Invalid SlideShare URL"}
      </label>
      <label className={styles.loading}>{isLoading && "Loading..."}</label>
    </div>
  );
};

export default UrlBox;
