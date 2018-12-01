/* **********************
 * 
 * TODO
 *  : register service worker
 * 
 ********************** */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then((registration) => {
            console.log("Yay, service worker registered! ", registration)
        })
        .catch((err) => console.log("Nooo, service worker didn't register.", err));
}
