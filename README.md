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
|   |   |   ├── _colors.pug
|   |   |   ├── _global.pug
|   |   |   └── _reset.pug
|   |   ├── layout/
|   |   |   ├── _footer.pug
|   |   |   ├── _header.pug
|   |   |   ├── _main.pug
|   |   |   └── _social.pug
|   |   ├── module/
|   |   ├── state/
|   |   ├── theme/
|   |   └── index.css
|   ├── img/
|   ├── includes/
|   |   ├── _about.pug
|   |   ├── _footer.pug
|   |   ├── _header.pug
|   |   ├── _home.pug
|   |   ├── _portfolio.pug
|   |   ├── _skills.pug
|   |   └── _social.pug
|   ├── js/
|   |   └── analytics.pug
|   ├── layouts/
|   |   └── default.pug
|   ├── CNAME
|   └── index.pug
├── .editorconfig
├── .gitignore
├── gulpfile.js
├── package.json
├── bs-config.json
└── yarn.lock
```
