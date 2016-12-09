let slideout = new Slideout({
    'panel': document.getElementById('container'),
    'menu': document.getElementById('menu'),
    'fx': 'ease-in-out',
    'padding': 160,
    'tolerance': 70
});

const toggleMenu = document.querySelector('.toggle-menu');

toggleMenu.addEventListener('click', function(e) {
    slideout.toggle();
});

let liMenuList = [].slice.call(document.querySelectorAll('#menu ul li'));

liMenuList.forEach(li => {
    li.addEventListener('click', function(event) {
        smoothScroll.init({
            'selectorHeader': '#menu'
        });
        let none = getComputedStyle(toggleMenu).getPropertyValue('display') || toggleMenu.currentStyle.display;
        if (none !== 'none') {
            smoothScroll.init();
            slideout.toggle();
        }

    });
})