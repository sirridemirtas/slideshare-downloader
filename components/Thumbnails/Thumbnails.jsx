"use client";
import cn from "classnames";
import { useContext, useRef } from "react";
import { AppActions, AppContext } from "../../store";
import { DownloadPDF } from "../";
import styles from "./Thumbnails.module.css";

const Thumbnails = () => {
  const { state, dispatch } = useContext(AppContext);

  const onClickHandler = (e, index) => {
    e.preventDefault();
    dispatch({ type: AppActions.TOGGLE_SLIDE, payload: state.slides[index] });
  };

  return state.thumbs.length ? (
    <div className={styles.thumbs}>
      <div className={styles.actions}>
        <b>{state.title && <span>Title: {state.title}</span>}</b>
        Selected: {state.selected_slides.length}/{state.slideSize}
        {state.selected_slides.length != 0 && <DownloadPDF />}
      </div>
      {state.thumbs.map((image, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          className={cn(
            styles.thumb,
            state.selected_slides.includes(state.slides[index]) &&
              styles.selected
          )}
          src={image}
          alt={`Thumbnail ${index + 1}`}
          onClick={(e) => onClickHandler(e, index)}
        />
      ))}
    </div>
  ) : null;
};

export default Thumbnails;
