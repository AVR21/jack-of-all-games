
async function xLuIncludeFile() {
    let elements = document.querySelectorAll("[xlu-include-file]");

    for (let element of elements) {
        let file = element.getAttribute("xlu-include-file");
        let placeholder = element.cloneNode(false); // Clonamos el elemento sin hijos

        try {
            let response = await fetch(file);
            if (response.ok) {
                let content = await response.text();

                if (file === "article-template.html") {
                    content = replaceArticleTemplatePlaceholders(content, element);
                }

                placeholder.removeAttribute("xlu-include-file");
                placeholder.innerHTML = content;
                element.parentNode.replaceChild(placeholder, element);
            } else {
                console.error(`Error al cargar el archivo: ${file}`);
            }
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    }
}


function replaceArticleTemplatePlaceholders(content, element) {
    let articleData = {
        title: element.getAttribute("data-title"),
        subtitle: element.getAttribute("data-subtitle"),
        date: element.getAttribute("data-date"),
        displayDate: element.getAttribute("data-display-date"),
        content: element.getAttribute("data-content"),
        image: element.getAttribute("data-image"),
        imageCaption: element.getAttribute("data-image-caption")
    };


    return content
        .replace(/{{title}}/g, articleData.title ?? "{{title}}")
        .replace(/{{subtitle}}/g, articleData.subtitle ?? "{{subtitle}}")
        .replace(/{{date}}/g, articleData.date ?? "{{date}}")
        .replace(/{{displayDate}}/g, articleData.displayDate ?? "{{displayDate}}")
        .replace(/{{content}}/g, articleData.content ?? "{{content}}")
        .replace(/{{image}}/g, articleData.image ?? "{{image}}")
        .replace(/{{imageCaption}}/g, articleData.imageCaption ?? "{{imageCaption}}");

}


function redirectToArticle(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Obtener datos del artículo desde los atributos
    let params = new URLSearchParams();
    params.append("title", element.getAttribute("data-title"));
    params.append("subtitle", element.getAttribute("data-subtitle"));
    params.append("date", element.getAttribute("data-date"));
    params.append("displayDate", element.getAttribute("data-display-date"));
    params.append("content", element.getAttribute("data-content"));
    params.append("image", element.getAttribute("data-image") || "");
    params.append("imageCaption", element.getAttribute("data-image-caption") || "");

    // Redirigir a article.html con los parámetros
    window.location.href = "article.html?" + params.toString();
}


