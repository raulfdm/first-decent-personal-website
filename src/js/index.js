$(document).ready(function () {
	let scrollPosition = 0;
	const $window = $(window)
	const $menuItems = $('.header__menu__list__item__link')
	const handleScroll = () => {
		const actualScrollPosition = $window.scrollTop();
		if (actualScrollPosition === 0) {
			handleHeaderStates.transparencyOn()
		} else {
			handleHeaderStates.transparencyOff()
		}

		if (actualScrollPosition < scrollPosition) {
			handleHeaderStates.show()
		} else
			handleHeaderStates.hide()

		scrollPosition = actualScrollPosition;
	}

	const handleHeaderStates = {
		$header: $('.header'),
		_idTimeOut: '',
		hide() {
			this.$header.addClass('hidden')
		},
		show() {
			this.$header.removeClass('hidden')
			return this
		},
		transparencyOn() {
			this.$header.addClass('is-transparent')
			return this
		},
		transparencyOff() {
			this.$header.removeClass('is-transparent')
			return this
		}
	}


	$('.home__title').typeIt({
		strings: ['Front-end Developer', 'Curious Guy',
			'Passionate About Coding'
		],
		breakLines: false,
		loop: true,
		deleteSpeed: 50,
		deleteDelay: 2000,
		loopDelay: 2000
		/*startDelay: 250,
		loopDelay: 4000*/
	});


	$('html').smoothScroll(400);
	$window.scroll(handleScroll)
	$menuItems.click(function () {
		setTimeout(function () {
			handleHeaderStates.hide()
		}, 500);
	})
})
