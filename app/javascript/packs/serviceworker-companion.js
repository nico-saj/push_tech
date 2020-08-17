export const ready = () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('serviceworker.js').then((reg) => {
      console.log('[Companion]', 'Service worker registered!');
    }).catch((err) => {
      console.error('ServiceWorker registration failed: ', err);
    });
  }
}
