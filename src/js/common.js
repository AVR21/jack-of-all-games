document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();
    await injectGameData();

    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gid");

    if (gameId) {
        await loadGamePage(gameId);
    }
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
            const titleElement = element.querySelector("h3[data-gid]");
            if (titleElement) titleElement.textContent = game.title;

            const imgElement = element.querySelector("img[data-gid]");
            if (imgElement) {
                imgElement.src = `../media/${gameId}.jpg`;
                imgElement.alt = `Imagen de ${game.title}`;
            }

            // Agregar el gid al enlace
            const linkElement = element.querySelector("a[data-gid]");
            if (linkElement) {
                linkElement.href = `game.html?gid=${gameId}`;
            }
        }
    });
}

async function loadGamePage(gameId) {
    const data = await fetchData();
    if (!data || !data.games) {
        console.error("No se encontraron datos de juegos.");
        return;
    }

    const game = data.games.find(g => g.gid == gameId);
    if (!game) {
        console.error("Juego no encontrado.");
        return;
    }

    // Actualizar el título
    document.querySelector("[data-gid='title']").textContent = game.title;
    document.querySelector("[data-gid='platform']").textContent = game.platform.join(", ");
    document.querySelector("[data-gid='score']").textContent = game.score;
    document.querySelector("[data-gid='description']").textContent = game.description;

    // Obtener los elementos de la imagen y el iframe
    const placeholderImg = document.querySelector("#game-placeholder");
    const iframeElement = document.querySelector("#game-video");

    // Usamos la imagen como placeholder
    placeholderImg.src = `../media/${gameId}.jpg`;

    // Si en el futuro hay un video, lo activamos y ocultamos la imagen
    if (game.videoUrl) {
        iframeElement.src = game.videoUrl;
        placeholderImg.style.display = "none";
    } else {
        iframeElement.style.display = "none"; // Ocultar el iframe si no hay video
    }
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
