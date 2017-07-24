$('.home__title').typeIt({
	strings: ['Front-end Developer', 'Curious Guy',
		'Passionate About Coding'
	],
	breakLines: false,
	loop: true,
	deleteSpeed: 50,
	deleteDelay: 2000,
	loopDelay: 2000
})

$('html').smoothScroll(400)
