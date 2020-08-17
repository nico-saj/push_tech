export const ready = () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('serviceworker.js')
  }
}
