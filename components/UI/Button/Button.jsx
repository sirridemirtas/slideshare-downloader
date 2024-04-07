import cn from "classnames";
import { Spinner } from "../";
import styles from "./Button.module.css";

function Button({
  className,
  disabled = false,
  icon,
  isLoading,
  kind = "primary",
  label,
  ...props
}) {
  return (
    <button
      className={cn(
        styles.button,
        isLoading && styles.isLoading,
        className,
        disabled && styles.disabled,
        kind === "text" && styles.text
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : icon && icon}

      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
}

const IconButton = ({ rounded, ...props }) => {
  return (
    <Button
      {...props}
      label={undefined}
      className={cn(styles.iconButton, rounded && styles.rounded)}
    />
  );
};

export { Button, IconButton };
