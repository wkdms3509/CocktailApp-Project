export const browserPreventEvent = () => {
  history.pushState(null, "", location.href);
  //   event();
};
