
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register("/sw.js", {scope: "/"})
            .then((registration) => {
                console.log("Yay service worker registered!");
            })
            .catch((err) => console.log("Boo, service worker not registered:(", err))
    });
}
