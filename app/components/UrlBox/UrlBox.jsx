import styles from "./UrlBox.module.css";

const UrlBox = () => (
  <div className={styles.wrapper}>
    <label htmlFor={styles.input} className={styles.label}>
      Enter the URL of the SlideShare presentation you want to download
    </label>
    <div className={styles.inputs}>
      <input
        id={styles.input}
        className={styles.input}
        type="text"
        placeholder="https://www.slideshare.net/SkeletonTech/skeleton-culture-code"
        autoFocus={true}
      />
      <button className={styles.button}>Get Slide</button>
    </div>
  </div>
);

export default UrlBox;
