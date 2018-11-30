if ('serviceWorker' in navigator && 'caches' in window) {

    const saveArticleButton = document.getElementById("save");
    const articlePath = window.location.pathname;
    const cacheName = 'article';

    saveArticleButton.removeAttribute("hidden");

    function checkIfArticleIsInCache() {
        return caches.open(cacheName).then((cache) => {
            return cache.match(articlePath).then((matchedResponse) => matchedResponse ? true : false);
        });
    }

    function saveArticleToCache() {
        const version = document.querySelector(".versionedAsset").href.split("?v=")[1];
        const assets = [
            `/assets/built/global.css?v=${version}`,
            `/assets/built/global.js?v=${version}`,
            `/assets/built/post.js?v=${version}`
        ];

        return caches.open(cacheName).then((cache) => {
            return cache.add(articlePath);
        });
    }

    function removeArticleFromCache() {
        return caches.open(cacheName).then((cache) => {
            return cache.delete(articlePath);
        });
    }

    function updateButton(isCached) {
        saveArticleButton.querySelector('.label').textContent = isCached ? "Saved! Click to remove article" : "Save Article for Offline";

        if (isCached) saveArticleButton.classList.add('saved');
        else saveArticleButton.classList.remove('saved');
    }

    saveArticleButton.addEventListener("click", (e) => {
        checkIfArticleIsInCache()
            .then((isCached) => {
                if (isCached) {
                    removeArticleFromCache()
                        .then(() => updateButton(false));
                } else {
                    saveArticleToCache()
                        .then(() => updateButton(true));
                };
            });
    });

    checkIfArticleIsInCache().then(updateButton);
}
