"use client";
import { useContext } from "react";
import cn from "classnames";
import { AppActions, AppContext } from "../../store";
import { DownloadPDF } from "../";
import { Button } from "../UI";
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
        <b>{state.title && <span>{state.title}</span>}</b>
        Selected: {state.selected_slides.length}/{state.slideSize}
        {state.selected_slides.length != 0 && <DownloadPDF />}
      </div>
      {state.thumbs.map((image, index) => (
        <button
          className={cn(
            styles.thumbContainer,
            state.selected_slides.includes(state.slides[index]) &&
              styles.selected
          )}
          onClick={(e) => onClickHandler(e, index)}
          key={index}
        >
          <img
            key={index}
            className={cn(styles.thumb)}
            src={image}
            alt={`Thumbnail ${index + 1}`}
          />
        </button>
      ))}
    </div>
  ) : null;
};

export default Thumbnails;
