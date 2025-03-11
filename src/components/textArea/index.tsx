import { HTMLProps, JSX } from "react";
import styles from "./styles.module.css";

export function TextArea({
  ...rest
}: HTMLProps<HTMLTextAreaElement>): JSX.Element {
  return <textarea className={styles.textArea} {...rest}></textarea>;
}
