document.addEventListener("DOMContentLoaded", loadTemplates);

function loadTemplates() {
    document
        .querySelectorAll("[get-template]")
        .forEach(async element => {
            try {
                const res = await fetch(`${element.getAttribute("get-template")}`)
                if (!res.ok) {
                    console.log('Error al buscar el componente indicado')
                    return
                }
                
                element.innerHTML = await res.text()
                

            } catch (err) {
                console.log(`Error en la carga del componente ${element.getAttribute("get-template")}:`, err)
            }
        })
}

async function fetchData() {
    try {
        const res = await fetch('data/db.json')
        const data =  await res.json()
        return data
    } catch (err) {
        console.error('Error al obtener datos:', err)
    }
}