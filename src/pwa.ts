export function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator) || import.meta.env.DEV) {
    return;
  }

  window.addEventListener("load", () => {
    const serviceWorkerUrl = new URL("sw.js", `${window.location.origin}${import.meta.env.BASE_URL}`);

    navigator.serviceWorker.register(serviceWorkerUrl.toString()).catch(() => {
      // Offline support should never block the game.
    });
  });
}
