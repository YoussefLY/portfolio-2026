/** Client-only flags that live for the JS session. */
export const session = {
  /** Set once the first hydrated page has mounted; later mounts are client navigations. */
  hydrated: false,
};
