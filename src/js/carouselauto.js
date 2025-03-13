document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const radioButtons = document.querySelectorAll("input[name='position']");
    const items = document.querySelectorAll(".item");
    const totalItems = radioButtons.length;
    const carousel = document.getElementById("carousel");
    let autoSlide;

    function updateCarousel() {
        items.forEach((item, i) => {
            let offset = i + 1;
            let r = ((currentIndex + 1 - offset + totalItems) % totalItems);
            if (r > totalItems / 2) r -= totalItems; // Hace que el desplazamiento sea cíclico
            let absR = Math.abs(r);
            let scale = i === currentIndex ? 1.2 : 1;

            item.style.transition = "transform 0.8s ease-in-out";
            item.style.transform = `rotateY(${-10 * r}deg) translateX(${-300 * r}px) scale(${scale})`;
            item.style.zIndex = totalItems - absR;
        });
    }

    function changeSlide(index = null) {
        if (index !== null) {
            currentIndex = index;
        } else {
            currentIndex = (currentIndex + 1) % totalItems;
        }

        radioButtons.forEach((radio, i) => {
            radio.checked = i === currentIndex;
        });

        updateCarousel();
        carousel.style.setProperty("--position", currentIndex + 1);
    }

    items.forEach((item, index) => {
        item.addEventListener("click", () => {
            clearInterval(autoSlide);
            changeSlide(index);
            autoSlide = setInterval(() => changeSlide(), 3000); // Reinicia el autoplay tras interacción
        });
    });



    document.getElementById("prevSlide").addEventListener("click", () => {
        clearInterval(autoSlide);
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        changeSlide(currentIndex);
        autoSlide = setInterval(() => changeSlide(), 3000);
    });

    document.getElementById("nextSlide").addEventListener("click", () => {
        clearInterval(autoSlide);
        changeSlide();
        autoSlide = setInterval(() => changeSlide(), 3000);
    });

    changeSlide(0); // Aplicar zoom a la primera tarjeta por defecto
    autoSlide = setInterval(() => changeSlide(), 3000);
});