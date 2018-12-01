/* **********************
 * 
 * TODO
 *  : display saveArticleButton
 *  : save article to cache
 *  : update button
 *  : check if article is in cache
 *  : remove article from cache
 * 
 ********************** */

if ('serviceWorker' in navigator && 'caches' in window) {

    const saveArticleButton = document.getElementById("save");
    const articlePath = window.location.pathname;
    const cacheName = "article-" + articlePath.replace(/\//g, "");

    saveArticleButton.removeAttribute("hidden");

    function checkIfArticleIsInCache() {
        return caches.keys().then((keys) => keys.includes(cacheName));
    }

    function saveArticleToCache() {
        return caches.open(cacheName).then((cache) => {
            const version = document.querySelector(".versionedAsset").href.split("?v=")[1];
            const assets = [
                `/assets/built/global.css?v=${version}`,
                `/assets/built/global.js?v=${version}`,
                `/assets/built/post.js?v=${version}`
            ];
            return cache.addAll([articlePath, ...assets]);
        });
    }

    function removeArticleFromCache() {
        return caches.delete(cacheName);
    }

    function updateButton(isCached) {
        saveArticleButton.querySelector('.label').textContent = isCached ? "Saved! Click to remove article" : "Save article for offline";

        if (isCached) saveArticleButton.classList.add("saved");
        else saveArticleButton.classList.remove("saved");
    }


    checkIfArticleIsInCache().then(updateButton);

    saveArticleButton.addEventListener("click", () => {
    
        checkIfArticleIsInCache()
            .then((isCached) => {
                if (isCached) {
                    removeArticleFromCache().then(() => updateButton(false));
                } else {
                    saveArticleToCache().then(() => updateButton(true));
                }
            })

    });




}
