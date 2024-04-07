"use client";
import { useContext } from "react";
import cn from "classnames";
import { AppActions, AppContext } from "../../store";
import { ActionBar } from "../";
import styles from "./Selection.module.css";

const Selection = () => {
  const { state, dispatch } = useContext(AppContext);

  const onClickHandler = (e, index) => {
    e.preventDefault();
    dispatch({ type: AppActions.TOGGLE_SLIDE, payload: state.slides[index] });
  };

  return state.thumbs.length ? (
    <div className={styles.thumbs}>
      <ActionBar className={styles.actions} />
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

export default Selection;
