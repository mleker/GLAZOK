export function acquireScrollLock() {
  const element = document.getElementById('root');
  const scrollTop = window.pageYOffset;
  element.style.overflow = "hidden";
  element.scrollTop = scrollTop;
}

export function releaseScrollLock() {
  const element = document.getElementById('root');
  const scrollTop = element.scrollTop;
  element.style.overflow = "visible";
  window.scrollTo(0, scrollTop);
  element.scrollTop = scrollTop;
}
