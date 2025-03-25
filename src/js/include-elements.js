/**
 * @author Alejandro Viera Ruiz
 * @description Include HTML content from templates
 */
document.addEventListener("DOMContentLoaded", (e) => {
    const includeElement = (elem, url) => {
        const xhr = new XMLHttpRequest();

        //Búsqueda y recogida del contenido
        xhr.addEventListener("readystatechange", e => {
            if(xhr.readyState !==4) return
            
            if(xhr.status >= 200) {
                elem.outerHTML = xhr.responseText
            }
        })

        //Envío del contenido
        xhr.open("GET", url)
        xhr.setRequestHeader("Content-type", "text/html; charset=utf-8")
        xhr.send()
    }

    document
    .querySelectorAll("[get-template]")
    .forEach(elem => includeElement(elem, elem.getAttribute("get-template")))
})