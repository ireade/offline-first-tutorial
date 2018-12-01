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
    const article = {
        path: articlePath,
        title: document.querySelector(".post__title").textContent
    };

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

    function saveArticleToLocalStorage() {
        const articles = JSON.parse(localStorage.getItem("articles") || "[]");

        articles.push(article);

        localStorage.setItem("articles", JSON.stringify(articles));

        return Promise.resolve();
    }

    function removeArticleFromCache() {
        return caches.delete(cacheName);
    }

    function removeArticleFromLocalStorage() {
        let articles = JSON.parse(localStorage.getItem("articles") || "[]");

        articles = articles.filter((a) => {
            if (a.path !== article.path) return a;
        });

        localStorage.setItem("articles", JSON.stringify(articles));

        return Promise.resolve();
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
                        .then(() => removeArticleFromLocalStorage())
                        .then(() => updateButton(false));
                } else {
                    saveArticleToCache()
                        .then(() => saveArticleToLocalStorage())
                        .then(() => updateButton(true));
                };
            });
    });

    checkIfArticleIsInCache().then(updateButton);
}
