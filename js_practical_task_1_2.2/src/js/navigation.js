function redirect(path) {
    window.location.href = path;
}

function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
    setupMenuToggle();
    setupItemCardClick();
});

function setupMenuToggle() {
    const menuIcon = document.getElementById("menu-icon");
    const dropdownMenu = document.getElementById("dropdown-menu");

    if (menuIcon && dropdownMenu)
        menuIcon.addEventListener("click", function () {
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });
}

function setupItemCardClick() {
    const itemCard = document.querySelector('.item-card');

    if (itemCard)
        itemCard.addEventListener('click', function () {
            window.location.href = `order-view.html`;
        });
}