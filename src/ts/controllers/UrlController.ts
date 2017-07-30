export const UrlController = (window: Window) => {
  const replaceURL = () => history.replaceState({}, "", '/')

  window.onhashchange = replaceURL
}
