let slideout = new Slideout({
    'panel': document.getElementById('content'),
    'menu': document.getElementById('menu'),
    'duration': 200,
    'padding': 200,
    'tolerance': 70
});

const toggleMenu = document.querySelector('.toggle-menu');

toggleMenu.addEventListener('click', function(e) {
    slideout.toggle();
})

let liMenuList = [].slice.call(document.querySelectorAll('#menu ul li'));

liMenuList.forEach(li => {
    li.addEventListener('click', function(event) {
        //currentStyle = IE
        let none = getComputedStyle(toggleMenu).getPropertyValue('display') || toggleMenu.currentStyle.display;
        if(none !== 'none'){
            slideout.toggle();
        }
        
    })
})