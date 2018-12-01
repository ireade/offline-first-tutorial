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

    saveArticleButton.removeAttribute("hidden");

    function checkIfArticleIsInCache() {
        return caches.open('articles-cache').then((cache) => {
            return cache.match(articlePath).then((cacheResponse) => cacheResponse ? true : false);
        });
    }

    function updateButton(isCached) {
        saveArticleButton.querySelector('.label').textContent = isCached ? "Saved! Click to remove article" : "Save Article for Offline";

        if (isCached) saveArticleButton.classList.add('saved');
        else saveArticleButton.classList.remove('saved');
    }

    function saveArticleToCache() {
        return caches.open('articles-cache').then((cache) => {
            return cache.add(articlePath);
        });
    }

    function removeArticleFromCache() {
        return caches.open('articles-cache').then((cache) => {
            return cache.delete(articlePath);
        });
    }

    checkIfArticleIsInCache().then(updateButton);

    saveArticleButton.addEventListener("click", (e) => {
        checkIfArticleIsInCache()
            .then((isCached) => {
                if (isCached) {
                    removeArticleFromCache().then(() => updateButton(false));
                } else {
                    saveArticleToCache().then(() => updateButton(true));
                }
            });
    });

}

