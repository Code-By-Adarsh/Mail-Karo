document.addEventListener("DOMContentLoaded", () => {

    /* =======================================================
       ACCORDION FUNCTIONALITY
    ======================================================= */

    const items = document.querySelectorAll(".mk-accordion-item");

    items.forEach(item => {
        const header = item.querySelector(".mk-accordion-header");
        const content = item.querySelector(".mk-accordion-content");

        header.addEventListener("click", () => {

            // Close all other accordions
            items.forEach(i => {
                if (i !== item) {
                    i.classList.remove("active");
                    const c = i.querySelector(".mk-accordion-content");
                    c.style.height = "0px";
                    c.style.opacity = "0";
                }
            });

            // Toggle current item
            const isActive = item.classList.contains("active");

            if (isActive) {
                item.classList.remove("active");
                content.style.height = "0px";
                content.style.opacity = "0";
            } else {
                item.classList.add("active");
                content.style.height = content.scrollHeight + "px";
                content.style.opacity = "1";
            }

        });
    });


    /* =======================================================
       SCROLL REVEAL ANIMATION
    ======================================================= */

    const revealElements = document.querySelectorAll(".mk-reveal");

    function revealOnScroll() {
        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 100) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

});
