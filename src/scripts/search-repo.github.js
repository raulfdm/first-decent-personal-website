/*================= FUNCTIONS =================*/
const findLastUpdate = function (repoName) {
    let userName = 'raulfdm';
    let url = `https://api.github.com/repos/${userName}/${repoName}`;
    let result = openConnect(url);

    return result
        .then(repo => repo.updated_at)
        .catch(err => 'Não foi possível obter o repositório');
}

const openConnect = function (url) {
    let header = new Headers();
    header.set('Content-Type', 'application/json');

    return fetch(url, { method: 'get', mode: 'cors', headers: header })
        .then(response => response.json())
        .then(repo => repo)
        .catch(err => {
            console.log(err);
            return err;
        })
}

const dateToMoment = function (date, format = 'DD/MM/YYYY') {
    return moment(date).format(format);
}

const updateDataInElement = function (domElement, date) {
    if (!domElement || !date) throw new Error('Parameter domElement and date is required');

    domElement.textContent = date;
}

/*================= INIT =================*/
let cardList = document.querySelectorAll('#portifolio .card');
let repo = "";

//Iterate card list
[...cardList].forEach(card => {
    //validate if card element contains repo value
    if (card.dataset.repo) {
        //set repo value into a variable
        repo = card.dataset.repo;
        //call method to find last update date
        findLastUpdate(repo).then(date => {
            //call a method to update this date into dom element
            updateDataInElement(card.querySelector('.card-footer .data-atualizacao time'), dateToMoment(date))
        }).catch(err => console.log(err));

    }
});