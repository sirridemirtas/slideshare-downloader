import styles from "./ActionBar.module.css";

const ActionBar = () => (
  <div className={styles.actionBar}>
    <h1 className={styles.title}>Lorem Ipsum Dolor Sit Amet</h1>
    <button className={styles.button}>DOWNLOAD PDF</button>
  </div>
);

export default ActionBar;
