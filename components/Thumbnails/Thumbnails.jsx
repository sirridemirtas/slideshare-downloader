"use client";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../store";
import styles from "./Thumbnails.module.css";

const Thumbnails = () => {
  const { state } = useContext(AppContext);

  const handler = (event) => {};

  return state.thumbs.length ? (
    <div className={styles.thumbs}>
      {state.thumbs.map((image, index) => (
        <img
          key={index}
          className={cn(styles.thumb, styles.selected)}
          src={image}
          alt={`Thumbnail ${index + 1}`}
          onClick={handler}
        />
      ))}
    </div>
  ) : null;
};

export default Thumbnails;
