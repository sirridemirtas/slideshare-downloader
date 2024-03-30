"use client";
import { useContext } from "react";
import { AppContext, AppActions } from "../../store";
import styles from "./Thumbnails.module.css";

const Thumbnails = ({ images }) => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className={styles.thumbs}>
      {images.map((image, index) => (
        <img
          key={index}
          className={styles.thumb}
          src={image}
          alt={`Thumbnail ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Thumbnails;
