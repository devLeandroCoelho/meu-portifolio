document.addEventListener("DOMContentLoaded", () => {
    const includeElements = document.querySelectorAll('[include-html]');

    includeElements.forEach(async el => {
        const file = el.getAttribute('include-html');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                el.innerHTML = content;
            } else {
                el.innerHTML = "Erro ao carregar " + file;
            }
        } catch (error) {
            el.innerHTML = "Erro ao carregar " + file;
        }
    });
});
