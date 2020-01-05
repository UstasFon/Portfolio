let burger = document.querySelector('.burger');
let menu = document.querySelector('.nav');

 let toggleBurger = () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open')
}

burger.addEventListener('click', toggleBurger);