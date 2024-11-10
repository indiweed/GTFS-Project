const searchMenu = document.querySelectorAll('.searchMenu');
const iconMenu = document.querySelectorAll('.btn_icon_search');

const burgerMenu = document.querySelectorAll('.burgerMenu');
const iconBurger = document.querySelectorAll('.btn_icon_burger');

const hiddenBurgerMenu = () => {
    burgerMenu.forEach(event => {
        if (event.classList.contains('open')) {
            event.classList.remove('open');
        } else {
            event.classList.add('open');
        }
    });

    iconBurger.forEach(burger => {
        if (burger.classList.contains('open')) {
            burger.classList.remove('open')
            iconMenu.forEach(e => {
                e.style.display = '';
            })
        } else {
            burger.classList.add('open')
            iconMenu.forEach(e => {
                e.style.display = 'none';
            })
        }
    });
}

const hiddenSearchMenu = () => {
    searchMenu.forEach(element => {
        if (element.classList.contains('open')) {
            element.classList.remove('open');
        } else {
            element.classList.add('open');
        }
    });

    iconMenu.forEach(openIcon => {
        if (openIcon.classList.contains('open')) {
            openIcon.classList.remove('open');
            iconBurger.forEach(burger => {
                burger.style.display = '';
            })
        } else {
            openIcon.classList.add('open');
            iconBurger.forEach(burger => {
                burger.style.display = 'none';
            })
        }
    });
}

export { hiddenBurgerMenu, hiddenSearchMenu };
