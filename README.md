# Personal Website

> Repository to version my personal website and show my profile and portfolio

## Stack

- Task Runner: [Gulp](http://gulpjs.com/)
- CSS 
	- Tooling: [PostCSS](http://postcss.org/)
	- Methodologies
		- [BEM](http://getbem.com/introduction/)
		- [SMACSS](http://getbem.com/introduction/)
- HTML Template Engine: [PUG](https://pugjs.org/api/getting-started.html)
- Live Reload Server: [Lite Server](https://github.com/johnpapa/lite-server)


## Folder Structure
```
.
├── README.md
├── LICENSE
├── dist/
├── src/
|   ├── css/
|   |   ├── base/
|   |   |   ├── _colors.css
|   |   |   ├── _global.css
|   |   |   └── _reset.css
|   |   ├── layout/
|   |   |   ├── _footer.css
|   |   |   ├── _header.css
|   |   |   └── _main.css
|   |   ├── module/
|   |   |   ├── card-project/
|   |   |   |     ├── _card-body.css
|   |   |   |     ├── _card-footer.css
|   |   |   |     ├── _card-header.css
|   |   |   |     └── _card.css
|   |   |   ├── _about.css
|   |   |   ├── _home.css
|   |   |   ├── _portfolio.css
|   |   |   ├── _skills.css
|   |   |   └── _social.css
|   |   ├── state/
|   |   |   └── _transparency.css
|   |   ├── theme/
|   |   └── index.css
|   ├── data/
|   |   ├── about.json
|   |   ├── projects.json
|   |   └── skills.json
|   ├── img/
|   |   ├── png/
|   |   |   ├── favicon-16x16.png
|   |   |   ├── favicon-32x32.png
|   |   |   └── favicon.ico
|   |   └── background.jpg
|   ├── includes/
|   |   ├── _about.pug
|   |   ├── _footer.pug
|   |   ├── _header.pug
|   |   ├── _home.pug
|   |   ├── _portfolio.pug
|   |   ├── _skills.pug
|   |   └── _social.pug
|   ├── js/
|   |   ├── vendor/
|   |   |   └── smooths-scroll.min.pug
|   |   ├── index.js
|   |   └── analytics.pug
|   ├── layouts/
|   |   └── default.pug
|   ├── CNAME
|   └── index.pug
├── .babelrc
├── .editorconfig
├── .gitignore
├── bs-config.json
├── gulpfile.js
├── package.json
└── yarn.lock
```

## License
[MIT License](https://github.com/raulfdm/personal-website/blob/master/LICENSE) © [Raul F. de Melo](http://rauldemelo.com.br)
