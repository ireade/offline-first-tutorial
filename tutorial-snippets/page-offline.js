const savedArticles = document.getElementById("saved-articles");
const articles = JSON.parse(localStorage.getItem("articles") || "[]");

if (articles.length === 0) {
    savedArticles.innerHTML = "<p><strong>No articles found 😭</strong></p>"
} else {
    savedArticles.innerHTML = `
    <h2>${articles.length} offline articles</h2>
    <ul>
        ${articles.map((article) => `<li><a href="${article.path}">${article.title}</a></li>`)}
    </ul>
    `;
}