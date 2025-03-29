document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();
    await injectGameData();
});

/**
 * Función que carga las plantillas HTML en los elementos con el atributo get-template.
 */
async function loadTemplates() {
    const elements = document.querySelectorAll("[get-template]");

    for (const element of elements) {
        try {
            const res = await fetch(element.getAttribute("get-template"));
            if (!res.ok) {
                console.error(`Error al cargar la plantilla: ${element.getAttribute("get-template")}`);
                continue;
            }
            element.innerHTML = await res.text();
        } catch (err) {
            console.error(`Error en la carga del componente ${element.getAttribute("get-template")}:`, err);
        }
    }
}

/**
 * Función que obtiene los datos del JSON y los inyecta en los elementos correspondientes.
 */
async function injectGameData() {
    const data = await fetchData();
    if (!data || !data.games) {
        console.error("No se encontraron datos de juegos.");
        return;
    }

    document.querySelectorAll("[data-gid]").forEach(element => {
        const gameId = element.getAttribute("data-gid");
        const game = data.games.find(g => g.gid == gameId);

        if (game) {
            // Modificar título si existe dentro del elemento
            const titleElement = element.querySelector("h3[data-gid]");
            if (titleElement) titleElement.textContent = game.title;

            // Modificar imagen si existe dentro del elemento
            const imgElement = element.querySelector("img[data-gid]");
            if (imgElement) {
                imgElement.src = `../media/${gameId}.jpg`;
                imgElement.alt = `Imagen de ${game.title}`;
            }
        }
    });
}

/**
 * Función que obtiene los datos del archivo JSON.
 */
async function fetchData() {
    try {
        const res = await fetch('../data/data.json');
        if (!res.ok) throw new Error("No se pudo obtener el JSON");
        return await res.json();
    } catch (err) {
        console.error('Error al obtener datos:', err);
        return null;
    }
}
