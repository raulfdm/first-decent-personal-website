# Personal Website

> Repository to version my personal website and show my profile and portfolio

## Stack

- Task Runner: [Gulp](http://gulpjs.com/)
- Superset JavaScript: [TypeScript](https://www.typescriptlang.org)
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
├── gulpTasks/
|   ├── build.js
|   ├── clean.js
|   ├── copy-files.js
|   ├── image.js
|   ├── pages.js
|   ├── pug.js
|   ├── revision.js
|   ├── styles.js
|   ├── typescript.js
|   └── watchers.js
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
|   |   |   ├── _contact.css
|   |   |   ├── _home.css
|   |   |   ├── _portfolio.css
|   |   |   ├── _skills.css
|   |   |   └── _social.css
|   |   ├── state/
|   |   |   ├── _disable.css
|   |   |   ├── _feedback-state.css
|   |   |   └── _transparency.css
|   |   ├── theme/
|   |   └── index.css
|   ├── data/
|   |   ├── json-ld.json
|   |   └── rev-manifest.json
|   ├── img/
|   |   ├── png/
|   |   |   ├── favicon-16x16.png
|   |   |   ├── favicon-32x32.png
|   |   |   └── favicon.ico
|   |   └── background.jpg
|   ├── includes/
|   |   ├── _about.pug
|   |   ├── _contact.pug
|   |   ├── _footer.pug
|   |   ├── _header.pug
|   |   ├── _home.pug
|   |   ├── _portfolio.pug
|   |   ├── _skills.pug
|   |   └── _social.pug
|   ├── ts/
|   |   ├── controllers/
|   |   |   ├── ContactController.ts
|   |   |   ├── ErrorFormController.ts
|   |   |   ├── HeaderController.ts
|   |   |   ├── SubmitButtonController.ts
|   |   |   └── UrlController.ts
|   |   ├── helpers/
|   |   |   ├── addAndRemoveClass.ts
|   |   |   └── disableEnableElements.ts
|   |   ├── models/
|   |   |   └── Contact.ts
|   |   ├── services/
|   |   |   ├── MailService.ts
|   |   |   └── ReCaptchaService.ts
|   |   ├── vendor/
|   |   |   ├── analytics.js
|   |   |   ├── bootConfig.js
|   |   |   ├── email.min.js
|   |   |   ├── smooths-scroll.min.js
|   |   |   └── smtpjs.min.js
|   |   └── index.ts
|   ├── layouts/
|   |   └── default.pug
|   ├── google-site-verification: google13191576035e3ffb.html
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
[MIT License](https://github.com/raulfdm/personal-website/blob/master/LICENSE) © [Raul de Melo](http://rauldemelo.com.br)
