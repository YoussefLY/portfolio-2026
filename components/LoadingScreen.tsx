import styles from "./LoadingScreen.module.css";

type Props = {
  /** Set while the screen fades out so it can be removed once the transition ends. */
  leaving?: boolean;
  onTransitionEnd?: () => void;
};

/** The single loading state used both by Next's streaming fallback and the case study gate. */
export function LoadingScreen({ leaving, onTransitionEnd }: Props) {
  return (
    <div
      className={styles.screen}
      data-leaving={leaving ? "" : undefined}
      onTransitionEnd={onTransitionEnd}
      role="status"
      aria-live="polite"
    >
      <span className="kicker">Loading</span>
      <span className={styles.track} aria-hidden="true" />
    </div>
  );
}
