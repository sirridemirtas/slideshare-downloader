import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppContext, AppActions } from "@/store";
import { isSlideShareUrl, upgradetoHTTPS } from "@/utils/url";
import { Button } from "@/components/ui";
import { DownloadIcon, LinkIcon } from "@/components/icons";
import styles from "./UrlBox.module.css";

const UrlBox = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useRef(null);
  const submitButton = useRef(null);

  const handleSetUrl = (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    let url = document.getElementById(styles.input).value.trim();
    if (isSlideShareUrl(url) === false) {
      dispatch({ type: AppActions.SET_INVALID_URL, payload: true });
      document.getElementById(styles.input).select();
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
        dispatch({ type: AppActions.RESET });
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
        dispatch({
          type: AppActions.SET_SELECTED_SLIDES,
          payload: data.slides,
        });
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

  // Autosize textarea
  const textarea = useRef(null);
  const resize = (event) => {
    // trim leading and trailing spaces
    event.target.value = event.target.value?.trim();
    //scroll to top
    event.target.scrollTop = 0;
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const handleInput = (event) => {
    // press enter to submit
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("button_submit_url").click();

      // blur to hide keyboard on mobile
      if (!state.invalidUrl) event.target.blur();
      return false;
    }
    resize(event);
  };

  useEffect(function onFirstMount() {
    window.addEventListener("resize", resize);
  }, []);

  const getExample = () => {
    document.getElementById(styles.input).value =
      "https://www.slideshare.net/TrevayneVanNiekerk/good-design-in-ux-and-ui-trevayne-van-niekerk";
    handleSetUrl({ preventDefault: () => {} });
    resize({ target: document.getElementById(styles.input) });
  };

  // Auto-load when there is a valid SlideShare URL in the query string
  useEffect(() => {
    const urlFromQuery = searchParams.get("url");
    const modeFromQuery = searchParams.get("mode");
    if (!urlFromQuery) return;

    if (isSlideShareUrl(urlFromQuery) === false) {
      return;
    }

    const upgradedUrl = upgradetoHTTPS(urlFromQuery.trim());
    const inputEl = document.getElementById(styles.input);
    if (inputEl) {
      inputEl.value = upgradedUrl;
      resize({ target: inputEl });
    }

    handleSetUrl({ preventDefault: () => {} });
  }, [searchParams]);

  // When slides are loaded and a mode is specified, switch to that mode
  useEffect(() => {
    const modeFromQuery = searchParams.get("mode");
    if (!modeFromQuery) return;
    if (!state.slides || state.slides.length === 0) return;

    if (modeFromQuery === "presentation") {
      dispatch({
        type: AppActions.SET_PRESENTATION_MODE,
        payload: true,
      });
      dispatch({
        type: AppActions.SET_SELECTION_MODE,
        payload: false,
      });
    } else if (modeFromQuery === "selection") {
      dispatch({
        type: AppActions.SET_SELECTION_MODE,
        payload: true,
      });
      dispatch({
        type: AppActions.SET_PRESENTATION_MODE,
        payload: false,
      });
    }
  }, [searchParams, state.slides, dispatch]);

  return (
    <div className={styles.wrapper}>
      {/* <label htmlFor={styles.input} className={styles.label}>
        Enter the URL of the SlideShare presentation you want to download
      </label> */}
      <label className={styles.error}>
        {state.invalidUrl && "Invalid SlideShare URL"}
      </label>
      <form className={styles.form} onSubmit={handleSetUrl} ref={form}>
        <LinkIcon />
        <textarea
          id={styles.input}
          className={styles.input}
          type="text"
          placeholder="Enter SlideShare URL"
          autoFocus={true}
          onClick={(e) => e.target.select()}
          disabled={isLoading}
          pattern="^(?:https?:\/\/)?(?:www\.)?slideshare\.net\/.*$"
          title="Enter a valid SlideShare URL"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          rows={1}
          required
          onKeyUp={handleInput}
          onChange={resize}
          ref={textarea}
        ></textarea>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "8px",
        }}
      >
        <Button
          type={"submit"}
          onClick={handleSetUrl}
          disabled={isLoading}
          isLoading={isLoading}
          icon={<DownloadIcon />}
          id={"button_submit_url"}
          label={"Get Slide"}
          kind={"secondary"}
          ref={submitButton}
        />

        <Button
          type={"button"}
          onClick={getExample}
          label={"Example"}
          kind={"text"}
          style={{ fontWeight: "400" }}
        />
      </div>
    </div>
  );
};

export default UrlBox;
