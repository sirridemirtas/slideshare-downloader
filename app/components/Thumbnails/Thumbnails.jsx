"use client";
import styles from "./Thumbnails.module.css";

const Thumbnails = ({ images }) => {
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
