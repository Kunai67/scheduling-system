var header = document.querySelector('.nav-header');
var nav = document.querySelector('.nav-content');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    if (scrollY > header.clientHeight) {
        header.classList.add('animate');
        nav.style.color = "#fef";
    }
    else {
        header.classList.remove('animate');
        nav.style.color = "#ece7fa";
    }
});