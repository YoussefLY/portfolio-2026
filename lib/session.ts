/** Client-only flags that live for the JS session. */
export const session = {
  /** Set once the first hydrated page has mounted; later mounts are client navigations. */
  hydrated: false,
  /**
   * Timestamp of the last back/forward. A traversal that changes route unmounts whoever
   * was listening, so the record has to outlive the components — otherwise an arriving
   * page cannot tell "navigated here" from "came back here" and overwrites the scroll
   * position the browser just restored.
   */
  traversedAt: -Infinity,
};

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    session.traversedAt = performance.now();
  });
}
