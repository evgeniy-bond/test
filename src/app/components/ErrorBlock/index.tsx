import styles from './ErrorBlock.module.css';

interface ErrorBlockProps {
  message?: string;
}

export default function ErrorBlock({ message }: ErrorBlockProps) {
  if (message) {
    return <div className={styles.root}>Error: {message}</div>;
  }

  return <div className={styles.root}>Error</div>;
}
