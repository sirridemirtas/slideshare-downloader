"use client";
import { useContext } from "react";
import { AppContext, AppActions } from "../../store";
import styles from "./Thumbnails.module.css";

const Thumbnails = () => {
  const { state, dispatch } = useContext(AppContext);

  return state.thumbs.length ? (
    <div className={styles.thumbs}>
      {state.thumbs.map((image, index) => (
        <img
          key={index}
          className={styles.thumb}
          src={image}
          alt={`Thumbnail ${index + 1}`}
        />
      ))}
    </div>
  ) : null;
};

export default Thumbnails;
